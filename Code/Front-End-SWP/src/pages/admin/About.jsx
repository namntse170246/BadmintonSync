import React from "react";
import Box from "@mui/material/Box";
import Sidebar from "../../components/Admin/sidebar/Sidebar";
import Navbar from "../../components/Admin/navbar/Navbar";
import { Skeleton } from "@mui/material";

export default function About() {
  return (
    <div>
      <Navbar />
      <Box height={60} />
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <h3>About</h3>
          <Skeleton variant="rectangular" width={210} height={118} />
        </Box>
      </Box>
    </div>
  );
}
