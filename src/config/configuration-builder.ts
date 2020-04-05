import {SertaConfiguration} from "./serta-configuration";
import {IEnvironmentFileAccessor} from "./i-environment-file-accessor";

require('dotenv').config();

export class EnvironmentFileAccessor implements IEnvironmentFileAccessor {
    azureStorageAccount: string;
    botInstanceName: string;
    botPrefix: string;
    discordToken: string;

    constructor() {
        this.discordToken = ""
        this.botPrefix = process.env.BOT_PREFIX === undefined ? "" : process.env.BOT_PREFIX
        this.botInstanceName = ""

        this.azureStorageAccount = ""
    }
}

export class ConfigurationBuilder {

    static activeConfiguration: SertaConfiguration

    static getConfiguration(environmentFileAccessor?: IEnvironmentFileAccessor): SertaConfiguration {
        if (this.activeConfiguration == undefined) {
            this.activeConfiguration = environmentFileAccessor == undefined ?
                new SertaConfiguration(new EnvironmentFileAccessor()) :
                new SertaConfiguration(environmentFileAccessor)
        }
        return this.activeConfiguration
    }
}