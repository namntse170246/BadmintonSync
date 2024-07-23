import Sidebar from "../../components/Admin/sidebar/Sidebar";
import Navbar from "../../components/Admin/navbar/Navbar";
import Box from "@mui/material/Box";
import "./admin.css";
import UserDoughnutChart from "../../components/Admin/dashboard/UserDoughnutChart";
import TotalCourtsDoughnutChart from "../../components/Admin/dashboard/TotalCourtsDoughnutChart";
export default function Admin() {
  return (
    <div>
      <Navbar />
      <Box height={60} />
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <div className="dashboard-home">
            <div className="box box10">
              <h1>Total Accounts </h1>
              <UserDoughnutChart></UserDoughnutChart>
            </div>
            <div className="box box11">
              <h1>Total Courts</h1>
              <TotalCourtsDoughnutChart />
            </div>
          </div>
        </Box>
      </Box>
    </div>
  );
}
