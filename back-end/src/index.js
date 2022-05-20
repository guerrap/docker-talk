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

fastify.post("/raccoons", async (request, reply) => {
  await databaseClient.insertRaccoon({
    name: request.body.name,
    weight: request.body.weight,
  });

  reply.status(201).send();
});

fastify.get("/raccoons", async (_, reply) => {
  const raccoons = await databaseClient.getRaccoons();

  reply.status(200).send(raccoons);
});

fastify.delete("/raccoons", async (_, reply) => {
  const raccoons = await databaseClient.deleteRaccoons();

  reply.status(200).send(raccoons);
});

fastify.listen(3000, "0.0.0.0", (error, address) => {
  if (error) {
    fastify.log.error(error);
    process.exit(1);
  }

  console.info(`Server is now listeing on ${address}`);
});
