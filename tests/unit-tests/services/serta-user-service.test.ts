import {SertaUserService} from "../../../src/services/serta-user-service";
import {UserDao} from "../../../src/dao/user-dao";
import {DbUserEntry} from "../../../src/model/db-user-entry";
import {FakeCommandClient} from "./fake-command-client";
import {fakeDiscordUsers} from "./fake-discord-users";

describe("SertaUserService get", () => {
    let fakeCommandClient: FakeCommandClient
    let userDao: FakeUserDao
    let sertaUserService: SertaUserService

    beforeAll(() => {
        fakeCommandClient = new FakeCommandClient()
        userDao = new FakeUserDao()
        sertaUserService = new SertaUserService(fakeCommandClient, userDao)
    })

    test("returns a valid user when called with an existing DiscordId", async () => {
        const user = await sertaUserService.get(fakeDiscordUsers[0].id)
        expect(user.levelId).not.toBeNull()
    })

    test("returns the correct user when called with an existing DiscordId", async () => {
        const user = await sertaUserService.get(fakeDiscordUsers[0].id)
        expect(user.discordUser.username).toBe(fakeDiscordUsers[0].username)
    })

    test("rejects promise when non-existing DiscordId is provided", async done => {
        sertaUserService.get("fakeDiscordUsers[0].id")
            .then(() => {
                done.fail("Returned a user though non-existing id was provided")
            })
            .catch(() => {
                done()
            })
    })

    test("when user dao is present it takes right data from user dao", async () => {
        const fakeUser = fakeDiscordUsers[1]
        const anyLevel = 20
        userDao.add(new DbUserEntry(fakeUser.id, anyLevel))

        const user = await sertaUserService.get(fakeUser.id)

        expect(user.levelId).toBe(anyLevel)
    })

    test("when user dao is not present it returns default value", async () => {
        const defaultLevel = 1
        const fakeUser = fakeDiscordUsers[2]

        const user = await sertaUserService.get(fakeUser.id)

        expect(user.levelId).toBe(defaultLevel)
    })

    test("when user is not present it stores it with default values", async () => {
        const fakeUser = fakeDiscordUsers[3]

        await sertaUserService.get(fakeUser.id);

        const daoUser = await userDao.getById(fakeUser.id)
        expect(daoUser).toBeTruthy()
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