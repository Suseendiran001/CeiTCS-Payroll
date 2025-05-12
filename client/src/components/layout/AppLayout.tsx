
import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import AppSidebar from './AppSidebar';
import AppHeader from './AppHeader';

const AppLayout = () => {
  const navigate = useNavigate();
  // Simple auth check - in a real app this would be more robust
  useEffect(() => {
    const userString = localStorage.getItem('ceitcs-user');
    if (!userString) {
      navigate('/login');
    } else {
      const user = JSON.parse(userString);
      if (user.role !== 'admin') {
        // If employee tries to access admin pages, redirect to employee dashboard
        navigate('/employee-dashboard');
      }
    }
  }, [navigate]);

  return (
    <div className="flex h-screen bg-gray-50">
      <AppSidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <AppHeader />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
