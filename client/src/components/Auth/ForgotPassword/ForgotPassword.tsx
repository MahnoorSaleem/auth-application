import React, { useState } from 'react';
import { forgotPassword } from '../../../services/api';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Call the API to send password reset link
    // Assuming you have a forgotPassword function in your API service
    forgotPassword(email).then(() => {
      // Handle successful password reset request
      alert('Password reset link sent to your email');
    }).catch((error) => {
      // Handle errors
      console.error(error);
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <button type="submit">Send Password Reset Link</button>
    </form>
  );
};

export default ForgotPassword;
