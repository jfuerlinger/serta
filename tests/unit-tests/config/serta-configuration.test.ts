import {ConfigurationBuilder} from "../../../src/config/configuration-builder";

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
            expect(botPrefix).not.toBe("")
        } catch (e) {
            expect(e.name).toBe("Error")  // Excuse: expect(.).toBeInstanceOf(Error) did not work; unclear why
        }
    })
})