import {IEnvironmentAccessor} from "./i-environment-accessor";

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

    levels: LevelInformation[] = [
        {id: 1, abbreviation: "S", name: "Loops", minimumImmuneLevel: 0, maximumImmuneLevel: 15},
        {id: 2, abbreviation: "A", name: "Arrays", minimumImmuneLevel: 16, maximumImmuneLevel: 30},
        {id: 3, abbreviation: "M", name: "Methods", minimumImmuneLevel: 31, maximumImmuneLevel: 45},
        {id: 4, abbreviation: "S", name: "Loops", minimumImmuneLevel: 46, maximumImmuneLevel: 60},
        {id: 5, abbreviation: "S", name: "Loops", minimumImmuneLevel: 61, maximumImmuneLevel: 75},
        {id: 6, abbreviation: "S", name: "Loops", minimumImmuneLevel: 76, maximumImmuneLevel: 100},
    ]

    get initialLevel(): LevelInformation {
        return this.levels[0]
    }

    get topLevel(): LevelInformation {
        return this.levels[this.levels.length - 1]
    }

    constructor(environmentFileAccessor: IEnvironmentAccessor) {
        this.commandClient.discordToken = environmentFileAccessor.discordToken
        this.commandClient.botPrefix = environmentFileAccessor.botPrefix
        this.commandClient.botPrefix = environmentFileAccessor.botPrefix
        this.commandClient.botInstanceName = environmentFileAccessor.botInstanceName

        this.azureStorage.account = environmentFileAccessor.azureStorageAccount
        this.azureStorage.accessKey = environmentFileAccessor.azureStorageAccessKey
    }

    getLevelInformation(levelId: number): LevelInformation {
        const maxIndex = this.levels.length - 1
        const indexOfLevelToReturn = Math.max(0, Math.min(maxIndex, (levelId - 1)))
        return this.levels[indexOfLevelToReturn]
    }

    getNextLevel(fromLevelId: number): LevelInformation {
        return this.getLevelInformation(fromLevelId + 1)
    }

    getPreviousLevel(fromLevelId: number): LevelInformation {
        return this.getLevelInformation((fromLevelId - 1))
    }
}

interface LevelInformation {
    id: number
    abbreviation: string
    name: string
    minimumImmuneLevel: number
    maximumImmuneLevel: number
}