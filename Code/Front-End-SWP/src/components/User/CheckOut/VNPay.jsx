import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
import "./VNPay.css";

const VNPay = ({ amount, id }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkPaymentResult = async () => {
      const query = new URLSearchParams(location.search);
      const paymentStatus = query.get('paymentStatus');

      if (paymentStatus === 'success') {
        navigate('/payment/momo-return');
      } else if (paymentStatus === 'fail') {
        toast.error("Payment failed");
      }
    };

    checkPaymentResult();
  }, [location, navigate]);

  const handlePayment = async () => {
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

      const response = await axios.post("/api/Payment", paymentData);

      if (response.data) {
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
        {loading ? "Processing..." : "Pay with MoMo"}
      </button>
    </div>
  );
};

export default VNPay;
