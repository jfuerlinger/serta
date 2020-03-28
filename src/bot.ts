import { SertaCommand } from "./commands/serta-command";

import { SertaUpLevelCommand  } from "./commands/serta-uplevel";
import { SertaDownLevelCommand } from "./commands/serta-downlevel";
import { SertaStatisticsCommand } from "./commands/serta-statistics";
import { SertaTestCommand } from "./commands/serta-test";

require('dotenv').config();

const createLogger = require('logging').default;
const logger = createLogger('bot');

const Eris = require("eris");
import { CommandClient, Message } from "eris";

export class SertaBot {

    private _bot: CommandClient;
    private _commands: any;

    constructor() {

        logger.info('instantiating the Eris command client ...');

        logger.info(`BOT_PREFIX=${process.env.BOT_PREFIX}`);
        logger.info(`BOT_INSTANCE_NAME=${process.env.BOT_INSTANCE_NAME}`);


        this._bot = new Eris.CommandClient(process.env.DISCORD_TOKEN, {}, {
            description: "------ Serta is everywhere ------ [" + process.env.BOT_INSTANCE_NAME + "]",
            owner: "J.Fürlinger / P.Bauer",
            prefix: process.env.BOT_PREFIX
        });

        logger.info('[DONE] bot instantiated.');

        this._commands = new Map();
    }

    run() {
        this._bot.on("ready", () => { // When the bot is ready
            logger.info("--> Ready <--");
        });

        this.registerCommands();
        this._bot.connect();
    }

    registerCommands() {
        logger.info("register commands ...");

        this.registerCommandAlias('help', 'halp');
        this.registerCommand('serta-test', new SertaTestCommand(this._bot), 'st');
        this.registerCommand('serta-uplevel', new SertaUpLevelCommand(this._bot), 'su');
        this.registerCommand('serta-downlevel', new SertaDownLevelCommand(this._bot), 'sd');
        this.registerCommand('serta-statistics', new SertaStatisticsCommand(this._bot), 'ss');

        logger.info("[DONE] commands registered.");
    }

    registerCommand(commandName: string, command: SertaCommand, commandAlias: string) {

        this._commands.set(commandName, command);

        logger.info(`registering command '${commandName}' ...`);
        this._bot.registerCommand(commandName, (msg: Message, args: any) => {

            logger.info(`Command '${commandName} was called ...`);
            const cmd = this._commands.get(commandName);
            if (cmd) {
                cmd.execute(msg, args);
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

    registerCommandAlias(commandName: string, alias: string) {
        logger.info(`registering alias '${alias}' for command '${commandName}' ...`);
        this._bot.registerCommandAlias(alias, commandName);
        logger.info(`[DONE] alias '${alias}' registered.`);
    }
}