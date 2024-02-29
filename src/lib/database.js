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
} catch (error) {
    console.error('Une erreur est survenue lors de la connexion à la base de données :', error);
    throw error; // Vous pouvez choisir de relancer l'erreur pour interrompre l'exécution du programme
}
}

export { dbConnect, db };