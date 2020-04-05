import {SertaConfiguration} from "./serta-configuration";
import {IEnvironmentFileAccessor} from "./i-environment-file-accessor";

require('dotenv').config();

export class DotEnvEnvironmentFileAccessor implements IEnvironmentFileAccessor {
    azureStorageAccount: string
    azureStorageAccessKey: string

    botInstanceName: string
    botPrefix: string
    discordToken: string

    constructor() {
        this.discordToken = process.env.DISCORD_TOKEN === undefined ? "" : process.env.DISCORD_TOKEN
        this.botPrefix = process.env.BOT_PREFIX === undefined ? "" : process.env.BOT_PREFIX
        this.botInstanceName = process.env.BOT_INSTANCE_NAME === undefined ? "" : process.env.BOT_INSTANCE_NAME

        this.azureStorageAccount = ""
        this.azureStorageAccessKey = ""
    }

}

export class ConfigurationBuilder {

    static activeConfiguration: SertaConfiguration

    static getConfiguration(): SertaConfiguration {
        if (this.activeConfiguration == undefined) {
            this.activeConfiguration = new SertaConfiguration(new DotEnvEnvironmentFileAccessor())
        }
        return this.activeConfiguration
    }
}