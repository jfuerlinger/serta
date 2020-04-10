import {UserService} from "../../../src/services/user-service";
import {StatusReporter} from "../../../src/commands/serta-status/status-reporter"
import {SertaUser} from "../../../src/model/serta-user";

describe("SertaStatusReporter", () => {
    test("construction with UserService should return a valid object", () => {
        // given
        const fakeUserService = new FakeUserService()

        // when
        const sut = new StatusReporter(fakeUserService)

        // then
        expect(sut).toBeTruthy()
    })
})

class FakeUserService implements UserService {
    getAll(): Promise<SertaUser[]> {
        return new Promise<SertaUser[]>(() => {});
    }

    getByDiscordUserId(discordUserId: string): Promise<SertaUser> {
        return new Promise<SertaUser>(() => {});
    }

    getByDiscordUserName(discordUserName: string): Promise<SertaUser> {
        return new Promise<SertaUser>(() => {});
    }

}