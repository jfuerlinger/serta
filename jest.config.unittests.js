module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    rootDir: 'tests/unit-tests',
    testMatch: [ "**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).ts?(x)" ]
};