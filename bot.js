// inspiration: https://github.com/abalabahaha/eris/blob/master/examples/basicCommands.js

const StorageUtils = require('./utils/storage-utils.js');
const LevelUtils = require('./utils/level-utils.js');

// Run dotenv
require('dotenv').config();
const config = require("./config.json");

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

<<<<<<< HEAD
    if (!somebodyIsMentionedIn(msg, `You have to select someone to level-up!`)) {
=======
    if (somebodyIsMentionedIn(msg, `You have to mention at least one player to level-up!`)) {
>>>>>>> 9d88f1db3c51206e3d8ca651b6fb7345d69b8566
        return;
    }
    const levelNotToBeChanged = LevelUtils.getMaxLevel()
    const changeLevel = (levelIndex) => LevelUtils.getNextLevel(levelIndex)
    const warningMessageIfImpossible = "is already in the highest level!"
    changeLevelOfMentionedUsersIn(msg, levelNotToBeChanged, changeLevel, warningMessageIfImpossible)
});

bot.registerCommandAlias("su", "serta-uplevel");

function somebodyIsMentionedIn(msg, messageIfNot) {
  let mentionFound = true
  if (msg.mentions.length === 0) {
    createErrorMessage(msg.channel.id, messageIfNot)
    mentionFound = false
  }
  return mentionFound
}

async function changeLevelOfMentionedUsersIn(msg, levelNotToBeChanged, changeLevelAction, warningMessageIfImpossible) {
  let localState = await StorageUtils.getState();
  localStorage = localState
      .map(stateEntry => {

          if (!stateEntry.level) {
              stateEntry.level = LevelUtils.getDefaultLevel();
          }

          if (msg.mentions.some((mentionEntry) => mentionEntry.username === stateEntry.username)) {

              if (stateEntry.level.id !== levelNotToBeChanged) {
                  stateEntry.level = changeLevelAction(stateEntry.level.id);
                  createInfoMessage(msg.channel.id, `*${stateEntry.username}* is now on level **${stateEntry.level.name}**`);
              } else {
                  createWarnMessage(msg.channel.id, `*${stateEntry.username}* ${warningMessageIfImpossible}`);
              }
          }

      });

  await StorageUtils.persistState(localState);
}

function somebodyIsMentionedIn(msg, messageIfNot) {
  if (msg.mentions.length === 0) {
    createErrorMessage(msg.channel.id, messageIfNot)
    return false
  } else {
    return true
  }
}

bot.registerCommand("serta-downlevel", async (msg, args) => {

    logDetails(msg, args);

<<<<<<< HEAD
    if (!somebodyIsMentionedIn(msg, `You have to select someone to level-down!`)) {
      return
    }

=======
    if (somebodyIsMentionedIn(msg, `You have to mention at least one player to level-down!`)) {
      return;
    }
    
>>>>>>> 9d88f1db3c51206e3d8ca651b6fb7345d69b8566
    let localState = await StorageUtils.getState();
    localStorage = localState
        .map(stateEntry => {

            if (!stateEntry.level) {
                stateEntry.level = LevelUtils.getDefaultLevel();
            }

            if (msg.mentions.some((mentionEntry) => mentionEntry.username === stateEntry.username)) {

                if (stateEntry.level.id !== 0) {
                    stateEntry.level = LevelUtils.getPrevLevel(stateEntry.level.id);
                    createInfoMessage(msg.channel.id, `*${stateEntry.username}* is now on level **${stateEntry.level.name}**`);
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
