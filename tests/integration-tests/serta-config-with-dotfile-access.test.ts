import {DotEnvEnvironmentFileAccessor} from "../../src/config/configuration-builder";

const fs = require("fs")

const PROJECT_ROOT = "."
const DOT_ENV_PATH = PROJECT_ROOT + "/.env"
const DOT_ENV_BACKUP = PROJECT_ROOT + "/.env.sav"

const DOT_ENV_FILE_CONTENT = "DISCORD_TOKEN=ASecretT0ken\n" +
    "AZURE_STORAGE_ACCOUNT=firstaccountever\n" +
    "AZURE_STORAGE_ACCESS_KEY=th35t0rAgeAcc355key\n" +
    "AZURE_BLOBSTORAGE_CONNECTIONSTRING=BL0BST0RAGEC0NNECT10N5TR1NG\n" +
    "BOT_PREFIX='!'\n" +
    "BOT_INSTANCE_NAME='Peter'\n"

describe(".env file accessor with existing .env file", () => {
    afterEach(() => {
        fs.unlinkSync(DOT_ENV_PATH)
        fs.renameSync(DOT_ENV_BACKUP, DOT_ENV_PATH)
    })

    test("reads bot instance name correctly", () => {
        setupTestDotEnvFile();
        const fileAccessor = new DotEnvEnvironmentFileAccessor()
        expect(fileAccessor.botInstanceName).toBe("Peter")
    })

    test("reads bot prefix name correctly", () => {
        setupTestDotEnvFile();
        const fileAccessor = new DotEnvEnvironmentFileAccessor()
        expect(fileAccessor.botPrefix).toBe("!")
    })

    test("reads discord token correctly", () => {
        setupTestDotEnvFile();
        const fileAccessor = new DotEnvEnvironmentFileAccessor()
        expect(fileAccessor.discordToken).toBe("ASecretT0ken")
    })

    test("reads azur storage account correctly", () => {
        setupTestDotEnvFile();
        const fileAccessor = new DotEnvEnvironmentFileAccessor()
        expect(fileAccessor.azureStorageAccount).toBe("firstaccountever")
    })
})

let setupTestDotEnvFile = function () {
    checkWhetherDotEnvFileExists()
    fs.renameSync(DOT_ENV_PATH, DOT_ENV_BACKUP)
    fs.writeFileSync(DOT_ENV_PATH, DOT_ENV_FILE_CONTENT)
};

function checkWhetherDotEnvFileExists(): void {
    if (!fs.existsSync(DOT_ENV_PATH)) {
        throw Error(".env file not found or project root not found")
    }
}