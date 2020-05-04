import { IEnvironmentDao } from "./i-environment-dao";

export class EnvironmentDao implements IEnvironmentDao {

    getEnvironmentVariable(variableName: string): string {
        let value = this.getEnvironmentVariableOrUndefined(variableName);
        if (!value) {
            throw new Error(`The environment variable '${variableName}' has not been set!`);
        }

        return value;
    }

    getEnvironmentVariableOrUndefined(variableName: string): string | undefined {
        return process.env[variableName];
    }
}
