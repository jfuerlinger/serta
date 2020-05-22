import {SertaHealthCheckPassedCommand} from "../../../../commands/serta-health-check/serta-health-check-passed.command";
import {FakeCommandClient} from "../../test-doubles/fake-command-client";
import {fakeDiscordUsers} from "../../test-doubles/fake-discord-users";
import {ISettingResolver} from "../../../../config/i-setting-resolver";
import {Message, User} from "eris";
import {fakeGameLevels} from "../../test-doubles/fake-game-levels";
import {LevelInformation} from "../../../../config/game-level-information";
import {IUserLevelChanger} from "../../../../commands/serta-health-check/i-user-level-changer";
import {ISertaUser} from "../../../../model/i-serta-user";
import {FakeCommandMessage} from "../../test-doubles/fake-command-message";
import mock = jest.mock;
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

    test("it up-levels a player with a sufficient immune system", () => {
        // arrange
        const mentions = [fakeDiscordUsers[0]]
        // const message = new FakeCommandMessage(mentions)
        jest.mock("../../test-doubles/fake-command-message")
        const mockFoobar = jest.fn()
        mockFoobar.mockReturnValue("mockFoobar")
        FakeCommandMessage.prototype.foobar = mockFoobar

        const fakeMsg = new FakeCommandMessage(mentions)
        expect(fakeMsg.foobar()).toBe("mockFoobar")
        // act
        //sut.onCommandCalled(message, {})

        // assert
        //expect(fakeUserLevelChanger.upLevelIsCalled).toBe(true)
    })

    test("fake the constructor", () => {
        // jest.genMockFromModule("../../test-doubles/fake-command-message")
        // jest.mock("../../test-doubles/fake-command-message")

        const mentions = [fakeDiscordUsers[0]]
        const fakeFakeMessage = {
            foo: "FakeFoo"
        }
        const mockedFakeCommandMessage = jest.setMock("../../test-doubles/fake-command-message",
            () => {
                return {foo: "", foobar: () => "sadlfkj", mentions: []}
            })
        // mockedFakeCommandMessage.mockImplementation(() => fakeFakeMessage)

        const fakeMsg = new FakeCommandMessage(mentions)
        expect(fakeMsg.foobar()).toBe("mockFoobar")
    })

    // test.skip("it does not uplevel a player with an insufficient immune system", () => {
    //     // arrange
    //     const mentions = [fakeDiscordUsers[0]]
    //     const message = new FakeCommandMessage(mentions)
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

    constructor(gameLevels: LevelInformation[]) {
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