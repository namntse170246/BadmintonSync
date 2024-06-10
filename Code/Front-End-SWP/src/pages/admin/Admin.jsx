import Sidebar from '../../components/Admin/sidebar/Sidebar';
import Navbar from '../../components/Admin/navbar/Navbar';
import Box from '@mui/material/Box';
import Booking from '../../components/Admin/dashboard/Booking';
import TableBooking from '../../components/Admin/dashboard/TableBooking';
import PieUser from '../../components/Admin/dashboard/PieUser';
import Total from '../../components/Admin/dashboard/Total';
import LineChartTotal from '../../components/Admin/dashboard/LineChartTotal';
import './admin.css';
export default function Admin() {
  return (
    <div>
      <Navbar />
      <Box height={60} />
      <Box sx={{ display: 'flex' }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 3, p: 3 }}>
          <div className="adminContainer">
            <div className="adminTotal">
              <Total />
              <LineChartTotal />
            </div>
            <div className="adminPie">
              <PieUser />
            </div>
          </div>

          <div className="adminTableBooking">
            <div className="adminBooking">
              <Booking />
            </div>
            {/* <div className="adminChart"></div> */}
            <TableBooking />
          </div>
        </Box>
      </Box>
    </div>
  );
}
