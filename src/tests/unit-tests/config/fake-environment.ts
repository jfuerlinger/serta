export const FAKE_DISCORD_TOKEN = "Any.SecretT0ken"
export const FAKE_AZURE_STORAGE_ACCOUNT = "anystorageaccountstring"
export const FAKE_AZURE_STORAGE_ACCESS_KEY = "anyStringCouldComeHere"
export const FAKE_AZURE_STORAGE_BLOB_STORAGE_CONNECTIONSTRING = "ANY.BL0BST0RAGEC0NNECT10N5TR1NG"
export const FAKE_BOT_PREFIX = "§"
export const FAKE_BOT_INSTANCE_NAME = "AnyBotName"

export const FAKE_VARIABLE_DUMMY = "SomeValue"
export const FAKE_AZURE_TENANT_ID = "48a030a3-3202-4b74-93a7-cc5da48ff1f6"
export const FAKE_AZURE_CLIENT_ID = "1c33abe7-2221-4eff-9ab9-0b1409252fb8"
export const FAKE_AZURE_CLIENT_SECRET = "np5RYEG7tr9ewY1"

export function setup() {
    process.env.DISCORD_TOKEN = FAKE_DISCORD_TOKEN
    process.env.AZURE_STORAGE_ACCOUNT = FAKE_AZURE_STORAGE_ACCOUNT
    process.env.AZURE_STORAGE_ACCESS_KEY = FAKE_AZURE_STORAGE_ACCESS_KEY
    process.env.BOT_INSTANCE_NAME = FAKE_BOT_INSTANCE_NAME
    process.env.BOT_PREFIX = FAKE_BOT_PREFIX
    process.env.AZURE_BLOBSTORAGE_CONNECTIONSTRING = FAKE_AZURE_STORAGE_BLOB_STORAGE_CONNECTIONSTRING
    
    process.env.VARIABLE_DUMMY = FAKE_VARIABLE_DUMMY;
    process.env.AZURE_TENANT_ID = FAKE_AZURE_TENANT_ID;
    process.env.AZURE_CLIENT_ID = FAKE_AZURE_CLIENT_ID;
    process.env.AZURE_CLIENT_SECRET = FAKE_AZURE_CLIENT_SECRET;
}

export function tearDown() {
    delete process.env.DISCORD_TOKEN
    delete process.env.AZURE_STORAGE_ACCOUNT
    delete process.env.AZURE_STORAGE_ACCESS_KEY
    delete process.env.BOT_INSTANCE_NAME
    delete process.env.BOT_PREFIX
    delete process.env.AZURE_BLOBSTORAGE_CONNECTIONSTRING
    
    delete process.env.VARIABLE_DUMMY;
    delete process.env.FAKE_AZURE_TENANT_ID;
    delete process.env.FAKE_AZURE_CLIENT_ID;
    delete process.env.FAKE_AZURE_CLIENT_SECRET;
}