const createLogger = require('logging').default;
const logger = createLogger('db-dao');

require('dotenv').config();

import * as storage from "azure-storage"
import { DbTableEntry } from "../../model/table-storage-db-table-entry";


export abstract class DbDao<T extends DbTableEntry> {

    private _tableService: storage.TableService;

    protected get tableService(): storage.TableService { return this._tableService; }

    constructor(
        private _tableName: string,
        private _partitionKey: string) {

        logger.info('initializing the SertaDbService ...');
        this._tableService = storage.createTableService(
            process.env.AZURE_STORAGE_ACCOUNT!,
            process.env.AZURE_STORAGE_ACCESS_KEY!);
        logger.info('[DONE] SertaDbService initialized.');

    }

    protected getAll(partitionKey: string): Promise<T[]> {

        return new Promise<T[]>((resolve, reject) => {

            let query = new storage.TableQuery()
                .select()
                .where('PartitionKey eq ?', partitionKey);

            this._tableService.queryEntities<T>(
                this._tableName,
                query,
                <any>undefined,
                <any>undefined,
                (err, entities) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(entities.entries.map((entry) => this.tableRecordToJavacript(entry)));
                    }
                });
        });
    }

    protected async getRecord(rowKey: string): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            try {
                this._tableService.retrieveEntity<T>(
                    this._tableName,
                    this._partitionKey,
                    rowKey,
                    (err : any, entity) => {

                        if (!err) {
                            resolve(this.tableRecordToJavacript(entity));
                        } else {
                            if(err.code === "ResourceNotFound") {
                                resolve(undefined);
                            }
                        }
                    }
                );
            } catch (err) {
                reject(err);
            }
        });
    }

    protected async deleteRecord(rowKey: string): Promise<any> {
        return new Promise((resolve, reject) => {
            try {

                this._tableService.deleteEntity(
                    this._tableName, {
                    PartitionKey: this._partitionKey,
                    RowKey: rowKey
                },
                (err, response) => {
                    
                    if (err) {
                        throw err;
                    }
                    resolve(response);
                });
            } catch (err) {
                reject(err);
            }
        });
    }

    protected async addOrMergeRecord(record: T): Promise<T> {

        record.PartitionKey = <string>this._partitionKey;

        return new Promise((resolve, reject) => {
            try {
                this._tableService.insertOrMergeEntity(this._tableName, this.convertToTableRecord(record), err => {

                    if (err) {
                        throw err;
                    }

                    resolve(record);
                });
            } catch (err) {
                reject(err);
            }
        });
    }

    private convertToTableRecord<T extends DbTableEntry>(entity: T) {
        
        entity.RowKey = entity.id;
        
        let result: any = {};
        Object.keys(entity).forEach(k => {
            let prop = Object.getOwnPropertyDescriptor(entity, k);
            if (prop) {
                result[k] = new storage.TableUtilities.entityGenerator.EntityProperty(
                    prop.value
                );
            }
        });
        return result;
    }

    private tableRecordToJavacript<T extends DbTableEntry>(entity: T): T {
        let result: any = {};
        Object.keys(entity).forEach(k => {

            if (k !== ".metadata") {
                let prop = Object.getOwnPropertyDescriptor(entity, k);
                if (prop) {
                    result[k] = prop.value["_"];
                }
            }


        });
        return result;
    }
}