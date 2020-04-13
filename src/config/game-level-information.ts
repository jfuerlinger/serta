import * as Game from "./game"

export interface GameLevelImporter {
    import(): LevelInformation[]
}

export interface LevelInformation {
    id: number
    abbreviation: string
    name: string
    minimumImmuneLevel: number
    maximumImmuneLevel: number
    timeSpanForMedication: number
}

export class InMemoryGameLevelImporter implements GameLevelImporter {
    private levels: LevelInformation[]

    constructor(levels?: LevelInformation[]) {
        if (levels) {
            this.levels = levels
        } else {
            this.levels = Game.levels
        }
    }

    import(): LevelInformation[] {
        return this.levels;
    }
}

export class GameLevelInformation {

    private readonly levelInformation: LevelInformation[];

    get topLevel(): LevelInformation {
        return this.levelInformation[this.levelInformation.length - 1]
    }

    get initialLevel(): LevelInformation {
        return this.levelInformation[0]
    }

    constructor(gameLevelImporter: GameLevelImporter) {
        this.levelInformation = gameLevelImporter.import()
    }

    getLevelInformation(levelId: number): LevelInformation {
        const maxIndex = this.levelInformation.length - 1
        const indexToReturn = Math.max(0, Math.min(levelId - 1, maxIndex))
        return this.levelInformation[indexToReturn]
    }

    getNextLevel(levelId: number): LevelInformation {
        return this.getLevelInformation(levelId + 1)
    }

    getPreviousLevel(levelId: number): LevelInformation {
        return this.getLevelInformation(levelId - 1)
    }
}