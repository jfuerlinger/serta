import {IEnvironmentFileAccessor} from "./i-environment-file-accessor";

export class SertaConfiguration {
    commandClientConfiguration = {
        discordToken: "",
        botPrefix: "",
        botInstanceName: ""
    }

    constructor(environmentFileAccessor: IEnvironmentFileAccessor) {
        this.commandClientConfiguration.discordToken = environmentFileAccessor.discordToken
        this.commandClientConfiguration.botPrefix = environmentFileAccessor.botPrefix
        this.commandClientConfiguration.botPrefix = environmentFileAccessor.botPrefix
        this.commandClientConfiguration.botInstanceName = environmentFileAccessor.botInstanceName
    }
}