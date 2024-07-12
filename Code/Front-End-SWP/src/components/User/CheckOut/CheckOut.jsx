import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import VNPay from "./VNPay.jsx"; // Import VNPay component

import Navbar from "../../navbar/Navbar";
import MailList from "../../mailList/MailList";
import Footer from "../../footer/Footer";
import {
  GetAllBookingsByID,
  GetbyCourtID,
  GetbySubCourtID,
} from "../../API/APIConfigure";
import LoadingPage from "../../LoadingPage/LoadingPage";
import "./checkout.css";
import Cancel from "./Cancel";
import ButtonCheckOut from "./ButtonCheckOut";
import ButtonCheckin from "./ButtonCheckin";
import ButtonFeedback from "./ButtonFeedback";

const Checkout = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const response = await GetAllBookingsByID(id);
        if (response.data) {
          const subCourt = await GetbySubCourtID(response.data.subCourtId);
          const court = await GetbyCourtID(subCourt.data.courtId);
          if (court) {
            setBooking({ ...response.data, court });
            console.log(booking);
          }
        }
        setLoading(false);
      } catch (err) {
        toast.error("Lỗi lấy thông tin Booking");
        console.error(err);
      }
    };

    fetchBooking();
  }, [id]);

  if (loading) {
    return <LoadingPage />;
  }

  const total = Math.round(booking.amount * 24500);
  // console.log(total);
  // const photoUrls = booking.court.image ? booking.court.image.split(",") : [];

  const getStatusString = (status) => {
    switch (status) {
      case 0:
        return "Chờ thanh toán";
      case 1:
        return "Đã thanh toán";
      case 2:
        return "Đã hủy";
      case 3:
        return "Đã check in";
      case 4:
      case 5:
        return "Đã check out";
      default:
        return "";
    }
  };

  return (
    <>
      <Navbar />
      <div className="checkout_Wapper">
        <div className="checkoutContainer">
          <div className="checkoutCard">
            <div className="paymentConfirm">
              <h1>Xác nhận thông tin của bạn</h1>
              <h1>
                Tên sân: {booking.court ? booking.court.data.courtName : ""}
              </h1>
              <h1>
                Địa điểm: {booking.court ? booking.court.data.location : ""}
              </h1>
              <h1>Họ và tên: {userInfo.name}</h1>
              <h1>Số điện thoại: {userInfo.phone}</h1>
              <h1>
                Ngày đặt sân:{" "}
                {new Date(booking.bookingDate).toLocaleDateString()}
              </h1>
              <h1>Trạng thái: {getStatusString(booking.status)}</h1>
              <div className="_line"></div>
              <div className="totalCheckoutAndCancel">
                <h2 className="total-summary">
                  Tổng giá tiền: {booking.amount.toLocaleString()} $
                </h2>
                <div className="Cancel-booking">
                  <Cancel status={booking.status} />
                </div>
                <div style={{ marginTop: "10px" }}>
                  <ButtonCheckin
                    bookingStatus={booking.status}
                    startDay={booking.bookingDate}
                  />
                </div>
                <div style={{ marginTop: "6px" }}>
                  <ButtonCheckOut bookingStatus={booking.status} />
                </div>
              </div>
              <div className="btn-in-button">
                <div className="feedback-booking">
                  <ButtonFeedback
                    status={booking.status}
                    realID={booking.court.courtId}
                    bookingID={booking.bookingId}
                  />
                </div>
              </div>
            </div>
          </div>
          {booking && booking.status === 0 && (
            <div className="payment-container">
              <div className="payment-booking">
                <VNPay amount={total} id={userInfo.id} />
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="homeContainer">
        <MailList />
        <Footer />
      </div>
    </>
  );
};

export default Checkout;
