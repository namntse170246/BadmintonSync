import React from "react";
import Box from "@mui/material/Box";
import Sidebar from "../../components/Admin/sidebar/Sidebar";
import Navbar from "../../components/Admin/navbar/Navbar";
import DashBoardPayment from "../../components/Admin/payment/DashBoardPayment";

export default function Wallet() {
  return (
    <div>
      <Navbar />
      <Box height={60} />
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DashBoardPayment />
        </Box>
      </Box>
    </div>
  );
}
