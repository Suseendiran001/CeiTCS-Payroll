import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect to login or dashboard based on authentication status
    const user = localStorage.getItem('ceitcs-user');
    if (user) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  }, [navigate]);
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-primary-gradient">
          CeiTCS Payroll Management System
        </h1>
        <p className="text-xl text-gray-600 mt-2">Loading...</p>
      </div>
    </div>
  );
};

export default Index;
