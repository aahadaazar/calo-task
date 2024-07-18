# Calo Task

This is an application using Fastify for backend and React on frontend to manage jobs data.

## Features

- **GET `/jobs`**: Fetches all jobs stored in `jobs.json`.
- **POST `/jobs`**: Creates a new job entry with validation using JSON schema.
- **GET `/jobs/:uuid`**: Retrieves a job by its UUID.

## Prerequisites

- Node.js installed on your machine

## Getting Started

1. Clone the repository:

2. Install dependencies:

   ```bash
   npm run install:all
   ```

3. Run the application:

   ```bash
   npm run start:all
   ```

# Backend

## Fetch all jobs

```bash
curl http://localhost:3001/jobs
```

## Create a new job

```bash
curl -X POST -H "Content-Type: application/json" -d '{"title":"New Job","description":"Job Description"' http://localhost:3001/jobs

```

## Retrieve a job by UUID

```bash
curl http://localhost:3001/jobs/:uuid
```

# Frontend

## Frontend runs on port 3000
