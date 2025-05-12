import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Home,
  User,
  Calendar,
  FileText,
  CreditCard,
  Settings,
  LogOut,
  Bell,
  HelpCircle
} from 'lucide-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

type SidebarLinkProps = {
  to: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
};

const SidebarLink = ({ to, icon, label, isActive }: SidebarLinkProps) => {
  return (
    <Link
      to={to}
      className={cn(
        "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
        isActive ?
          "bg-primary-gradient text-white" :
          "text-gray-700 hover:bg-gray-100"
      )}
    >
      {icon}
      <span className="font-medium">{label}</span>
    </Link>
  );
};

const EmployeeSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('ceitcs-user');
    navigate('/login');
  };

  return (
    <div className={cn(
      "bg-white border-r border-gray-200 h-screen flex flex-col transition-all duration-300",
      collapsed ? "w-20" : "w-64"
    )}>
      <div className="flex items-center justify-between p-4">
        {!collapsed && <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-primary-gradient">CeiTCS</h1>}
        <Button
          variant="ghost"
          onClick={() => setCollapsed(!collapsed)}
          className="ml-auto"
        >
          {collapsed ? (
            <ChevronRight className="w-10 h-10" />
          ) : (
            <ChevronLeft className="w-10 h-10" />
          )}
        </Button>
      </div>

      <div className="flex-1 py-6 space-y-1 px-3">
        {!collapsed ? (
          <>
            <SidebarLink
              to="/employee-dashboard"
              icon={<Home size={20} />}
              label="Dashboard"
              isActive={currentPath === '/employee-dashboard'}
            />

            <SidebarLink
              to="/my-profile"
              icon={<User size={20} />}
              label="My Profile"
              isActive={currentPath === '/my-profile'}
            />

            {/* <SidebarLink
              to="/my-attendance"
              icon={<Calendar size={20} />}
              label="Attendance"
              isActive={currentPath === '/my-attendance'}
            /> */}

            <SidebarLink
              to="/my-leave"
              icon={<FileText size={20} />}
              label="Leave"
              isActive={currentPath === '/my-leave'}
            />
            
            <SidebarLink
              to="/my-payslips"
              icon={<CreditCard size={20} />}
              label="Payslips"
              isActive={currentPath === '/my-payslips'}
            />
          </>
        ) : (
          <>
            <Link to="/employee-dashboard" className={cn(
              "flex items-center justify-center p-2 rounded-md transition-colors",
              currentPath === '/employee-dashboard' ? "bg-primary-gradient text-white" : "text-gray-700 hover:bg-gray-100"
            )}>
              <Home size={20} />
            </Link>

            <Link to="/my-profile" className={cn(
              "flex items-center justify-center p-2 rounded-md transition-colors",
              currentPath === '/my-profile' ? "bg-primary-gradient text-white" : "text-gray-700 hover:bg-gray-100"
            )}>
              <User size={20} />
            </Link>

            <Link to="/my-attendance" className={cn(
              "flex items-center justify-center p-2 rounded-md transition-colors",
              currentPath === '/my-attendance' ? "bg-primary-gradient text-white" : "text-gray-700 hover:bg-gray-100"
            )}>
              <Calendar size={20} />
            </Link>

            <Link to="/my-leave" className={cn(
              "flex items-center justify-center p-2 rounded-md transition-colors",
              currentPath === '/my-leave' ? "bg-primary-gradient text-white" : "text-gray-700 hover:bg-gray-100"
            )}>
              <FileText size={20} />
            </Link>

            <Link to="/my-payslips" className={cn(
              "flex items-center justify-center p-2 rounded-md transition-colors",
              currentPath === '/my-payslips' ? "bg-primary-gradient text-white" : "text-gray-700 hover:bg-gray-100"
            )}>
              <CreditCard size={20} />
            </Link>
          </>
        )}
      </div>      <div className="p-4 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-2 text-gray-700 hover:bg-red-500 hover:text-white rounded-md transition-colors"
        >
          <LogOut size={20} />
          {!collapsed && <span className="font-medium">Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default EmployeeSidebar;
