import { DbService } from "./db-service";
import { DbEntry } from "../model/db-entry";

var azure = require('azure');

export class SertaDbService implements DbService {

    init(): void {
        var tableService = azure.createTableService(); // implicitly use env variables

        tableService = azure.createTableService(
            process.env.AZURE_STORAGE_ACCOUNT,
            process.env.AZURE_STORAGE_ACCESS_KEY); // explicit

    }
    
    GetDbEntryByUserId(userId: number): DbEntry {
        throw new Error("Not yet implemented!");
    }

}