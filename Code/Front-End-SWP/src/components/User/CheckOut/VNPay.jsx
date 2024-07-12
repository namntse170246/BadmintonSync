import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

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
        throw new Error("API không trả về URL thanh toán");
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra khi xử lý thanh toán");
      console.error("Lỗi thanh toán:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Tổng số tiền cần thanh toán: {amount} VNĐ</h2>
      <button onClick={handlePayment} disabled={loading}>
        {loading ? "Đang xử lý..." : "Thanh toán bằng VNPay"}
      </button>
    </div>
  );
};

export default VNPay;
