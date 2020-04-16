import { ISertaCommand } from "./commands/i-serta-command";

import { SertaUpLevelCommand } from "./commands/serta-uplevel";
import { SertaDownLevelCommand } from "./commands/serta-downlevel";
import { SertaStatisticsCommand } from "./commands/serta-statistics";
import { SertaTestCommand } from "./commands/serta-test";

require('dotenv').config();

const createLogger = require('logging').default;
const logger = createLogger('bot');

const Eris = require("eris");
import { CommandClient, Message } from "eris";
import { SertaStatusCommand } from "./commands/serta-status/serta-status-command";
import { ISettingResolver } from "./config/i-setting-resolver";
import { AzureUtils } from "./utils/azure-utils";

export class SertaBot {

    public bot: CommandClient;
    private commands: any;

    constructor(private settingResolver: ISettingResolver) {


        this.commands = new Map();
    }

    async initBot() {
        logger.info('initializing the Eris command client ...');

        const discordToken = await this.settingResolver.getSetting('discord-token');
        const botPrefix = await this.settingResolver.getSetting('bot-prefix');
        const botInstanceName = await this.settingResolver.getSetting('bot-instance-name');

        logger.info(`discord-token=${discordToken}`);
        logger.info(`bot-prefix=${botPrefix}`);
        logger.info(`bot-instance-name=${botInstanceName}`);


        this.bot = new Eris.CommandClient(discordToken, {}, {
            description: `------ Serta is everywhere ------ [${botInstanceName}]`,
            owner: "J.Fürlinger / P.Bauer",
            prefix: botPrefix
        });

        logger.info('[DONE] bot instantiated.');


    }

    run(): Promise<void> {
        this.registerCommands();
        this.bot.connect();
        return new Promise((resolve) => {
            this.bot.on("ready", () => { // When the bot is ready
                logger.info("--> Ready <--")
                resolve()
            })
        })
    }

    stop() {
        this.bot.disconnect({ reconnect: false });
    }

    private registerCommands(): void {
        logger.info("register commands ...");



        this.registerCommandAlias('help', 'halp');
        this.registerCommand('serta-test', new SertaTestCommand(this.settingResolver, this.bot), 'st');
        this.registerCommand('serta-uplevel', new SertaUpLevelCommand(this.settingResolver, this.bot), 'su');
        this.registerCommand('serta-downlevel', new SertaDownLevelCommand(this.settingResolver, this.bot), 'sd');
        this.registerCommand('serta-statistics', new SertaStatisticsCommand(this.settingResolver, this.bot), 'ss');
        this.registerCommand('serta-status', new SertaStatusCommand(this.settingResolver, this.bot), 'stat');

        logger.info("[DONE] commands registered.");
    }

    private registerCommand(commandName: string, command: ISertaCommand, commandAlias: string): void {

        this.commands.set(commandName, command);

        logger.info(`registering command '${commandName}' ...`);
        this.bot.registerCommand(commandName, (msg: Message, args: any) => {

            logger.info(`Command '${commandName} was called ...`);
            const cmd = this.commands.get(commandName);
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

    private registerCommandAlias(commandName: string, alias: string): void {
        logger.info(`registering alias '${alias}' for command '${commandName}' ...`);
        this.bot.registerCommandAlias(alias, commandName);
        logger.info(`[DONE] alias '${alias}' registered.`);
    }
}
