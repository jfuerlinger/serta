import {ConfigurationBuilder} from "../../../src/config/configuration-builder";

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
    test("returns '!' as bot prefix when .env is read", () => {
        expect(ConfigurationBuilder.getConfiguration().commandClientConfiguration.botPrefix).toBe("!")
    })

    test("throws exception if environment file accessor does not provide value for bot prefix", () => {
        const fakeFileAccessor = {
            discordToken: "",
            botPrefix: "",
            botInstanceName: "",

            azureStorageAccount: ""
        }
        try {
            const botPrefix = ConfigurationBuilder.getConfiguration(fakeFileAccessor).commandClientConfiguration.botPrefix
            expect(botPrefix).not.toBe("") // to make warning watcher happy; should never come to here
        } catch (e) {
            expect(e.name).toBe("Error")  // Excuse: expect(.).toBeInstanceOf(Error) did not work; unclear why
        }
    })
})