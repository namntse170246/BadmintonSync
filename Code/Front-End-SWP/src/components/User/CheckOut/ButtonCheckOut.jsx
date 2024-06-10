import React from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import './Cancel.css';
import { UpdateBookingStatus } from '../../API/APIConfigure';
import { useParams } from 'react-router-dom';
const ButtonCheckOut = ({ bookingStatus }) => {
  const id = useParams();
  const handleClick = ({ idBooking, status }) => {
    Swal.fire({
      title: 'Bạn có muốn check out?',
      showDenyButton: true,
      confirmButtonText: `Có`,
      denyButtonText: `Không`,
      icon: 'question',
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          console.log(status);
          UpdateBookingStatus(idBooking.id, status);
          console.log(idBooking.id);
          Swal.fire({
            icon: 'success',
            title: 'Check Out thành công',
          }).then(() => {
            window.location.reload();
          });
        } catch (err) {
          Swal.fire({
            icon: 'error',
            title: 'Hủy thất bại',
          });
          console.error(err);
        }
      }
    });
  };

  return (
    <div>
      {bookingStatus == '4' && (
        <button className="btn-cancel" onClick={() => handleClick({ idBooking: id, status: '5' })}>
          Check Out
        </button>
      )}
    </div>
  );
};

export default ButtonCheckOut;
