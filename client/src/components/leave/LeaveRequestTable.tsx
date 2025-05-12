
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Calendar, ChevronRight, MoreVertical } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

type LeaveRequestStatus = 'pending' | 'approved' | 'rejected';

interface LeaveRequestTableProps {
  status: LeaveRequestStatus;
}

const LeaveRequestTable = ({ status }: LeaveRequestTableProps) => {
  // Sample data - in a real application, this would come from your API
  const leaveRequests = [
    { 
      id: 1, 
      employee: 'Ajay Kumar', 
      empId: 'P001', 
      type: 'Sick Leave', 
      fromDate: '2023-04-10', 
      toDate: '2023-04-12', 
      days: 3, 
      reason: 'Medical emergency',
      status: 'pending'
    },
    { 
      id: 2, 
      employee: 'Priya Singh', 
      empId: 'P002', 
      type: 'Annual Leave', 
      fromDate: '2023-04-15', 
      toDate: '2023-04-22', 
      days: 8, 
      reason: 'Family vacation',
      status: 'pending'
    },
    { 
      id: 3, 
      employee: 'Rahul Sharma', 
      empId: 'P003', 
      type: 'Casual Leave', 
      fromDate: '2023-04-05', 
      toDate: '2023-04-05', 
      days: 1, 
      reason: 'Personal work',
      status: 'approved'
    },
    { 
      id: 4, 
      employee: 'Meera Patel', 
      empId: 'C001', 
      type: 'Unpaid Leave', 
      fromDate: '2023-04-18', 
      toDate: '2023-04-19', 
      days: 2, 
      reason: 'Family function',
      status: 'approved'
    },
    { 
      id: 5, 
      employee: 'Vijay Reddy', 
      empId: 'P004', 
      type: 'Sick Leave', 
      fromDate: '2023-04-08', 
      toDate: '2023-04-09', 
      days: 2, 
      reason: 'Fever and headache',
      status: 'rejected'
    }
  ].filter(request => request.status === status);
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .toUpperCase();
  };
  
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
  };
  
  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300">Pending</Badge>;
      case 'approved':
        return <Badge className="bg-green-100 text-green-800 border-green-300">Approved</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800 border-red-300">Rejected</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };
  
  return (
    <div className="overflow-x-auto">
      {leaveRequests.length > 0 ? (
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="table-header">Employee</th>
              <th className="table-header">Leave Type</th>
              <th className="table-header">Duration</th>
              <th className="table-header hidden md:table-cell">Days</th>
              <th className="table-header hidden md:table-cell">Reason</th>
              <th className="table-header">Status</th>
              <th className="table-header">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {leaveRequests.map((request) => (
              <tr key={request.id}>
                <td className="table-cell">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-primary-gradient text-white text-xs">
                        {getInitials(request.employee)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-gray-900">{request.employee}</p>
                      <p className="text-xs text-gray-500">{request.empId}</p>
                    </div>
                  </div>
                </td>
                <td className="table-cell">{request.type}</td>
                <td className="table-cell">
                  <div className="flex items-center gap-1 text-sm">
                    <Calendar className="h-3.5 w-3.5 text-gray-500" />
                    <span>{formatDate(request.fromDate)}</span>
                    {request.fromDate !== request.toDate && (
                      <>
                        <span>-</span>
                        <span>{formatDate(request.toDate)}</span>
                      </>
                    )}
                  </div>
                </td>
                <td className="table-cell hidden md:table-cell">{request.days}</td>
                <td className="table-cell hidden md:table-cell">
                  <p className="truncate max-w-[200px]">{request.reason}</p>
                </td>
                <td className="table-cell">
                  {getStatusBadge(request.status)}
                </td>
                <td className="table-cell">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      {status === 'pending' && (
                        <>
                          <DropdownMenuItem>Approve</DropdownMenuItem>
                          <DropdownMenuItem>Reject</DropdownMenuItem>
                        </>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="py-10 text-center">
          <p className="text-gray-500">No {status} leave requests found.</p>
        </div>
      )}
    </div>
  );
};

export default LeaveRequestTable;
