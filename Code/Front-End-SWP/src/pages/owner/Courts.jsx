import React from "react";
import Box from "@mui/material/Box";
import Sidebar from "../../components/Owner/sidebar/Sidebar.jsx";
import Navbar from "../../components/Owner/navbar/Navbar.jsx";
import Dashboard from "../../components/Owner/courts/courtsDashBoard.jsx";

export default function OwnerCourts() {
  return (
    <div>
      <Navbar />
      <Box height={60} />
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Dashboard />
        </Box>
      </Box>
    </div>
  );
}
