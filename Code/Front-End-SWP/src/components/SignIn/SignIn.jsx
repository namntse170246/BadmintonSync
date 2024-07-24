import GoogleIcon from "@mui/icons-material/Google";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useAuth } from "../../hook/AuthContext";
import { IconButton } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { SignInAccount } from "../API/APIConfigure";

const SignIn = ({ setShowLoading }) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
    setErrors({
      ...errors,
      [e.target.id]: "",
    });
  };

  const handleValidateFields = () => {
    let newErrors = {};
    if (!formData.username) {
      newErrors.username = "Tên đăng nhập không được để trống.";
    }
    if (!formData.password) {
      newErrors.password = "Mật khẩu không được để trống.";
    }
    setErrors(newErrors);
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = handleValidateFields();
    if (Object.keys(newErrors).length === 0) {
      setShowLoading(true);
      try {
        const requestData = {
          userName: formData.username,
          password: formData.password,
        };

        const response = await SignInAccount(requestData);
        console.log(response);

        setTimeout(() => {
          setShowLoading(false);
          if (response === null) {
            Swal.fire({
              icon: "error",
              title: "Tên đăng nhập hoặc mật khẩu không chính xác.",
            });
          } else if (response.success === false) {
            Swal.fire({
              icon: "error",
              title: response.message,
            });
          } else {
            Swal.fire({
              icon: "success",
              title: "Đăng nhập thành công!",
            }).then((result) => {
              if (result.isConfirmed) {
                localStorage.removeItem("userInfo");

                const userInfo = {
                  accessToken: response.data.token,
                  role: response.data.role,
                  id: response.data.id,
                  name: response.data.fullName,
                  phone: response.data.phone,
                  email: response.data.email,
                  username: response.data.userName,
                };
                login(userInfo);

                if (userInfo.role === "Administrator") {
                  navigate("/admin/user");
                } else if (userInfo.role === "Owner") {
                  navigate("/owner/courts");
                } else {
                  navigate("/");
                }
              } else {
                Swal.fire({
                  icon: "error",
                  title: "Đã xảy ra lỗi",
                });
              }
            });
          }
        }, 1500);
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Tên đăng nhập hoặc mật khẩu không chính xác.",
        });
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="sign-in-up-form">
        <h1 className="sign-up-title" style={{ paddingBottom: "20px" }}>
          Đăng nhập
        </h1>

        <div className="infield">
          <div className="infield-text">
            <input
              className="input-infield"
              type="text"
              placeholder="Tên đăng nhập"
              name="Username"
              id="username"
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
              type={showPassword ? "text" : "password"}
              placeholder="Mật khẩu"
              id="password"
              onChange={handleChange}
            />
            <label className="input__label-field"></label>
          </div>
          <div className="error-box">
            {errors.password && (
              <span className="error-message">{errors.password}</span>
            )}
          </div>
        </div>

        <button className="btn-form">Đăng nhập</button>
      </form>
    </>
  );
};

export default SignIn;
