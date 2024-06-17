import { prisma } from "../../index";

//TODO move to .env
const client_id = "sayvwm88hylj3u74yngs9eywjovaqc";
const client_secret = "9jz6225aw5g0yp22alvtoxuewft70j";
let authInfo: TwitchApiAuthInfo | undefined = undefined;

interface TwitchApiAuthInfo {
    access_token: string;
    expires_in: number;
    token_type: string;
}

interface GameInfo {
    id: number;
    alternative_names?: number[];
    category?: number;
    created_at?: number;
    dlcs?: number[];
    expanded_games?: number[];
    genres?: number[];
    name: string;
    platforms?: number[];
    total_rating?: number;
    aggregated_rating?: number;
    similar_games?: number[];
    cover?: number;
    summary?: string;
}

interface GameCover {
    id: number;
    game: number;
    image_id?: string;
    url?: string;
}

const getAuthenticationInfo = fetch(`https://id.twitch.tv/oauth2/token?client_id=${client_id}&client_secret=${client_secret}&grant_type=client_credentials`, { method: "POST" });

const getGamesInfo = (offset: number = 0, limit: number = 10) =>
    fetch("https://api.igdb.com/v4/games", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Client-ID": client_id,
            Authorization: `Bearer ${authInfo?.access_token}`,
        },
        body: `fields alternative_names,category,created_at,dlcs,expanded_games,genres,name,platforms,total_rating,aggregated_rating,cover,similar_games,summary;limit ${limit};offset ${offset};`,
    });

const getCoversInfo = (offset: number = 0, limit: number = 10) =>
    fetch("https://api.igdb.com/v4/covers", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Client-ID": client_id,
            Authorization: `Bearer ${authInfo?.access_token}`,
        },
        body: `fields game,image_id,url;limit ${limit};offset ${offset};`,
    });

const loadGamesInfo = async (limit: number = 400, offset: number = 0) => {
    const gamesInfoRaw = await getGamesInfo(offset, limit);
    const gamesInfo: GameInfo[] = await gamesInfoRaw.json();
    if (gamesInfo.length === 0) {
        console.log("Finished fetching games info");
        return;
    }
    let upsertionPromises: Promise<any>[] = [];
    gamesInfo.forEach((game) => {
        upsertionPromises.push(prisma.gameInfo.upsert({ where: { id: game.id }, create: { ...game }, update: { ...game } }));
    });
    await Promise.all(upsertionPromises);
    console.log(`offset: ${offset} limit: ${limit} gamesInfo.length: ${gamesInfo.length}`);
    await loadGamesInfo(limit, offset + gamesInfo.length);
};

const loadCovers = async (limit: number = 400, offset: number = 0) => {
    const gameCoversRaw = await getCoversInfo(offset, limit);
    const gameCovers: GameCover[] = await gameCoversRaw.json();
    if (gameCovers.length === 0) {
        console.log("Finished fetching game covers");
        return;
    }
    let updatePromises: Promise<any>[] = [];
    gameCovers.forEach((cover) => {
        updatePromises.push(prisma.gameInfo.updateMany({ where: { cover: cover.id }, data: { image_id: cover.image_id, img_url: cover.url } }));
    });
    await Promise.all(updatePromises);
    console.log(`offset: ${offset} limit: ${limit} covers.length: ${gameCovers.length}`);
    await loadCovers(limit, offset + gameCovers.length);
};

const loadAuthInfo = async () => {
    const rawResponse = await getAuthenticationInfo;
    const data: TwitchApiAuthInfo = await rawResponse.json();
    authInfo = data;
    console.log("Retrieved Auth Info: ");
    console.log(authInfo);
};

export const IgdbApi = {
    updateGamesBasicInfo: async () => {
        loadAuthInfo()
            .then(async () => await loadGamesInfo())
            .then(() => {
                authInfo = undefined;
            });
    },
    updateGameCovers: async () => {
        loadAuthInfo()
            .then(async () => await loadCovers())
            .then(() => {
                authInfo = undefined;
            });
    },
    // loadAuthInfo: async () => loadAuthInfo(),
    // updateGamesDatabase: async () => {
    //     console.log("Started fetching games info");
    //     loadGamesInfo();
    // },
    // updateGameCovers: async () => {
    //     console.log("Started fetching game covers");
    //     loadCovers();
    // },
    // cleanAuthInfo: async () => {
    //     authInfo = undefined;
    // },
};
