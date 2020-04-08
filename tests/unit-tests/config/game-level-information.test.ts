import {InMemoryGameLevelImporter} from "../../../src/config/game-level-information";
import * as Game from "../../../src/config/game"

describe("InMemoryGameLevelImporter", () => {
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
})