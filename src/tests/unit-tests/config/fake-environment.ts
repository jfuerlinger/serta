export const FAKE_DISCORD_TOKEN = "Any.SecretT0ken"
export const FAKE_AZURE_STORAGE_ACCOUNT = "anystorageaccountstring"
export const FAKE_AZURE_STORAGE_ACCESS_KEY = "anyStringCouldComeHere"
export const FAKE_AZURE_STORAGE_BLOB_STORAGE_CONNECTIONSTRING = "ANY.BL0BST0RAGEC0NNECT10N5TR1NG"
export const FAKE_BOT_PREFIX = "§"
export const FAKE_BOT_INSTANCE_NAME = "AnyBotName"

export function setup() {
    process.env.DISCORD_TOKEN = FAKE_DISCORD_TOKEN
    process.env.AZURE_STORAGE_ACCOUNT = FAKE_AZURE_STORAGE_ACCOUNT
    process.env.AZURE_STORAGE_ACCESS_KEY = FAKE_AZURE_STORAGE_ACCESS_KEY
    process.env.BOT_INSTANCE_NAME = FAKE_BOT_INSTANCE_NAME
    process.env.BOT_PREFIX = FAKE_BOT_PREFIX
    process.env.AZURE_BLOBSTORAGE_CONNECTIONSTRING = FAKE_AZURE_STORAGE_BLOB_STORAGE_CONNECTIONSTRING
}

export function tearDown() {
    delete process.env.DISCORD_TOKEN
    delete process.env.AZURE_STORAGE_ACCOUNT
    delete process.env.AZURE_STORAGE_ACCESS_KEY
    delete process.env.BOT_INSTANCE_NAME
    delete process.env.BOT_PREFIX
    delete process.env.AZURE_BLOBSTORAGE_CONNECTIONSTRING
}