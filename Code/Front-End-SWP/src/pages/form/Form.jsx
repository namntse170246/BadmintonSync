import "./Form.css";
import SignIn from "../../components/SignIn/SignIn";
import SignUp from "../../components/SignUp/SignUp";
import { useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import LoadingPage from "../../components/LoadingPage/LoadingPage";
const Form = () => {
    const [isSignUp, setIsSignUp] = useState(false);
    const [showLoading, setShowLoading] = useState(false);
    const handleToggleForm = () => {
        setIsSignUp((prevIsSignUp) => !prevIsSignUp);
    };

    return (
        <>
            <Navbar />
            <div className="body-container">
                {showLoading ? (
                    <LoadingPage />
                ) : (
                    <div className={`container ${isSignUp ? "right-panel-active" : ""}`} id="container">
                        <div className="form-box-container sign-up-container">
                            <SignUp handleToggleForm={handleToggleForm} setShowLoading={setShowLoading} />
                        </div>
                        <div className="form-box-container sign-in-container">
                            <SignIn setShowLoading={setShowLoading} />
                        </div>
                        <div className="overlay-container" id="overlayCon">
                            <div className="overlay">
                                <div className="overlay-panel overlay-left">
                                    <h1 className="sign-up-title">Chào mừng!</h1>
                                    <p className="intro-text">Vui lòng đăng nhập để kết nối với chúng tôi</p>
                                    <button className="btn-form">Đăng Nhập</button>
                                </div>
                                <div className="overlay-panel overlay-right">
                                    <h1 className="sign-up-title">Xin chào!</h1>
                                    <p className="intro-text">
                                        Nhập thông tin cá nhân của bạn và bắt đầu hành trình với chúng tôi
                                    </p>
                                    <button className="btn-form">Đăng Ký</button>
                                </div>
                            </div>
                            <button className="btn-form" id="overlayBtn" onClick={handleToggleForm}></button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default Form;
