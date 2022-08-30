import { MongoClient, Db } from 'mongodb';
import { logger } from './logger';
import * as dotenv from 'dotenv';
dotenv.config();

let client: MongoClient;
let db: Db;

export const getClient = async () => {
  if (client) {
    logger.info('return exit client');
    return client;
  }
  let dbUri: any = process.env['dbURI'];
  const clientInstance: MongoClient = new MongoClient(dbUri);

  const clientConnected = await clientInstance.connect();
  client = clientConnected;
  logger.info('return new client');
  return client;
};

export const getDb = async () => {
  if (db) {
    logger.info('return exist db');
    return db;
  }

  let clientInstanace = await getClient();
  db = clientInstanace.db();
  logger.info('return new db');
  return db;
};
