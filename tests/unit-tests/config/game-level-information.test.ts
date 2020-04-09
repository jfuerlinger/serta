import {
    GameLevelInformation,
    InMemoryGameLevelImporter,
    LevelInformation
} from "../../../src/config/game-level-information";
import * as Game from "../../../src/config/game"

const fakeGameLevels: LevelInformation[] = [
    { id: 1, abbreviation: "S", name: "A", minimumImmuneLevel: 0, maximumImmuneLevel: 1 },
    { id: 2, abbreviation: "A", name: "Be", minimumImmuneLevel: 2, maximumImmuneLevel: 3 },
    { id: 3, abbreviation: "M", name: "Ceh", minimumImmuneLevel: 4, maximumImmuneLevel: 5 }
]

describe("InMemoryGameLevelImporter", () => {

    test("when created without parameters the default game levels are imported", () => {
        const importer = new InMemoryGameLevelImporter()

        const anyExpectedGameLevelEntry = Game.levels[2]
        const actualGameLevelEntry = importer.import()[2]

        expect(actualGameLevelEntry).toBe(anyExpectedGameLevelEntry)
    })

    test("when created without parameters the levelName information must be correct", () => {
        const importer = new InMemoryGameLevelImporter()

        const anyExpectedGameLevelEntryName = Game.levels[2].name
        const actualGameLevelEntryName = importer.import()[2].name

        expect(actualGameLevelEntryName).toBe(anyExpectedGameLevelEntryName)
    })

    test("when created with parameter the levelName information passed is used", () => {
        const importer = new InMemoryGameLevelImporter(fakeGameLevels)

        const anyExpectedGameLevelMin = fakeGameLevels[1].minimumImmuneLevel
        const anyActualGameLevelMin = importer.import()[1].minimumImmuneLevel

        expect(anyActualGameLevelMin).toBe(anyExpectedGameLevelMin)
    })
})

describe("GameLevelInformation", () => {
    let gameLevelInformation: GameLevelInformation

    beforeEach(() => {
        gameLevelInformation = new GameLevelInformation(new InMemoryGameLevelImporter(fakeGameLevels))
    })

    test("provides initial levelName information", () => {
        expect(gameLevelInformation.initialLevel).toBeTruthy()
        expect(gameLevelInformation.initialLevel.abbreviation).toBe("S")
    })

    test("provides top levelName information", () => {
        expect(gameLevelInformation.topLevel.id).toBe(fakeGameLevels[fakeGameLevels.length - 1].id)
    })

    test("provides initial levelName information as information for levelName 1", () => {
        expect(gameLevelInformation.getLevelInformation(1).id).toBe(gameLevelInformation.initialLevel.id)
        expect(gameLevelInformation.getLevelInformation(1).abbreviation).toBe(gameLevelInformation.initialLevel.abbreviation)
    })

    test("provides levelName information for other levelName", () => {
        const anyLevel = 2
        expect(gameLevelInformation.getLevelInformation(anyLevel).id).toBe(anyLevel)
    })

    test("provides top levelName information if levelName is too high", () => {
        expect(gameLevelInformation.getLevelInformation(7).id).toBe(gameLevelInformation.topLevel.id)
    })

    test("provides initial levelName information of levelName is too low", () =>{
        expect(gameLevelInformation.getLevelInformation(0).id).toBe(gameLevelInformation.initialLevel.id)
    })

    test("provides next levelName", () => {
        expect(gameLevelInformation.getNextLevel(1)).toBe(gameLevelInformation.getLevelInformation(2))
    })

    test("getNextLevel prevents overflow", () => {
        const topLevelId = gameLevelInformation.topLevel.id
        expect(gameLevelInformation.getNextLevel(topLevelId)).toBe(gameLevelInformation.getLevelInformation(topLevelId))
    })
    test("provides previous levelName", () => {
        const anyLevel = 3
        expect(gameLevelInformation.getPreviousLevel(anyLevel)).toBe(gameLevelInformation.getLevelInformation(anyLevel - 1))
    })
})