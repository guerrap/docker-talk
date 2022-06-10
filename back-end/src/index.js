import cors from "@fastify/cors";
import Fastify from "fastify";
import { database } from "./database/index.js";

const fastify = Fastify({
  logger: true,
});
fastify.register(cors, {
  origin: "*",
});

const databaseClient = await database();

fastify.post("/stuffs", async (request, reply) => {
  await databaseClient.insertStuff({
    name: request.body.name,
    weight: request.body.weight,
  });

  reply.status(201).send();
});

fastify.get("/stuffs", async (_, reply) => {
  const stuffs = await databaseClient.getStuff();

  reply.status(200).send(stuffs);
});

fastify.delete("/stuffs", async (_, reply) => {
  await databaseClient.deleteStuff();

  reply.status(200).send();
});

fastify.listen(3000, "0.0.0.0", (error, address) => {
  if (error) {
    fastify.log.error(error);
    process.exit(1);
  }

  console.info(`Server is now listeing on ${address}`);
});
