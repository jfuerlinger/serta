import {IEnvironmentFileAccessor} from "./i-environment-file-accessor";

export class SertaConfiguration {
    commandClientConfiguration = {
        botPrefix: "!"
    }
    constructor(environmentFileAccessor: IEnvironmentFileAccessor) {
        if (environmentFileAccessor.botPrefix === "") {
            throw new Error("Environment does not provide a bot prefix")
        }
        this.commandClientConfiguration.botPrefix = environmentFileAccessor.botPrefix
    }
}