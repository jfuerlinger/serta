import { SertaUserService } from "../../../services/serta-user-service";
import { IUserDao } from "../../../dao/i-user-dao";
import { DbUserEntry } from "../../../model/db-user-entry";
import { FakeCommandClient } from "./fake-command-client";
import { fakeDiscordUsers } from "./fake-discord-users";
import * as FakeEnvironment from "../config/fake-environment"
import { ConfigurationBuilder } from "../../../config/configuration-builder";
import { AppConfigurationDao } from "../../../dao/app-configuration/app-configuration-dao";
import { FakeEnvironmentDao } from "../config/fake-environment-dao";
import { SettingResolver } from "../../../config/setting-resolver";

describe("SertaUserService getByDiscordUserId", () => {
    let fakeCommandClient: FakeCommandClient
    let userDao: FakeUserDao
    let sertaUserService: SertaUserService

    beforeAll(() => {
        const AppConfigurationDaoMock = <jest.Mock<AppConfigurationDao>>AppConfigurationDao;
        ConfigurationBuilder.SettingResolver = new SettingResolver(new FakeEnvironmentDao(), new AppConfigurationDaoMock());
    });

    beforeEach(() => {
        fakeCommandClient = new FakeCommandClient()
        userDao = new FakeUserDao()
        sertaUserService = new SertaUserService(fakeCommandClient, userDao)
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
        sertaUserService.getByDiscordUserId("anyInvalidId")
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
        await userDao.addOrMerge(new DbUserEntry(fakeUser.id, anyLevel, anyImmuneLevel, anyExperiencePoints))

        const user = await sertaUserService.getByDiscordUserId(fakeUser.id)

        expect(user.levelId).toBe(anyLevel)
        expect(user.immuneLevel).toBe(anyImmuneLevel)
        expect(user.approvedExperiencePoints).toBe(anyExperiencePoints)
    })

    test("when user dao is present it takes right data from user dao; alternative data", async () => {
        const fakeUser = fakeDiscordUsers[3]
        const anyLevel = 3
        const anyImmuneLevel = 45
        const anyExperiencePoints = 196
        await userDao.addOrMerge(new DbUserEntry(fakeUser.id, anyLevel, anyImmuneLevel, anyExperiencePoints))

        const user = await sertaUserService.getByDiscordUserId(fakeUser.id)

        expect(user.levelId).toBe(anyLevel)
        expect(user.immuneLevel).toBe(anyImmuneLevel)
        expect(user.approvedExperiencePoints).toBe(anyExperiencePoints)
    })

    test("when user dao is not present it returns initial value", async () => {
        const config = await ConfigurationBuilder.getConfiguration();
        const expectedInitialLevel = config.gameLevelInformation.initialLevel
        const fakeUser = fakeDiscordUsers[2]

        const user = await sertaUserService.getByDiscordUserId(fakeUser.id)

        expect(user.levelId).toBe(expectedInitialLevel.id)
        expect(user.immuneLevel).toBe(expectedInitialLevel.minimumImmuneLevel)
    })

    test("when user is not present it stores it with initial values", async () => {
        const fakeUser = fakeDiscordUsers[3]
        const config = await ConfigurationBuilder.getConfiguration();

        await sertaUserService.getByDiscordUserId(fakeUser.id);

        const daoUser = await userDao.getById(fakeUser.id)
        expect(daoUser.levelId).toBe(config.gameLevelInformation.initialLevel.id)
    })
})

describe("SertaUserService getByDiscordUserName", () => {
    let fakeCommandClient: FakeCommandClient
    let userDao: FakeUserDao
    let sertaUserService: SertaUserService

    beforeAll(() => {
        fakeCommandClient = new FakeCommandClient()
        userDao = new FakeUserDao()
        sertaUserService = new SertaUserService(fakeCommandClient, userDao)
        FakeEnvironment.setup()
    })

    afterAll(() => {
        FakeEnvironment.tearDown()
    })

    test("returns the correct user if called with a valid user name", async () => {
        const user = await sertaUserService.getByDiscordUserName(fakeDiscordUsers[2].username)
        expect(user.discordUserId).toBe(fakeDiscordUsers[2].id)
    })

    test("rejects promes when non-existing Discord user name is provided", async (done) => {
        sertaUserService.getByDiscordUserName("anyNotExistingName")
            .then(() => {
                done.fail("Returned user though non-existing id was provided")
            })
            .catch(() => {
                done()
            })
    })
})

describe("SertaUserService getAll", () => {
    let fakeCommandClient: FakeCommandClient
    let fakeUserDao: FakeUserDao
    let sertaUserService: SertaUserService

    beforeEach(() => {
        fakeCommandClient = new FakeCommandClient()
        fakeUserDao = new FakeUserDao()
        sertaUserService = new SertaUserService(fakeCommandClient, fakeUserDao)
        FakeEnvironment.setup()
    })

    afterEach(() => {
        FakeEnvironment.tearDown()
    })

    test("returns list of the same length as fakeDiscordUsers", async () => {
        const users = await sertaUserService.getAll()
        expect(users.length).toBe(fakeDiscordUsers.length)
    })

    test("returns equal array as fakeDiscordUsers", async () => {
        const users = await sertaUserService.getAll()

        for (let i = 0; i < users.length; i++) {
            expect(users[i].discordUserId).toBe(fakeDiscordUsers[i].id)
        }
    })

    test("returned users have correct game data if they are already in the dao", async () => {
        const anyUserId = fakeDiscordUsers[1].id;
        const anyLevel = 4;
        const anyImmuneLevel = 40;
        const anyExperiencePoints = 99;
        const dbUserEntry = new DbUserEntry(anyUserId, anyLevel, anyImmuneLevel, anyExperiencePoints)
        fakeUserDao.addOrMerge(dbUserEntry)

        const users = await sertaUserService.getAll()

        expect(users[1].levelId).toBe(anyLevel)
    })

    test("missing users are created if not in data base", async () => {
        await sertaUserService.getAll();
        const allDbEntries = await fakeUserDao.getAll()
        expect(allDbEntries.length).toBe(fakeDiscordUsers.length)
    })

    test("created users have correct initial levelName information", async () => {
        const config = await ConfigurationBuilder.getConfiguration();
        const users = await sertaUserService.getAll()

        const initialLevelId = config.gameLevelInformation.initialLevel.id
        users.forEach(user => expect(user.levelId).toBe(initialLevelId))
    })
})

export class FakeUserDao implements IUserDao {
    private storage = new Map<string, DbUserEntry>()

    addOrMerge(entry: DbUserEntry): Promise<DbUserEntry> {
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
            } else {
                resolve(new Array<DbUserEntry>())
            }
        })
    }

    getById(id: string): Promise<DbUserEntry> {
        return new Promise<DbUserEntry>(resolve => resolve(this.storage.get(id)))
    }
}
