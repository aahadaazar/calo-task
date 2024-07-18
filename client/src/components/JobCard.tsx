// src/components/JobCard.tsx
import React from "react";
import { Card, CardContent, Typography, CardMedia, Grow } from "@mui/material";
import { useNavigate } from "react-router-dom";

type JobCardProps = {
  uuid: string;
  title: string;
  description: string;
  timestamp: string;
  id: number;
  imgSrc: string;
  index: number;
};

const JobCard: React.FC<JobCardProps> = ({
  title,
  timestamp,
  imgSrc,
  uuid,
  index,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/job/${uuid}`);
  };

  const cardTransitionTimeout = 500 + index * 200;

  return (
    <Grow in={true} timeout={cardTransitionTimeout}>
      <Card className="job-card" onClick={handleClick}>
        <CardMedia component="img" height="140" image={imgSrc} alt={title} />
        <CardContent>
          <Typography gutterBottom variant="h5">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {new Date(timestamp).toLocaleDateString()}
          </Typography>
        </CardContent>
      </Card>
    </Grow>
  );
};

export default JobCard;
