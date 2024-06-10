import Box from "@mui/material/Box";
import Sidebar from "../../components/Admin/sidebar/Sidebar";
import Navbar from "../../components/Admin/navbar/Navbar";

export default function Trade() {
    return (
        <div>
            <Navbar />
            <Box height={60} />
            <Box sx={{ display: "flex" }}>
                <Sidebar />
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <h1>Trade</h1>
                </Box>
            </Box>
        </div>
    );
}
