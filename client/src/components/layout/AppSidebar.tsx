import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  BarChart3,
  Building2,
  Calendar,
  ClipboardCheck,
  CreditCard,
  FileClock,
  FileText,
  Home,
  LogOut,
  Settings,
  Users
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

const AppSidebar = () => {
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
        <SidebarLink
          to="/dashboard"
          icon={<Home size={20} />}
          label={collapsed ? "" : "Dashboard"}
          isActive={currentPath === '/dashboard'}
        />

        <SidebarLink
          to="/employees"
          icon={<Users size={20} />}
          label={collapsed ? "" : "Employees"}
          isActive={currentPath.startsWith('/employees')}
        />

        <SidebarLink
          to="/attendance"
          icon={<Calendar size={20} />}
          label={collapsed ? "" : "Attendance"}
          isActive={currentPath.startsWith('/attendance')}
        />

        <SidebarLink
          to="/payroll"
          icon={<CreditCard size={20} />}
          label={collapsed ? "" : "Payroll"}
          isActive={currentPath.startsWith('/payroll')}
        />

        <SidebarLink
          to="/onsite"
          icon={<Building2 size={20} />}
          label={collapsed ? "" : "Onsite Employees"}
          isActive={currentPath.startsWith('/onsite')}
        />

        {/* <SidebarLink
          to="/leave"
          icon={<FileClock size={20} />}
          label={collapsed ? "" : "Leave Management"}
          isActive={currentPath.startsWith('/leave')}
        /> */}

        <SidebarLink
          to="/reports"
          icon={<BarChart3 size={20} />}
          label={collapsed ? "" : "Reports"}
          isActive={currentPath.startsWith('/reports')}
        />

        {/* <SidebarLink
          to="/compliance"
          icon={<ClipboardCheck size={20} />}
          label={collapsed ? "" : "Compliance"}
          isActive={currentPath.startsWith('/compliance')}
        /> */}

        <SidebarLink
          to="/settings"
          icon={<Settings size={20} />}
          label={collapsed ? "" : "Settings"}
          isActive={currentPath.startsWith('/settings')}
        />
      </div>

      <div className="p-4 border-t border-gray-200">
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

export default AppSidebar;
