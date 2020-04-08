import {
    InMemoryGameLevelImporter,
    LevelInformation
} from "../../../src/config/game-level-information";
import * as Game from "../../../src/config/game"

describe("InMemoryGameLevelImporter", () => {

    const fakeGameLevels: LevelInformation[] = [
        { id: 1, abbreviation: "S", name: "A", minimumImmuneLevel: 0, maximumImmuneLevel: 1 },
        { id: 2, abbreviation: "A", name: "Be", minimumImmuneLevel: 2, maximumImmuneLevel: 3 },
        { id: 3, abbreviation: "M", name: "Ceh", minimumImmuneLevel: 4, maximumImmuneLevel: 5 }
    ]

    test("when created without parameters the default game levels are imported", () => {
        const importer = new InMemoryGameLevelImporter()

        const anyExpectedGameLevelEntry = Game.levels[2]
        const actualGameLevelEntry = importer.import()[2]

        expect(actualGameLevelEntry).toBe(anyExpectedGameLevelEntry)
    })

    test("when created without parameters the level information must be correct", () => {
        const importer = new InMemoryGameLevelImporter()

        const anyExpectedGameLevelEntryName = Game.levels[2].name
        const actualGameLevelEntryName = importer.import()[2].name

        expect(actualGameLevelEntryName).toBe(anyExpectedGameLevelEntryName)
    })

    test("when created with parameter the level information passed is used", () => {
        const importer = new InMemoryGameLevelImporter(fakeGameLevels)

        const anyExpectedGameLevelMin = fakeGameLevels[1].minimumImmuneLevel
        const anyActualGameLevelMin = importer.import()[1].minimumImmuneLevel

        expect(anyActualGameLevelMin).toBe(anyExpectedGameLevelMin)
    })
})