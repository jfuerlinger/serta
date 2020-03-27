const SertaUpLevelCommand = require('./messages/serta-uplevel');
const SertaDownLevelCommand = require('./messages/serta-downlevel');
const SertaStatisticsCommand = require('./messages/serta-statistics');

require('dotenv').config();

const createLogger = require('logging').default;
const logger = createLogger('bot');

const Eris = require("eris");

class SertaBot {

    constructor() {

        logger.info('instantiating the Eris command client ...');

        logger.info(`BOT_PREFIX=${process.env.BOT_PREFIX}`);
        logger.info(`BOT_INSTANCE_NAME=${process.env.BOT_INSTANCE_NAME}`);
        

        this.bot = new Eris.CommandClient(process.env.DISCORD_TOKEN, {}, {
            description: "------ Serta is everywhere ------ [" + process.env.BOT_INSTANCE_NAME + "]",
            owner: "J.Fürlinger / P.Bauer",
            prefix: process.env.BOT_PREFIX
        });

        logger.info('[DONE] bot instantiated.');

        this.commands = new Map();
    }

    run() {
        this.bot.on("ready", () => { // When the bot is ready
            logger.info("--> Ready <--");
        });

        this.registerCommands();
        this.bot.connect();
    }

    registerCommands() {
        logger.info("register commands ...");

        this.registerCommandAlias('help', 'halp');
        this.registerCommand('serta-uplevel', new SertaUpLevelCommand(this.bot), 'su');
        this.registerCommand('serta-downlevel', new SertaDownLevelCommand(this.bot), 'sd');
        this.registerCommand('serta-statistics', new SertaStatisticsCommand(this.bot), 'ss');

        logger.info("[DONE] commands registered.");
    }

    registerCommand(commandName, command, commandAlias) {

        this.commands.set(commandName, command);

        logger.info(`registering command '${commandName}' ...`);
        this.bot.registerCommand(commandName, (msg, args) => {

            logger.info(`Command '${commandName} was called ...`);
            const cmd = this.commands.get(commandName);
            if (cmd) {
                cmd.performCommand(msg, args);
            } else {
                logger.warn(`cant't find the command with the name '${commandName}'!`);

            }
            logger.info('[DONE]');

        });
        logger.info(`[DONE] command '${commandName}' registered.`);

        if (commandAlias) {
            this.registerCommandAlias(commandName, commandAlias);
        }
    }

    registerCommandAlias(commandName, alias) {
        logger.info(`registering alias '${alias}' for command '${commandName}' ...`);
        this.bot.registerCommandAlias(alias, commandName);
        logger.info(`[DONE] alias '${alias}' registered.`);
    }
}

module.exports.default = SertaBot;