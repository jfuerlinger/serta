import { DbService } from "./db-service";
import { DbEntry } from "../model/db-entry";

const createLogger = require('logging').default;
const logger = createLogger('SertaDbService');
require('dotenv').config();
//var azure = require('azure');

const util = require('util');

//import * as azure from 'azure-storage';
import * as storage from "azure-storage"
import { TableEntity } from "../model/table-entity";

export class SertaDbService implements DbService {

  private readonly _tableName: string = 'SertaUsers';
  private _tableService: storage.TableService;

  constructor() {

    logger.info('initializing the SertaDbService ...');
    this._tableService = storage.createTableService(
      process.env.AZURE_STORAGE_ACCOUNT!,
      process.env.AZURE_STORAGE_ACCESS_KEY!);
    logger.info('[DONE] SertaDbService initialized.');

  }

  GetAll(guildId: string): Promise<DbEntry[]> {

    const tableName: string = this._tableName;


    return new Promise<DbEntry[]>((resolve, reject) => {

      let query = new storage.TableQuery()
        .select()
        .where('PartitionKey eq ?', guildId);

      this._tableService.queryEntities<DbEntry>(
        this._tableName,
        query,
        <any>undefined,
        <any>undefined,
        (err, entities) => {
          if (err) {
            reject(err);
          } else {
            //logger.info(entities.entries)

            resolve(entities.entries.map((entry) => this.tableRecordToJavacript(entry)));
          }
        });
    });
  }

  async AddOrMergeRecord(record: TableEntity): Promise<TableEntity> {
    return new Promise((resolve, reject) => {
      try {
        const tr = this.convertToTableRecord(record);
        this._tableService.insertOrMergeEntity(this._tableName, tr, err => {
          if (err) throw err;
          resolve(record);
        });
      } catch (err) {
        reject(err);
      }
    });
  }

  private tableRecordToJavacript(entity: DbEntry): DbEntry {
    let result: any = {};
    Object.keys(entity).forEach(k => {
      // we do not want to decode metadata
      if (k !== ".metadata") {
        let prop = Object.getOwnPropertyDescriptor(entity, k);
        if (prop) {
          result[k] = prop.value["_"];
        }
      }
    });
    return result;
  }

  private convertToTableRecord(entity: TableEntity) {
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

  async GetRecord(partitionKey: string, rowKey: string): Promise<TableEntity> {
    return new Promise<TableEntity>((resolve, reject) => {
      this._tableService.retrieveEntity<TableEntity>(
        this._tableName,
        partitionKey,
        rowKey,
        (err, entity) => {
          if (err) throw err;
          resolve(entity);
        }
      );
    });
  }

  GetDbEntryByUserId(userId: string): Promise<DbEntry> {
    throw new Error("Not yet implemented!");
  }


  // private query(continuationToken : Azure.ContinuationToken) {
  //     let query = new Azure.TableQuery();

  //     this._tableService.queryEntities(
  //       this._tableName,
  //       query,
  //       continuationToken,
  //       function(error, result, response) {

  //         //HERE IS LOGIC

  //         if (result.continuationToken) {
  //           query(result.continuationToken);
  //         }
  //       }
  //     );
  //   }

}