import {Message, User} from "eris";
import {FakeCommandClient} from "./fake-command-client";

export class FakeCommandMessage {
    public foo: string
    constructor(mentions: User[]) {
        // super({id: "df"}, new FakeCommandClient())
        this.foo = "Initd in FakeCommandMessage ctor"
        this.mentions = mentions
    }

    public foobar(): string {
        return "foobar"
    }

    mentions: User[];
}
