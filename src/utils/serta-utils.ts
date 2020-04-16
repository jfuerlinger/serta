import { StorageUtils } from "./storage-utils";
import { IUserService } from "../services/i-user-service";

const createLogger = require('logging').default;
const logger = createLogger('serta-utils');


export class SertaUtils {

    private static _levels = [
        {
            id: 0,
            abbreviation: 'S',
            name: 'Loops'
        },
        {
            id: 1,
            abbreviation: 'A',
            name: 'Arrays'
        },
        {
            id: 2,
            abbreviation: 'M',
            name: 'Methods'
        },
        {
            id: 3,
            abbreviation: 'C',
            name: 'Classes'
        },
        {
            id: 4,
            abbreviation: 'F',
            name: 'Files'
        },
        {
            id: 5,
            abbreviation: 'P',
            name: 'Greenfoot Serta figher'
        },
    ];

    public static getNextLevel(levelIdx: number): any {
        return this._levels[Math.min(levelIdx + 1, this._levels.length - 1)]
    }

    public static getPrevLevel(levelIdx: number): any {
        return this._levels[Math.max(0, levelIdx - 1)];
    }

    public static getDefaultLevel(): any {
        return this._levels[0];
    }

    public static getMaxLevel(): number {
        return this._levels.length - 1;
    }

    public static async changeLevelOfMentionedUsersIn(
        userService: IUserService,
        bot: any, msg: any,
        levelNotToBeChanged: any,
        changeLevelAction: any,
        warningMessageIfImpossible: string) {

        await msg.mentions.map(async (mentionEntry: any) => {
            let userForMentionEntry = await userService.getByDiscordUserId(mentionEntry.id);

            if (userForMentionEntry.levelId !== levelNotToBeChanged) {
                const newLevelForUser = changeLevelAction(userForMentionEntry.levelId);
                userForMentionEntry.levelId = newLevelForUser.id;
                await userService.update(userForMentionEntry);
                this.createInfoMessage(bot, msg.channel.id, `*${userForMentionEntry.discordUserName}* is now on level **${newLevelForUser.name}**`);
            } else {
                this.createWarnMessage(bot, msg.channel.id, `*${userForMentionEntry.discordUserName}* ${warningMessageIfImpossible}`);
            }

        });
    }

    public static logDetails(msg: any, args: any) {

        logger.info("-------------------------------");
        logger.info("Message:");
        logger.info(msg);


        logger.info("Arguments:");
        logger.info(args);

        logger.info("Mentioning:");
        if (msg && msg.mentions && msg.mentions.length > 0) {
            msg.mentions.map((entry: any) => {
                logger.info(`Mentioned: ${entry.username}`);
            });
        } else {
            logger.info("-> nobody was mentioned");
        }

        logger.info("-------------------------------");
    }

    public static createInfoMessage(bot: any, channelId: any, message: any) { bot.createMessage(channelId, message); }
    public static createWarnMessage(bot: any, channelId: any, message: any) { bot.createMessage(channelId, `WARNING: ${message}`); }
}