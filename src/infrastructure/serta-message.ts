import {Message, User} from "eris";
import {FakeMessage} from "../tests/unit-tests/test-doubles/fake-message";
import {IMessage} from "./i-message";

export class SertaMessage implements IMessage {
    private _erisMessage: Message | FakeMessage

    get erisMessage(): Message | FakeMessage {
        return this._erisMessage
    }

    get mentions(): User[] {
        return this.erisMessage.mentions
    }

    constructor(erisMessage: Message | FakeMessage) {
        this._erisMessage = erisMessage
    }
}