import {IUserService} from "../../../services/i-user-service";
import {ISertaUser} from "../../../model/i-serta-user";
import {FakeSertaUser, fakeSertaUsers} from "./fake-serta-user";

export class FakeUserService implements IUserService {
    fakeUsers: FakeSertaUser[]

    constructor() {
        this.fakeUsers = fakeSertaUsers
    }

    update(user: ISertaUser): Promise<void> {
        return new Promise<void>(() => {
        });
    }

    addOrMerge(user: ISertaUser): Promise<void> {
        return new Promise<void>(() => {
        });
    }

    save(user: ISertaUser): Promise<void> {
        return new Promise<void>(() => {
        });
    }

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
            const foundUser = this.fakeUsers.filter(u => u.discordUserName === discordUserName)
            if (foundUser.length > 0) {
                resolve(foundUser[0])
            } else {
                resolve(undefined)
            }
        })
    }
}