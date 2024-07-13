import { useEffect, useState } from "react";
import { UpdateAccount, GetCurrentUser } from "../../components/API/APIConfigure";
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

const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
};

function Profile() {
    const [userData, setUserData] = useState(null);
    const [editedUser, setEditedUser] = useState(null);
    const [errors, setErrors] = useState({});
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const userID = userInfo.id;

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = userInfo;
                console.log("Response: ", response);
                response.fullName = response.name;
                setUserData(response);
                setEditedUser(response);
            } catch (err) {
                console.log(err);
            }
        };

        fetchUser();
    }, [userID]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedUser({ ...editedUser, [name]: value });
        validateField(name, value);
    };

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
                    : "Username must have at least 6 characters including capital letters, 1 number, 1 special character";
                break;
            case "phone":
                error = validatePhone(value) ? "" : "The phone number must have 10 digits";
                break;
            case "email":
                error = validateEmail(value) ? "" : "Invalid email";
                break;
            case "fullName":
                error = validateFullName(value) ? "" : "Full name must be more than 5 characters";
                break;
            default:
                break;
        }
        setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
    };

    const handleSubmit = async () => {
        const isValid = Object.values(errors).every((error) => error === "");
        if (isValid) {
            console.log("updateInfor: ", editedUser);

            const response = await UpdateAccount(editedUser);
            console.log(response);
            if (response === null) {
                Swal.fire({
                    icon: "error",
                    title: "An error occurred while updating the account.",
                });
            } else if (response.success === false) {
                Swal.fire({
                    icon: "error",
                    title: response.message,
                });
            } else {
                Swal.fire({
                    icon: "success",
                    title: "Account updated Successful!",
                });
                localStorage.setItem("userInfo", JSON.stringify(editedUser));
            }
            console.log("Changes saved:", editedUser);
        } else {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Cannot save changes. Please try again later!",
            });
            console.log("Cannot save changes. Please fix the errors.");
        }
    };

    return (
        <div className="container__myprofile">
            <h2 className="profile-title">My Profile</h2>
            <h1>Update your information and learn how it is used!</h1>
            <br />
            {userData && (
                <div className="accountsettings">
                    <div className="form">
                        <div className="form-group">
                            <label htmlFor="name">Full Name:</label>
                            <input
                                type="text"
                                name="fullName"
                                id="fullName"
                                value={editedUser.fullName}
                                onChange={handleFullNameChange}
                            />
                            {errors.name && <p className="error-message">{errors.name}</p>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="username">Username:</label>
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
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                value={editedUser.email}
                                onChange={handleChange}
                            />
                            {errors.email && <p className="error-message">{errors.email}</p>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="phone">Phone:</label>
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
                        Save
                    </button>
                </div>
            )}
        </div>
    );
}

export default Profile;
