import { useEffect, useState } from "react";
import { GetUserByID, UpdateAccountByID } from "../../components/API/APIConfigure";
import "./Profile.css";
import Swal from "sweetalert2";

const validateUsername = (value) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@#$%^&+=!])([A-Za-z\d@#$%^&+=!]{6,})$/;
    return regex.test(value);
};
const validateFullName = (value) => {
    return value.length >= 6;
};

const validatePhone = (value) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(value);
};

const validateAddress = (value) => {
    return value.trim() !== "";
};
function Profile() {
    const [userData, setUserData] = useState(null);
    const [editedUser, setEditedUser] = useState(null);
    const [errors, setErrors] = useState({});
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const userID = userInfo.id;

    // Validation
    useEffect(() => {
        const fetchUser = async () => {
            try {
                // console.log(userInfo);
                const response = await GetUserByID(userID);
                setUserData(response);
                setEditedUser(response); // Initialize editedUser state with fetched user data
            } catch (err) {
                console.log(err);
            }
        };

        fetchUser();
    }, [userID]);
    // Handle changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedUser({ ...editedUser, [name]: value });
        validateField(name, value);
    };
    // Xử lý sự kiện thay đổi cho trường "sex"
    const handleSexChange = (e) => {
        const { value } = e.target;
        setEditedUser({ ...editedUser, sex: value === "true" });
    };
    // Update the fullName in editedUser
    const handleFullNameChange = (e) => {
        const { value } = e.target;
        setEditedUser({ ...editedUser, fullName: value });
    };
    const validateField = (name, value) => {
        let error = "";
        switch (name) {
            case "username":
                error = validateUsername(value)
                    ? ""
                    : "Tên đăng nhập phải có ít nhất 6 ký tự bao gồm ký tự viết hoa, 1 số, 1 ký tự đặc biệt";
                break;
            case "phone":
                error = validatePhone(value) ? "" : "Số điện thoại phải có 10 số";
                break;
            case "address":
                error = validateAddress(value) ? "" : "Địa chỉ không được để trống";
                break;
            case "fullName":
                error = validateFullName(value) ? "" : "Họ và tên phải trên 5 ký tự";
                break;
            default:
                break;
        }
        setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
    };

    const handleSubmit = () => {
        // Check for errors before saving changes
        const isValid = Object.values(errors).every((error) => error === "");
        if (isValid) {
            // Save changes
            UpdateAccountByID(userID, editedUser);
            // For demonstration purpose, you can handle saving changes here
            Swal.fire({
                icon: "success",
                title: "Cập nhật tài khoản thành công !!!",
            });
            console.log("Changes saved:", editedUser);
        } else {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Không thể cập nhật người dùng. Vui lòng thử lại sau.",
            });
            console.log("Cannot save changes. Please fix the errors.");
        }
    };

    return (
        <div className="container__myprofile">
            <h2 className="profile-title">Thông tin cá nhân</h2>
            <h1>Cập nhật thông tin của bạn và tìm hiểu các thông tin này được sử dụng ra sao.</h1>
            <br />
            {userData && (
                <div className="accountsettings">
                    <div className="form">
                        <div className="form-group">
                            <label htmlFor="name">Họ Và Tên:</label>
                            <input
                                type="text"
                                name="fullName"
                                id="fullName"
                                value={editedUser.fullName}
                                onChange={handleFullNameChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="username">Tên Đăng Nhập:</label>
                            <input
                                type="text"
                                name="username"
                                id="username"
                                value={editedUser.username}
                                onChange={handleChange}
                                disabled
                            />
                            {errors.username && <p className="error-message">{errors.username}</p>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="sex">Giới Tính:</label>
                            <select
                                name="sex"
                                id="sex"
                                value={editedUser.sex} // Giá trị ban đầu được chuyển trực tiếp từ editedUser.sex
                                onChange={handleSexChange} // Sử dụng hàm xử lý sự kiện mới cho trường "sex"
                            >
                                <option value="true">Nam</option>
                                <option value="false">Nữ</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="address">Địa chỉ:</label>
                            <textarea name="address" id="address" value={editedUser.address} onChange={handleChange} />
                            {/* No validation for address */}
                        </div>

                        <div className="form-group">
                            <label htmlFor="phone">Số điện thoại:</label>
                            <input
                                type="text"
                                name="phone"
                                id="phone"
                                value={editedUser.phone}
                                onChange={handleChange}
                            />
                            {errors.phone && <p className="error-message">{errors.phone}</p>}
                        </div>
                    </div>

                    <button className="mainbutton1" onClick={handleSubmit}>
                        Nhấn Lưu Thay Đổi
                    </button>
                </div>
            )}
        </div>
    );
}

export default Profile;
