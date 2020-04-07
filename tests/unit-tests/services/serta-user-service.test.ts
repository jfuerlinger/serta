import {SertaUserService} from "../../../src/services/serta-user-service";
import {UserDao} from "../../../src/dao/user-dao";
import {DbUserEntry} from "../../../src/model/db-user-entry";
import {FakeCommandClient} from "./fake-command-client";
import {fakeDiscordUsers} from "./fake-discord-users";
import * as FakeEnvironment from "./../config/fake-environment"
import {ConfigurationBuilder} from "../../../src/config/configuration-builder";

describe("SertaUserService getByDiscordUserId", () => {
    let fakeCommandClient: FakeCommandClient
    let userDao: FakeUserDao
    let sertaUserService: SertaUserService

    beforeEach(() => {
        fakeCommandClient = new FakeCommandClient()
        userDao = new FakeUserDao()
        sertaUserService = new SertaUserService(fakeCommandClient, userDao)
        FakeEnvironment.setup()
    })

    afterEach(() => {
        FakeEnvironment.tearDown()
    })

    test("returns a valid user when called with an existing DiscordId", async () => {
        const user = await sertaUserService.getByDiscordUserId(fakeDiscordUsers[0].id)
        expect(user.levelId).not.toBeNull()
    })

    test("returns the correct user when called with an existing DiscordId", async () => {
        const user = await sertaUserService.getByDiscordUserId(fakeDiscordUsers[0].id)
        expect(user.discordUserId).toBe(fakeDiscordUsers[0].id)
        expect(user.discordUserName).toBe(fakeDiscordUsers[0].username)
    })

    test("rejects promise when non-existing DiscordId is provided", async done => {
        sertaUserService.getByDiscordUserId("fakeDiscordUsers[0].id")
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
        const anyImmuneLevel = 34
        const anyExperiencePoints = 249
        await userDao.add(new DbUserEntry(fakeUser.id, anyLevel, anyImmuneLevel, anyExperiencePoints))

        const user = await sertaUserService.getByDiscordUserId(fakeUser.id)

        expect(user.levelId).toBe(anyLevel)
        expect(user.immuneLevel).toBe(anyImmuneLevel)
        expect(user.experiencePoints).toBe(anyExperiencePoints)
    })

    test("when user dao is present it takes right data from user dao; alternative data", async () => {
        const fakeUser = fakeDiscordUsers[3]
        const anyLevel = 3
        const anyImmuneLevel = 45
        const anyExperiencePoints = 196
        await userDao.add(new DbUserEntry(fakeUser.id, anyLevel, anyImmuneLevel, anyExperiencePoints))

        const user = await sertaUserService.getByDiscordUserId(fakeUser.id)

        expect(user.levelId).toBe(anyLevel)
        expect(user.immuneLevel).toBe(anyImmuneLevel)
        expect(user.experiencePoints).toBe(anyExperiencePoints)
    })

    test("when user dao is not present it returns initial value", async () => {
        const expectedInitialLevel = ConfigurationBuilder.getConfiguration().initialLevel
        const fakeUser = fakeDiscordUsers[2]

        const user = await sertaUserService.getByDiscordUserId(fakeUser.id)

        expect(user.levelId).toBe(expectedInitialLevel.id)
        expect(user.immuneLevel).toBe(expectedInitialLevel.minimumImmuneLevel)
    })

    test("when user is not present it stores it with initial values", async () => {
        const fakeUser = fakeDiscordUsers[3]

        await sertaUserService.getByDiscordUserId(fakeUser.id);

        const daoUser = await userDao.getById(fakeUser.id)
        expect(daoUser.levelId).toBe(ConfigurationBuilder.getConfiguration().initialLevel.id)
    })
})

describe("SertaUserService getByDiscordUserName", () => {
    test("returns the correct user if called with a valid user name", async () => {
        const fakeCommandClient = new FakeCommandClient()
        const userDao = new FakeUserDao()
        const sertaUserService = new SertaUserService(fakeCommandClient, userDao)
        FakeEnvironment.setup()

        const user = await sertaUserService.getByDiscordUserName(fakeDiscordUsers[2].username)
        expect(user.discordUserId).toBe(fakeDiscordUsers[2].id)
        FakeEnvironment.tearDown()
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