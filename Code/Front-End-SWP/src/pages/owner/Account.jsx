import React from "react";
import Box from "@mui/material/Box";
import Sidebar from "../../components/Owner/sidebar/Sidebar";
import Navbar from "../../components/Owner/navbar/Navbar";
import Account from "../../components/Owner/account/Account";
export default function OwnerAccount() {
  return (
    <div>
      <Navbar />
      <Box height={60} />
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Account />
        </Box>
      </Box>
    </div>
  );
}
