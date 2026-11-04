import { MongoClient } from 'mongodb';

console.log("DB string: ", process.env.MONGODB_URI)

const client = new MongoClient(
  process.env.MONGODB_URI
);
await client.connect();

const db = client.db('arcade');
export default db;