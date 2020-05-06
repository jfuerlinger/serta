import {SertaHealthCheckPassedCommand} from "../../../../commands/serta-health-check/serta-health-check-passed.command";
import {FakeCommandClient} from "../../test-doubles/fake-command-client";
import {fakeDiscordUsers} from "../../test-doubles/fake-discord-users";
import {ISettingResolver} from "../../../../config/i-setting-resolver";
import {Message, User} from "eris";
import {fakeGameLevels} from "../../test-doubles/fake-game-levels";
import {LevelInformation} from "../../../../config/game-level-information";
import {IUserLevelChanger} from "../../../../commands/serta-health-check/i-user-level-changer";
import {ISertaUser} from "../../../../model/i-serta-user";

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
        const message = new FakeCommandMessage(mentions)

        // act
        sut.onCommandCalled(message, {})

        // assert
        expect(fakeUserLevelChanger.upLevelIsCalled).toBe(true)
    })

    test.skip("it does not uplevel a player with an insufficient immune system", () => {
        // arrange
        const mentions = [fakeDiscordUsers[0]]
        const message = new FakeCommandMessage(mentions)

        // act
        sut.onCommandCalled(message, {})

        // assert
        expect(fakeUserLevelChanger.upLevelIsCalled).toBe(false)
    })
})

class FakeSettingsResolver implements ISettingResolver {
    getSetting(name: string): Promise<string> {
        return Promise.resolve("");
    }
}

class FakeCommandMessage extends Message {
    constructor(mentions: User[]) {
        super({id: "df"}, new FakeCommandClient())
        this.mentions = mentions
    }

    mentions: User[];
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