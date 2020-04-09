import {ConfigurationBuilder} from "../../../src/config/configuration-builder";
import {SertaConfiguration} from "../../../src/config/serta-configuration";
import {IEnvironmentAccessor} from "../../../src/config/i-environment-accessor";
import * as FakeEnvironment from "./fake-environment"

describe("ConfigurationBuilder", () => {
    beforeAll(()=>{
        FakeEnvironment.setup()
    })

    afterAll(() => {
        FakeEnvironment.tearDown()
    })

    test("getConfiguration returns a valid  object", () => {
        const config = ConfigurationBuilder.getConfiguration()
        expect(config).not.toBeNull()
    })

    test("getConfiguration returns always the same config upon multiple calls", () => {
        const config1 = ConfigurationBuilder.getConfiguration()
        const config2 = ConfigurationBuilder.getConfiguration()
        expect(config1).toBe(config2)
    })
})

describe("SertaConfiguration", () => {
    let fakeEnvironmentAccessor: IEnvironmentAccessor
    let config: SertaConfiguration

    beforeEach(() => {
        fakeEnvironmentAccessor = {
            discordToken: "lkjsadflkj",
            botPrefix: "!",
            botInstanceName: "Peter",
            azureStorageAccount: "p.bauer",
            azureStorageAccessKey: "sdfkjlsdfkjlsdf",
            azureStorageBlobStorageConnectionstring: "ljldfssdflj"
        }
        config = new SertaConfiguration(fakeEnvironmentAccessor)
    })

    test("sets commandClient properly", () => {
        expect(config.commandClient.discordToken).toBe("lkjsadflkj")
        expect(config.commandClient.botPrefix).toBe("!")
        expect(config.commandClient.botInstanceName).toBe("Peter")
    })

    test("sets azzure configuration properly", () => {
        expect(config.azureStorage.account).toBe("p.bauer")
        expect(config.azureStorage.accessKey).toBe("sdfkjlsdfkjlsdf")
    })

    test("provides MessageOfTheDayProvider", () => {
        expect(config.messageOfTheDayProvider).toBeTruthy()
    })

    test("provides GameLevelInformation", () => {
        expect(config.gameLevelInformation).toBeTruthy()
    })

    test("provides base url for images", () => {
        expect(config.baseUrlForImages).toContain("http")
    })
})