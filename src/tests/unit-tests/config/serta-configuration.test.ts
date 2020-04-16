import { ConfigurationBuilder } from "../../../config/configuration-builder";
import { IEnvironmentAccessor } from "../../../config/i-environment-accessor";
import { ISettingResolver } from "../../../config/i-setting-resolver";
import { SettingResolver } from "../../../config/setting-resolver";
import { AppConfigurationDao } from "../../../dao/app-configuration/app-configuration-dao";
import { FakeEnvironmentDao } from "./fake-environment-dao";
import { FakeAppConfigurationDao } from "../dao/app-configuration/fake-app-configuration-dao";


describe("ConfigurationBuilder", () => {
    beforeAll(() => {
        ConfigurationBuilder.SettingResolver = new SettingResolver(new FakeEnvironmentDao(), new FakeAppConfigurationDao());
    })

    afterAll(() => {
    })

    test("getConfiguration returns a valid  object", async () => {
        const config = await ConfigurationBuilder.getConfiguration()
        expect(config).not.toBeNull()
    })

    test("getConfiguration returns always the same config upon multiple calls", async () => {
        const config1 = await ConfigurationBuilder.getConfiguration();
        const config2 = await ConfigurationBuilder.getConfiguration();
        expect(config1).toBe(config2)
    })
})

describe("SertaConfiguration", () => {
    let fakeEnvironmentAccessor: IEnvironmentAccessor;
    let settingResolver: ISettingResolver;

    beforeAll(async () => {
        
        ConfigurationBuilder.SettingResolver = new SettingResolver(new FakeEnvironmentDao(), new FakeAppConfigurationDao());
    })

    test("sets commandClient properly", async () => {

        // arrange / act
        const config = await ConfigurationBuilder.getConfiguration();

        // assert
        expect(config.commandClient.discordToken).toBe("lkjsadflkj")
        expect(config.commandClient.botPrefix).toBe("!")
        expect(config.commandClient.botInstanceName).toBe("Peter")
    })

    test("sets azzure configuration properly", async () => {

        // arrange / act
        const config = await ConfigurationBuilder.getConfiguration();

        // assert
        expect(config.azureStorage.account).toBe("p.bauer")
        expect(config.azureStorage.accessKey).toBe("sdfkjlsdfkjlsdf")
    })

    test("provides MessageOfTheDayProvider", async () => {

        // arrange / act
        const config = await ConfigurationBuilder.getConfiguration();

        // assert
        expect(config.messageOfTheDayProvider).toBeTruthy()
    })

    test("provides GameLevelInformation", async () => {

        // arrange / act
        const config = await ConfigurationBuilder.getConfiguration();

        // assert
        expect(config.gameLevelInformation).toBeTruthy()
    })

    test("provides base url for images", async () => {

        // arrange / act
        const config = await ConfigurationBuilder.getConfiguration();

        // assert
        expect(config.baseUrlForImages).toContain("http")
    })
})