import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Rating from "@mui/material/Rating";
import Swal from "sweetalert2";
import { useAuth } from "../../hook/AuthContext";
import { GetbyRealestateID } from "../API/APIConfigure";
import "./searchItem.css";

const SearchItem = ({ searchResult }) => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const [userLoggedIn, setUserLoggedIn] = useState(isLoggedIn);

  useEffect(() => {
    setUserLoggedIn(isLoggedIn);
  }, [isLoggedIn]);

  const handleViewCourt = async (courtId) => {
    if (userLoggedIn) {
      try {
        const response = await GetbyRealestateID(courtId);
        const courtDetails = response;

        localStorage.setItem("CourtDetails", JSON.stringify(courtDetails));
        const photoUrls = courtDetails.photo
          ? courtDetails.photo.split(",")
          : [];
        localStorage.setItem("imageCourt", JSON.stringify(photoUrls));
        navigate(`/court/${courtId}`);
      } catch (error) {
        console.error("Error fetching court details", error);
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Vui lòng đăng nhập để xem thông tin!",
        showConfirmButton: true,
        confirmButtonText: "Đăng nhập",
        showCancelButton: true,
        cancelButtonText: "Huỷ",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login-register");
        }
      });
    }
  };

  const handleBooking = (courtId) => {
    // Implement booking functionality here, based on your requirements
    // For example, you can navigate to a booking page or show a modal
    console.log("Booking court:", courtId);
  };

  return searchResult.map((court) => (
    <div key={court.courtId} className="court-card">
      <div className="sup-card">
        <Link to={`/courts/${court.courtId}`} className="infor-part">
          <img src={court.image} alt={court.courtName} />
          <div className="infor-text-part">
            <div className="court-Name">{court.courtName}</div>
            <div className="court-Location">{court.location}</div>
            <Rating
              name="court-rating"
              value={court.evaluates.length > 0 ? court.evaluates[0].rating : 0}
              readOnly
            />
          </div>
        </Link>
        <div className="Booking-Area">
          <p>Booking</p>
          <div className="button">
            <button
              onClick={() => handleViewCourt(court.courtId)}
              className="btn-view-details"
            >
              Chi tiết
            </button>
            <button
              onClick={() => handleBooking(court.courtId)}
              className="btn-book-now"
            >
              Đặt lịch
            </button>
          </div>
        </div>
      </div>
    </div>
  ));
};

export default SearchItem;
