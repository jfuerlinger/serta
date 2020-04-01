import { SertaBot } from "../bot";
import { SertaUserService } from "./serta-user-service";
import { TableStorageUserDao } from "../dao/table-storage/table-storage-user-dao";

describe("SertaUserService", () => {
  const bot = new SertaBot()

  beforeAll(async () => {
    await bot.run()
  })

  test('shall return all users from Discord server when getUsers is called', async () => {
    const guildId = '692047042154987527' // TODO: not to be hidden here
    const userDao = new TableStorageUserDao(guildId);
    const userService = new SertaUserService(bot._bot, userDao);
    let users = await userService.GetUsers(guildId);
    expect(users.length).toBe(3)
  })
})
