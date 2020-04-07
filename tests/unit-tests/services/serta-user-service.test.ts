import {SertaUserService} from "../../../src/services/serta-user-service";
import {UserDao} from "../../../src/dao/user-dao";
import {DbUserEntry} from "../../../src/model/db-user-entry";
import {FakeCommandClient} from "./fake-command-client";
import {fakeDiscordUsers} from "./fake-discord-users";

describe("SertaUserService", () => {
    test("returns a valid user when get with a DiscordId is called", async () => {
        const fakeCommandClient = new FakeCommandClient()
        const userDao = new FakeUserDao()
        const sertaUserService = new SertaUserService(fakeCommandClient, userDao)
        const user = await sertaUserService.get(fakeDiscordUsers[0].id)
        expect(user.levelId).not.toBeNull()
    })
})

class FakeUserDao implements UserDao {
    private storage = new Map<string, DbUserEntry>()

    add(entry: DbUserEntry): Promise<DbUserEntry> {
        this.storage.set(entry.id, entry)
        return new Promise<DbUserEntry>((resolve) => {
            resolve(entry)
        })
    }

    deleteById(id: string): Promise<void> {
        return new Promise<void>((resolve) => {
            this.storage.delete(id)
            resolve()
        })
    }

    getAll(): Promise<DbUserEntry[]> {
        return new Promise<DbUserEntry[]>(resolve =>  {
            if (this.storage.size > 0) {
                const userEntries: DbUserEntry[] = Array.from(this.storage.values())
                resolve(userEntries)
            }
        })
    }

    getById(id: string): Promise<DbUserEntry> {
        return new Promise<DbUserEntry>(resolve => resolve(this.storage.get(id)))
    }
}