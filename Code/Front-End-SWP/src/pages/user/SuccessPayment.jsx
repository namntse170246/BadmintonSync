import React from "react";
import { useNavigate } from "react-router-dom";
import "./SuccessPayment.css";

const SuccessPayment = ({ amount }) => {
  const navigate = useNavigate();
  const id = JSON.parse(localStorage.getItem("BookingId"));
  const handleReturnToCheckout = () => {
    navigate(`/user/checkout/${id}`); // Chuyển hướng về trang Checkout
  };

  const formattedAmount = (Number(amount) / 100).toLocaleString("vi-VN");

  return (
    <div className="background-success">
      <div className="container-success">
        <div className="printer-top"></div>
        <div className="paper-container">
          <div className="printer-bottom"></div>
          <div className="paper">
            <div className="main-contents">
              <div className="success-icon">&#10004;</div>
              <div className="success-title">Thanh toán thành công</div>
              <div className="success-description">
                Thanh toán của bạn cho {formattedAmount} VND đã được nhận và gửi
                đến CourtSync.
              </div>
              <div className="order-details">
                <div className="order-number-label">Mã thanh toán</div>
                <div className="order-number">{id}</div>
              </div>
              <div className="order-footer">Bạn có thể đóng trang này!</div>
              <button className="back-home" onClick={handleReturnToCheckout}>
                Quay lại Checkout
              </button>
            </div>
            <div className="jagged-edge"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessPayment;
