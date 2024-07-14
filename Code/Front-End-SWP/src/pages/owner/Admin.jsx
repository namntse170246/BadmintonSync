import Sidebar from '../../components/Owner/sidebar/Sidebar';
import Navbar from '../../components/Owner/navbar/Navbar';
import Box from '@mui/material/Box';
import Booking from '../../components/Owner/dashboard/Booking';
import TableBooking from '../../components/Owner/dashboard/TableBooking';
import PieUser from '../../components/Owner/dashboard/PieUser';
import Total from '../../components/Owner/dashboard/Total';
import LineChartTotal from '../../components/Owner/dashboard/LineChartTotal';
import './admin.css';
export default function OwnerAdmin() {
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
