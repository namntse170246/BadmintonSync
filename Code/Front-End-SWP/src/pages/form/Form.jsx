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
                                    <h1 className="sign-up-title">Welcome!</h1>
                                    <p className="intro-text">Please log in to connect with us</p>
                                    <button className="btn-form">Sign in</button>
                                </div>
                                <div className="overlay-panel overlay-right">
                                    <h1 className="sign-up-title">Hello!</h1>
                                    <p className="intro-text">
                                        Enter your personal details and start your journey with us
                                    </p>
                                    <button className="btn-form">Sign Up</button>
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
