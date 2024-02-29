import { MongoClient } from 'mongodb';

let db;

async function dbConnect() {
  if (db) {
    return;
  }

  const client = await MongoClient.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  db = client.db();
}

export { dbConnect, db };