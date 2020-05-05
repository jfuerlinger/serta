import { IUserDao } from "../../dao/i-user-dao";
import { DbUserEntry } from "../../model/db-user-entry";
import { AzureUtils } from "../../utils/azure-utils";

const random = require('random');

describe('TableStorageUserDao', () => {

    test('it to store a new user, fetch that user by id and successfully compare the fields for equality.', async () => {

        const guildId: string = String(random.int(5000, 1000));
        const userId: string = String(random.int(1, 10000));
        const dao: IUserDao = AzureUtils.getUserDao(guildId);
        const levelId: number = random.int(0, 5);
        const immuneLevel = random.int(1, 100)
        const experiencePoints = random.int(1, 500)

        const createdUser: DbUserEntry = await dao.addOrMerge(new DbUserEntry(userId, levelId, immuneLevel, experiencePoints));
        expect(createdUser).toBeDefined();
        expect(createdUser.id).toBe(userId);
        expect(createdUser.levelId).toBe(levelId);

        let fetchedUser: DbUserEntry | undefined = await dao.getById(userId);
        expect(fetchedUser).toBeDefined();
        expect(fetchedUser!.RowKey).toBe(userId);

        await dao.deleteById(userId);

        fetchedUser = await dao.getById(userId);
        expect(fetchedUser).toBeUndefined();
    });

});

