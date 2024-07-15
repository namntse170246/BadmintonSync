import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./ConfirmOTP.css";

const ConfirmOTP = () => {
  const { email } = useParams();
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setOtp(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call the API to verify the OTP
    fetch("/api/verify-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ otp, email }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          Swal.fire({
            icon: "success",
            title: "OTP verification successful!",
          }).then((result) => {
            if (result.isConfirmed) {
              navigate("/login");
            }
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Invalid OTP. Please try again.",
          });
        }
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "An error occurred. Please try again later.",
        });
      });
  };

  return (
    <div className="confirm-otp-container">
      <h2>Confirm OTP</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="otp">Enter OTP</label>
        <input
          type="text"
          id="otp"
          name="otp"
          value={otp}
          onChange={handleChange}
          required
        />
        <button type="submit">Confirm</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ConfirmOTP;
