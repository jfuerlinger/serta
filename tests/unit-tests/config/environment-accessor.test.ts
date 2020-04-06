import {EnvironmentAccessor} from "../../../src/config/configuration-builder";

const FAKE_DISCORD_TOKEN = "Any.SecretT0ken"
const FAKE_AZURE_STORAGE_ACCOUNT = "anystorageaccountstring"
const FAKE_AZURE_STORAGE_ACCESS_KEY = "anyStringCouldComeHere"
const FAKE_AZURE_STORAGE_BLOB_STORAGE_CONNECTIONSTRING = "ANY.BL0BST0RAGEC0NNECT10N5TR1NG"
const FAKE_BOT_PREFIX = "§"
const FAKE_BOT_INSTANCE_NAME = "AnyBotName"

describe("EnvironmentAccessor getting valid entries", () => {

    beforeEach(() => {
        process.env.DISCORD_TOKEN = FAKE_DISCORD_TOKEN
        process.env.AZURE_STORAGE_ACCOUNT = FAKE_AZURE_STORAGE_ACCOUNT
        process.env.AZURE_STORAGE_ACCESS_KEY = FAKE_AZURE_STORAGE_ACCESS_KEY
        process.env.BOT_INSTANCE_NAME = FAKE_BOT_INSTANCE_NAME
        process.env.BOT_PREFIX = FAKE_BOT_PREFIX
        process.env.AZURE_BLOBSTORAGE_CONNECTIONSTRING = FAKE_AZURE_STORAGE_BLOB_STORAGE_CONNECTIONSTRING
    })

    afterEach(() => {
        process.env.DISCORD_TOKEN = undefined
        process.env.AZURE_STORAGE_ACCOUNT = undefined
        process.env.AZURE_STORAGE_ACCESS_KEY = undefined
        process.env.BOT_INSTANCE_NAME = undefined
        process.env.BOT_PREFIX = undefined
        process.env.AZURE_BLOBSTORAGE_CONNECTIONSTRING = undefined
    })

    test("reads discord token correctly", () => {
        const fileAccessor = new EnvironmentAccessor()
        expect(fileAccessor.discordToken).toBe(FAKE_DISCORD_TOKEN)
    })

    test("reads azure storage account correctly", () => {
        const fileAccessor = new EnvironmentAccessor()
        expect(fileAccessor.azureStorageAccount).toBe(FAKE_AZURE_STORAGE_ACCOUNT)
    })

    test("reads azure storage access key correctly", () => {
        const fileAccessor = new EnvironmentAccessor()
        expect(fileAccessor.azureStorageAccessKey).toBe(FAKE_AZURE_STORAGE_ACCESS_KEY)
    })
    test("reads bot instance name correctly", () => {
        const fileAccessor = new EnvironmentAccessor()
        expect(fileAccessor.botInstanceName).toBe(FAKE_BOT_INSTANCE_NAME)
    })

    test("reads bot prefix name correctly", () => {
        const fileAccessor = new EnvironmentAccessor()
        expect(fileAccessor.botPrefix).toBe(FAKE_BOT_PREFIX)
    })

    test("reads blob storage connection string correctly", () => {
        const fileAccessor = new EnvironmentAccessor()
        expect(fileAccessor.azureStorageBlobStorageConnectionstring).toBe(FAKE_AZURE_STORAGE_BLOB_STORAGE_CONNECTIONSTRING)
    })
})

describe("EnvironmentAccessor getting invalid entries", () => {
    test("throws error if at least one entry is undefined", () => {

    })
})