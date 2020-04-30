import {FakeSertaUser} from "../../test-doubles/fake-serta-user";
import * as FakeEnvironment from "../../config/fake-environment"
import {StatusReporter} from "../../../../commands/serta-status/status-reporter";
import {UserService} from "../../../../services/user-service";
import {ISertaUser} from "../../../../model/i-serta-user";

describe("SertaStatusReporter", () => {
    let fakeUserService: FakeUserService
    let sut: StatusReporter

    beforeEach(() => {
        FakeEnvironment.setup()

        fakeUserService = new FakeUserService()
        sut = new StatusReporter(fakeUserService)
    })

    afterEach(() => {
        FakeEnvironment.tearDown()
    })

    test("construction with UserService should return a valid object", () => {
        expect(sut).toBeTruthy()
    })

    test("getStatus with a valid user shall return a valid StatusInformation", async () => {
        // given
        const validDiscordUserName = "p.bauer";

        // when
        const statusInformation = await sut.getStatus(validDiscordUserName)

        // then
        expect(statusInformation).toBeTruthy()

    })

    test("getStatus with a valid user shall return a status information according to the information given from the user service", async () => {
        // given
        const validDiscordUserName = "p.bauer"
        const expectedUserEntry = await fakeUserService.getByDiscordUserName(validDiscordUserName)

        // when
        const statusInformation = await sut.getStatus(validDiscordUserName)

        // then
        expect(statusInformation.levelId).toBe(expectedUserEntry.levelId)
        expect(statusInformation.immunizationLevel).toBe(expectedUserEntry.immuneLevel)
        expect(statusInformation.name).toBe(expectedUserEntry.discordUserName)
        expect(statusInformation.avatar_url).toBe(expectedUserEntry.avatarUrl)
    })

    test("getStatus with another valid user shall return a status information according to the information given from the user service", async () => {
        // given
        const validDiscordUserName = "jfuerlinger"
        const expectedUserEntry = await fakeUserService.getByDiscordUserName(validDiscordUserName)

        // when
        const statusInformation = await sut.getStatus(validDiscordUserName)

        // then
        expect(statusInformation.levelId).toBe(expectedUserEntry.levelId)
        expect(statusInformation.immunizationLevel).toBe(expectedUserEntry.immuneLevel)
        expect(statusInformation.name).toBe(expectedUserEntry.discordUserName)
        expect(statusInformation.avatar_url).toBe(expectedUserEntry.avatarUrl)
    })

    test("getStatus with a valid user being infected returns a correct time till medication", async () => {
        // given

        // when
        const statusInformation = await sut.getStatus("p.bauer")

        // then
        expect(statusInformation.timeTillNextMedication).toContain("20h 37m 4") // seconds depend on latency in calculation
    })

    test("getStatus with a valid user not being infected returns an undefined timeTillNextMedication", async () => {
        // given

        // when
        const statusInformation = await sut.getStatus("jfuerlinger")

        // then
        expect(statusInformation.timeTillNextMedication).toBeFalsy()
    })

    test("getStatus with a valid user not being infected returns a correct ready to be promoted", async () => {
        // given

        // when
        const statusInformation = await sut.getStatus("jfuerlinger")

        // then
        expect(statusInformation.readyToBePromoted).toBe(true)
    })

    test("getStatus with a valid user but infected must not be promoted", async () => {
        // given

        // when
        const statusInformation = await sut.getStatus("p.bauer")

        // then
        expect(statusInformation.readyToBePromoted).toBe(false)
    })

    test("getStatus with a valid user returns a correct level name", async () => {
        // given

        // when
        const statusInformation = await sut.getStatus("jfuerlinger")

        // then
        expect(statusInformation.levelName).toBe("Methods")
    })

    test("getStatus with a valid user returns a message of the day", async () => {
        // given

        // when
        const statusInformation = await sut.getStatus("jfuerlinger")

        // then
        expect(statusInformation.messageOfTheDay).toBeTruthy()
    })

    test("getStatus with a bot shall return no status", async () => {
        // given

        // when
        const statusInformation = await sut.getStatus("Serta")

        // then
        expect(statusInformation).toBeFalsy()
    })

    test("getStatus with an invalid user should return no status", async () => {
        const statusInformation = await sut.getStatus("A.NonExisting.User")
        expect(statusInformation).toBeFalsy()
    })
})

class FakeUserService implements UserService {
    getAll(): Promise<ISertaUser[]> {
        return new Promise<ISertaUser[]>(() => {
        });
    }

    getByDiscordUserId(discordUserId: string): Promise<ISertaUser> {
        return new Promise<ISertaUser>(() => {
        });
    }

    getByDiscordUserName(discordUserName: string): Promise<ISertaUser> {
        return new Promise<ISertaUser>(async resolve => {
            switch (discordUserName) {
                case "p.bauer":
                    const now = Date.now()
                    const lastInfection = now - (3 * 60 * 60 + 22 * 60 + 12) * 1000
                    resolve(new FakeSertaUser("some.discord.id", "p.bauer", "http://avatarUrl/pb.png", 1, 35, 15, new Date(lastInfection)))
                    break

                case "jfuerlinger":
                    resolve(new FakeSertaUser("another.discord.id", "jfuerlinger", "http://avatarUrl/jf.png", 3, 187, 45))
                    break
                case "Serta":
                    resolve(new FakeSertaUser("bot.discord.id", "Serta", "", 0, 0, 0, undefined, true))
                    break

                default:
                    resolve(undefined)
            }
        })
    }

    put(sertaUser: ISertaUser): Promise<ISertaUser> {
        return Promise.resolve(new FakeSertaUser("", "", "", 0, 0, 0));
    }
}