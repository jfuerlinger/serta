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
        this.discordToken = DotEnvEnvironmentFileAccessor.getDoteEnvEntry(process.env.DISCORD_TOKEN)
        this.botPrefix = DotEnvEnvironmentFileAccessor.getDoteEnvEntry(process.env.BOT_PREFIX)
        this.botInstanceName = DotEnvEnvironmentFileAccessor.getDoteEnvEntry(process.env.BOT_INSTANCE_NAME)

        this.azureStorageAccount = DotEnvEnvironmentFileAccessor.getDoteEnvEntry(process.env.AZURE_STORAGE_ACCOUNT)
        this.azureStorageAccessKey = DotEnvEnvironmentFileAccessor.getDoteEnvEntry(process.env.AZURE_STORAGE_ACCESS_KEY)
        this.azureStorageBlobStorageConnectionstring = DotEnvEnvironmentFileAccessor.getDoteEnvEntry(process.env.AZURE_BLOBSTORAGE_CONNECTIONSTRING)
    }

    private static getDoteEnvEntry(dotEnvEntry?:string): string {
        return dotEnvEntry === undefined ? "" : dotEnvEntry;
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