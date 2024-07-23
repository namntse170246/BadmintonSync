import Sidebar from "../../components/Owner/sidebar/Sidebar";
import Navbar from "../../components/Owner/navbar/Navbar";
import Box from "@mui/material/Box";
import "./admin.css";
import PieChart from "../../components/Owner/dashboard/PieChart";
import TopBox from "../../components/Owner/dashboard/TopBox";

import BarChart from "../../components/Owner/dashboard/BarChart";

import TotalCourt from "../../components/Owner/dashboard/TotalCourts";

export default function OwnerAdmin() {
  return (
    <div>
      <Navbar />
      <Box height={60} />
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <div className="dashboard-home">
            <div className="box box1">
              <h1>Top Deals</h1>
              <TopBox />
            </div>
            <div className="box box3">
              <TotalCourt />
            </div>
            <div className="box box4">
              <h1>Bookings</h1>
              <PieChart></PieChart>
            </div>

            <div className="box box7">
              <h1>Monthly Bookings</h1>
              <BarChart></BarChart>
            </div>
          </div>
        </Box>
      </Box>
    </div>
  );
}
