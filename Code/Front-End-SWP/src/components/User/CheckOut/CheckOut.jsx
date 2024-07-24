import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../../navbar/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboard } from '@fortawesome/free-solid-svg-icons';
import { faUserTie } from '@fortawesome/free-solid-svg-icons';
import { faPhone } from '@fortawesome/free-solid-svg-icons';

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
  const cancelReason = "";
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
      toast.error("Error fetching booking information");
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
        return "Awaiting payment";
      case 1:
        return "Confirmed";
      case 2:
        return "Cancelled";
      case 3:
        return "Check-in";
      case 4:
        return "Checked";
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
        return "Unknown time slot";
    }
  };

  const handleCancelBeforePayment = async () => {
    try {
      const result = await Swal.fire({
        icon: 'warning',
        title: 'Are you sure?',
        text: 'You won\'t be able to revert this!',
        showCancelButton: true,
        confirmButtonText: 'Yes, cancel it!',
        cancelButtonText: 'No, keep it',
        reverseButtons: true
      });

      if (result.isConfirmed) {
        const response = await CancelBookingBeforePayment(id);
        console.log("Cancel response:", response);
        toast.success(response.message);
        navigate("/"); // Navigate back to the previous page
      }
    } catch (error) {
      toast.error("Failed to cancel booking");
    }
  };

  const handleCancelAfterPayment = async () => {
    try {
      const result = await Swal.fire({
        icon: 'warning',
        title: 'Are you sure?',
        text: 'You won\'t be able to revert this!',
        showCancelButton: true,
        confirmButtonText: 'Yes, cancel it!',
        cancelButtonText: 'No, keep it',
        reverseButtons: true
      });

      if (result.isConfirmed) {
        const response = await CancelBookingAfterPayment(id);
        console.log("Cancel response:", response);
        toast.success(response.message);
        navigate("/");
      }
    } catch (error) {
      toast.error("Failed to cancel booking");
    }
  };


  const handleCheckin = async () => {
    const result = await Swal.fire({
      icon: "warning",
      title: "Confirm Check-In",
      text: "Are you sure you want to check-in?",
      showCancelButton: true,
      confirmButtonText: "Yes, check in",
      cancelButtonText: "No, cancel",
    });

    if (result.isConfirmed) {
      try {
        console.log("Booking before check-in:", booking);
        const responseCheckinBooking = await CheckinBooking(id);
        console.log("CheckinBooking response:", responseCheckinBooking);

        const createDate = new Date().toISOString();
        const dataCheckin = {
          subCourtId: booking.subCourtId,
          bookingId: id,
          checkInTime: createDate,
          userId: userInfo.id,
        };

        console.log("Data for CreateCheckIn:", dataCheckin);
        const responseCreateCheckIn = await CreateCheckIn(dataCheckin);
        console.log("CreateCheckIn response:", responseCreateCheckIn);

        if (responseCreateCheckIn.success) {
          toast.success(responseCreateCheckIn.message);
          navigate("/user/order", { state: { activeTab: 'order' } });
        } else {
          toast.error("Failed to create check-in");
        }
      } catch (error) {
        console.error("Error during check-in:", error);
        toast.error("Failed to check-in booking");
      }
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
            <h2><FontAwesomeIcon style={{ color: "#707d84" }} icon={faPhone} /> +84{userInfo.phone.replace(/^0+/, "")}</h2>
          </div>
          <div className="_line"></div>

          <div className="btn-in-button">
          <div className="feedback-booking">
            <ButtonFeedback
              status={booking.status}
              realID={booking.courtId}
              bookingID={booking.bookingId}
            />
          </div>
        </div>
          {booking && (booking.status === 4) && (
            <div className="payment-container">
              <div style={{ marginTop: "10px" }}>
                <div className="Checked-booking">
                  <button >Checked</button>
                </div>
              </div>
            </div>
          )}
          {booking && (booking.status === 3) && (
            <div className="payment-container">
              <div style={{ marginTop: "10px" }}>
                <div className="Cancel-booking">
                  <button onClick={handleCancelAfterPayment}>Cancel and go back</button>
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
                  <button onClick={handleCancelBeforePayment}>Cancel booking</button>
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
                <button onClick={handleCancelBeforePayment}>Cancel booking</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Checkout;
