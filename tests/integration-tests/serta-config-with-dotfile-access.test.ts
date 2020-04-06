import {DotEnvEnvironmentFileAccessor} from "../../src/config/configuration-builder";

const FAKE_DISCORD_TOKEN = "Any.SecretT0ken"
const FAKE_AZURE_STORAGE_ACCOUNT = "anystorageaccountstring"
const FAKE_AZURE_STORAGE_ACCESS_KEY = "anyStringCouldComeHere"
const FAKE_AZURE_STORAGE_BLOB_STORAGE_CONNECTIONSTRING = "ANY.BL0BST0RAGEC0NNECT10N5TR1NG"
const FAKE_BOT_PREFIX = "§"
const FAKE_BOT_INSTANCE_NAME = "AnyBotName"

describe(".env file accessor with existing .env file", () => {

    test("reads discord token correctly", () => {
        process.env.DISCORD_TOKEN = FAKE_DISCORD_TOKEN
        const fileAccessor = new DotEnvEnvironmentFileAccessor()
        expect(fileAccessor.discordToken).toBe(FAKE_DISCORD_TOKEN)
    })

    test("reads azure storage account correctly", () => {
        process.env.AZURE_STORAGE_ACCOUNT = FAKE_AZURE_STORAGE_ACCOUNT
        const fileAccessor = new DotEnvEnvironmentFileAccessor()
        expect(fileAccessor.azureStorageAccount).toBe(FAKE_AZURE_STORAGE_ACCOUNT)
    })

    test("reads azure storage access key correctly", () => {
        process.env.AZURE_STORAGE_ACCESS_KEY = FAKE_AZURE_STORAGE_ACCESS_KEY
        const fileAccessor = new DotEnvEnvironmentFileAccessor()
        expect(fileAccessor.azureStorageAccessKey).toBe(FAKE_AZURE_STORAGE_ACCESS_KEY)
    })
    test("reads bot instance name correctly", () => {
        process.env.BOT_INSTANCE_NAME = FAKE_BOT_INSTANCE_NAME
        const fileAccessor = new DotEnvEnvironmentFileAccessor()
        expect(fileAccessor.botInstanceName).toBe(FAKE_BOT_INSTANCE_NAME)
    })

    test("reads bot prefix name correctly", () => {
        process.env.BOT_PREFIX = FAKE_BOT_PREFIX
        const fileAccessor = new DotEnvEnvironmentFileAccessor()
        expect(fileAccessor.botPrefix).toBe(FAKE_BOT_PREFIX)
    })

    test("reads blob storage connection string correctly", () => {
        process.env.AZURE_BLOBSTORAGE_CONNECTIONSTRING = FAKE_AZURE_STORAGE_BLOB_STORAGE_CONNECTIONSTRING
        const fileAccessor = new DotEnvEnvironmentFileAccessor()
        expect(fileAccessor.azureStorageBlobStorageConnectionstring).toBe(FAKE_AZURE_STORAGE_BLOB_STORAGE_CONNECTIONSTRING)
    })
})