import passport from 'passport';
import { Strategy as SteamStrategy } from 'passport-steam';
import {prisma} from "../../index";

passport.use(new SteamStrategy({
        returnURL: 'http://localhost:3000/auth/steam/return',
        realm: 'http://localhost:3000/',
        apiKey: process.env.STEAM_API_KEY!,
    },
    async (identifier, profile, done) => {
        let user = await prisma.user.findUnique({ where: { steamId: profile.id } });

        if (!user) {
            user = await prisma.user.create({
                data: {
                    steamId: profile.id,
                    username: profile.displayName,
                },
            });
        }

        return done(null, user);
    }
));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((obj, done) => {
    done(null, obj);
});
