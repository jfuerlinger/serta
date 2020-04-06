import {ConfigurationBuilder} from "../../../src/config/configuration-builder";
import {SertaConfiguration} from "../../../src/config/serta-configuration";
import {IEnvironmentAccessor} from "../../../src/config/i-environment-accessor";

describe("ConfigurationBuilder", () => {
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
    var fakeEnvironmentAccessir: IEnvironmentAccessor
    beforeEach(() => {
        fakeEnvironmentAccessir = {
            discordToken: "lkjsadflkj",
            botPrefix: "!",
            botInstanceName: "Peter",
            azureStorageAccount: "p.bauer",
            azureStorageAccessKey: "sdfkjlsdfkjlsdf",
            azureStorageBlobStorageConnectionstring: "ljldfssdflj"
        }
    })

    test("sets commandClient properly", () => {
        const config = new SertaConfiguration(fakeEnvironmentAccessir)
        expect(config.commandClient.discordToken).toBe("lkjsadflkj")
        expect(config.commandClient.botPrefix).toBe("!")
        expect(config.commandClient.botInstanceName).toBe("Peter")
    })

    test("sets azzure configuration properly", () => {
        const config = new SertaConfiguration(fakeEnvironmentAccessir)
        expect(config.azureStorage.account).toBe("p.bauer")
        expect(config.azureStorage.accessKey).toBe("sdfkjlsdfkjlsdf")
    })
})