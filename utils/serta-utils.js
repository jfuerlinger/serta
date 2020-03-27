const StorageUtils = require('./storage-utils');

const createLogger = require('logging').default;
const logger = createLogger('serta-utils');


const levels = [
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

getNextLevel = (levelIdx) => levels[Math.min(levelIdx + 1, levels.length-1)];
getPrevLevel = (levelIdx) => levels[Math.max(0, levelIdx - 1)];

getDefaultLevel = () => levels[0];
getMaxLevel = () => levels.length - 1;


somebodyIsMentionedIn = (bot, msg, messageIfNot) => {
    if (msg.mentions.length === 0) {
        createErrorMessage(bot, msg.channel.id, messageIfNot)
        return false;
    } else {
        return true;
    }
};


changeLevelOfMentionedUsersIn = async (bot, msg, levelNotToBeChanged, changeLevelAction, warningMessageIfImpossible) => {
    let localState = await StorageUtils.getState();
    localStorage = localState
        .map(stateEntry => {

            if (!stateEntry.level) {
                stateEntry.level = LevelUtils.getDefaultLevel();
            }

            if (msg.mentions.some((mentionEntry) => mentionEntry.username === stateEntry.username)) {

                if (stateEntry.level.id !== levelNotToBeChanged) {
                    stateEntry.level = changeLevelAction(stateEntry.level.id);
                    createInfoMessage(bot, msg.channel.id, `*${stateEntry.username}* is now on level **${stateEntry.level.name}**`);
                } else {
                    createWarnMessage(bot, msg.channel.id, `*${stateEntry.username}* ${warningMessageIfImpossible}`);
                }
            }

        });

    await StorageUtils.persistState(localState);
}

logDetails = (msg, args) => {

    logger.info("-------------------------------");
    logger.info("Message:");
    logger.info(msg);


    logger.info("Arguments:");
    logger.info(args);

    logger.info("Mentioning:");
    if (msg && msg.mentions && msg.mentions.length > 0) {
        msg.mentions.map((entry) => {
            logger.info(`Mentioned: ${entry.username}`);
        });
    } else {
        logger.info("-> nobody was mentioned");
    }

    logger.info("-------------------------------");
}

createInfoMessage = (bot, channelId, message) => bot.createMessage(channelId, message);
createWarnMessage = (bot, channelId, message) => bot.createMessage(channelId, `WARNING: ${message}`);
createErrorMessage = (bot, channelId, message) => bot.createMessage(channelId, `ERROR: ${message}`);


module.exports.logDetails = logDetails;

module.exports.changeLevelOfMentionedUsersIn = changeLevelOfMentionedUsersIn;
module.exports.somebodyIsMentionedIn = somebodyIsMentionedIn;

module.exports.getNextLevel = getNextLevel;
module.exports.getPrevLevel = getPrevLevel;

module.exports.getDefaultLevel = getDefaultLevel;
module.exports.getMaxLevel = getMaxLevel;

module.exports.createInfoMessage = createInfoMessage;
module.exports.createWarnMessage = createWarnMessage;
module.exports.createErrorMessage = createErrorMessage;

