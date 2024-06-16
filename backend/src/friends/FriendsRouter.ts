import { Router } from "express";
import { FriendsController } from "./FriendsController";
import { CommandResult } from "../utils/CommandResult";

export const FriendsRouter = Router();
FriendsRouter.get("/:userId/friends", async (req, res) => {
    const userId = parseInt(req.params.userId);
    try {
        const friends = await FriendsController.getFriends(userId);
        res.json(friends);
    } catch (error) {
        res.status(500).json(CommandResult.failure("ERROR_OCCURED_WHILE_FETCHING_FRIENDS"));
    }
});

FriendsRouter.post("/:userId/invite/:friendId", async (req, res) => {
    const userId = parseInt(req.params.userId);
    const friendId = parseInt(req.params.friendId);
    try {
        await FriendsController.inviteFriend(userId, friendId);
        res.status(200).json(CommandResult.success());
    } catch (error) {
        res.status(500).json(CommandResult.failure("ERROR_OCCURED_WHILE_SENDING_FRIEND_REQUEST"));
    }
});

FriendsRouter.delete("/:userId/remove/:friendId", async (req, res) => {
    const userId = parseInt(req.params.userId);
    const friendId = parseInt(req.params.friendId);
    try {
        await FriendsController.removeFriend(userId, friendId);
        res.status(200).json(CommandResult.success());
    } catch (error) {
        res.status(500).json(CommandResult.failure("ERROR_OCCURED_WHILE_REMOVING_FRIEND"));
    }
});

FriendsRouter.get("/:userId/requests", async (req, res) => {
    const userId = parseInt(req.params.userId);
    try {
        const requests = await FriendsController.getFriendRequests(userId);
        res.json(requests);
    } catch (error) {
        res.status(500).json(CommandResult.failure("ERROR_OCCURED_WHILE_FETCHING_FRIEND_REQUESTS"));
    }
});

FriendsRouter.post("/:userId/accept/:friendId", async (req, res) => {
    const userId = parseInt(req.params.userId);
    const friendId = parseInt(req.params.friendId);
    try {
        await FriendsController.acceptFriendRequest(userId, friendId);
        res.status(200).json(CommandResult.success());
    } catch (error) {
        res.status(500).json(CommandResult.failure("ERROR_OCCURED_WHILE_ACCEPTING_FRIEND_REQUEST"));
    }
});

FriendsRouter.delete("/:userId/decline/:friendId", async (req, res) => {
    const userId = parseInt(req.params.userId);
    const friendId = parseInt(req.params.friendId);
    try {
        await FriendsController.declineFriendRequest(userId, friendId);
        res.status(200).json(CommandResult.success());
    } catch (error) {
        res.status(500).json(CommandResult.failure("ERROR_OCCURED_WHILE_DECLINING_FRIEND_REQUEST"));
    }
});
