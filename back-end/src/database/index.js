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
    insertStuff: async ({ name, weight }) => {
      try {
        await client
          .db("warehouse")
          .collection("stuff")
          .insertOne({ name, weight });
      } catch (error) {
        throw new Error("stuff insert failed");
      }
    },
    getStuff: async () => {
      try {
        return await client
          .db("warehouse")
          .collection("stuff")
          .find()
          .toArray();
      } catch (error) {
        throw new Error("stuff get failed");
      }
    },
    deleteStuff: async () => {
      try {
        await client.db("warehouse").collection("stuff").deleteMany();
      } catch (error) {
        throw new Error("stuff delete failed");
      }
    },
  };
};

export { database, getConnection };
