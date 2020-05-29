import {SertaUser} from "../../../model/serta-user";
import {FakeDiscordUser, fakeDiscordUsers} from "../test-doubles/fake-discord-users";
import {DbUserEntry} from "../../../model/db-user-entry";

describe("SertaUser", () => {
    let someDiscordUser: FakeDiscordUser
    let someLevelId: number
    let someImmuneLevel: number
    let someXps: number
    let fakeDbUserEntry: DbUserEntry
    let sut: SertaUser

    beforeEach(() => {
        someDiscordUser = fakeDiscordUsers[0]
        someLevelId = 1;
        someImmuneLevel = 10;
        someXps = 50;
        fakeDbUserEntry = new DbUserEntry(someDiscordUser.id, someLevelId, someImmuneLevel, someXps)
        sut = new SertaUser(someDiscordUser, fakeDbUserEntry)
    })

    test("it leverages discordUser to get discordUserId, discordUserName, isBot and avatarUrl", () => {
        // assert
        expect(sut.discordUserId).toBe(someDiscordUser.id)
        expect(sut.discordUserName).toBe(someDiscordUser.username)
        expect(sut.isBot).toBe(someDiscordUser.bot)
        expect(sut.avatarUrl).toBe(someDiscordUser.avatarURL)
    })

    test("it returns the dbUserEntry with all properties unchanged", () => {
        // act
        const dbUserEntry = sut.dbUserEntry

        // assert
        expect(dbUserEntry.id).toBe(fakeDbUserEntry.id)
        expect(dbUserEntry.levelId).toBe(fakeDbUserEntry.levelId)
        expect(dbUserEntry.immuneLevel).toBe(fakeDbUserEntry.immuneLevel)
        expect(dbUserEntry.experiencePoints).toBe(fakeDbUserEntry.experiencePoints)
    })

    test("it makes a clone of dbUserEntry before returning it", () => {
        // act
        const dbUserEntry = sut.dbUserEntry

        // assert
        expect(dbUserEntry).not.toBe(fakeDbUserEntry)
    })

    test("it leverages dbUserEntry to get levelId, immuneLevel, an approvedXps", () => {
        expect(sut.levelId).toBe(fakeDbUserEntry.levelId)
        expect(sut.immuneLevel).toBe(fakeDbUserEntry.immuneLevel)
        expect(sut.approvedExperiencePoints).toBe(fakeDbUserEntry.experiencePoints)
    })

    test("it allows to change level", () => {
        // arrange
        const oldLevelId = fakeDbUserEntry.levelId
        // act
        sut.levelId++

        // assert
        expect(sut.levelId).toBe(oldLevelId + 1)
    })
})