import {SertaConfiguration} from "./serta-configuration";
import {IEnvironmentFileAccessor} from "./i-environment-file-accessor";

export class DotEnvEnvironmentFileAccessor implements IEnvironmentFileAccessor {
    azureStorageAccount: string
    azureStorageAccessKey: string
    azureStorageBlobStorageConnectionstring: string

    botInstanceName: string
    botPrefix: string
    discordToken: string

    constructor() {
        this.discordToken = process.env.DISCORD_TOKEN === undefined ? "" : process.env.DISCORD_TOKEN
        this.botPrefix = process.env.BOT_PREFIX === undefined ? "" : process.env.BOT_PREFIX
        this.botInstanceName = process.env.BOT_INSTANCE_NAME === undefined ? "" : process.env.BOT_INSTANCE_NAME

        this.azureStorageAccount = process.env.AZURE_STORAGE_ACCOUNT === undefined ? "" : process.env.AZURE_STORAGE_ACCOUNT
        this.azureStorageAccessKey = process.env.AZURE_STORAGE_ACCESS_KEY === undefined ? "" : process.env.AZURE_STORAGE_ACCESS_KEY
        this.azureStorageBlobStorageConnectionstring = process.env.AZURE_BLOBSTORAGE_CONNECTIONSTRING === undefined ? "" : process.env.AZURE_BLOBSTORAGE_CONNECTIONSTRING
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