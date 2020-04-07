import {Client, User} from "eris";

export class FakeUser extends User {
    constructor(id: string, userName: string) {
        super({id: "anyId"}, new Client("anyToken"))
        this.id = id
        this.username = userName
    }
}

export const fakeUsers = [
    new FakeUser("345983489535498349", "jfuerlinger"),
    new FakeUser("509427140832526336", "p.bauer"),
    new FakeUser("199455097837715458", "PewPewPew"),
    new FakeUser("204674824910405633", "LebenderFux")
    ]