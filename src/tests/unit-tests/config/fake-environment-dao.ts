import { IEnvironmentDao } from "../../../dao/environment/i-environment-dao";

export class FakeEnvironmentDao implements IEnvironmentDao {
    getEnvironmentVariableOrUndefined(variableName: string): string | undefined {
        switch (variableName) {
            case 'discord-token': return "lkjsadflkj";
            case 'bot-prefix': return "!";
            case 'bot-instance-name': return "Peter";
            case 'azure-storage-account': return "p.bauer";
            case 'azure-storage-accesskey': return "sdfkjlsdfkjlsdf";
            case 'azure-storage-blob-storage-connectionstring': return "ljldfssdflj";

            default:
                return undefined;
        }
    }

    getEnvironmentVariable(variableName: string): string {

        let value = this.getEnvironmentVariableOrUndefined(variableName);
        if (!value) {
            throw new Error(`The environment variable '${variableName}' has not been set!`);
        }
        else {
            return value;
        }
    }

}