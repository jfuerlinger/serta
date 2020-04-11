import {UserService} from "../../services/user-service";
import {StatusInformation} from "./status-message-layouter";

export class StatusReporter {
    constructor(userService: UserService) {

    }

    getStatus(discordUserName: string): StatusInformation {
        return {levelId: 1, immunizationLevel: 15, name: "p.bauer"}
    }
}