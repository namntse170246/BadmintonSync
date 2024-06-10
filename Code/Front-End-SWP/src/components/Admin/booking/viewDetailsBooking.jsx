import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  BASE_URL,
  GetAllBookingsByID,
  GetTimeShareById,
  GetbyRealestateID,
} from "../../API/APIConfigure";

import "./viewDetails.css";
import LoadingPage from "../../LoadingPage/LoadingPage";

const Checkout = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const response = await GetAllBookingsByID(id);
        if (response) {
          const timeshare = await GetTimeShareById(response.timeshareId);
          if (timeshare) {
            const realestate = await GetbyRealestateID(timeshare.realestateId);
            if (realestate) {
              setBooking({ ...response, realestate });
            }
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

  const photoUrls = booking.realestate.photo
    ? booking.realestate.photo.split(",")
    : [];

  const getStatusString = (status) => {
    switch (status) {
      case "1":
        return "Chờ thanh toán";
      case "2":
        return "Đã thanh toán";
      case "3":
        return "Đã hủy";
      default:
        return "";
    }
  };

  return (
    <>
      <div className="checkoutCard-admin">
        <div className="checkoutContent-admin">
          <div className="checkoutImage-admin">
            <img
              className="image-booking-admin"
              src={BASE_URL + (photoUrls.length > 0 ? photoUrls[0] : "")}
              alt=""
            />
          </div>
          <div className="title-booking-admin"></div>
          <div className="checkoutText-admin">
            <h1>
              Tên khách sạn: {booking.realestate ? booking.realestate.name : ""}
            </h1>
            <h1>
              Địa điểm: {booking.realestate ? booking.realestate.location : ""}
            </h1>
            <h1>Họ và tên: {booking.fullName}</h1>
            <h1>Số điện thoại: {booking.phone}</h1>
            <h1>
              Ngày checkin: {new Date(booking.startDay).toLocaleDateString()}
            </h1>
            <h1>
              Ngày checkout: {new Date(booking.endDay).toLocaleDateString()}
            </h1>
            <h1>Trạng thái: {getStatusString(booking.status)}</h1>
            <h1>Người lớn: {booking.adult}</h1>
            <h1>Trẻ em: {booking.children}</h1>
            <div className="_line"></div>
            <h2 className="total-summary">
              Tổng giá tiền: {booking.amount.toLocaleString()}VNĐ
            </h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
