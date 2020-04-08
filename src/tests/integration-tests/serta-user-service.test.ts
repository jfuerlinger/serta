import { SertaBot } from "../../bot";
import { SertaUser } from "../../model/serta-user";
import { SertaUserService } from "../../services/serta-user-service";
import { TableStorageUserDao } from "../../dao/table-storage/table-storage-user-dao";

describe("SertaUserService", () => {
  const bot = new SertaBot();
  const guildId = '692047042154987527' // TODO: not to be hidden here

  let userDao: TableStorageUserDao
  let userService: SertaUserService
  let users: SertaUser[]

  beforeAll(async () => {
    await bot.run()
  }, 10000)

  beforeEach(async () => {
    userDao = new TableStorageUserDao(guildId);
    userService = new SertaUserService(bot._bot, userDao);
    users = await userService.getAll();
  })

  test("getUsers shall return a users property", async() => {
    expect(users).toBeTruthy()
  })

  test('getUsers shall return at least one user (the bot)', async () => {
    expect(users.length).toBeGreaterThan(0)
  })

  test("getUsers shall return the bot as a test user", async () => {
    let found = false
    users.forEach(user => {
      if (user.discordUserName.indexOf("Serta")) {
        found = true
      }
    })
    expect(found).toBe(true)
  })
})
