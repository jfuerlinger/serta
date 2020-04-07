import {SertaUserService} from "../../../src/services/serta-user-service";
import {UserDao} from "../../../src/dao/user-dao";
import {DbUserEntry} from "../../../src/model/db-user-entry";
import {FakeCommandClient} from "./fake-command-client";
import {fakeDiscordUsers} from "./fake-discord-users";

describe("SertaUserService get", () => {
    test("returns a valid user when called with an existing DiscordId", async () => {
        const fakeCommandClient = new FakeCommandClient()
        const userDao = new FakeUserDao()
        const sertaUserService = new SertaUserService(fakeCommandClient, userDao)
        const user = await sertaUserService.get(fakeDiscordUsers[0].id)
        expect(user.levelId).not.toBeNull()
    })

    test("rejects promise when non-existing DiscordId is provided", async done => {
        const fakeCommandClient = new FakeCommandClient()
        const userDao = new FakeUserDao()
        const sertaUserService = new SertaUserService(fakeCommandClient, userDao)

        sertaUserService.get("fakeDiscordUsers[0].id")
            .then(() => {
                done.fail("Returned a user though non-existing id was provided")
            })
            .catch(() => {
                done()
            })
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
        return new Promise<DbUserEntry[]>(resolve => {
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