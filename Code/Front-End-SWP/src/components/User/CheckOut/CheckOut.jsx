import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import PayPal from './Paypal';
import Navbar from '../../navbar/Navbar';
import MailList from '../../mailList/MailList';
import Footer from '../../footer/Footer';
import {
  BASE_URL,
  GetAllBookingsByID,
  GetTimeShareById,
  GetbyRealestateID,
} from '../../API/APIConfigure';
import LoadingPage from '../../LoadingPage/LoadingPage';
import './checkout.css';
import Cancel from './Cancel';
import ButtonCheckOut from './ButtonCheckOut';
import ButtonCheckin from './ButtonCheckin';
import ButtonFeedback from './ButtonFeedback';
import ButtonRentMore from './ButtonRentMore';

const Checkout = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const response = await GetAllBookingsByID(id);
        if (response) {
          const timeshare = await GetTimeShareById(response.timeshareId);
          if (timeshare) {
            const realestate = await GetbyRealestateID(timeshare.realestateId);
            if (realestate) {
              setBooking({ ...response, realestate });
            }
          }
        }
        setLoading(false);
      } catch (err) {
        toast.error('Lỗi lấy thông tin Booking');
        console.error(err);
      }
    };

    fetchBooking();
  }, [id]);
  if (loading) {
    return (
      <div>
        <LoadingPage />
      </div>
    );
  }

  const total = Math.round(booking.amount / 24500);
  const photoUrls = booking.realestate.photo ? booking.realestate.photo.split(',') : [];

  const getStatusString = (status) => {
    switch (status) {
      case '1':
        return 'Chờ thanh toán';
      case '2':
        return 'Đã thanh toán';
      case '3':
        return 'Đã hủy';
      case '4':
        return 'Đã check in';
      case '5':
        return 'Đã check out';
      case '6':
        return 'Đã check out';
      default:
        return '';
    }
  };
  return (
    <>
      <Navbar />
      <div className="checout_Wapper">
        <div className="checkoutContainer">
          <div className="checkoutCard">
            <img
              className="image-booking"
              src={BASE_URL + (photoUrls.length > 0 ? photoUrls[0] : '')}
              alt=""
            />
            <div className="paymentConfirm">
              <h1>Xác nhận thông tin của bạn</h1>
              <h1>Tên khách sạn: {booking.realestate ? booking.realestate.name : ''}</h1>
              <h1>Địa điểm: {booking.realestate ? booking.realestate.location : ''}</h1>
              <h1>Họ và tên: {booking.fullName}</h1>
              <h1>Số điện thoại: {booking.phone}</h1>
              <h1>Ngày checkin: {new Date(booking.startDay).toLocaleDateString()}</h1>
              <h1>Ngày checkout: {new Date(booking.endDay).toLocaleDateString()}</h1>
              <h1>Trạng thái: {getStatusString(booking.status)}</h1>
              <h1>Người lớn: {booking.adult}</h1>
              <h1>Trẻ em: {booking.children}</h1>
              <div className="_line"></div>
              <div className="totalCheckoutAndCancel">
                <h2 className="total-summary">
                  Tổng giá tiền: {booking.amount.toLocaleString()}VNĐ
                </h2>
                <div className="Cancel-booking">
                  <Cancel status={booking.status} />
                </div>
                <div style={{ marginTop: '10px' }}>
                  <ButtonCheckin
                    bookingStatus={booking.status}
                    startDay={booking.startDay}
                    endDay={booking.endDay}
                  />
                </div>
                <div style={{ marginTop: '6px' }}>
                  <ButtonCheckOut bookingStatus={booking.status} />
                </div>
              </div>
              <div className="btn-in-button">
                <div className="feedback-booking">
                  <ButtonFeedback
                    status={booking.status}
                    realID={booking.realestate.id}
                    bookingID={booking.id}
                  />
                </div>
                <div className="rentMore-booking">
                  <ButtonRentMore
                    status={booking.status}
                    realID={booking.realestate.id}
                    BookingInfo={booking}
                  />
                </div>
              </div>
            </div>
          </div>
          {booking ? (
            <>
              {booking.status === '1' && (
                <div className="payment-container">
                  <div className="payment-booking">
                    <PayPal amount={total} timeshareId={booking.timeshareId} idPay={id} />
                  </div>
                </div>
              )}
            </>
          ) : null}
        </div>
      </div>
      <div className="homeContainer">
        <MailList />
        <Footer />
      </div>
    </>
  );
};

export default Checkout;
