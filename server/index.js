import Fastify from "fastify";
import fastifyFormbody from "@fastify/formbody";
import cors from "@fastify/cors";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import { fileURLToPath } from "url";
import { saveJobToFile, readJobsFromFile } from "./utils.js";
import axios from "axios";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Using URL since ECMAScript doesn't have __dirname inbuilt
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const jobsFileName = "jobs.json";
let createdJobsIndex = 0;

// Port for running the app
const port = process.env.PORT || 3001;

// Initialize Fastify
const fastify = Fastify({
  logger: true,
  requestTimeout: 30000, // 30 seconds
});

await fastify.register(cors, {
  origin: "http://localhost:3000",
});

// Register the formbody plugin to parse the form data
fastify.register(fastifyFormbody);

// JSON schema for job form data validation
const jobSchema = {
  type: "object",
  required: ["title", "description"],
  properties: {
    title: { type: "string" },
    description: { type: "string" },
  },
};

// GET call for jobs (fetches all jobs)
fastify.get("/jobs", (request, reply) => {
  try {
    const filePath = path.join(__dirname, jobsFileName);
    const jobs = readJobsFromFile(filePath);
    reply.send(jobs);
  } catch (err) {
    request.log.error(err);
    reply
      .status(500)
      .send({ error: "Internal Server Error", message: err.message });
  }
});

// POST call for jobs (creates a job)
fastify.post("/jobs", { schema: jobSchema }, async (request, reply) => {
  try {
    const { title, description } = request.body;
    createdJobsIndex += 1;

    // Make the GET request to the Unsplash API
    const unsplashResponse = await axios.get(
      "https://api.unsplash.com/photos/random?orientation=landscape",
      {
        headers: {
          Authorization: `Client-ID ${process.env.UNSPLASH_API_KEY}`, // Replace 'abc' with your actual Unsplash API key
        },
      }
    );
    const imgSrc = unsplashResponse.data.urls.full;

    const newJob = {
      uuid: uuidv4(),
      title,
      description,
      timestamp: new Date().toISOString(),
      id: createdJobsIndex,
      imgSrc,
    };

    const filePath = path.join(__dirname, jobsFileName);

    // Save the new job to the file
    saveJobToFile(newJob, filePath);
    return reply.send(newJob);
  } catch (error) {
    return reply.send(error);
  }
});

// GET route to retrieve a job by its UUID
fastify.get("/jobs/:uuid", async (request, reply) => {
  try {
    const { uuid } = request.params;
    const filePath = path.join(__dirname, jobsFileName);
    const jobs = readJobsFromFile(filePath);

    const job = jobs.find((job) => job.uuid === uuid);

    if (job) {
      return reply.send(job);
    } else {
      return reply.status(404).send({ error: "Job Not Found" });
    }
  } catch (err) {
    request.log.error(err);
    return reply
      .status(500)
      .send({ error: "Internal Server Error", message: err.message });
  }
});

// Start the server
fastify.listen({ port }, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  fastify.log.info(`Fastify is listening on port: ${address}`);
});
