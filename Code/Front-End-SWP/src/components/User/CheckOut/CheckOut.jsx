import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate to navigate back
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
import ButtonCheckOut from "./ButtonCheckOut";
import ButtonCheckin from "./ButtonCheckin";
import ButtonFeedback from "./ButtonFeedback";

const Checkout = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Initialize useNavigate
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
        toast.error("Error fetching booking information");
        console.error(err);
      }
    };

    fetchBooking();
  }, [id]);

  if (loading) {
    return <LoadingPage />;
  }

  const total = Math.round(booking.amount * 24500);

  const getStatusString = (status) => {
    switch (status) {
      case 0:
        return "Awaiting payment";
      case 1:
        return "Paid";
      case 2:
        return "Cancelled";
      case 3:
        return "Checked in";
      case 4:
      case 5:
        return "Checked out";
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

  const handleCancel = () => {
    navigate(-2); // Navigate back to the previous page
  };

  return (
    <>
      <Navbar />
      <div className="checkout_Wrapper">
        <div className="bookingSummary">
          <h1>Booking Summary:</h1>
          <h2>Booking ID {booking.bookingId}</h2>
        </div>
        <div className="bookingInfo">
          <h2 style={{ fontWeight: "bold", fontSize: "20px" }}>
            Booking Details
          </h2>
          <h1>{booking.court ? booking.court.data.courtName : ""}</h1>
          <h2>Location: {booking.court ? booking.court.data.location : ""}</h2>
          <h2>
            Date placed the order:{" "}
            {new Date(booking.bookingDate).toLocaleDateString()}
          </h2>
          <h2>Slot: {getTimeSlotString(booking.timeSlotId)}</h2>
          <h2>Status: {getStatusString(booking.status)}</h2>
        </div>
        <div className="bookingInfo">
          <h2 style={{ fontWeight: "bolder", fontSize: "20px" }}>
            Customer Infor:{" "}
          </h2>
          <h1>{userInfo.name}</h1>
          <h2>+84{userInfo.phone.replace(/^0+/, "")}</h2>
        </div>
        <div className="_line"></div>
        <div className="totalCheckoutAndCancel">
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
        {booking && booking.status === 0 && (
          <div className="payment-container">
            <div className="payment-booking">
              <VNPay amount={total} id={userInfo.id} />
            </div>
            <div className="Cancel-booking">
              <button onClick={handleCancel}>Cancel and go back</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Checkout;
