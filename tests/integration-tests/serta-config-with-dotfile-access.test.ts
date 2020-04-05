import {DotEnvEnvironmentFileAccessor} from "../../src/config/configuration-builder";

const fs = require("fs")

const PROJECT_ROOT = "."
const DOT_ENV_PATH = PROJECT_ROOT + "/.env"
const DOT_ENV_BACKUP = PROJECT_ROOT + "/.env.sav"

const DOT_ENV_FILE_CONTENT = "DISCORD_TOKEN=NjkyMDQ4NTA3MTMyOTY5MDAw.Xno2gw.i5cysRHxgnKqJDtyYtaWSDP0Oac\n" +
    "AZURE_STORAGE_ACCOUNT=jfuerlingerdiscord\n" +
    "AZURE_STORAGE_ACCESS_KEY=0P9vQf4k+I3msl2392BWS5ykG7C36HISRP7i/Md0Jk6s8kSFR2cGHEGbOErliNcrISeRJ8hL3eJWRQ3Bw8rLsA==\n" +
    "AZURE_BLOBSTORAGE_CONNECTIONSTRING=DefaultEndpointsProtocol=https;AccountName=jfuerlingerdiscord;AccountKey=0P9vQf4k+I3msl2392BWS5ykG7C36HISRP7i/Md0Jk6s8kSFR2cGHEGbOErliNcrISeRJ8hL3eJWRQ3Bw8rLsA==;EndpointSuffix=core.windows.net\n" +
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