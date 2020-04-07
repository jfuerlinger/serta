import {CommandClient} from "eris";
import {FakeUser, fakeUsers} from "./fake-users";

export class FakeCommandClient extends CommandClient {
    constructor(users?: FakeUser[]) {
        super("a.fake.discord.token")
        if (users === undefined) {
            fakeUsers.forEach(u => this.users.add(u))
        } else {
            users.forEach(u => this.users.add(u))
        }
    }
}