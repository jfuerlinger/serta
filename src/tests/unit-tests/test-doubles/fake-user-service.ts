import {IUserService} from "../../../services/i-user-service";
import {ISertaUser} from "../../../model/i-serta-user";
import {FakeSertaUser} from "./fake-serta-user";

export class FakeUserService implements IUserService {
    private fakeUsers: FakeSertaUser[]

    constructor() {
        const now = Date.now()
        const lastInfection = now - (3 * 60 * 60 + 22 * 60 + 12) * 1000
        this.fakeUsers = [
            new FakeSertaUser("some.discord.id", "p.bauer", "http://avatarUrl/pb.png", 1, 35, 15, new Date(lastInfection)),
            new FakeSertaUser("another.discord.id", "jfuerlinger", "http://avatarUrl/jf.png", 3, 187, 45),
            new FakeSertaUser("bot.discord.id", "Serta", "", 0, 0, 0, undefined, true)
        ]
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