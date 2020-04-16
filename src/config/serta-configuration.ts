import { InMemoryMessageOfTheDayImporter, MessageOfTheDayProvider } from "./message-of-the-day-provider";
import { GameLevelInformation, InMemoryGameLevelImporter } from "./game-level-information";

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
    get messageOfTheDayProvider(): MessageOfTheDayProvider { return this._messageOfTheDayProvider }

    private readonly _gameLevelInformation: GameLevelInformation;
    get gameLevelInformation() { return this._gameLevelInformation }

    get baseUrlForImages() { return "https://sertadev.blob.core.windows.net/level-images" }

    constructor(
    ) {
        this._messageOfTheDayProvider = new MessageOfTheDayProvider(new InMemoryMessageOfTheDayImporter())
        this._gameLevelInformation = new GameLevelInformation(new InMemoryGameLevelImporter())
    }
}

