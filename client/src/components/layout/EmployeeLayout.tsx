import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import EmployeeSidebar from './EmployeeSidebar';
import { Bell, MessageSquare, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

const EmployeeHeader = () => {
  return (
    <header className="border-b border-gray-200 bg-white py-3 px-6">
      <div className="flex items-center justify-between">
        <div className="relative w-72">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
          <Input 
            placeholder="Search..." 
            className="pl-8 bg-gray-50 border-gray-200 focus:bg-white"
          />
        </div>
        
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="relative">
            <Bell size={20} />
            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500">
              3
            </Badge>
          </Button>
          
          <Button variant="ghost" size="icon">
            <MessageSquare size={20} />
          </Button>
          
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">John Doe</p>
              <p className="text-xs text-gray-500">Software Engineer</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

const EmployeeLayout = () => {
  const navigate = useNavigate();
  // Simple auth check - in a real app this would be more robust
  useEffect(() => {
    const userString = localStorage.getItem('ceitcs-user');
    if (!userString) {
      navigate('/login');
    } else {
      const user = JSON.parse(userString);
      if (user.role !== 'employee') {
        // If admin tries to access employee pages, redirect to admin dashboard
        navigate('/dashboard');
      }
    }
  }, [navigate]);

  return (
    <div className="flex h-screen bg-gray-50">
      <EmployeeSidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <EmployeeHeader />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default EmployeeLayout;
