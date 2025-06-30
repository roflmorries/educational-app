import { MongoClient } from 'mongodb';
import 'dotenv/config'

const DB_USER = process.env.DB_USER || 'root';
const DB_PASSWORD = process.env.DB_PASSWORD || 'root_pwd';
const DB_HOST = process.env.DB_HOST || 'mongo';
const DB_PORT = process.env.DB_PORT || '27017';
const DB_NAME = process.env.DB_NAME || 'educational-app';

const uri = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`;

const client = new MongoClient(uri);
let db;

export const connectDB = async () => {
  try {
    await client.connect();
    db = client.db(DB_NAME);
    console.log(`Connected to MongoDB at ${DB_HOST}:${DB_PORT}`);
    return db;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
};

export const getDB = () => {
  if (!db) {
    throw new Error('Database not connected')
  }
  return db;
}