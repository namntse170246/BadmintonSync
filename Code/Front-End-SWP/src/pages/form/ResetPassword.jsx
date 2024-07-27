import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ResetPassword.css'; // Nhập CSS vào tập tin

const ResetPassword = () => {
  const { token } = useParams(); // Lấy token từ URL
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('https://localhost:7155/api/User/resetpassword', {
        token, // Gửi token đúng cách
        newPassword: password,
        confirmPassword: confirmPassword
      });
      
      setMessage(response.data.message);
      
      if (response.data.success) {
        setTimeout(() => navigate('/login-register'), 2000);
      }
    } catch (error) {
      console.error('Error details:', error.response?.data || error.message);
      const errorMessage = error.response?.data?.message || 'An unexpected error occurred';
      setMessage(errorMessage);
    }
  };

  return (
    <div className="reset-password-container">
      <div className="reset-password-form">
        <h2>Reset Password</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>New Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Confirm New Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Reset Password</button>
        </form>
        {message && <p className={message.includes('success') ? 'success' : 'error'}>{message}</p>}
      </div>
    </div>
  );
};

export default ResetPassword;
