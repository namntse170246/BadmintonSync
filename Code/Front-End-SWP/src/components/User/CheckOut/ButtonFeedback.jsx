import { useEffect, useState } from "react";
import { Rating } from "@mui/material";
import { CreateFeedback, GetbyCourtID, GetbySubCourtID } from "../../API/APIConfigure";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import "./btnFeedback.css";

const ButtonFeedback = ({ status, subCourtId, fetchBooking }) => {
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
      const subCourt = await GetbySubCourtID(subCourtId);
      const court = await GetbyCourtID(subCourt.data.courtId);
      const createDate = new Date().toISOString();
      const feedbackData = {
        userId: userInfo.id,
        comment: text,
        rating: rate,
        evaluateDate: createDate,
      };
      const response = await CreateFeedback(court.data.courtId, feedbackData);
      
      if (response) {
        Swal.fire({
          title: "Cảm ơn bạn đã Feedback",
          text: "Feedback của bạn góp phần giúp chúng tôi cải thiện dịch vụ tốt hơn",
          icon: "success",
        }).then(() => {
          setShowPopup(false);
          fetchBooking();  // Fetch lại thông tin booking sau khi tạo feedback thành công
        });
      }
    } catch (err) {
      toast.error("Lỗi tạo feedback");
      console.error(err);
    }
  };

  return (
    <div className="feedback-wrapper">
      <div>
        {status === 4 && (
          <button className="btn-btn-rating" onClick={handleButtonClick}>
            Feedback
          </button>
        )}
      </div>
      {showPopup && (
        <div className="popup">
          <h3 className="titleFeedback">Nhận xét của bạn</h3>
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