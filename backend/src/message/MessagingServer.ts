import { Server, Socket } from "socket.io";
import Logger from "../Logger/Logger";
import { prisma } from "../../index";
import { ConversationFinder } from "../conversation/ConversationFinder";

const serverLogger: Logger = new Logger("MessagingServer");
export const MessagingServer = {
    setupServer: () => {
        const io: Server = new Server(3002, {});

        io.engine.on("headers", (headers, req) => {
            headers["Access-Control-Allow-Origin"] = "*";
            headers["Access-Control-Allow-Headers"] = "origin, x-requested-with, content-type";
            headers["Access-Control-Allow-Methods"] = "PUT, GET, POST, DELETE, OPTIONS";
        });

        io.on("connection", (socket: Socket) => {
            serverLogger.info(`Connection incoming: ${socket.id}`);

            registerUserConnectionSocketListener(socket, io);
            registerMessageSentSocketListener(socket);
        });
    },
};

const registerUserConnectionSocketListener = (socket: Socket, server: Server) =>
    socket.on("user_connection", async (userId: number) => {
        const sockets = await server.fetchSockets();
        //TODO we have currently doubling sockets, fix it and remove trytytka on front
        socket.join(userId.toString());
        serverLogger.info(`User connected: ${userId}`);
        const conversations = await ConversationFinder.getConversationsForUser(userId);
        serverLogger.info(`Sending conversations to ${userId}, with size: ${conversations?.length}`);
        socket.emit("conversations_received", conversations);
    });

const registerMessageSentSocketListener = (socket: Socket) =>
    socket.on("message_sent", async (event: { senderId: number; conversationId: number; message: string; receiverIds: number[] }) => {
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
            event.receiverIds.forEach((receiverId) => {
                socket.to(receiverId.toString()).emit("message_received", message);
            });
            serverLogger.info(`Emitting message_received event: ${JSON.stringify(message)}}`);
        } catch (error) {
            serverLogger.error("Couldn't save the message to the database: ");
            serverLogger.error(JSON.stringify(error));
        }
    });
