import React from "react";
import Box from "@mui/material/Box";
import Sidebar from "../../components/Admin/sidebar/Sidebar";
import Navbar from "../../components/Admin/navbar/Navbar";
import Dashboard from "../../components/Admin/booking/dashBoardBooking";

export default function About() {
  return (
    <div>
      <Navbar />
      <Box height={60} />
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Dashboard></Dashboard>
        </Box>
      </Box>
    </div>
  );
}
