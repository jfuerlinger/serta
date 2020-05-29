import {User} from "eris";

export class FakeMessage {
    private _mentions: User[]

    get mentions(): User[] {
        return this._mentions
    }
    constructor(mentions: User[]) {
        this._mentions = mentions
    }
}