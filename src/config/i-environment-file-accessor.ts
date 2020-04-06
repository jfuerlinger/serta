export interface IEnvironmentFileAccessor {
    discordToken: string
    botPrefix: string
    botInstanceName: string

    azureStorageAccount: string
    azureStorageAccessKey: string
    azureStorageBlobStorageConnectionstring: string
}