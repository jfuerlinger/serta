import {SertaConfiguration} from "./serta-configuration";
import {IEnvironmentAccessor} from "./i-environment-accessor";

export class EnvironmentAccessor implements IEnvironmentAccessor {
    azureStorageAccount: string
    azureStorageAccessKey: string
    azureStorageBlobStorageConnectionstring: string

    botInstanceName: string
    botPrefix: string
    discordToken: string

    constructor() {
        this.discordToken = EnvironmentAccessor.getDotEnvEntry(process.env.DISCORD_TOKEN)
        this.botPrefix = EnvironmentAccessor.getDotEnvEntry(process.env.BOT_PREFIX)
        this.botInstanceName = EnvironmentAccessor.getDotEnvEntry(process.env.BOT_INSTANCE_NAME)

        this.azureStorageAccount = EnvironmentAccessor.getDotEnvEntry(process.env.AZURE_STORAGE_ACCOUNT)
        this.azureStorageAccessKey = EnvironmentAccessor.getDotEnvEntry(process.env.AZURE_STORAGE_ACCESS_KEY)
        this.azureStorageBlobStorageConnectionstring = EnvironmentAccessor.getDotEnvEntry(process.env.AZURE_BLOBSTORAGE_CONNECTIONSTRING)
    }

    private static getDotEnvEntry(dotEnvEntry?:string): string {
        if (dotEnvEntry === undefined) {
            throw new Error("Environment is not set properly. Are you missing a .env file or call to read it?")
        }
        return dotEnvEntry;
    }
}

export class ConfigurationBuilder {

    static activeConfiguration: SertaConfiguration

    static getConfiguration(): SertaConfiguration {
        if (this.activeConfiguration == undefined) {
            this.activeConfiguration = new SertaConfiguration(new EnvironmentAccessor())
        }
        return this.activeConfiguration
    }
}