import {IEnvironmentAccessor} from "./i-environment-accessor";
import {InMemoryMessageOfTheDayImporter, MessageOfTheDayProvider} from "./message-of-the-day-provider";
import {GameLevelInformation, InMemoryGameLevelImporter} from "./game-level-information";

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

    private readonly _messageOfTheDayProvider: MessageOfTheDayProvider
    get messageOfTheDayProvider(): MessageOfTheDayProvider {
        return this._messageOfTheDayProvider
    }

    private readonly _gameLevelInformation: GameLevelInformation;
    get gameLevelInformation() { return this._gameLevelInformation }

    constructor(environmentFileAccessor: IEnvironmentAccessor) {
        this.commandClient.discordToken = environmentFileAccessor.discordToken
        this.commandClient.botPrefix = environmentFileAccessor.botPrefix
        this.commandClient.botPrefix = environmentFileAccessor.botPrefix
        this.commandClient.botInstanceName = environmentFileAccessor.botInstanceName

        this.azureStorage.account = environmentFileAccessor.azureStorageAccount
        this.azureStorage.accessKey = environmentFileAccessor.azureStorageAccessKey

        this._messageOfTheDayProvider = new MessageOfTheDayProvider(new InMemoryMessageOfTheDayImporter())
        this._gameLevelInformation = new GameLevelInformation(new InMemoryGameLevelImporter())
    }
}

