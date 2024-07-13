import { useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';
import { VerifyEmailOTP } from "../../components/API/APIConfigure";
const OTPVerification = () => {
    const { email } = useParams(); // Destructure email from useParams
    const navigate = useNavigate();
    const [otp, setOTP] = useState('');
    console.log(email);

    const handleVerifyOTP = async () => {
        const data = {
            email: email,
            otp: otp
        };

        try {
            const response = await VerifyEmailOTP(data);
            if (response.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'OTP Verified!',
                }).then(() => {
                    navigate('/login-register');
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Invalid OTP. Please try again.',
                });
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'An error occurred while verifying OTP. Please try again later.',
            });
        }
    };

    return (
        <div>
            <h1>OTP Verification</h1>
            <input
                type="text"
                value={otp}
                onChange={(e) => setOTP(e.target.value)}
                placeholder="Enter OTP"
            />
            <button onClick={handleVerifyOTP}>Verify OTP</button>
        </div>
    );
};

export default OTPVerification;
