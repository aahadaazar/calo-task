// src/components/Header.tsx
import { Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  const today = new Date().toLocaleDateString();

  return (
    <header className="header">
      <div className="header-content">
        <Link className="header-title" to="/">
          <Typography variant="h2">Job Listings</Typography>
        </Link>
        <Typography variant="subtitle1">As of: {today}</Typography>
      </div>
    </header>
  );
};

export default Header;
