import {SertaStatusCommand} from "../../../src/commands/serta-status/serta-status-command";
import {Client, CommandClient} from "eris";
import {SertaUtils} from "../../../src/utils/serta-utils";

describe("SertaStatus", () => {
    let commandClient: CommandClient
    beforeEach(() => {
        commandClient = new CommandClient("any.Token")
    })
    test("given a command client when the command is created then it is valid", () => {
        const sertaStatus = new SertaStatusCommand(commandClient)
        expect(sertaStatus).toBeTruthy()
    })

    test.skip("given a valid command when execute is called some message is created", () => {
        // given
        const sertaStatus = new SertaStatusCommand(commandClient)
        jest.mock("eris")
        const Message = require("eris")
        const msg = new Message({"id": ""}, new Client("", ))
        let n = 0
        SertaUtils.createInfoMessage = () => n++

        // when
        sertaStatus.execute(msg, "")

        // then
        expect(n).toBe(1)
    })
})