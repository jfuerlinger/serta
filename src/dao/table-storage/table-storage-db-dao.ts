const createLogger = require('logging').default;
const logger = createLogger('db-dao');

require('dotenv').config();

import * as storage from "azure-storage"
import { DbTableEntry } from "../../model/table-storage-db-table-entry";
import { IAppConfigurationDao } from "../app-configuration/i-app-configuration-dao";


export abstract class DbDao<T extends DbTableEntry> {

    private isConfigured: boolean = false;
    private tableService: storage.TableService;


    protected get TableService(): storage.TableService { return this.tableService; }

    constructor(
        private appConfigurationDao: IAppConfigurationDao,
        private tableName: string,
        private partitionKey: string) { }

    private async ensureCorrectConfiguration(): Promise<void> {

        if (!this.isConfigured) {
            this.tableService = storage.createTableService(
                await this.appConfigurationDao.getEntry('as-account'),
                await this.appConfigurationDao.getEntry('as-access-key'));

            this.isConfigured = true;
        }

    }

    protected async getAll(partitionKey: string): Promise<T[]> {

        await this.ensureCorrectConfiguration();

        return new Promise<T[]>((resolve, reject) => {

            let query = new storage.TableQuery()
                .select()
                .where('PartitionKey eq ?', partitionKey);

            this.tableService.queryEntities<T>(
                this.tableName,
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

    protected async getRecord(rowKey: string): Promise<T | undefined> {

        await this.ensureCorrectConfiguration();

        return new Promise<T>((resolve, reject) => {
            try {
                this.tableService.retrieveEntity<T>(
                    this.tableName,
                    this.partitionKey,
                    rowKey,
                    (err: any, entity) => {

                        if (!err) {
                            resolve(this.tableRecordToJavacript(entity));
                        } else {
                            if (err.code === "ResourceNotFound") {
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

        await this.ensureCorrectConfiguration();

        return new Promise((resolve, reject) => {
            try {

                this.tableService.deleteEntity(
                    this.tableName, {
                    PartitionKey: this.partitionKey,
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

        await this.ensureCorrectConfiguration();

        record.PartitionKey = <string>this.partitionKey;

        return new Promise((resolve, reject) => {
            try {
                this.tableService.insertOrMergeEntity(this.tableName, this.convertToTableRecord(record), err => {

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