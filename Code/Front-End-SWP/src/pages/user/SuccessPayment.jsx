import React from 'react';
import { useNavigate } from 'react-router-dom';
import './paymentresult.css';

const SuccessPayment = ({ amount }) => {
  const navigate = useNavigate();
  const id = JSON.parse(localStorage.getItem("BookingId")); 
  const handleReturnToCheckout = () => {
    navigate(`/user/checkout/${id}`); // Chuyển hướng về trang Checkout
  };

  return (
    <div className="payment-result">
      <div className="alert alert-success" role="alert">
        <h4 className="alert-heading">Thanh toán thành công!</h4>
        <p>Giao dịch đã được thực hiện thành công.</p>
        <hr />
        <p className="mb-0">MoMo Payment</p>
        <h4>{amount}VND</h4>
        <button className="back-home" onClick={handleReturnToCheckout}>Quay lại trang Checkout</button>
      </div>
    </div>
  );
};

export default SuccessPayment;
