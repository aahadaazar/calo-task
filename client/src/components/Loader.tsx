// Loader.tsx
import React from "react";
import Box from "@mui/material/Box";
import { LinearProgress } from "@mui/material";

const Loader: React.FC = () => {
  return (
    <Box className="loader-container">
      <LinearProgress className="linear-loader" />
    </Box>
  );
};

export default Loader;
