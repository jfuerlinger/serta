export interface IEnvironmentDao {
    getEnvironmentVariableOrUndefined(variableName: string) : string | undefined;
    getEnvironmentVariable(variableName: string) : string;
}
