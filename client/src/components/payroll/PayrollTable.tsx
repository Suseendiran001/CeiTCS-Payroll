
import React from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowUpDown, Download, FileText, MoreVertical } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

interface PayrollTableProps {
  employeeType: 'all' | 'permanent' | 'contract' | 'intern';
  period: string;
}

const PayrollTable = ({ employeeType, period }: PayrollTableProps) => {
  // Sample data - in a real application, this would come from your API
  const allEmployees = [
    {
      id: 1,
      name: 'Ajay Kumar',
      empId: 'P001',
      type: 'permanent',
      department: 'Engineering',
      basic: 85000,
      hra: 34000,
      allowances: 25000,
      bonus: 10000,
      deductions: 32000,
      netPay: 122000,
      currency: 'INR',
      status: 'processed',
    },
    {
      id: 2,
      name: 'Priya Singh',
      empId: 'P005',
      type: 'permanent',
      department: 'Design',
      basic: 72000,
      hra: 28800,
      allowances: 18000,
      bonus: 7000,
      deductions: 28000,
      netPay: 97800,
      currency: 'INR',
      status: 'processed',
    },
    {
      id: 3,
      name: 'Rahul Sharma',
      empId: 'P008',
      type: 'permanent',
      department: 'Project Management',
      basic: 95000,
      hra: 38000,
      allowances: 30000,
      bonus: 12000,
      deductions: 38000,
      netPay: 137000,
      currency: 'INR',
      status: 'processed',
    },
    {
      id: 4,
      name: 'Meera Patel',
      empId: 'C001',
      type: 'contract',
      department: 'DevOps',
      basic: 65000,
      hra: 0,
      allowances: 15000,
      bonus: 0,
      deductions: 15000,
      netPay: 65000,
      currency: 'INR',
      status: 'processed',
    },
    {
      id: 5,
      name: 'Vijay Reddy',
      empId: 'C008',
      type: 'contract',
      department: 'Data Analysis',
      basic: 70000,
      hra: 0,
      allowances: 18000,
      bonus: 0,
      deductions: 17000,
      netPay: 71000,
      currency: 'INR',
      status: 'pending',
    },
    {
      id: 6,
      name: 'Ananya Gupta',
      empId: 'P018',
      type: 'permanent',
      department: 'Product',
      basic: 88000,
      hra: 35200,
      allowances: 27000,
      bonus: 11000,
      deductions: 35000,
      netPay: 126200,
      currency: 'INR',
      status: 'processed',
    },
    {
      id: 7,
      name: 'Karan Malhotra',
      empId: 'I001',
      type: 'intern',
      department: 'Engineering',
      basic: 25000,
      hra: 0,
      allowances: 5000,
      bonus: 0,
      deductions: 2500,
      netPay: 27500,
      currency: 'INR',
      status: 'processed',
    },
    {
      id: 8,
      name: 'Neha Verma',
      empId: 'I003',
      type: 'intern',
      department: 'QA',
      basic: 22000,
      hra: 0,
      allowances: 4000,
      bonus: 0,
      deductions: 2000,
      netPay: 24000,
      currency: 'INR',
      status: 'pending',
    },
  ];
  
  const employees = employeeType === 'all'
    ? allEmployees
    : allEmployees.filter(emp => emp.type === employeeType);
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .toUpperCase();
  };
  
  const formatCurrency = (amount: number, currency: string) => {
    if (currency === 'INR') {
      return `₹${amount.toLocaleString('en-IN')}`;
    }
    return `${currency} ${amount.toLocaleString()}`;
  };
  
  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'processed':
        return <Badge className="bg-green-100 text-green-800">Processed</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };
  
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50 text-gray-600 text-xs uppercase tracking-wider">
          <tr>
            <th className="px-6 py-3 text-left">Employee</th>
            <th className="px-6 py-3 text-left hidden md:table-cell">Department</th>
            <th className="px-6 py-3 text-left">
              <div className="flex items-center">
                <span>Basic</span>
                <ArrowUpDown className="ml-1 h-4 w-4" />
              </div>
            </th>
            <th className="px-6 py-3 text-left hidden md:table-cell">HRA</th>
            <th className="px-6 py-3 text-left hidden lg:table-cell">Allowances</th>
            <th className="px-6 py-3 text-left hidden lg:table-cell">Deductions</th>
            <th className="px-6 py-3 text-left">
              <div className="flex items-center">
                <span>Net Pay</span>
                <ArrowUpDown className="ml-1 h-4 w-4" />
              </div>
            </th>
            <th className="px-6 py-3 text-left">Status</th>
            <th className="px-6 py-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {employees.map((employee) => (
            <tr key={employee.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary-gradient text-white text-xs">
                      {getInitials(employee.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-gray-900">{employee.name}</p>
                    <p className="text-xs text-gray-500">{employee.empId}</p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell">{employee.department}</td>
              <td className="px-6 py-4 whitespace-nowrap">{formatCurrency(employee.basic, employee.currency)}</td>
              <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell">{formatCurrency(employee.hra, employee.currency)}</td>
              <td className="px-6 py-4 whitespace-nowrap hidden lg:table-cell">{formatCurrency(employee.allowances, employee.currency)}</td>
              <td className="px-6 py-4 whitespace-nowrap hidden lg:table-cell">{formatCurrency(employee.deductions, employee.currency)}</td>
              <td className="px-6 py-4 whitespace-nowrap font-medium">{formatCurrency(employee.netPay, employee.currency)}</td>
              <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(employee.status)}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" title="Download Payslip">
                    <Download className="h-4 w-4" />
                  </Button>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <FileText className="h-4 w-4 mr-2" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Download className="h-4 w-4 mr-2" />
                        Download Payslip
                      </DropdownMenuItem>
                      {employee.status === 'pending' && (
                        <DropdownMenuItem>
                          Process Payroll
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {employees.length === 0 && (
        <div className="py-10 text-center">
          <p className="text-gray-500">No payroll data available for the selected filters.</p>
        </div>
      )}
    </div>
  );
};

export default PayrollTable;
