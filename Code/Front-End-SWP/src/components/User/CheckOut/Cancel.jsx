import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "./Cancel.css";
import { UpdateBookingStatus } from "../../API/APIConfigure";
import { useParams } from "react-router-dom";
const Cancel = ({ status }) => {
  const [bookingStatus, setBookingStatus] = useState(status);
  const id = useParams();
  const handleClick = ({ idBooking, status }) => {
    if (
      bookingStatus === "2" ||
      bookingStatus === "4" ||
      bookingStatus === "5"
    ) {
      Swal.fire({
        icon: "error",
        title: "Không thể hủy",
      });
    } else {
      Swal.fire({
        title: "Bạn có chắc chắn muốn hủy?",
        showDenyButton: true,
        confirmButtonText: `Có`,
        denyButtonText: `Không`,
        icon: "question",
      }).then((result) => {
        if (result.isConfirmed) {
          try {
            console.log(status);
            UpdateBookingStatus(idBooking.id, status);
            console.log(idBooking.id);
            Swal.fire({
              icon: "success",
              title: "Hủy thành công",
            }).then((res) => {
              window.location.reload();
            });
          } catch (err) {
            Swal.fire({
              icon: "error",
              title: "Hủy thất bại",
            });
            console.error(err);
          }
        }
      });
    }
  };

  return (
    <div>
      {!(
        bookingStatus === "3" ||
        bookingStatus === "4" ||
        bookingStatus === "5" ||
        bookingStatus === "6" ||
        bookingStatus === "7"
      ) && (
        <button
          className="btn-cancel"
          onClick={() => handleClick({ idBooking: id, status: "3" })}
        >
          Hủy đặt
        </button>
      )}
    </div>
  );
};

export default Cancel;
