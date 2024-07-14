import { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Select,
  MenuItem,
  Button,
  Skeleton,
} from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { GetAllPayment, GetUserByID } from "../../API/APIConfigure";
import { useNavigate } from "react-router-dom";

const DashBoardPayment = () => {
  const [payment, setPayment] = useState([]);
  const [selectedStatusFilter, setSelectedStatusFilter] = useState("all");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const fetchRealestates = async () => {
    setIsLoading(true);
    try {
      const response = await GetAllPayment();
      const payments = Array.isArray(response) ? response : [];
      for (let payment of payments) {
        try {
          const userResponse = await GetUserByID(payment.memberId);
          payment.memberId = userResponse.username;
        } catch (err) {
          console.error(err);
        }
      }
      setPayment(payments);
    } catch (err) {
      toast.error("Failed to fetch Realestates");
      console.error(err);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchRealestates();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredFeedback = payment.sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  const slicedPayment = filteredFeedback.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const statusTexts = {
    1: "Chờ thanh toán",
    2: "Đã thanh toán",
    3: "Đã hủy",
  };

  const statusColors = {
    1: "orange",
    2: "green",
    3: "red",
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Box component="main" sx={{ flexGrow: 1, p: 5 }}>
        <TableContainer component={Paper}>
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
            Báo cáo thanh toán
          </h2>
          {isLoading ? (
            <Skeleton
              animation="wave"
              variant="rectangular"
              height={300}
              width={1550}
            />
          ) : (
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell
                    style={{
                      fontSize: "20px",
                    }}
                    align="center"
                  >
                    Tài khoản
                  </TableCell>
                  <TableCell
                    style={{
                      fontSize: "20px",
                    }}
                    align="center"
                  >
                    Ngày tạo
                  </TableCell>
                  <TableCell
                    style={{
                      fontSize: "20px",
                    }}
                    align="center"
                  >
                    Loại thanh toán
                  </TableCell>
                  <TableCell
                    style={{
                      fontSize: "20px",
                    }}
                    align="center"
                  >
                    Giá
                  </TableCell>
                  <TableCell
                    style={{
                      fontSize: "20px",
                    }}
                    align="center"
                  >
                    Phí nền tảng
                  </TableCell>
                  <TableCell
                    style={{
                      fontSize: "20px",
                    }}
                    align="center"
                  >
                    Trạng thái
                  </TableCell>
                  <TableCell
                    style={{
                      fontSize: "20px",
                    }}
                    align="center"
                  >
                    Xem đơn
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {slicedPayment.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell align="center">{item.memberId}</TableCell>
                    <TableCell align="center">
                      {new Date(item.date).toLocaleString()}
                    </TableCell>
                    <TableCell align="center">{item.title}</TableCell>

                    <TableCell align="center">
                      {item.money.toLocaleString()}VNĐ
                    </TableCell>
                    <TableCell align="center">
                      {item.type !== "Premium"
                        ? ((item.money * 2.5) / 100).toLocaleString()
                        : item.money.toLocaleString()}
                      VNĐ
                    </TableCell>
                    <TableCell
                      style={{
                        color: statusColors[item.status],
                        fontWeight: "bold",
                      }}
                      align="center"
                    >
                      {statusTexts[item.status]}
                    </TableCell>
                    <TableCell align="center">
                      {item.type !== "Premium" && (
                        <Button
                          variant="outlined"
                          color="success"
                          className="edit-btn"
                          onClick={() =>
                            navigate(`/admin/booking/details/${item.bookingId}`)
                          }
                        >
                          <VisibilityIcon sx={{ fontSize: 25 }} />
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredFeedback.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </Box>
    </Box>
  );
};

export default DashBoardPayment;
