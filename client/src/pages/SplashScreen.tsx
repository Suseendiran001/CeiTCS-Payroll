import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SplashScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const userString = localStorage.getItem('ceitcs-user');
    
    if (userString) {
      const user = JSON.parse(userString);
      // Redirect to appropriate dashboard based on role
      setTimeout(() => {
        if (user.role === 'employee') {
          navigate('/employee-dashboard');
        } else {
          navigate('/dashboard');
        }
      }, 1500);
    } else {
      // If not logged in, redirect to portal selection
      setTimeout(() => {
        navigate('/portal');
      }, 2500);
    }
    
    return () => {};
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600">
      <div className="text-center">
        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center justify-center animate-pulse">
            <div className="h-32 w-32 rounded-2xl bg-white opacity-20"></div>
          </div>
          <div className="relative h-32 w-32 rounded-2xl bg-white shadow-lg flex items-center justify-center mx-auto">
            <span className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">C</span>
          </div>
        </div>
        
        <h1 className="text-4xl font-bold text-white mb-2">CeiTCS</h1>
        <p className="text-indigo-100 text-lg">Payroll Management System</p>
        
        <div className="mt-8">
          <div className="flex justify-center items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-white opacity-80 animate-bounce" style={{ animationDelay: '0s' }}></div>
            <div className="h-2 w-2 rounded-full bg-white opacity-80 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            <div className="h-2 w-2 rounded-full bg-white opacity-80 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
