import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./Payment.css";
import { ConfirmBooking } from "../../API/APIConfigure";

const Payment = ({ amount, id, bookingId }) => {
  const [loading, setLoading] = useState(false);

  const handlePaymentMomo = async () => {
    try {
      setLoading(true);

      const paymentData = {
        userId: id,
        totalPrice: amount,
        requiredAmount: amount,
        paymentRefId: "some-reference-id",
        paymentMethod: "MoMo",
        paymentStatus: "Pending",
        paymentDate: new Date().toISOString(),
        expireDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        paymentLanguage: "VN",
        merchantId: "your-merchant-id",
        paymentContent: "Payment for services",
        paymentDestinationId: "destination-id",
        paidAmount: 0,
        paymentCurrency: "VND",
      };

      const response = await axios.post("/api/PaymentMomo", paymentData);
      if (response.data) {
        ConfirmBooking(bookingId, 1);
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

  const handlePaymentVNPay = async () => {
    try {
      setLoading(true);

      const paymentData = {
        userId: id,
        totalPrice: amount,
        requiredAmount: amount,
        paymentRefId: "some-reference-id",
        paymentMethod: "VNPay",
        paymentStatus: "Pending",
        paymentDate: new Date().toISOString(),
        expireDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        paymentLanguage: "VN",
        merchantId: "your-merchant-id",
        paymentContent: "Payment for services",
        paymentDestinationId: "destination-id",
        paidAmount: 0,
        paymentCurrency: "VND",
      };

      const response = await axios.post("/api/PaymentVNPay", paymentData);
      if (response.data) {
        ConfirmBooking(bookingId, 1);
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
        onClick={handlePaymentMomo}
        disabled={loading}
      >
        {loading ? "Processing..." : "Pay with MoMo"}
      </button>
      <button
        className="payment-button"
        onClick={handlePaymentVNPay}
        disabled={loading}
      >
        {loading ? "Processing..." : "Pay with MoMo"}
      </button>
    </div>
  );
};

export default Payment;
