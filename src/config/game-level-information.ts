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
    import(): LevelInformation[] {
        return Game.levels;
    }

}