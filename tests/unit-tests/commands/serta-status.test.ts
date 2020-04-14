import {SertaStatusCommand} from "../../../src/commands/serta-status/serta-status-command";
import {SertaUtils} from "../../../src/utils/serta-utils";
import {CommandClient} from "eris";
import * as Eris from "eris";

describe.skip("SertaStatus", () => {
    let commandClient: Eris.CommandClient

    beforeEach(() => {
        commandClient = new CommandClient("any.Token")
    })

    test("given a command client when the command is created then it is valid", () => {
        const sertaStatus = new SertaStatusCommand(commandClient)
        expect(sertaStatus).toBeTruthy()
    })

    test("given a valid command when execute is called some message is created", () => {
        // given
        const sertaStatus = new SertaStatusCommand(commandClient)
        jest.mock("eris")
        const msg = new Eris.Message({"id": "", type: Eris.TextChannel}, commandClient)
        console.log(msg.channel);
        let n = 0
        SertaUtils.createInfoMessage = () => n++

        // when
        sertaStatus.execute(msg, "")

        // then
        expect(n).toBe(1)
    })
})