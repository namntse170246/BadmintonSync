import React, { useEffect, useState } from "react";
import { Box, Paper } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import { MenuItem, Select, TextField } from "@mui/material";

import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

import { GetAllAccounts, UpdateRole, UpdateStatus } from "../../API/APIConfigure";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRoleFilter, setSelectedRoleFilter] = useState("all");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await GetAllAccounts();
      setUsers(response.data);
    } catch (err) {
      setUsers([]);
      console.error(err);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRoleChange = async (userName, newRole) => {
    try {
      const roleMapping = {
        Owner: 1,
        User: 3,
        Staff: 2,
      };

      const roleId = roleMapping[newRole];
      console.log(roleId);
      await UpdateRole(userName, roleId);
      fetchUsers();
      toast.success("Role updated Successfully!");
    } catch (err) {
      toast.error("Failed to update role!");
      console.error(err);
    }
  };

  const handleStatusChange = async (userName, newStatus) => {
    try {
      const statusMapping = {
        Active: 0,
        Disable: 1,
      };

      const statusId = statusMapping[newStatus];
      console.log(userName, statusId);
      await UpdateStatus(userName, statusId); // Giả sử có API để cập nhật trạng thái
      fetchUsers();
      toast.success("Status updated Successfully!");
    } catch (err) {
      toast.error("Failed to update status!");
      console.error(err);
    }
  };

  const filteredUsers = users.filter((user) => {
    if (selectedRoleFilter !== "all" && user.roleType !== selectedRoleFilter) {
      return false;
    }

    if (searchTerm && !user.fullName.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }

    if (user.roleType === "Administrator") {
      return false;
    }

    return true;
  });

  const slicedUser = filteredUsers.slice(
    page * rowsPerPage,
    (page + 1) * rowsPerPage
  );

  return (
    <Box sx={{ display: "flex" }}>
      <Box component="main" sx={{ flexGrow: 1, p: 5 }}>
        <div className="main">
          <Select
            value={selectedRoleFilter}
            onChange={(e) => setSelectedRoleFilter(e.target.value)}
            style={{ marginTop: "30px" }}
          >
            <MenuItem value="all">All Role</MenuItem>
            <MenuItem value="Owner">Owner</MenuItem>
            <MenuItem value="User">User</MenuItem>
            <MenuItem value="Staff">Staff</MenuItem>
          </Select>
          <TextField
            label="Full Name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ marginTop: "30px", marginLeft: "20px" }}
          />
          <TableContainer component={Paper} className="dashboard-container">
            <h2
              style={{
                textAlign: "center",
                color: "#205295",
                fontSize: "40px",
                marginTop: "20px",
                marginBottom: "20px",
                fontWeight: "bold",
              }}
            >
              Account
            </h2>
            <Table
              sx={{ minWidth: 650 }}
              aria-label="simple table"
              className="staff-table"
            >
              <TableHead>
                <TableRow>
                  <TableCell
                    style={{
                      fontSize: "20px",
                    }}
                    
                  >
                    Username
                  </TableCell>
                  <TableCell
                    style={{
                      fontSize: "20px",
                    }}
                    
                  >
                    Tên
                  </TableCell>
                  <TableCell
                    style={{
                      fontSize: "20px",
                    }}
                    
                  >
                    SĐT
                  </TableCell>
                  <TableCell
                    style={{
                      fontSize: "20px",
                    }}
                    
                  >
                    Vai trò
                  </TableCell>
                  <TableCell
                    style={{
                      fontSize: "20px",
                    }}
                    
                  >
                    Trạng thái
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {slicedUser.map((user) => (
                  <TableRow key={user.userId}>
                    <TableCell style={{ fontSize: "13px" }} >
                      {user.userName}
                    </TableCell>

                    <TableCell style={{ fontSize: "13px" }} >
                      {user.fullName}
                    </TableCell>
                    <TableCell style={{ fontSize: "13px" }} >
                      {user.phone}
                    </TableCell>
                    <TableCell style={{ fontSize: "13px" }} >
                      <Select
                        value={user.roleType}
                        onChange={(e) => handleRoleChange(user.userName, e.target.value)}
                        style={{ minWidth: 120 }}
                      >
                        <MenuItem value="Owner">Owner</MenuItem>
                        <MenuItem value="User">User</MenuItem>
                        <MenuItem value="Staff">Staff</MenuItem>
                      </Select>
                    </TableCell>
                    <TableCell style={{ fontSize: "13px" }} >
                      <Select
                        value={user.userStatus === "0" ? "Active" : "Disable"}
                        onChange={(e) => handleStatusChange(user.userName, e.target.value)}
                        style={{ minWidth: 120 }}
                      >
                        <MenuItem value="Active">Active</MenuItem>
                        <MenuItem value="Disable">Disable</MenuItem>
                      </Select>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={filteredUsers.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableContainer>
        </div>
      </Box>
    </Box>
  );
};

export default Dashboard;
