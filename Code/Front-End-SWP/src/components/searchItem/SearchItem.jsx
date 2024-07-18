import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Rating from "@mui/material/Rating";
import Swal from "sweetalert2";
import { useAuth } from "../../hook/AuthContext";
import { GetbyCourtID } from "../API/APIConfigure";
import "./searchItem.css";

const SearchItem = ({ searchResult }) => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const [userLoggedIn, setUserLoggedIn] = useState(isLoggedIn);

  useEffect(() => {
    setUserLoggedIn(isLoggedIn);
  }, [isLoggedIn]);

  const handleViewCourt = async (courtId) => {
    try {
      const response = await GetbyCourtID(courtId);
      const courtDetails = response.data;

      localStorage.setItem("CourtDetails", JSON.stringify(courtDetails));
      const photoUrls = courtDetails.image ? courtDetails.image.split(",") : [];
      localStorage.setItem("imageCourt", JSON.stringify(photoUrls));
      navigate(`/court/${courtId}`);
    } catch (error) {
      console.error("Error fetching court details", error);
    }
  };

  const handleBookingClick = async (courtId) => {
    if (userLoggedIn) {
      try {
        const response = await GetbyCourtID(courtId);
        const courtDetails = response.data;
        localStorage.setItem("CourtDetails", JSON.stringify(courtDetails));
        navigate(`/booking/${courtId}`);
      } catch (error) {
        console.error("Error fetching court details", error);
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Please login to book court!",
        showConfirmButton: true,
        confirmButtonText: "Login",
        showCancelButton: true,
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login-register");
        }
      });
    }
  };

  return (
    <div className="search-item-container">
      {searchResult.map((court) => {
        const firstImageUrl = court.image
          ? court.image.split(",")[0].trim()
          : "";

        return (
          <div key={court.courtId} className="court-card">
            <img
              src={`https://localhost:7155/Uploads/${firstImageUrl}`}
              alt={court.courtName}
            />
            <div className="infor-part">
              <div className="court-Name">{court.courtName}</div>
              <div className="court-Location">{court.location}</div>
              <Rating
                className="court-rating"
                value={
                  court.evaluates.length > 0 ? court.evaluates[0].rating : 0
                }
                readOnly
              />
            </div>
            <div className="button">
              <button
                onClick={() => handleViewCourt(court.courtId)}
                className="btn-view-details"
              >
                View
              </button>
              <button
                onClick={() => handleBookingClick(court.courtId)}
                className="btn-book-now"
              >
                Book Now
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SearchItem;
