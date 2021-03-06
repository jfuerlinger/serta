import { TableStorageUserDao } from "./table-storage-user-dao";
import { UserDao } from "../user-dao";
import { DbUserEntry } from "../../model/db-user-entry";

const random = require('random');

it('sample test case 1', () => {
    expect(1 + 2).toBe(3);
});

it('create user in db should return the same user at fetch', async () => {

    const guildId: string = String(random.int(5000, 1000));
    const userId: string = String(random.int(1, 10000));
    const dao: UserDao = new TableStorageUserDao(guildId);
    const levelId: number = random.int(0, 5);

    const createdUser: DbUserEntry = await dao.add(new DbUserEntry(userId, levelId));
    expect(createdUser).toBeDefined();
    expect(createdUser.id).toBe(userId);
    expect(createdUser.levelId).toBe(levelId);

    let fetchedUser: DbUserEntry = await dao.getById(userId);
    expect(fetchedUser).toBeDefined();
    expect(fetchedUser.RowKey).toBe(userId);
    
    await dao.deleteById(userId);
});

