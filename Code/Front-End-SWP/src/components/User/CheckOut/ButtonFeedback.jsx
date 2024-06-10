import { useEffect, useState } from "react";
import axios from "axios";
import { Rating } from "@mui/material";
import { CreateFeedback, UpdateBookingStatus } from "../../API/APIConfigure";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import "./btnFeedback.css";
const ButtonFeedback = ({ status, realID, bookingID }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [text, setText] = useState("");
  const [rate, setRate] = useState(0);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const handleButtonClick = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const handleSubmit = async () => {
    try {
      const feedbackData = {
        realestateID: realID,
        memberId: userInfo.id,
        text: text,
        rate: rate,
      };
      const response = await CreateFeedback(feedbackData);
      if (response) {
        Swal.fire({
          title: "Cảm ơn bạn đã đánh giá ",
          text: "Đánh giá của bạn góp phần giúp chúng tôi cải thiện dịch vụ tốt hơn",
          icon: "success",
        }).then(() => {
          UpdateBookingStatus(bookingID, "6").then((res) => {
            window.location.reload();
          });
        });
      }
    } catch (err) {
      toast.error("Lỗi tạo feedback");
      console.error(err);
    }
  };

  return (
    <div className="feeback-wapper">
      <div>
        {status === "5" && (
          <button className="btn-btn-rating" onClick={handleButtonClick}>
            Đánh giá kỳ nghỉ
          </button>
        )}
      </div>
      {showPopup && (
        <div className="popup">
          <h3 className="titleFeedback">Nhận xét của bạn </h3>
          <div className="feedback">
            <div>
              <input
                className="inputFeedback"
                type="text"
                placeholder="Nhập vào đây....."
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </div>
            <div className="ratingStar">
              <Rating
                name="simple-controlled"
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
              />
            </div>
          </div>
          <div className="btn-feedback">
            <button className="btn-btn-ratingSend" onClick={handleSubmit}>
              Gửi
            </button>
            <button className="btn-btn-ratingClose" onClick={closePopup}>
              Đóng
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ButtonFeedback;
