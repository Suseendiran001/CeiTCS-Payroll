
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const ComplianceFilingList = () => {
  // Sample data - in a real application, this would come from your API
  const complianceFilings = [
    { 
      id: 1, 
      name: 'TDS Filing - Q4', 
      description: 'Quarterly TDS return filing as per Income Tax Act', 
      dueDate: 'April 30, 2023',
      status: 'pending',
      priority: 'high',
      authority: 'Income Tax Department'
    },
    { 
      id: 2, 
      name: 'ESI Contribution', 
      description: 'Monthly ESI contribution for employees', 
      dueDate: 'May 15, 2023',
      status: 'pending',
      priority: 'medium',
      authority: 'ESIC'
    },
    { 
      id: 3, 
      name: 'PF Contribution', 
      description: 'Monthly provident fund contribution', 
      dueDate: 'May 15, 2023',
      status: 'pending',
      priority: 'medium',
      authority: 'EPFO'
    },
    { 
      id: 4, 
      name: 'Professional Tax', 
      description: 'Monthly professional tax payment', 
      dueDate: 'May 20, 2023',
      status: 'pending',
      priority: 'low',
      authority: 'State Government'
    },
    { 
      id: 5, 
      name: 'GST Return Filing', 
      description: 'Monthly GST return filing', 
      dueDate: 'May 20, 2023',
      status: 'pending',
      priority: 'medium',
      authority: 'GST Department'
    },
    { 
      id: 6, 
      name: 'Form 24Q Filing', 
      description: 'Quarterly TDS return for salaries', 
      dueDate: 'July 31, 2023',
      status: 'not_due',
      priority: 'medium',
      authority: 'Income Tax Department'
    },
    { 
      id: 7, 
      name: 'Annual Returns', 
      description: 'Annual return filing under Companies Act', 
      dueDate: 'October 30, 2023',
      status: 'not_due',
      priority: 'high',
      authority: 'ROC'
    },
  ];
  
  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case 'overdue':
        return <Badge className="bg-red-100 text-red-800">Overdue</Badge>;
      case 'not_due':
        return <Badge className="bg-gray-100 text-gray-800">Not Due</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };
  
  const getPriorityBadge = (priority: string) => {
    switch(priority) {
      case 'high':
        return <Badge variant="outline" className="border-red-300 text-red-700">High</Badge>;
      case 'medium':
        return <Badge variant="outline" className="border-yellow-300 text-yellow-700">Medium</Badge>;
      case 'low':
        return <Badge variant="outline" className="border-blue-300 text-blue-700">Low</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };
  
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="table-header">Compliance Task</th>
            <th className="table-header hidden md:table-cell">Authority</th>
            <th className="table-header hidden md:table-cell">Description</th>
            <th className="table-header">Due Date</th>
            <th className="table-header">Priority</th>
            <th className="table-header">Status</th>
            <th className="table-header">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {complianceFilings.map((filing) => (
            <tr key={filing.id}>
              <td className="table-cell font-medium">{filing.name}</td>
              <td className="table-cell hidden md:table-cell">{filing.authority}</td>
              <td className="table-cell hidden md:table-cell">
                <div className="max-w-xs truncate">{filing.description}</div>
              </td>
              <td className="table-cell">{filing.dueDate}</td>
              <td className="table-cell">{getPriorityBadge(filing.priority)}</td>
              <td className="table-cell">{getStatusBadge(filing.status)}</td>
              <td className="table-cell">
                <Button size="sm" variant={filing.status === 'pending' ? 'default' : 'outline'}>
                  {filing.status === 'completed' ? 'View' : filing.status === 'pending' ? 'Complete' : 'Prepare'}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ComplianceFilingList;
