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

describe("Serta Configuration", () => {
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

    test("provides initial level information", () => {
        expect(config.initialLevel).toBeTruthy()
        expect(config.initialLevel.abbreviation).toBe("S")
    })

    test("provides top level information", () => {
        expect(config.topLevel.id).toBe(6)
    })

    test("provides initial level information as information for level 1", () => {
        expect(config.getLevelInformation(1).id).toBe(config.initialLevel.id)
        expect(config.getLevelInformation(1).abbreviation).toBe(config.initialLevel.abbreviation)
    })

    test("provides level information for other level", () => {
        const anyLevel = 4
        expect(config.getLevelInformation(anyLevel).id).toBe(anyLevel)
    })

    test("provides top level information if level is too high", () => {
        expect(config.getLevelInformation(7).id).toBe(config.topLevel.id)
    })

    test("provides initial level information of level is too low", () =>{
        expect(config.getLevelInformation(0).id).toBe(config.initialLevel.id)
    })

    test("provides next level", () => {
        expect(config.getNextLevel(1)).toBe(config.getLevelInformation(2))
    })

    test("getNextLevel prevents overflow", () => {
        const topLevelId = config.topLevel.id
        expect(config.getNextLevel(topLevelId)).toBe(config.getLevelInformation(topLevelId))
    })
    test("provides previous level", () => {
        const anyLevel = 4
        expect(config.getPreviousLevel(anyLevel)).toBe(config.getLevelInformation(anyLevel - 1))
    })
})