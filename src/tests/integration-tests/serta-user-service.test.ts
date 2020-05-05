import { SertaBot } from "../../bot";
import { SertaUserService } from "../../services/serta-user-service";
import {ISertaUser} from "../../model/i-serta-user";
import {AzureUtils} from "../../utils/azure-utils";

describe("SertaUserService", () => {
  const bot = new SertaBot(AzureUtils.getSettingResolver());
  const guildId = '692047042154987527' // TODO: not to be hidden here

  let userService: SertaUserService
  let users: ISertaUser[]

  beforeAll(async () => {
    await bot.initBot()
    await bot.run()
  }, 10000)

  beforeEach(async () => {
    userService = new SertaUserService(bot.bot, AzureUtils.getUserDao(guildId));
    users = await userService.getAll();
  })

  afterAll(async () => {
    bot.stop();
  });

  test("getUsers shall return a users property", async () => {
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
