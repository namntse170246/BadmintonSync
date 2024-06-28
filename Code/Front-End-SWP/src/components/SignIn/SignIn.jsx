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
            newErrors.username = "Tên người dùng không được để trống.";
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
                    userName: formData.username, // Sử dụng đúng tên thuộc tính
                    password: formData.password,
                };

                const response = await SignInAccount(requestData);

                console.log(response);

                setTimeout(() => {
                    setShowLoading(false);
                    if (response === null) {
                        Swal.fire({
                            icon: "error",
                            title: "Sai tài khoản hoặc mật khẩu",
                        })
                    } else if (response.success === false) {
                        Swal.fire({
                            icon: "error",
                            title: response.message,
                        });
                    }
                    else {
                        Swal.fire({
                            icon: "success",
                            title: "Login successfully!",
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
                                    navigate("/admin");
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
                    title: "Sai tài khoản hoặc mật khẩu",
                });
            }
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="sign-in-up-form">
                <h1 className="sign-up-title">Sign in</h1>
                <div className="social-container">
                    <a href="#" className="social">
                        <GoogleIcon />
                    </a>
                </div>
                <span className="introduce">or use your account</span>
                <div className="infield">
                    <div className="infield-text">
                        <input
                            className="input-infield"
                            type="text"
                            placeholder="Username"
                            name="Username"
                            id="username"
                            onChange={handleChange}
                        />
                        <label className="input__label-field"></label>
                    </div>
                    <div className="error-box">
                        {errors.username && <span className="error-message">{errors.username}</span>}
                    </div>
                </div>

                <div className="infield">
                    <div className="infield-text">
                        <input
                            className="input-infield"
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            id="password"
                            onChange={handleChange}
                        />
                        <IconButton onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                        </IconButton>
                        <label className="input__label-field"></label>
                    </div>
                    <div className="error-box">
                        {errors.password && <span className="error-message">{errors.password}</span>}
                    </div>
                </div>

                <a href="#" className="forgot">
                    Forgot password ?
                </a>
                <button className="btn-form">Sign in</button>
            </form>
        </>
    );
};

export default SignIn;
