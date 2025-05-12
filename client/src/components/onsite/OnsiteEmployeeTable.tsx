
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { MoreVertical, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

interface OnsiteEmployeeTableProps {
  country: string;
}

const OnsiteEmployeeTable = ({ country }: OnsiteEmployeeTableProps) => {
  // Sample data - in a real application, this would come from your API
  const allEmployees = [
    { 
      id: 1, 
      name: 'Ajay Kumar', 
      empId: 'P001', 
      role: 'Software Engineer', 
      country: 'USA', 
      location: 'San Francisco',
      timeZone: 'GMT-7',
      status: 'active',
      visaStatus: 'approved',
      currency: 'USD'
    },
    { 
      id: 2, 
      name: 'Priya Singh', 
      empId: 'P005', 
      role: 'UX Designer', 
      country: 'UK', 
      location: 'London',
      timeZone: 'GMT+1',
      status: 'active',
      visaStatus: 'approved',
      currency: 'GBP'
    },
    { 
      id: 3, 
      name: 'Rahul Sharma', 
      empId: 'P008', 
      role: 'Project Manager', 
      country: 'Germany', 
      location: 'Berlin',
      timeZone: 'GMT+2',
      status: 'active',
      visaStatus: 'pending',
      currency: 'EUR'
    },
    { 
      id: 4, 
      name: 'Meera Patel', 
      empId: 'P012', 
      role: 'DevOps Engineer', 
      country: 'Australia', 
      location: 'Sydney',
      timeZone: 'GMT+10',
      status: 'active',
      visaStatus: 'approved',
      currency: 'AUD'
    },
    { 
      id: 5, 
      name: 'Vijay Reddy', 
      empId: 'P015', 
      role: 'Data Analyst', 
      country: 'Singapore', 
      location: 'Singapore',
      timeZone: 'GMT+8',
      status: 'active',
      visaStatus: 'approved',
      currency: 'SGD'
    },
    { 
      id: 6, 
      name: 'Ananya Gupta', 
      empId: 'P018', 
      role: 'Product Manager', 
      country: 'USA', 
      location: 'New York',
      timeZone: 'GMT-4',
      status: 'active',
      visaStatus: 'approved',
      currency: 'USD'
    },
    { 
      id: 7, 
      name: 'Karan Malhotra', 
      empId: 'P021', 
      role: 'Frontend Developer', 
      country: 'UK', 
      location: 'Manchester',
      timeZone: 'GMT+1',
      status: 'active',
      visaStatus: 'expiring',
      currency: 'GBP'
    },
    { 
      id: 8, 
      name: 'Neha Verma', 
      empId: 'P025', 
      role: 'QA Engineer', 
      country: 'Germany', 
      location: 'Munich',
      timeZone: 'GMT+2',
      status: 'active',
      visaStatus: 'approved',
      currency: 'EUR'
    }
  ];
  
  const employees = country === 'all' 
    ? allEmployees 
    : allEmployees.filter(emp => emp.country === country);
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .toUpperCase();
  };
  
  const getVisaStatusBadge = (status: string) => {
    switch(status) {
      case 'approved':
        return <Badge className="bg-green-100 text-green-800">Approved</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case 'expiring':
        return <Badge className="bg-orange-100 text-orange-800">Expiring Soon</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  const calculateLocalTime = (timeZone: string) => {
    // This is a simplified version. In a real app, you would use a library like 'date-fns-tz'
    const now = new Date();
    const localTime = new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short',
      timeZone: timeZone === 'GMT+1' ? 'Europe/London' : 
                timeZone === 'GMT+2' ? 'Europe/Berlin' :
                timeZone === 'GMT+8' ? 'Asia/Singapore' :
                timeZone === 'GMT+10' ? 'Australia/Sydney' :
                timeZone === 'GMT-4' ? 'America/New_York' :
                'America/Los_Angeles'
    }).format(now);
    return localTime;
  };
  
  return (
    <Card>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="table-header">Employee</th>
                <th className="table-header">Location</th>
                <th className="table-header hidden md:table-cell">Role</th>
                <th className="table-header hidden md:table-cell">Local Time</th>
                <th className="table-header hidden md:table-cell">Currency</th>
                <th className="table-header">Visa Status</th>
                <th className="table-header">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {employees.map((employee) => (
                <tr key={employee.id}>
                  <td className="table-cell">
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
                  <td className="table-cell">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5 text-gray-400" />
                      <span>{employee.location}, {employee.country}</span>
                    </div>
                  </td>
                  <td className="table-cell hidden md:table-cell">{employee.role}</td>
                  <td className="table-cell hidden md:table-cell">
                    {calculateLocalTime(employee.timeZone)}
                  </td>
                  <td className="table-cell hidden md:table-cell">{employee.currency}</td>
                  <td className="table-cell">
                    {getVisaStatusBadge(employee.visaStatus)}
                  </td>
                  <td className="table-cell">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Profile</DropdownMenuItem>
                        <DropdownMenuItem>Edit Details</DropdownMenuItem>
                        <DropdownMenuItem>Visa Documents</DropdownMenuItem>
                        <DropdownMenuItem>Payroll Info</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {employees.length === 0 && (
            <div className="py-10 text-center">
              <p className="text-gray-500">No onsite employees found for {country}.</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default OnsiteEmployeeTable;
