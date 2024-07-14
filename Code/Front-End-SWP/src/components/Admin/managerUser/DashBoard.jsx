import React, { useEffect, useState } from "react";
import { Box, Paper, Button } from "@mui/material";
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

import { GetAllAccounts, UpdateRole } from "../../API/APIConfigure";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatusFilter, setSelectedStatusFilter] = useState("all");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await GetAllAccounts();
      console.log(response.data);
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
        Administrator: 0,
        Manager: 1,
        Staff: 2,
        User: 3,
      };

      const roleId = roleMapping[newRole];

      console.log(userName, roleId);
      await UpdateRole(userName, roleId);
      fetchUsers();
      toast.success("Role updated Successfully!");
    } catch (err) {
      toast.error("Failed to update role!");
      console.error(err);
    }
  };

  const filteredStatus = users.filter((user) => {
    // Filter by roleType
    if (selectedStatusFilter !== "all" && user.roleType !== selectedStatusFilter) {
      return false;
    }

    // Filter by username
    if (searchTerm && !user.userName.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }

    return true;
  });

  const slicedUser = filteredStatus.slice(
    page * rowsPerPage,
    (page + 1) * rowsPerPage
  );

  return (
    <Box sx={{ display: "flex" }}>
      <Box component="main" sx={{ flexGrow: 1, p: 5 }}>
        <div className="main">
          <Select
            value={selectedStatusFilter}
            onChange={(e) => setSelectedStatusFilter(e.target.value)}
            style={{ marginTop: "30px" }}
          >
            <MenuItem value="all">All Role</MenuItem>
            <MenuItem value="Administrator">Administrator</MenuItem>
            <MenuItem value="User">User</MenuItem>
            <MenuItem value="Manager">Manager</MenuItem>
            <MenuItem value="Staff">Staff</MenuItem>
          </Select>
          <TextField
            label="Username"
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
                    align="center"
                  >
                    Username
                  </TableCell>
                  <TableCell
                    style={{
                      fontSize: "20px",
                    }}
                    align="center"
                  >
                    Full Name
                  </TableCell>
                  <TableCell
                    style={{
                      fontSize: "20px",
                    }}
                    align="center"
                  >
                    Phone
                  </TableCell>
                  <TableCell
                    style={{
                      fontSize: "20px",
                    }}
                    align="center"
                  >
                    Role
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {slicedUser.map((user) => (
                  <TableRow key={user.userId}>
                    <TableCell style={{ fontSize: "13px" }} align="center">
                      {user.userName}
                    </TableCell>

                    <TableCell style={{ fontSize: "13px" }} align="center">
                      {user.fullName}
                    </TableCell>
                    <TableCell style={{ fontSize: "13px" }} align="center">
                      {user.phone}
                    </TableCell>
                    <TableCell style={{ fontSize: "13px" }} align="center">
                      <Select
                        value={user.roleType}
                        onChange={(e) => handleRoleChange(user.userName, e.target.value)}
                        style={{ minWidth: 120 }}
                      >
                        <MenuItem value="Administrator">Administrator</MenuItem>
                        <MenuItem value="User">User</MenuItem>
                        <MenuItem value="Manager">Manager</MenuItem>
                        <MenuItem value="Staff">Staff</MenuItem>
                      </Select>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={users.length}
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
