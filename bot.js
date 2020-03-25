// inspiration: https://github.com/abalabahaha/eris/blob/master/examples/basicCommands.js

const StorageUtils = require('./storage');

// Run dotenv
require('dotenv').config();
const config = require("./config.json");

const createLogger = require('logging').default;
const logger = createLogger('bot');

const Eris = require("eris");

// Replace BOT_TOKEN with your bot account's token
const bot = new Eris.CommandClient(process.env.DISCORD_TOKEN, {}, {
    description: "------ Serta is everywhere ------ [" + process.env.BOT_INSTANCE_NAME + "]" ,
    owner: "J.Fürlinger / P.Bauer",
    prefix: process.env.BOT_PREFIX
});


bot.on("ready", () => { // When the bot is ready
    logger.info("Ready!"); // Log "Ready!"
});


bot.registerCommandAlias("halp", "help"); // Alias !halp to !help


bot.registerCommand("removepoints", async (msg, args) => {

    let localState = await StorageUtils.getState();
    localStorage = localState
        .map(entry => {
            entry.points -= 10;
            //return entry;
        });

    await StorageUtils.persistState(localState);

    bot.createMessage(msg.channel.id, '10 points removed!');
});

bot.registerCommand("addpoints", async (msg, args) => {

    let localState = await StorageUtils.getState();
    localStorage = localState
        .map(entry => {
            if (entry.username === msg.author.username) {
                entry.experience += 10;
            }

            entry.color = 0xf5da42;
        });

    await StorageUtils.persistState(localState);

    bot.createMessage(msg.channel.id, '10 Points added to your user!');
});

bot.registerCommand("statistics", async (msg, args) => {

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
                fields: [ // Array of field objects
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

bot.registerCommandAlias("stats", "statistics"); // Alias !stats to !statistics

bot.connect();
