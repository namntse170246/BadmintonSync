import React from "react";
import Box from "@mui/material/Box";
import Sidebar from "../../components/Owner/sidebar/Sidebar";
import Navbar from "../../components/Owner/navbar/Navbar";
import ViewDetailsBooking from "../../components/Owner/booking/viewDetailsBooking";

export default function OwnerDetailsBooking() {
  return (
    <div>
      <Navbar />
      <Box height={60} />
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <ViewDetailsBooking />
        </Box>
      </Box>
    </div>
  );
}
