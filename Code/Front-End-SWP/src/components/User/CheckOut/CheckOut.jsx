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
  DeleteBookingById, // Import delete booking API function
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

  const handleCancel = async () => {
    try {
      await DeleteBookingById(id);
      toast.success("Booking cancelled successfully");
      navigate(-2); // Navigate back to the previous page
    } catch (error) {
      toast.error("Failed to cancel booking");
      console.error(error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="checkout_Wrapper">
        <div className="checkoutContainer">
          <div className="checkoutCard">
            <div className="paymentConfirm">
              <h1>Confirm your information</h1>
              <h1>
                Court name: {booking.court ? booking.court.data.courtName : ""}
              </h1>
              <h1>
                Location: {booking.court ? booking.court.data.location : ""}
              </h1>
              <h1>Full name: {userInfo.name}</h1>
              <h1>Phone number: {userInfo.phone}</h1>
              <h1>
                Booking date:{" "}
                {new Date(booking.bookingDate).toLocaleDateString()}
              </h1>
              <h1>Status: {getStatusString(booking.status)}</h1>
              <div className="_line"></div>
              <div className="totalCheckoutAndCancel">
                <h2 className="total-summary">
                  Total price: {booking.amount.toLocaleString()} $
                </h2>
                <div className="Cancel-booking">
                  <button onClick={handleCancel}>Cancel and go back</button>
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
    </>
  );
};

export default Checkout;
