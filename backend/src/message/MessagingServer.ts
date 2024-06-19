import { Server, Socket } from "socket.io";
import Logger from "../Logger/Logger";
import { prisma } from "../../index";
import { ConversationFinder } from "../conversation/ConversationFinder";

const serverLogger: Logger = new Logger("MessagingServer");
export const MessagingServer = {
    setupServer: () => {
        const io = new Server(3002, {});

        io.engine.on("headers", (headers, req) => {
            headers["Access-Control-Allow-Origin"] = "*";
            headers["Access-Control-Allow-Headers"] = "origin, x-requested-with, content-type";
            headers["Access-Control-Allow-Methods"] = "PUT, GET, POST, DELETE, OPTIONS";
        });

        io.on("connection", (socket: Socket) => {
            serverLogger.info(`Connection incoming: ${socket.id}`);

            registerUserConnectionSocketListener(socket);
            registerMessageSentSocketListener(socket);
        });
    },
};

const registerUserConnectionSocketListener = (socket: Socket) =>
    socket.on("user_connection", async (userId: number) => {
        serverLogger.info(`User connected: ${userId}`);
        serverLogger.info(`Sending conversations to ${userId}`);
        const conversations = await ConversationFinder.getConversationsForUser(userId);
        socket.emit("conversations_received", conversations);
    });

const registerMessageSentSocketListener = (socket: Socket) =>
    socket.on("message_sent", async (event: { senderId: number; conversationId: number; message: string }) => {
        serverLogger.info(`Message received: ${JSON.stringify(event)}`);

        try {
            const message = await prisma.message.create({
                data: {
                    content: event.message,
                    senderId: event.senderId,
                    conversationId: event.conversationId,
                    readReceipts: {
                        create: {
                            userId: event.senderId,
                        },
                    },
                },
            });
            socket.emit("message_received", message);
            serverLogger.info(`Emitting message_received event to the sender: ${JSON.stringify(message)}`);
        } catch (error) {
            serverLogger.error("Couldn't save the message to the database: ");
            serverLogger.error(JSON.stringify(error));
        }
    });
