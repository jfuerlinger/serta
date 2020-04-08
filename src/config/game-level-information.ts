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
}

export class InMemoryGameLevelImporter implements GameLevelImporter {
    levels: LevelInformation[]

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