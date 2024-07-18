import fs from "fs";

// Utility function to save a job to the file
export const saveJobToFile = (job, filePath) => {
  try {
    let jobs = [];
    // Check if the file exists
    if (fs.existsSync(filePath)) {
      const fileData = fs.readFileSync(filePath);
      jobs = JSON.parse(fileData);
    }
    jobs.push(job);
    // Write the new job to the file
    fs.writeFileSync(filePath, JSON.stringify(jobs, null, 2));
  } catch (err) {
    throw new Error(`Failed to save job to file: ${err.message}`);
  }
};

// Utility function to read jobs from the file
export const readJobsFromFile = (filePath) => {
  try {
    if (fs.existsSync(filePath)) {
      const fileData = fs.readFileSync(filePath);
      return JSON.parse(fileData);
    } else {
      throw new Error("Jobs file not found");
    }
  } catch (err) {
    throw new Error(`Failed to read jobs from file: ${err.message}`);
  }
};
