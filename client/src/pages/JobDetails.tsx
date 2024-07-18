// src/components/JobDetails.tsx
import React from "react";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import { getJobById } from "../utils/queryClient";
import { useQuery } from "react-query";
import { JobListProps } from "../utils/types";
import { Box, Grid, Grow, Typography } from "@mui/material";
import { styled } from "@mui/system";

const TitleWithDate = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  marginBottom: 10,
  [theme.breakpoints.down("sm")]: {
    alignItems: "center",
  },
}));

const DetailsContainer = styled(Box)(({ theme }) => ({
  textAlign: "left",
  [theme.breakpoints.down("sm")]: {
    textAlign: "center",
  },
}));

const JobDetails: React.FC = () => {
  const { uuid } = useParams<{ uuid: string }>();

  const { data: job, isLoading } = useQuery<JobListProps, Error>(
    ["jobById", uuid],
    getJobById
  );

  if (isLoading) {
    return <Loader />;
  }

  if (!job) {
    return <div>Job not found</div>;
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grow in={true} timeout={1000}>
        <Grid container spacing={2} alignItems="start">
          <Grid item xs={12} md={6}>
            <img
              src={job.imgSrc}
              alt={job.title}
              style={{ width: "100%", height: "auto" }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DetailsContainer>
              <TitleWithDate>
                <Typography variant="h4" component="h1">
                  {job.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{ color: "#ccc" }}
                >
                  {new Date(job.timestamp).toLocaleDateString()}
                </Typography>
              </TitleWithDate>
              <Typography variant="body1" paragraph>
                {job.description}
              </Typography>
            </DetailsContainer>
          </Grid>
        </Grid>
      </Grow>
    </Box>
  );
};

export default JobDetails;
