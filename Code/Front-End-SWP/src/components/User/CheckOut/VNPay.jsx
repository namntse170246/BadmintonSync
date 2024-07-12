import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./VNPay.css";

const VNPay = ({ amount, id }) => {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    try {
      setLoading(true);

      const paymentData = {
        userId: id,
        totalPrice: amount,
        paymentMethod: "VNPAY",
        paymentStatus: 0,
        paymentDate: new Date().toISOString(),
        requiredAmount: amount,
        paymentContent: "success",
        paymentCurrency: "VND",
      };

      // Call the backend API to initiate the payment
      const response = await axios.post("/api/Payment", paymentData);

      if (response.data) {
        // Redirect to VNPay payment URL upon successful response
        window.location.href = response.data;
      } else {
        throw new Error("API did not return a payment URL");
      }
    } catch (error) {
      toast.error("An error occurred during the payment process");
      console.error("Payment error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="payment-container">
      <h2 className="payment-title">
        Total amount to be paid:{" "}
        {new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(amount)}{" "}
      </h2>

      <button
        className="payment-button"
        onClick={handlePayment}
        disabled={loading}
      >
        {loading ? "Processing..." : "Pay with VNPay"}
      </button>
    </div>
  );
};

export default VNPay;
