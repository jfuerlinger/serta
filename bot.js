// inspiration: https://github.com/abalabahaha/eris/blob/master/examples/basicCommands.js

const StorageUtils = require('./utils/storage-utils.js');
const LevelUtils = require('./utils/level-utils.js');

// Run dotenv
require('dotenv').config();
const config = require("./config.json");

const prettyPrint = require('@base2/pretty-print-object');

const createLogger = require('logging').default;
const logger = createLogger('bot');

logger.info(`BOT_PREFIX=${process.env.BOT_PREFIX}`);
logger.info(`BOT_INSTANCE_NAME=${process.env.BOT_INSTANCE_NAME}`);

const Eris = require("eris");

// Replace BOT_TOKEN with your bot account's token
const bot = new Eris.CommandClient(process.env.DISCORD_TOKEN, {}, {
    description: "------ Serta is everywhere ------ [" + process.env.BOT_INSTANCE_NAME + "]",
    owner: "J.Fürlinger / P.Bauer",
    prefix: process.env.BOT_PREFIX
});


bot.on("ready", () => { // When the bot is ready
    logger.info("Ready!"); // Log "Ready!"
});


bot.registerCommandAlias("halp", "help"); // Alias !halp to !help

bot.registerCommand("serta-init", async (msg, args) => { 

});

bot.registerCommand("serta-uplevel", async (msg, args) => {

    logDetails(msg, args);

    // validate input
    if (msg.mentions.length === 0) {
        createErrorMessage(msg.channel.id, `You have to select someone to level-up!`);
        return;
    }

    let localState = await StorageUtils.getState();
    localStorage = localState
        .map(stateEntry => {

            if (!stateEntry.level) {
                stateEntry.level = LevelUtils.getDefaultLevel();
            }

            if (msg.mentions.some((mentionEntry) => mentionEntry.username === stateEntry.username)) {

                if (stateEntry.level.id !== LevelUtils.getMaxLevel()) {
                    stateEntry.level = LevelUtils.getNextLevel(stateEntry.level.id);
                    createInfoMessage(msg.channel.id, `*${stateEntry.username}* is now on level **${stateEntry.level.name}**`);
                } else {
                    createWarnMessage(msg.channel.id, `*${stateEntry.username}* is already in the highest level!`);
                }
            }

        });

    await StorageUtils.persistState(localState);
});

bot.registerCommandAlias("su", "serta-uplevel");

bot.registerCommand("serta-downlevel", async (msg, args) => {

    logDetails(msg, args);

    let localState = await StorageUtils.getState();
    localStorage = localState
        .map(stateEntry => {

            if (!stateEntry.level) {
                stateEntry.level = LevelUtils.getDefaultLevel();
            }

            if (msg.mentions.some((mentionEntry) => mentionEntry.username === stateEntry.username)) {

                if (entry.level.id !== 0) {
                    entry.level = LevelUtils.getPrevLevel(entry.level.id);
                    createInfoMessage(msg.channel.id, `*${stateEntry.username}* is now on level **${entry.level.name}**`);
                } else {
                    createWarnMessage(msg.channel.id, `*${stateEntry.username}* is already in the lowest level!`);
                }
            }
        });

    await StorageUtils.persistState(localState);
});

bot.registerCommandAlias("sd", "serta-downlevel");

bot.registerCommand("serta-statistics", async (msg, args) => {

    let localStorage = await StorageUtils.getState();

    localStorage.map(entry => {

        bot.createMessage(msg.channel.id, {
            embed: {
                title: "Status", // Title of the embed
                description: entry.message,
                author: { // Author property
                    name: entry.username,
                    icon_url: entry.avatarURL
                },
                color: entry.color ? entry.color : 0x008000, // Color, either in hex (show), or a base-10 integer
                fields: [
                    {
                        name: "Level",
                        value: entry.level ? entry.level.name : LevelUtils.getDefaultLevel().name,
                        inline: true
                    },
                    {
                        name: "Level Id",
                        value: entry.level ? entry.level.id : LevelUtils.getDefaultLevel().id,
                        inline: true
                    },
                    {
                        name: "Health",
                        value: entry.health,
                        inline: true
                    },
                    {
                        name: "XP",
                        value: entry.experience,
                        inline: false
                    }

                ],
                footer: { // Footer text
                    text: "HTL Leonding"
                }
            }
        });
    });
});

bot.registerCommandAlias("ss", "serta-statistics");

bot.connect();


logDetails = (msg, args) => {

    logger.info("-------------------------------");
    logger.info("Message:");
    logger.info(msg);


    logger.info("Arguments:");
    logger.info(args);

    logger.info("Mentioning:");
    if (msg.mentions.length > 0) {
        msg.mentions.map((entry) => {
            logger.info(`Mentioned: ${entry.username}`);
        });
    } else {
        logger.info("-> nobody was mentioned");
    }

    logger.info("-------------------------------");
}

createInfoMessage = (channelId, message) => bot.createMessage(channelId, message);
createWarnMessage = (channelId, message) => bot.createMessage(channelId, `WARNING: ${message}`);
createErrorMessage = (channelId, message) => bot.createMessage(channelId, `ERROR: ${message}`);


