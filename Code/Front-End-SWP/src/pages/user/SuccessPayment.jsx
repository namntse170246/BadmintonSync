import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SuccessPayment.css';

const SuccessPayment = ({ amount }) => {
  const navigate = useNavigate();
  const id = JSON.parse(localStorage.getItem("BookingId"));
  const handleReturnToCheckout = () => {
    navigate(`/user/checkout/${id}`); // Chuyển hướng về trang Checkout
  };

  return (
    <div className="container">
      <div className="printer-top"></div>
      <div className="paper-container">
        <div className="printer-bottom"></div>
        <div className="paper">
          <div className="main-contents">
            <div className="success-icon">&#10004;</div>
            <div className="success-title">Payment Complete</div>
            <div className="success-description">
              Your payment for {amount} VND has been received and sent to CourtSync.
            </div>
            <div className="order-details">
              <div className="order-number-label">Payment id</div>
              <div className="order-number">{id}</div>
            </div>
            <div className="order-footer">You can close this page!</div>
            <button className="back-home" onClick={handleReturnToCheckout}>Return to Checkout</button>
          </div>
          <div className="jagged-edge"></div>
        </div>
      </div>
    </div>
  );
};

export default SuccessPayment;
