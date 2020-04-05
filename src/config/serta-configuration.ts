import {IEnvironmentFileAccessor} from "./i-environment-file-accessor";

export class SertaConfiguration {
    commandClient = {
        discordToken: "",
        botPrefix: "",
        botInstanceName: ""
    }

    constructor(environmentFileAccessor: IEnvironmentFileAccessor) {
        this.commandClient.discordToken = environmentFileAccessor.discordToken
        this.commandClient.botPrefix = environmentFileAccessor.botPrefix
        this.commandClient.botPrefix = environmentFileAccessor.botPrefix
        this.commandClient.botInstanceName = environmentFileAccessor.botInstanceName
    }
}