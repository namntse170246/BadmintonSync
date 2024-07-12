// Trong file PaymentResult.js
import React from "react";
import { useLocation } from "react-router-dom";

const PaymentResults = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  // Lấy các thông tin từ query params của URL callback
  const vnp_Amount = queryParams.get("vnp_Amount");
  const vnp_BankCode = queryParams.get("vnp_BankCode");
  const vnp_BankTranNo = queryParams.get("vnp_BankTranNo");
  const vnp_CardType = queryParams.get("vnp_CardType");
  const vnp_OrderInfo = queryParams.get("vnp_OrderInfo");
  const vnp_PayDate = queryParams.get("vnp_PayDate");
  const vnp_ResponseCode = queryParams.get("vnp_ResponseCode");
  const vnp_TmnCode = queryParams.get("vnp_TmnCode");
  const vnp_TransactionNo = queryParams.get("vnp_TransactionNo");
  const vnp_TransactionStatus = queryParams.get("vnp_TransactionStatus");
  const vnp_TxnRef = queryParams.get("vnp_TxnRef");
  const vnp_SecureHash = queryParams.get("vnp_SecureHash");

  return (
    <div>
      <h1>Thông tin thanh toán thành công</h1>
      <p>Số tiền thanh toán: {vnp_Amount}</p>
      <p>Mã ngân hàng: {vnp_BankCode}</p>
      <p>Mã giao dịch ngân hàng: {vnp_BankTranNo}</p>
      <p>Loại thẻ: {vnp_CardType}</p>
      <p>Thông tin đơn hàng: {vnp_OrderInfo}</p>
      <p>Ngày thanh toán: {vnp_PayDate}</p>
      <p>Mã phản hồi: {vnp_ResponseCode}</p>
      <p>Mã terminal: {vnp_TmnCode}</p>
      <p>Số giao dịch VNPAY: {vnp_TransactionNo}</p>
      <p>Trạng thái giao dịch: {vnp_TransactionStatus}</p>
      <p>Mã giao dịch tham chiếu: {vnp_TxnRef}</p>
      <p>Hash bảo mật: {vnp_SecureHash}</p>
    </div>
  );
};

export default PaymentResults;
