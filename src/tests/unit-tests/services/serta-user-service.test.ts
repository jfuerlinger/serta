import {SertaUserService} from "../../../services/serta-user-service";
import {DbUserEntry} from "../../../model/db-user-entry";
import {FakeCommandClient} from "../test-doubles/fake-command-client";
import {fakeDiscordUsers} from "../test-doubles/fake-discord-users";
import * as FakeEnvironment from "../config/fake-environment"
import { ConfigurationBuilder } from "../../../config/configuration-builder";
import { FakeEnvironmentDao } from "../config/fake-environment-dao";
import { SettingResolver } from "../../../config/setting-resolver";
import { FakeAppConfigurationDao } from "../dao/app-configuration/fake-app-configuration-dao";
import {FakeUserDao} from "../test-doubles/fake-user-dao";
import {fakeSertaUsers} from "../test-doubles/fake-serta-user";

describe("SertaUserService", () => {
    let fakeCommandClient: FakeCommandClient
    let fakeUserDao: FakeUserDao
    let sertaUserService: SertaUserService

    beforeAll(() => {
        ConfigurationBuilder.SettingResolver = new SettingResolver(new FakeEnvironmentDao(), new FakeAppConfigurationDao());
    });

    beforeEach(() => {
        fakeCommandClient = new FakeCommandClient()
        fakeUserDao = new FakeUserDao()
        sertaUserService = new SertaUserService(fakeCommandClient, fakeUserDao)
        FakeEnvironment.setup()
    })

    afterEach(() => {
        FakeEnvironment.tearDown()
    })

    describe("getByDiscordUserId", () => {
        test("it returns a valid user when called with an existing DiscordId", async () => {
            // act
            const user = await sertaUserService.getByDiscordUserId(fakeDiscordUsers[0].id)

            // assert
            expect(user.levelId).not.toBeNull()
        })

        test("it returns the correct user when called with an existing DiscordId", async () => {
            // act
            const user = await sertaUserService.getByDiscordUserId(fakeDiscordUsers[0].id)

            // assert
            expect(user.discordUserId).toBe(fakeDiscordUsers[0].id)
            expect(user.discordUserName).toBe(fakeDiscordUsers[0].username)
        })

        test("it rejects promise when non-existing DiscordId is provided", async done => {
            // assert
            sertaUserService.getByDiscordUserId("anyInvalidId")
                .then(() => {
                    done.fail("Returned a user though non-existing id was provided")
                })
                .catch(() => {
                    done()
                })
        })

        test("it takes right data from user dao when user dao is present", async () => {
            // arrange
            const fakeUser = fakeDiscordUsers[1]
            const anyLevel = 20
            const anyImmuneLevel = 34
            const anyExperiencePoints = 249
            await fakeUserDao.addOrMerge(new DbUserEntry(fakeUser.id, anyLevel, anyImmuneLevel, anyExperiencePoints))

            // act
            const user = await sertaUserService.getByDiscordUserId(fakeUser.id)

            // assert
            expect(user.levelId).toBe(anyLevel)
            expect(user.immuneLevel).toBe(anyImmuneLevel)
            expect(user.approvedExperiencePoints).toBe(anyExperiencePoints)
        })

        test("it takes right data from user dao when user dao is present; alternative data", async () => {
            // arrange
            const fakeUser = fakeDiscordUsers[3]
            const anyLevel = 3
            const anyImmuneLevel = 45
            const anyExperiencePoints = 196
            await fakeUserDao.addOrMerge(new DbUserEntry(fakeUser.id, anyLevel, anyImmuneLevel, anyExperiencePoints))

            // act
            const user = await sertaUserService.getByDiscordUserId(fakeUser.id)

            // assert
            expect(user.levelId).toBe(anyLevel)
            expect(user.immuneLevel).toBe(anyImmuneLevel)
            expect(user.approvedExperiencePoints).toBe(anyExperiencePoints)
        })

        test("it creates dbUserEntry in userDao with initial values when not present", async () => {
            // arrange
            const expectedInitialLevel = ConfigurationBuilder.getConfiguration().gameLevelInformation.initialLevel
            const fakeUser = fakeDiscordUsers[2]

            // act
            const user = await sertaUserService.getByDiscordUserId(fakeUser.id)

            // assert
            expect(user.levelId).toBe(expectedInitialLevel.id)
            expect(user.immuneLevel).toBe(expectedInitialLevel.minimumImmuneLevel)
        })
    })

    describe("getByDiscordUserName", () => {
        test("it returns the correct user if called with a valid user name", async () => {
            // act
            const user = await sertaUserService.getByDiscordUserName(fakeDiscordUsers[2].username)

            // assert
            expect(user.discordUserId).toBe(fakeDiscordUsers[2].id)
        })

        test("it rejects promis when non-existing Discord user name is provided", async (done) => {
            sertaUserService.getByDiscordUserName("anyNotExistingName")
                .then(() => {
                    done.fail("Returned user though non-existing id was provided")
                })
                .catch(() => {
                    done()
                })
        })
    })

    describe("getAll", () => {
        test("it returns a list of the same length as fakeDiscordUsers", async () => {
            // act
            const users = await sertaUserService.getAll()

            // assert
            expect(users.length).toBe(fakeDiscordUsers.length)
        })

        test("it returns an array with the same ids as fakeDiscordUsers", async () => {
            // act
            const users = await sertaUserService.getAll()

            // assert
            for (let i = 0; i < users.length; i++) {
                expect(users[i].discordUserId).toBe(fakeDiscordUsers[i].id)
            }
        })

        test("it returns users with correct game data if they are already in the dao", async () => {
            // arrange
            const anyUserId = fakeDiscordUsers[1].id;
            const anyLevel = 4;
            const anyImmuneLevel = 40;
            const anyExperiencePoints = 99;
            const dbUserEntry = new DbUserEntry(anyUserId, anyLevel, anyImmuneLevel, anyExperiencePoints)
            fakeUserDao.addOrMerge(dbUserEntry)

            // act
            const users = await sertaUserService.getAll()

            // assert
            expect(users[1].levelId).toBe(anyLevel)
            expect(users[1].immuneLevel).toBe(anyImmuneLevel)
            expect(users[1].approvedExperiencePoints).toBe(anyExperiencePoints)
        })

        test("it creates missing users if not in data base", async () => {
            // act
            await sertaUserService.getAll();

            // assert
            const allDbEntries = await fakeUserDao.getAll()
            expect(allDbEntries.length).toBe(fakeDiscordUsers.length)
        })

        test("it creates users with correct initial levelName information", async () => {
            // act
            const users = await sertaUserService.getAll()

            // assert
            const initialLevelId = ConfigurationBuilder.getConfiguration().gameLevelInformation.initialLevel.id
            users.forEach(user => expect(user.levelId).toBe(initialLevelId))
        })
    })

    test("it triggers storing of DbUserEntry into user dao", async () => {
        // arrange
        const someSertaUser = fakeSertaUsers[0]
        const oldLevelId = someSertaUser.dbUserEntry.levelId
        someSertaUser.dbUserEntry.levelId++

        // act
        await sertaUserService.put(someSertaUser)
        const userInDao = await fakeUserDao.getById(someSertaUser.discordUserId)

        // then
        expect(userInDao.levelId).toBe(oldLevelId + 1)

    })
})

    getById(id: string): Promise<DbUserEntry> {
        return new Promise<DbUserEntry>(resolve => resolve(this.storage.get(id)))
    }
}
