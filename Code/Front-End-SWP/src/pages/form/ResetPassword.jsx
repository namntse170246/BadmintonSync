import React, { useState } from 'react';
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://localhost:7155/api/User/forgotpassword', { email });
      setMessage(response.data.message);
    } catch (error) {
      setMessage('An error occurred while sending the reset password link.');
    }
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-form">
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
        {message && <p className={message.includes('Error') ? 'error' : 'success'}>{message}</p>}
      </div>
    </div>
  );
};

export default ForgotPassword;
