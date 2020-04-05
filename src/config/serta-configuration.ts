import {IEnvironmentFileAccessor} from "./i-environment-file-accessor";

export class SertaConfiguration {
    commandClient = {
        discordToken: "",
        botPrefix: "",
        botInstanceName: ""
    }

    azureStorage = {
        account: "",
        accessKey: ""
    }

    constructor(environmentFileAccessor: IEnvironmentFileAccessor) {
        this.commandClient.discordToken = environmentFileAccessor.discordToken
        this.commandClient.botPrefix = environmentFileAccessor.botPrefix
        this.commandClient.botPrefix = environmentFileAccessor.botPrefix
        this.commandClient.botInstanceName = environmentFileAccessor.botInstanceName

        this.azureStorage.account = environmentFileAccessor.azureStorageAccount
        this.azureStorage.accessKey = environmentFileAccessor.azureStorageAccessKey
    }
}