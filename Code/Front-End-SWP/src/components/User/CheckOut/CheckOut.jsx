import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../../navbar/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboard } from "@fortawesome/free-solid-svg-icons";
import { faUserTie } from "@fortawesome/free-solid-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";

import {
  CancelBookingBeforePayment,
  CancelBookingAfterPayment,
  CheckinBooking,
  CreateCheckIn,
  GetAllBookingsByID,
  GetbyCourtID,
  GetbySubCourtID,
} from "../../API/APIConfigure";
import LoadingPage from "../../LoadingPage/LoadingPage";
import "./checkout.css";
import Payment from "./Payment.jsx";
import Swal from "sweetalert2";
import ButtonFeedback from "./ButtonFeedback.jsx";

const Checkout = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  localStorage.setItem("BookingId", JSON.stringify(id));

  const fetchBooking = async () => {
    try {
      const response = await GetAllBookingsByID(id);
      console.log(response);
      if (response.data) {
        const subCourt = await GetbySubCourtID(response.data.subCourtId);
        const court = await GetbyCourtID(subCourt.data.courtId);
        if (court) {
          setBooking({ ...response.data, court });
        }
      }
      setLoading(false);
    } catch (err) {
      toast.error("Lỗi khi lấy thông tin đặt sân");
      console.error(err);
    }
  };
  useEffect(() => {
    fetchBooking();
  }, [id]);

  if (loading) {
    return <LoadingPage />;
  }

  const total = Math.round(booking.amount * 1000);

  const getStatusString = (status) => {
    switch (status) {
      case 0:
        return "Chờ thanh toán";
      case 1:
        return "Đã xác nhận";
      case 2:
        return "Đã hủy";
      case 3:
        return "Đã check-in";
      case 4:
        return "Đã sử dụng";
      default:
        return "";
    }
  };

  const getTimeSlotString = (timeSlotId) => {
    switch (timeSlotId) {
      case 1:
        return "5:00 - 7:00";
      case 2:
        return "7:00 - 9:00";
      case 3:
        return "9:00 - 11:00";
      case 4:
        return "13:00 - 15:00";
      case 5:
        return "15:00 - 17:00";
      case 6:
        return "17:00 - 19:00";
      case 7:
        return "19:00 - 21:00";
      default:
        return "Khung giờ không xác định";
    }
  };

  const handleCancelBeforePayment = async () => {
    try {
      const result = await Swal.fire({
        icon: "warning",
        title: "Bạn có chắc chắn không?",
        text: "Bạn sẽ không thể khôi phục lại!",
        showCancelButton: true,
        confirmButtonText: "Có, hủy nó!",
        cancelButtonText: "Không, giữ lại",
        reverseButtons: true,
      });

      if (result.isConfirmed) {
        const response = await CancelBookingBeforePayment(id);
        console.log("Kết quả hủy đặt sân trước thanh toán:", response);
        toast.success(response.message);
        fetchBooking();
      }
    } catch (error) {
      toast.error("Hủy đặt sân thất bại");
    }
  };

  const handleCancelAfterPayment = async () => {
    try {
      const result = await Swal.fire({
        icon: "warning",
        title: "Bạn có chắc chắn không?",
        text: "Bạn sẽ không thể khôi phục lại!",
        showCancelButton: true,
        confirmButtonText: "Có, hủy nó!",
        cancelButtonText: "Không, giữ lại",
        reverseButtons: true,
      });

      if (result.isConfirmed) {
        const response = await CancelBookingAfterPayment(id);
        console.log("Kết quả hủy đặt sân sau thanh toán:", response);
        toast.success(response.message);
        navigate("/");
      }
    } catch (error) {
      toast.error("Hủy đặt sân thất bại");
    }
  };

  const handleCheckin = async () => {
    const result = await Swal.fire({
      icon: "warning",
      title: "Xác nhận Check-In",
      text: "Bạn có chắc chắn muốn check-in không?",
      showCancelButton: true,
      confirmButtonText: "Có, check-in",
      cancelButtonText: "Không, hủy",
    });

    if (result.isConfirmed) {
      try {
        console.log("Thông tin đặt sân trước khi check-in:", booking);
        const responseCheckinBooking = await CheckinBooking(id);
        console.log("Kết quả check-in:", responseCheckinBooking);

        const createDate = new Date().toISOString();
        const dataCheckin = {
          subCourtId: booking.subCourtId,
          bookingId: id,
          checkInTime: createDate,
          userId: userInfo.id,
        };

        console.log("Dữ liệu cho CreateCheckIn:", dataCheckin);
        const responseCreateCheckIn = await CreateCheckIn(dataCheckin);
        console.log("Kết quả CreateCheckIn:", responseCreateCheckIn);

        if (responseCreateCheckIn.success) {
          toast.success(responseCreateCheckIn.message);
          fetchBooking();
        } else {
          toast.error("Tạo check-in thất bại");
        }
      } catch (error) {
        console.error("Lỗi trong quá trình check-in:", error);
        toast.error("Check-in đặt sân thất bại");
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="background">
        <div className="checkout_Wrapper">
          <div className="bookingSummary">
            <h1>Tóm tắt đặt sân:</h1>
            <h2>Mã đặt sân {booking.bookingId}</h2>
          </div>
          <div className="bookingInfo">
            <h2 style={{ fontWeight: "bold", fontSize: "20px" }}>
              <FontAwesomeIcon
                style={{
                  marginRight: "10px",
                  fontSize: "20px",
                  color: "#707d84",
                }}
                icon={faClipboard}
              />{" "}
              Thông tin đặt sân
            </h2>
            <h1>{booking.court ? booking.court.data.courtName : ""}</h1>
            <h2>
              Địa điểm: {booking.court ? booking.court.data.location : ""}
            </h2>
            <h2>
              Ngày đặt sân: {new Date(booking.bookingDate).toLocaleDateString()}
            </h2>
            <h2>Khung giờ: {getTimeSlotString(booking.timeSlotId)}</h2>
            <h2>Trạng thái: {getStatusString(booking.status)}</h2>
            <h2 style={{ fontWeight: "bolder", fontSize: "20px" }}>
              <FontAwesomeIcon
                style={{
                  fontSize: "20px",
                  marginRight: "10px",
                  color: "#707d84",
                }}
                icon={faUserTie}
              />{" "}
              Thông tin khách hàng:{" "}
            </h2>
            <h1>{userInfo.name}</h1>
            <h2>
              <FontAwesomeIcon style={{ color: "#707d84" }} icon={faPhone} />{" "}
              +84{userInfo.phone.replace(/^0+/, "")}
            </h2>
          </div>
          <div className="_line"></div>

          <div className="btn-in-button">
            <div className="feedback-booking">
              <ButtonFeedback
                status={booking.status}
                subCourtId={booking.subCourtId}
                bookingID={booking.bookingId}
                fetchBooking={fetchBooking}
              />
            </div>
          </div>
          {/* {booking && booking.status === 4 && (
            <div className="payment-container">
              <div style={{ marginTop: "10px" }}>
                <div className="Checked-booking">
                  <button>Đã kiểm tra</button>
                </div>
              </div>
            </div>
          )} */}
          {booking && booking.status === 3 && (
            <div className="payment-container">
              <div style={{ marginTop: "10px" }}>
                <div className="Cancel-booking">
                  <button onClick={handleCancelBeforePayment}>
                    Hủy đặt sân
                  </button>
                </div>
              </div>
            </div>
          )}
          {booking && booking.status === 1 && (
            <div className="payment-container">
              <div style={{ marginTop: "10px" }}>
                <div className="Cancel-booking">
                  <button onClick={handleCheckin}>Check In</button>
                </div>
                <div className="Cancel-booking">
                  <button onClick={handleCancelBeforePayment}>
                    Hủy đặt sân
                  </button>
                </div>
              </div>
            </div>
          )}
          {booking && booking.status === 0 && (
            <div className="payment-container">
              <div className="payment-booking">
                <Payment amount={total} id={userInfo.id} bookingId={id} />
              </div>
              <div className="Cancel-booking">
                <button onClick={handleCancelBeforePayment}>Hủy đặt sân</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Checkout;
