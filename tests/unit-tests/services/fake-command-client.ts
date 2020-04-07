import {CommandClient} from "eris";
import {FakeDiscordUser, fakeDiscordUsers} from "./fake-discord-users";

export class FakeCommandClient extends CommandClient {
    constructor(users?: FakeDiscordUser[]) {
        super("a.fake.discord.token")
        if (users === undefined) {
            fakeDiscordUsers.forEach(u => this.users.add(u))
        } else {
            users.forEach(u => this.users.add(u))
        }
    }
}