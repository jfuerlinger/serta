import {EnvironmentAccessor} from "../../../src/config/configuration-builder"
import * as FakeEnvironment from "./fake-environment"

describe("EnvironmentAccessor getting valid entries", () => {
    beforeAll(() => {
        FakeEnvironment.setup()
    })

    afterAll(() => {
        FakeEnvironment.tearDown()
    })

    test("reads discord token correctly", () => {
        const fileAccessor = new EnvironmentAccessor()
        expect(fileAccessor.discordToken).toBe(FakeEnvironment.FAKE_DISCORD_TOKEN)
    })

    test("reads azure storage account correctly", () => {
        const fileAccessor = new EnvironmentAccessor()
        expect(fileAccessor.azureStorageAccount).toBe(FakeEnvironment.FAKE_AZURE_STORAGE_ACCOUNT)
    })

    test("reads azure storage access key correctly", () => {
        const fileAccessor = new EnvironmentAccessor()
        expect(fileAccessor.azureStorageAccessKey).toBe(FakeEnvironment.FAKE_AZURE_STORAGE_ACCESS_KEY)
    })
    test("reads bot instance name correctly", () => {
        const fileAccessor = new EnvironmentAccessor()
        expect(fileAccessor.botInstanceName).toBe(FakeEnvironment.FAKE_BOT_INSTANCE_NAME)
    })

    test("reads bot prefix name correctly", () => {
        const fileAccessor = new EnvironmentAccessor()
        expect(fileAccessor.botPrefix).toBe(FakeEnvironment.FAKE_BOT_PREFIX)
    })

    test("reads blob storage connection string correctly", () => {
        const fileAccessor = new EnvironmentAccessor()
        expect(fileAccessor.azureStorageBlobStorageConnectionstring).toBe(FakeEnvironment.FAKE_AZURE_STORAGE_BLOB_STORAGE_CONNECTIONSTRING)
    })
})

describe("EnvironmentAccessor getting invalid entries", () => {
    test("throws error if at least one entry is undefined", () => {
        delete process.env.DISCORD_TOKEN
        expect(() => new EnvironmentAccessor()).toThrow(Error)
    })
})