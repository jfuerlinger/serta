const { BlobServiceClient } = require('@azure/storage-blob');

require('dotenv').config();

const createLogger = require('logging').default;
const logger = createLogger('storage-utils');

const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_BLOBSTORAGE_CONNECTIONSTRING;

export class StorageUtils {

  public static async getState(): Promise<any> {

    // Create the BlobServiceClient object which will be used to create a container client
    const blobServiceClient = await BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);

    logger.info('blogServiceclient instantiated');

    // Create a unique name for the container
    const containerName = 'discord-bot';// + uuidv1();

    // Get a reference to a container
    const containerClient = await blobServiceClient.getContainerClient(containerName);

    // Create a unique name for the blob
    const blobName = 'bot-state.json';

    // Get a block blob client
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    // Get blob content from position 0 to the end
    // In Node.js, get downloaded data by accessing downloadBlockBlobResponse.readableStreamBody
    // In browsers, get downloaded data by accessing downloadBlockBlobResponse.blobBody
    const downloadBlockBlobResponse = await blockBlobClient.download(0);
    logger.info('\nDownloaded blob content...');
    const streamAsString = await this.streamToString(downloadBlockBlobResponse.readableStreamBody);
    logger.debug('\t', streamAsString);

    return JSON.parse(streamAsString);
  }

  public static async persistState(state: any) {

    logger.info(state);

    // Create the BlobServiceClient object which will be used to create a container client
    const blobServiceClient = await BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);

    logger.info('blogServiceclient instantiated');

    // Create a unique name for the container
    const containerName = 'discord-bot';// + uuidv1();

    // Get a reference to a container
    const containerClient = await blobServiceClient.getContainerClient(containerName);

    // Create a unique name for the blob
    const blobName = 'bot-state.json';

    // Get a block blob client
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    logger.info('\nUploading to Azure storage as blob:\n\t', blobName);

    // Upload data to the blob
    const data = JSON.stringify(state);
    const uploadBlobResponse = await blockBlobClient.upload(data, data.length);
    logger.info("Blob was uploaded successfully. requestId: ", uploadBlobResponse.requestId);
  };

  // A helper function used to read a Node.js readable stream into a string
  private static async  streamToString(readableStream: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const chunks: Array<any> = [];
      readableStream.on("data", (data: any) => {
        chunks.push(data.toString());
      });
      readableStream.on("end", () => {
        resolve(chunks.join(""));
      });
      readableStream.on("error", reject);
    });
  }


  public static initStorageAccount = async () => {

    // Create the BlobServiceClient object which will be used to create a container client
    const blobServiceClient = await BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);

    logger.info('blogServiceclient instantiated');

    // Create a unique name for the container
    const containerName = 'discord-bot';// + uuidv1();

    logger.info('\nCreating container...');
    logger.info('\t', containerName);

    // Get a reference to a container
    const containerClient = await blobServiceClient.getContainerClient(containerName);

    // Create the container
    const createContainerResponse = await containerClient.create();
    logger.info("Container was created successfully. requestId: ", createContainerResponse.requestId);


    // Create a unique name for the blob
    const blobName = 'bot-state.json';

    logger.info('\nListing blobs...');

    // List the blob(s) in the container.
    for await (const blob of containerClient.listBlobsFlat()) {
      logger.info('\t', blob.name);
    }
  }

}