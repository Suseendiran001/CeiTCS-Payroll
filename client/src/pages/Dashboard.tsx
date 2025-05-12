import React from 'react';
import StatsCard from '@/components/dashboard/StatsCard';
import EmployeeStatusChart from '@/components/dashboard/EmployeeStatusChart';
import PayrollTrendChart from '@/components/dashboard/PayrollTrendChart';
import RecentHires from '@/components/dashboard/RecentHires';
import { Users, CreditCard, Clock, Briefcase } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-gray-500">Welcome to CeiTCS Payroll Management System</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard 
          title="Total Employees" 
          value="55" 
          icon={<Users size={20} />}
          trend={{ value: 5.2, label: "vs last month", positive: true }}
        />
        <StatsCard 
          title="Monthly Payroll" 
          value="₹6,25,000" 
          icon={<CreditCard size={20} />}
          trend={{ value: 3.1, label: "vs last month", positive: true }}
        />
        <StatsCard 
          title="Avg. Attendance" 
          value="96%" 
          icon={<Clock size={20} />}
          trend={{ value: 1.3, label: "vs last month", positive: true }}
        />
        <StatsCard 
          title="New Hires" 
          value="5" 
          icon={<Briefcase size={20} />}
          trend={{ value: 10, label: "this month", positive: true }}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <EmployeeStatusChart />
        <PayrollTrendChart />
      </div>
      
      <RecentHires />
    </div>
  );
};

export default Dashboard;
