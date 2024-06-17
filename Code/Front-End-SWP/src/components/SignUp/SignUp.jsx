import GoogleIcon from "@mui/icons-material/Google";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import { SignUpAccount } from "../API/APIConfigure";
import Swal from "sweetalert2";

const SignUp = ({ handleToggleForm, setShowLoading }) => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
    });
    const [errors, setErrors] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    const handleValidateFields = () => {
        let newErrors = {};

        if (!formData.username) {
            newErrors.username = "Tên người dùng không được để trống.";
        }

        if (!formData.email) {
            newErrors.email = "Email không được để trống.";
        }

        if (!formData.password) {
            newErrors.password = "Mật khẩu không được để trống.";
        } else if (formData.password.length < 6 || !/[A-Z]/.test(formData.password)) {
            newErrors.password = "Mật khẩu phải có ít nhất 6 kí tự và ít nhất 1 kí tự viết hoa.";
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = "Xác nhận mật khẩu không được để trống.";
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Mật khẩu và xác nhận mật khẩu không khớp.";
        }

        if (!formData.phone) {
            newErrors.phone = "Số điện thoại không được để trống.";
        } else if (formData.phone.length !== 10 || !/^\d{10}$/.test(formData.phone)) {
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
                    password: formData.password,
                    confirmPassword: formData.confirmPassword,
                    email: formData.email,
                    phone: formData.phone,
                };

                console.log(userData);

                const response = await SignUpAccount(userData);

                console.log(response);

                setTimeout(() => {
                    setShowLoading(false);

                    if (response === null) {
                        Swal.fire({
                            icon: "error",
                            title: "Có lỗi xảy ra khi đăng ký tài khoản.",
                        });
                    }  else if (response.success === false) {
                        Swal.fire({
                            icon: "error",
                            title: response.message,
                        });
                    }
                    else {
                        Swal.fire({
                            icon: "success",
                            title: "Tạo tài khoản thành công !!!",
                        }).then((result) => {
                            if (result.isConfirmed) {
                                handleToggleForm();
                            }
                        });
                    }
                }, 3000);
            } catch (err) {
                console.log(err);
                console.log(err.message);
            }
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="sign-in-up-form">
                <h1 className="sign-up-title">Tạo Tài Khoản</h1>
                <div className="social-container">
                    <a href="#" className="social">
                        <GoogleIcon />
                    </a>
                </div>
                <div className="infield">
                    <div className="infield-text">
                        <input
                            className="input-infield"
                            type="text"
                            placeholder="Tài khoản"
                            id="username"
                            value={formData.username}
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
                            type="text"
                            placeholder="Email"
                            id="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        <label className="input__label-field"></label>
                    </div>
                    <div className="error-box">
                        {errors.email && <span className="error-message">{errors.email}</span>}
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
                        <IconButton onClick={handleTogglePassword}>
                            {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                        </IconButton>
                        <label className="input__label-field"></label>
                    </div>
                    <div className="error-box">
                        {errors.password && <span className="error-message">{errors.password}</span>}
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
                        <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                            {showConfirmPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                        </IconButton>
                        <label className="input__label-field"></label>
                    </div>
                    <div className="error-box">
                        {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
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
                        {errors.phone && <span className="error-message">{errors.phone}</span>}
                    </div>
                </div>
                <button className="btn-form">Đăng ký</button>
            </form>
        </>
    );
};

export default SignUp;
