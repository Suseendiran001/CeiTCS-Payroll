import React from 'react';
import { Navigate } from 'react-router-dom';
import LoginForm from '@/components/auth/LoginForm';

const Login = () => {
  // Check if user is already logged in
  const userString = localStorage.getItem('ceitcs-user');
  
  if (userString) {
    const user = JSON.parse(userString);
    if (user.role === 'employee') {
      return <Navigate to="/employee-dashboard" />;
    } else {
      return <Navigate to="/dashboard" />;
    }
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-login-gradient px-4">
      <div className="w-full max-w-3xl animate-fade-in">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white font-nunito">
            CeiTCS Payroll
          </h1>
          <p className="text-white text-opacity-80 mt-2 font-poppins">
            Login to manage your payroll system
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
