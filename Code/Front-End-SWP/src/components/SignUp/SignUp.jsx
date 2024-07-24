import GoogleIcon from "@mui/icons-material/Google";
import { useState } from "react";
import { SignUpAccount } from "../API/APIConfigure";
import Swal from "sweetalert2";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import "./SignUp.css"; // Đảm bảo import file CSS để tùy chỉnh biểu tượng con mắt
import { useNavigate } from "react-router-dom";

const SignUp = ({ handleToggleForm, setShowLoading }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    otp: "",
  });
  const [errors, setErrors] = useState({
    username: "",
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    otp: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleValidateFields = () => {
    let newErrors = {};

    if (!formData.username) {
      newErrors.username = "Tên đăng nhập không được để trống.";
    }

    if (!formData.fullName) {
      newErrors.fullName = "Tên đầy đủ không được để trống.";
    }

    if (!formData.email) {
      newErrors.email = "Email không được để trống.";
    } else {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(formData.email)) {
        newErrors.email = "Định dạng email không hợp lệ.";
      }
    }

    if (!formData.password) {
      newErrors.password = "Mật khẩu không được để trống.";
    } else if (
      formData.password.length < 6 ||
      !/[A-Z]/.test(formData.password)
    ) {
      newErrors.password =
        "Mật khẩu phải có ít nhất 6 ký tự và chứa ít nhất 1 chữ cái viết hoa.";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Xác nhận mật khẩu không được để trống.";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Mật khẩu và xác nhận mật khẩu không khớp.";
    }

    if (!formData.phone) {
      newErrors.phone = "Số điện thoại không được để trống.";
    } else if (
      formData.phone.length !== 10 ||
      !/^\d{10}$/.test(formData.phone)
    ) {
      newErrors.phone = "Số điện thoại phải có đúng 10 chữ số.";
    }

    setErrors(newErrors);
    return newErrors;
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
    setErrors({
      ...errors,
      [id]: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = handleValidateFields();

    if (Object.keys(newErrors).length === 0) {
      setShowLoading(true);

      try {
        const userData = {
          username: formData.username,
          fullName: formData.fullName,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
          email: formData.email,
          phone: formData.phone,
          otp: formData.otp,
        };

        console.log(userData);

        const response = await SignUpAccount(userData);

        console.log(response);

        setShowLoading(false);

        if (response === null) {
          Swal.fire({
            icon: "error",
            title: "Đã xảy ra lỗi khi đăng ký.",
          });
        } else if (response.success === false) {
          Swal.fire({
            icon: "error",
            title: response.message,
          });
        } else {
          Swal.fire({
            icon: "success",
            title: "Đăng ký thành công!",
          }).then((result) => {
            if (result.isConfirmed) {
              navigate(`/otp-verification/${formData.email}`);
            }
          });
        }
      } catch (err) {
        setShowLoading(false);
        console.log(err);
        console.log(err.message);
        Swal.fire({
          icon: "error",
          title: "Đã xảy ra lỗi khi đăng ký.",
        });
      }
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="sign-in-up-form">
        <h1 className="sign-up-title" style={{ paddingBottom: "20px" }}>
          Tạo tài khoản
        </h1>

        <div className="infield">
          <div className="infield-text">
            <input
              className="input-infield"
              type="text"
              placeholder="Tên đăng nhập"
              id="username"
              value={formData.username}
              onChange={handleChange}
            />
            <label className="input__label-field"></label>
          </div>
          <div className="error-box">
            {errors.username && (
              <span className="error-message">{errors.username}</span>
            )}
          </div>
        </div>
        <div className="infield">
          <div className="infield-text">
            <input
              className="input-infield"
              type="text"
              placeholder="Tên đầy đủ"
              id="fullName"
              value={formData.fullName}
              onChange={handleChange}
            />
            <label className="input__label-field"></label>
          </div>
          <div className="error-box">
            {errors.fullName && (
              <span className="error-message">{errors.fullName}</span>
            )}
          </div>
        </div>
        <div className="infield">
          <div className="infield-text">
            <input
              className="input-infield"
              type="text"
              placeholder="Email"
              id="email"
              value={formData.email}
              onChange={handleChange}
            />
            <label className="input__label-field"></label>
          </div>
          <div className="error-box">
            {errors.email && (
              <span className="error-message">{errors.email}</span>
            )}
          </div>
        </div>
        <div className="infield">
          <div className="infield-text">
            <input
              className="input-infield"
              type={showPassword ? "text" : "password"}
              placeholder="Mật khẩu"
              id="password"
              value={formData.password}
              onChange={handleChange}
            />
            <label className="input__label-field"></label>
            <button
              type="button"
              className={`toggle-password ${
                showPassword ? "visible" : "hidden"
              }`}
              onClick={toggleShowPassword}
            >
              {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </button>
          </div>
          <div className="error-box">
            {errors.password && (
              <span className="error-message">{errors.password}</span>
            )}
          </div>
        </div>
        <div className="infield">
          <div className="infield-text">
            <input
              className="input-infield"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Xác nhận mật khẩu"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            <label className="input__label-field"></label>
            <button
              type="button"
              className={`toggle-password ${
                showConfirmPassword ? "visible" : "hidden"
              }`}
              onClick={toggleShowConfirmPassword}
            >
              {showConfirmPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </button>
          </div>
          <div className="error-box">
            {errors.confirmPassword && (
              <span className="error-message">{errors.confirmPassword}</span>
            )}
          </div>
        </div>
        <div className="infield">
          <div className="infield-text">
            <input
              className="input-infield"
              type="text"
              placeholder="Số điện thoại"
              id="phone"
              value={formData.phone}
              onChange={handleChange}
            />
            <label className="input__label-field"></label>
          </div>
          <div className="error-box">
            {errors.phone && (
              <span className="error-message">{errors.phone}</span>
            )}
          </div>
        </div>
        <button className="btn-form">Đăng ký</button>
      </form>
    </>
  );
};

export default SignUp;
