import React, { useState } from 'react';
import axios from 'axios';
import './forgotten.css';  // Import CSS file

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('api/User/forgotpassword', { email });
      setMessage(response.data.message);
      setIsSuccess(true); // Đặt trạng thái thành công
    } catch (error) {
      setMessage('An error occurred while sending the reset password link.');
      setIsSuccess(false); // Đặt trạng thái lỗi
    }
  };

  return (
    <div className="Forgotten">
      <h2>Forgot Password</h2>
      <form onSubmit={handleForgotPassword}>
        <div>
          <label>Email:</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        <button type="submit">Send Reset Link</button>
      </form>
      {message && (
        <p className={isSuccess ? 'success-message' : 'error-message'}>
          {message}
        </p>
      )}
    </div>
  );
};

export default ForgotPassword;
