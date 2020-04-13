import {UserService} from "../../../src/services/user-service";
import {StatusReporter} from "../../../src/commands/serta-status/status-reporter"
import {FakeSertaUser} from "../test-doubles/fake-serta-user";
import {ISertaUser} from "../../../src/model/i-serta-user";
import * as FakeEnvironment from "../config/fake-environment"

describe("SertaStatusReporter", () => {
    let fakeUserService: FakeUserService
    let sut: StatusReporter

    beforeEach(() => {
        fakeUserService = new FakeUserService()
        sut = new StatusReporter(fakeUserService)
    })
    test("construction with UserService should return a valid object", () => {
        expect(sut).toBeTruthy()
    })

    test("getStatus with a valid user shall return a valid StatusInformation", () => {
        // given
        const validDiscordUserName = "p.bauer";

        // when
        const statusInformation = sut.getStatus(validDiscordUserName)

        // then
        expect(statusInformation).toBeTruthy()
    })

    test("getStatus with a valid user shall return a status information according to the information given from the user service", async () => {
        // given
        FakeEnvironment.setup()
        const validDiscordUserName = "p.bauer"
        const expectedUserEntry = await fakeUserService.getByDiscordUserName(validDiscordUserName)

        // when
        const statusInformation = await sut.getStatus(validDiscordUserName)

        // then
        expect(statusInformation.levelId).toBe(expectedUserEntry.levelId)
        expect(statusInformation.immunizationLevel).toBe(expectedUserEntry.immuneLevel)
        expect(statusInformation.name).toBe(expectedUserEntry.discordUserName)
        expect(statusInformation.avatar_url).toBe(expectedUserEntry.avatarUrl)
        FakeEnvironment.tearDown()
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

    test("getStatus with a valid user returns a correct time till medication", async () => {
        // given
        FakeEnvironment.setup()

        // when
        const statusInformation = await sut.getStatus("p.bauer")

        // then
        expect(statusInformation.timeTillNextMedication).toContain("20h 37m 4") // seconds depend on latency in calculation
        FakeEnvironment.tearDown()
    })
    // test("getStatus with a valid user returns a correct ready to be promoted", async () => {
    //     // given
    //     FakeEnvironment.setup()
    //
    //     // when
    //     const statusInformation = await sut.getStatus("jfuerlinger")
    //
    //     // then
    //     expect(statusInformation.readyToBePromoted).toBe(true)
    //
    //     FakeEnvironment.tearDown()
    // })

    // test.skip("getStatus with a valid user returns remaining information", () => {
    // })
    // test.skip("getStatus with a bot shall return no status", () => {
    //
    // })
    //
    // test.skip("getStatus with an invalid user should return no status", () => {
    //
    // })
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
            if (discordUserName === "p.bauer") {
                const now = Date.now()
                const lastInfection = now - (3 * 60 * 60 + 22 * 60 + 12) * 1000
                resolve(new FakeSertaUser("some.discord.id", "p.bauer", "http://avatarUrl/pb.png", 1, 35, 15, new Date(lastInfection)))
            } else {
                resolve(new FakeSertaUser("another.discord.id", "jfuerlinger", "http://avatarUrl/jf.png", 3, 187, 45))
            }
        })
    }
}