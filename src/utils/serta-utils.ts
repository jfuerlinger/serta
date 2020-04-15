import { StorageUtils } from "./storage-utils";

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
        bot: any, msg: any,
        levelNotToBeChanged: any,
        changeLevelAction: any,
        warningMessageIfImpossible: string) {

        let localState = await StorageUtils.getState();
        localState
            .map((stateEntry: any) => {

                if (!stateEntry.level) {
                    stateEntry.level = this.getDefaultLevel();
                }

                if (msg.mentions.some((mentionEntry: any) => mentionEntry.username === stateEntry.username)) {

                    if (stateEntry.level.id !== levelNotToBeChanged) {
                        stateEntry.level = changeLevelAction(stateEntry.level.id);
                        this.createInfoMessage(bot, msg.channel.id, `*${stateEntry.username}* is now on level **${stateEntry.level.name}**`);
                    } else {
                        this.createWarnMessage(bot, msg.channel.id, `*${stateEntry.username}* ${warningMessageIfImpossible}`);
                    }
                }

            });

        await StorageUtils.persistState(localState);
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
    public static createErrorMessage(bot: any, channelId: any, message: any) { bot.createMessage(channelId, `ERROR: ${message}`); }

}