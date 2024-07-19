import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import VNPay from "./VNPay.jsx";
import Navbar from "../../navbar/Navbar";
import MailList from "../../mailList/MailList";
import Footer from "../../footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboard } from '@fortawesome/free-solid-svg-icons';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import { faUserTie } from '@fortawesome/free-solid-svg-icons';
import { faPhone } from '@fortawesome/free-solid-svg-icons';

import {
  CancelBooking,
  CheckinBooking,
  ConfirmBooking,
  GetAllBookingsByID,
  GetbyCourtID,
  GetbySubCourtID,
  UpdateBookingStatus, // Import delete booking API function
} from "../../API/APIConfigure";
import LoadingPage from "../../LoadingPage/LoadingPage";
import "./checkout.css";
import ButtonCheckin from "./ButtonCheckin";
import ButtonFeedback from "./ButtonFeedback";
import Momo from "./Momo.jsx";

const Checkout = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Initialize useNavigate
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const cancelReason = "";
  localStorage.setItem("BookingId", JSON.stringify(id));

  useEffect(() => {
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
        toast.error("Error fetching booking information");
        console.error(err);
      }
    };

    fetchBooking();
  }, [id]);

  if (loading) {
    return <LoadingPage />;
  }

  const total = Math.round(booking.amount * 1000);

  const getStatusString = (status) => {
    switch (status) {
      case 0:
        return "Awaiting payment";
      case 1:
        return "Confirmed";
      case 2:
        return "Cancelled";
      case 3:
        return "Checked in";
      default:
        return "";
    }
  };

  const getTimeSlotString = (timeSlotId) => {
    switch (timeSlotId) {
      case 1:
        return "5:00 to 7:00";
      case 2:
        return "7:00 to 9:00";
      case 3:
        return "9:00 to 11:00";
      case 4:
        return "13:00 to 15:00";
      case 5:
        return "15:00 to 17:00";
      case 6:
        return "17:00 to 19:00";
      case 7:
        return "19:00 to 21:00";
      default:
        return "Unknown time slot";
    }
  };

  const handleCancel = async () => {
    try {
      const response = await CancelBooking(id);
      console.log("Cancel response:", response);
      toast.success(response.message);
      navigate(-2); // Navigate back to the previous page
    } catch (error) {
      toast.error("Failed to cancel booking");
    }
  };
  const handleCheckin = async () => {
    try {
      const response = await CheckinBooking(id);
      console.log("Checkin response:", response);
      toast.success(response.message);
      navigate("/user/order", { state: { activeTab: 'order' } }); // Navigate to the order page
    } catch (error) {
      toast.error("Failed to cancel booking");
    }
  };

  return (
    <>
      <Navbar />
      <div className="background">
        <div className="checkout_Wrapper">
          <div className="bookingSummary">
            <h1>Booking Summary:</h1>
            <h2>Booking ID {booking.bookingId}</h2>
          </div>
          <div className="bookingInfo">

            <h2 style={{ fontWeight: "bold", fontSize: "20px" }}>
              <FontAwesomeIcon style={{ marginRight: "10px", fontSize: "20px", color: "#707d84" }} icon={faClipboard} /> Booking Details
            </h2>
            <h1>{booking.court ? booking.court.data.courtName : ""}</h1>
            <h2>Location: {booking.court ? booking.court.data.location : ""}</h2>
            <h2>
              Date placed the order: {" "}
              {new Date(booking.bookingDate).toLocaleDateString()}
            </h2>
            <h2>Slot:  {getTimeSlotString(booking.timeSlotId)}</h2>
            <h2>Status:  {getStatusString(booking.status)}</h2>
            <h2 style={{ fontWeight: "bolder", fontSize: "20px" }}>
              <FontAwesomeIcon style={{ fontSize: "20px", marginRight: "10px", color: "#707d84" }} icon={faUserTie} /> Customer Info:{" "}
            </h2>
            <h1>{userInfo.name}</h1>
            <h2><FontAwesomeIcon style={{ color: "#707d84"}} icon={faPhone} /> +84{userInfo.phone.replace(/^0+/, "")}</h2>
          </div>
          <div className="_line"></div>

          {/* <div className="btn-in-button">
          <div className="feedback-booking">
            <ButtonFeedback
              status={booking.status}
              realID={booking.court.courtId}
              bookingID={booking.bookingId}
            />
          </div>
        </div> */}
          {booking && booking.status === 1 && (
            <div className="totalCheckoutAndCancel">
              <div style={{ marginTop: "10px" }}>
                <div className="CheckIn-button">
                  <button onClick={handleCheckin}>Check In</button>
                </div>
              </div>
            </div>
          )}
          {booking && booking.status === 0 && (
            <div className="payment-container">
              <div className="payment-booking">
                <VNPay amount={total} id={userInfo.id} bookingId={id} />
              </div>
              <div className="payment-booking">
                <Momo amount={total} id={userInfo.id} bookingId={id} />
              </div>
              <div className="Cancel-booking">
                <button onClick={handleCancel}>Cancel and go back</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Checkout;
