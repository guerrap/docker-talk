import { MongoClient } from "mongodb";

const getConnection = async () => {
  try {
    const client = new MongoClient(process.env.MONGO_CONNECTION_STRING);
    await client.connect();

    console.info("Connected to mongo db");

    return client;
  } catch (error) {
    console.error("Error connecting to mongo db", error);
    process.exit(1);
  }
};

const database = async () => {
  const client = await getConnection();

  return {
    insertRaccoon: async ({ name, weight }) => {
      try {
        await client
          .db("animals")
          .collection("raccoons")
          .insertOne({ name, weight });
      } catch (error) {
        throw new Error("Raccoon insert failed");
      }
    },
    getRaccoons: async () => {
      try {
        return await client
          .db("animals")
          .collection("raccoons")
          .find()
          .toArray();
      } catch (error) {
        throw new Error("Raccoons get failed");
      }
    },
    deleteRaccoons: async () => {
      try {
        await client.db("animals").collection("raccoons").deleteMany();
      } catch (error) {
        throw new Error("Raccoons delete failed");
      }
    },
  };
};

export { database, getConnection };
