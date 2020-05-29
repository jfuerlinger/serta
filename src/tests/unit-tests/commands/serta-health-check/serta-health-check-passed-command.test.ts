import {SertaHealthCheckPassedCommand} from "../../../../commands/serta-health-check/serta-health-check-passed.command";
import {FakeCommandClient} from "../../test-doubles/fake-command-client";
import {fakeDiscordUsers} from "../../test-doubles/fake-discord-users";
import {ISettingResolver} from "../../../../config/i-setting-resolver";
import {fakeGameLevels} from "../../test-doubles/fake-game-levels";
import {LevelInformation} from "../../../../config/game-level-information";
import {IUserLevelChanger} from "../../../../commands/serta-health-check/i-user-level-changer";
import {ISertaUser} from "../../../../model/i-serta-user";
import {FakeMessage} from "../../test-doubles/fake-message";

//import {Message} from "../../../../../node_modules/eris/lib/structures/Message"

describe("SertaHealthCheckPassedCommand", () => {
    let fakeSettingsResolver: FakeSettingsResolver
    let fakeCommandClient: FakeCommandClient
    let fakeUserLevelChanger: FakeUserLevelChanger
    let sut: SertaHealthCheckPassedCommand

    beforeEach(() => {
        fakeSettingsResolver = new FakeSettingsResolver()
        fakeCommandClient = new FakeCommandClient(fakeDiscordUsers)
        fakeUserLevelChanger = new FakeUserLevelChanger(fakeGameLevels)
        sut = new SertaHealthCheckPassedCommand(
            fakeSettingsResolver,
            fakeCommandClient,
            fakeUserLevelChanger,
            "serta-health-check-passed")
    })

    test.skip("it up-levels a player with a sufficient immune system", () => {
        // arrange
        const mentions = [fakeDiscordUsers[0]]
        // const message = new FakeMessage(mentions)
        jest.mock("../../test-doubles/fake-command-message")
        const mockFoobar = jest.fn()
        mockFoobar.mockReturnValue("mockFoobar")
        //FakeMessage.prototype.foobar = mockFoobar
        new FakeMessage(mentions);
//expect(fakeMsg.foobar()).toBe("mockFoobar")
        // act
        //sut.onCommandCalled(message, {})

        // assert
        //expect(fakeUserLevelChanger.upLevelIsCalled).toBe(true)
    })

    test.skip("fake the constructor", () => {
        // jest.genMockFromModule("../../test-doubles/fake-command-message")
        // jest.mock("../../test-doubles/fake-command-message")

        // mockedFakeCommandMessage.mockImplementation(() => fakeFakeMessage)

        //expect(fakeMsg.foobar()).toBe("mockFoobar")
    })

    // test.skip("it does not uplevel a player with an insufficient immune system", () => {
    //     // arrange
    //     const mentions = [fakeDiscordUsers[0]]
    //     const message = new FakeMessage(mentions)
    //
    //     // act
    //     sut.onCommandCalled(message, {})
    //
    //     // assert
    //     expect(fakeUserLevelChanger.upLevelIsCalled).toBe(false)
    // })
})

class FakeSettingsResolver implements ISettingResolver {
    getSetting(name: string): Promise<string> {
        return Promise.resolve("");
    }
}

class FakeUserLevelChanger implements IUserLevelChanger {
    upLevelIsCalled: boolean = true

    constructor(private gameLevels: LevelInformation[]) {
    }

    downLevel(user: ISertaUser): void {
    }

    downLevelIsPossible(user: ISertaUser): boolean {
        return false;
    }

    upLevel(user: ISertaUser): void {
    }

    upLevelIsPossible(user: ISertaUser): boolean {
        return false;
    }
}