import { SertaBot } from "../../src/bot";
import { SertaUser } from "../../src/model/serta-user";
import { SertaUserService } from "../../src/services/serta-user-service";
import { TableStorageUserDao } from "../../src/dao/table-storage/table-storage-user-dao";

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
    users = await userService.GetUsers(guildId);
  })

  test('getUsers shall return a number of three test users', async () => {
    expect(users.length).toBe(3)
  })

  test("getUsers shall return 3 valid test users", async() => {
    expect(users).toBeTruthy()
  })

  test("getUsers shall return jfuerlinger as a test user", async () => {
    let found = false
    users.forEach(user => {
      if (user.discordUser.username === "jfuerlinger") {
        found = true
      }
    })
    expect(found).toBe(true)
  })
})
