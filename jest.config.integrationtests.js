module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    rootDir: 'src/tests/integration-tests',
    testMatch: [ "**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).ts?(x)" ]
};