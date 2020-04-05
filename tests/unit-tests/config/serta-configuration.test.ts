import {ConfigurationBuilder} from "../../../src/config/configuration-builder";
import {SertaConfiguration} from "../../../src/config/serta-configuration";
import {IEnvironmentFileAccessor} from "../../../src/config/i-environment-file-accessor";

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
    var fakeEnvironmentFile: IEnvironmentFileAccessor
    beforeEach(() => {
        fakeEnvironmentFile = {
            discordToken: "lkjsadflkj",
            botPrefix: "!",
            botInstanceName: "Peter",
            azureStorageAccount: "p.bauer"
        }
    })

    test("sets commandClientConfiguration properly", () => {
        const config = new SertaConfiguration(fakeEnvironmentFile)
        expect(config.commandClientConfiguration.discordToken).toBe("lkjsadflkj")
        expect(config.commandClientConfiguration.botPrefix).toBe("!")
        expect(config.commandClientConfiguration.botInstanceName).toBe("Peter")
    })
})