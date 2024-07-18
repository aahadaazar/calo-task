// src/components/JobList.tsx
import React from "react";
import { Grid, Typography } from "@mui/material";
import JobCard from "./JobCard";
import { JobListProps, JobType } from "../utils/types";

const JobList: React.FC<JobListProps> = ({ jobs }) => {
  if (jobs && jobs?.length === 0) {
    return (
      <Typography variant="h4" component="h1">
        No Jobs Found!
      </Typography>
    );
  }
  return (
    <Grid
      container
      spacing={2}
      sx={{
        overflowY: "auto",
        height: "calc(100vh - 200px)",
      }}
    >
      {jobs?.map((job: JobType, index: number) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={job.uuid}>
          <JobCard {...job} index={index} />
        </Grid>
      ))}
    </Grid>
  );
};

export default JobList;
