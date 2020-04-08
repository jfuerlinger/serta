import {Client, User} from "eris";

export class FakeDiscordUser extends User {
    constructor(id: string, userName: string) {
        super({id: "anyId"}, new Client("anyToken"))
        this.id = id
        this.username = userName
    }
}

export const fakeDiscordUsers = [
    new FakeDiscordUser("345983489535498349", "jfuerlinger"),
    new FakeDiscordUser("509427140832526336", "p.bauer"),
    new FakeDiscordUser("199455097837715458", "PewPewPew"),
    new FakeDiscordUser("204674824910405633", "LebenderFux")
    ]