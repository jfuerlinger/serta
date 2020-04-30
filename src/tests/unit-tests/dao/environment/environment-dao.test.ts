import { EnvironmentDao } from "../../../../dao/environment/environment-dao";
import { IEnvironmentDao } from "../../../../dao/environment/i-environment-dao";
import * as FakeEnvironment from "../../config/fake-environment";

const random = require('random');

describe("EnvironmentDao", () => {

    describe("EnvironmentDao.getEnvironmentVariableOrUndefined", () => {

        beforeAll(() => {
            FakeEnvironment.setup()
        })

        afterAll(() => {
            FakeEnvironment.tearDown()
        })

        test("it returns undefined when there is no environment variable with the given name", () => {

            // arrange
            const randomEnvironmentVariableName: string = `var_${random.int(0, 1000)}`;
            const dao: IEnvironmentDao = new EnvironmentDao();

            // act
            let actualValue = dao.getEnvironmentVariableOrUndefined(randomEnvironmentVariableName);

            // assert
            expect(actualValue).toBeUndefined();
        });

        test("it returns correct value for an existing environment variable", () => {

            // arrange
            const dao: IEnvironmentDao = new EnvironmentDao();

            // act
            let actualValue = dao.getEnvironmentVariableOrUndefined('VARIABLE_DUMMY');

            // assert
            expect(actualValue).toEqual(FakeEnvironment.FAKE_VARIABLE_DUMMY);
        });

        test.skip("it returns correct value for an existing environment variable (ignore-case)", () => {

            // arrange
            const dao: IEnvironmentDao = new EnvironmentDao();

            // act
            let actualValue = dao.getEnvironmentVariableOrUndefined('VARIABLE_DUMMY'.toLocaleLowerCase());

            // assert
            expect(actualValue).toEqual(FakeEnvironment.FAKE_VARIABLE_DUMMY);
        });
    });



    describe("EnvironmentDao.getEnvironmentVariable", () => {

        beforeAll(() => {
            FakeEnvironment.setup()
        })

        afterAll(() => {
            FakeEnvironment.tearDown()
        })

        test("it throws an error when there is no environment variable with the given name", () => {

            // arrange
            const randomEnvironmentVariableName: string = `var_${random.int(0, 1000)}`;
            const dao: IEnvironmentDao = new EnvironmentDao();

            // act / assert
            expect(() => { dao.getEnvironmentVariable(randomEnvironmentVariableName) }).toThrowError();
        });

        test("it returns correct value for an existing environment variable", () => {

            // arrange
            const dao: IEnvironmentDao = new EnvironmentDao();

            // act
            let actualValue = dao.getEnvironmentVariable('VARIABLE_DUMMY');

            // assert
            expect(actualValue).toEqual(FakeEnvironment.FAKE_VARIABLE_DUMMY);
        });

        test.skip("it returns correct value for an existing environment variable (ignore-case)", () => {

            // arrange
            const dao: IEnvironmentDao = new EnvironmentDao();

            // act
            let actualValue = dao.getEnvironmentVariable('VARIABLE_DUMMY'.toLocaleLowerCase());

            // assert
            expect(actualValue).toEqual(FakeEnvironment.FAKE_VARIABLE_DUMMY);
        });
    });
});


