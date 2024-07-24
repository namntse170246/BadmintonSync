import { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import { VerifyEmailOTP } from "../../components/API/APIConfigure";
import "./OTPVerification.css";

const OTPVerification = () => {
  const { email } = useParams();
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setOtp(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      email: email,
      otp: otp,
    };

    try {
      console.log(data);
      const response = await VerifyEmailOTP(data);
      if (response.success) {
        Swal.fire({
          icon: "success",
          title: "Xác thực OTP thành công!",
        }).then(() => {
          navigate("/login-register");
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "OTP không hợp lệ. Vui lòng thử lại.",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Đã xảy ra lỗi khi xác thực OTP. Vui lòng thử lại sau.",
      });
    }
  };

  return (
    <div className="confirm-otp-container">
      <h2>Xác Nhận OTP</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="otp">Nhập OTP</label>
        <input
          type="text"
          id="otp"
          name="otp"
          value={otp}
          onChange={handleChange}
          required
        />
        <button type="submit">Xác Nhận</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default OTPVerification;
