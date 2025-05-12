
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

// Sample data - in real app would come from API
const recentHires = [
  { id: 1, name: 'Ajay Kumar', position: 'Software Engineer', department: 'Engineering', type: 'Permanent', joinDate: '2023-04-01' },
  { id: 2, name: 'Priya Singh', position: 'UI/UX Designer', department: 'Design', type: 'Contract', joinDate: '2023-04-05' },
  { id: 3, name: 'Rahul Sharma', position: 'DevOps Engineer', department: 'Engineering', type: 'Permanent', joinDate: '2023-04-12' },
  { id: 4, name: 'Meera Patel', position: 'Product Manager', department: 'Product', type: 'Permanent', joinDate: '2023-04-15' },
  { id: 5, name: 'Vijay Reddy', position: 'Data Analyst', department: 'Analytics', type: 'Contract', joinDate: '2023-04-18' },
];

const getInitials = (name: string) => {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase();
};

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

const RecentHires = () => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold">Recent Hires</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="table-header">Name</th>
                <th className="table-header">Position</th>
                <th className="table-header hidden md:table-cell">Department</th>
                <th className="table-header hidden md:table-cell">Type</th>
                <th className="table-header">Join Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {recentHires.map((employee) => (
                <tr key={employee.id}>
                  <td className="table-cell">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-primary-gradient text-white text-xs">
                          {getInitials(employee.name)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium text-gray-900">{employee.name}</span>
                    </div>
                  </td>
                  <td className="table-cell">{employee.position}</td>
                  <td className="table-cell hidden md:table-cell">{employee.department}</td>
                  <td className="table-cell hidden md:table-cell">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      employee.type === 'Permanent' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {employee.type}
                    </span>
                  </td>
                  <td className="table-cell">{formatDate(employee.joinDate)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentHires;
