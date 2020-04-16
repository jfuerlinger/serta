import { SertaConfiguration } from "./serta-configuration";
import { IEnvironmentAccessor } from "./i-environment-accessor";
import { ISettingResolver } from "./i-setting-resolver";

export class EnvironmentAccessor implements IEnvironmentAccessor {

    azureTenantId: string;
    azureClientId: string;
    azureClientSecret: string;

    azureStorageAccount: string
    azureStorageAccessKey: string
    azureStorageBlobStorageConnectionstring: string

    botInstanceName: string
    botPrefix: string
    discordToken: string

    constructor() {

        this.azureTenantId = EnvironmentAccessor.getDotEnvEntry(process.env.AZURE_TENANT_ID);
        this.azureClientId = EnvironmentAccessor.getDotEnvEntry(process.env.AZURE_CLIENT_ID);
        this.azureClientSecret = EnvironmentAccessor.getDotEnvEntry(process.env.AZURE_CLIENT_SECRET);

        this.discordToken = EnvironmentAccessor.getDotEnvEntry(process.env.DISCORD_TOKEN)
        this.botPrefix = EnvironmentAccessor.getDotEnvEntry(process.env.BOT_PREFIX)
        this.botInstanceName = EnvironmentAccessor.getDotEnvEntry(process.env.BOT_INSTANCE_NAME)

        this.azureStorageAccount = EnvironmentAccessor.getDotEnvEntry(process.env.AZURE_STORAGE_ACCOUNT)
        this.azureStorageAccessKey = EnvironmentAccessor.getDotEnvEntry(process.env.AZURE_STORAGE_ACCESS_KEY)
        this.azureStorageBlobStorageConnectionstring = EnvironmentAccessor.getDotEnvEntry(process.env.AZURE_BLOBSTORAGE_CONNECTIONSTRING)
    }

    private static getDotEnvEntry(dotEnvEntry?: string): string {
        if (dotEnvEntry === undefined) {
            throw new Error("Environment is not set properly. Are you missing a .env file or call to read it?")
        }
        return dotEnvEntry;
    }
}

export class ConfigurationBuilder {

    static SettingResolver: ISettingResolver;
    
    private static activeConfiguration: SertaConfiguration

    private constructor() { }

    static async getConfiguration(): Promise<SertaConfiguration> {
        if (this.activeConfiguration == undefined) {

            if (!this.SettingResolver) {
                throw new Error('The ConfigurationBuilder has no SettingResolver set!');
            }

            const config = new SertaConfiguration();

            config.commandClient.discordToken = await this.SettingResolver.getSetting('discord-token');
            config.commandClient.botPrefix = await this.SettingResolver.getSetting('bot-prefix');
            config.commandClient.botInstanceName = await this.SettingResolver.getSetting('bot-instance-name');

            config.azureStorage.account = await this.SettingResolver.getSetting('as-account');
            config.azureStorage.accessKey = await this.SettingResolver.getSetting('as-access-key');

            this.activeConfiguration = config;
        }
        return this.activeConfiguration
    }
}