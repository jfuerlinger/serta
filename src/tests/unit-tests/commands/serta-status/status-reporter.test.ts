import * as FakeEnvironment from "../../config/fake-environment"
import {StatusReporter} from "../../../../commands/serta-status/status-reporter";
import {ConfigurationBuilder} from "../../../../config/configuration-builder";
import {SettingResolver} from "../../../../config/setting-resolver";
import {FakeEnvironmentDao} from "../../config/fake-environment-dao";
import {FakeAppConfigurationDao} from "../../dao/app-configuration/fake-app-configuration-dao";
import {FakeUserService} from "../../test-doubles/fake-user-service";

describe("SertaStatusReporter", () => {
    let fakeUserService: FakeUserService
    let sut: StatusReporter

    beforeAll(() => {
        ConfigurationBuilder.SettingResolver = new SettingResolver(new FakeEnvironmentDao(), new FakeAppConfigurationDao());
    });

    beforeEach(() => {
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
