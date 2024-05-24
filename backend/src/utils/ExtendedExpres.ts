import { Express, Request, Response } from "express";
import { UserAuthentication } from "../security/UserAuthentication";
import { UserAuthenticationData } from "../user/UserService";

export const ExtendedExpres = {
    authenticatedPost: (serverApp: Express, path: string, onAuthSuccess: (reqGiven: Request, resGiven: Response, userAuthData: UserAuthenticationData) => void) =>
        serverApp.post(path, async (req: Request, res: Response) => {
            const userAuthentication: UserAuthentication = await new UserAuthentication(req).checkAuth();
            if (!userAuthentication.getIsAuthenticated()) {
                res.send(userAuthentication.getMessage());
                return;
            }
            onAuthSuccess(req, res, userAuthentication.getAuthData()!);
        }),
};
