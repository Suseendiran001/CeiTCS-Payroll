import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  ChevronDown, 
  ChevronUp,
  Download,
  Plus,
  Search,
  Filter,
  MoreHorizontal
} from 'lucide-react';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { getAllEmployees, EmployeeType, Employee } from '@/lib/employeeService';

// Sample data is now replaced with data from our service

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

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Active':
      return 'bg-green-100 text-green-800';
    case 'Inactive':
      return 'bg-gray-100 text-gray-800';
    case 'On Leave':
      return 'bg-yellow-100 text-yellow-800';
    default:
      return 'bg-blue-100 text-blue-800';
  }
};

const getTypeColor = (type: EmployeeType) => {
  switch (type) {
    case 'Permanent':
      return 'bg-blue-600 text-white';
    case 'Contract':
      return 'bg-purple-600 text-white';
    case 'Internship':
      return 'bg-orange-500 text-white';
    default:
      return 'bg-gray-500 text-white';
  }
};

const getTypeStyles = (type: EmployeeType) => {
  switch (type) {
    case 'Permanent':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'Contract':
      return 'bg-purple-100 text-purple-800 border-purple-200';
    case 'Internship':
      return 'bg-orange-100 text-orange-800 border-orange-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

type SortField = 'name' | 'department' | 'joinDate' | 'type';

const EmployeeTable = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<SortField>('joinDate');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [employees, setEmployees] = useState<Employee[]>([]);
  
  useEffect(() => {
    // Fetch employees from service
    // In a real app this would be an API call
    const fetchedEmployees = getAllEmployees();
    setEmployees(fetchedEmployees);
  }, []);
  
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };
  
  // Filter and sort employees
  const filteredEmployees = employees
    .filter(employee => 
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.department.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortField === 'joinDate') {
        return sortDirection === 'asc' 
          ? new Date(a.joinDate).getTime() - new Date(b.joinDate).getTime()
          : new Date(b.joinDate).getTime() - new Date(a.joinDate).getTime();
      } else {
        const fieldA = a[sortField].toLowerCase();
        const fieldB = b[sortField].toLowerCase();
        return sortDirection === 'asc' 
          ? fieldA.localeCompare(fieldB)
          : fieldB.localeCompare(fieldA);
      }
    });
    
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <CardTitle className="text-xl font-semibold">Employees</CardTitle>
          
          <div className="flex flex-col sm:flex-row gap-2">
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Filter size={16} />
              <span>Filter</span>
            </Button>
            
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Download size={16} />
              <span>Export</span>
            </Button>
            
            <Button size="sm" className="bg-primary-gradient" onClick={() => navigate('/employees/new')}>
              <Plus size={16} className="mr-1" />
              <span>Add Employee</span>
            </Button>
          </div>
        </div>
        
        <div className="mt-4 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            placeholder="Search employees..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="table-header">
                  <button 
                    className="flex items-center font-medium"
                    onClick={() => handleSort('name')}
                  >
                    Name
                    {sortField === 'name' && (
                      sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                    )}
                  </button>
                </th>
                <th className="table-header">ID</th>
                <th className="table-header">Position</th>
                <th className="table-header">
                  <button 
                    className="flex items-center font-medium"
                    onClick={() => handleSort('department')}
                  >
                    Department
                    {sortField === 'department' && (
                      sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                    )}
                  </button>
                </th>
                <th className="table-header">
                  <button 
                    className="flex items-center font-medium"
                    onClick={() => handleSort('type')}
                  >
                    Type
                    {sortField === 'type' && (
                      sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                    )}
                  </button>
                </th>
                <th className="table-header">Status</th>
                <th className="table-header">
                  <button 
                    className="flex items-center font-medium"
                    onClick={() => handleSort('joinDate')}
                  >
                    Join Date
                    {sortField === 'joinDate' && (
                      sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                    )}
                  </button>
                </th>
                <th className="table-header"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredEmployees.map((employee) => (
                <tr key={employee.id} className="hover:bg-gray-50 transition-colors">
                  <td className="table-cell">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        {employee.profilePicture ? (
                          <img 
                            src={employee.profilePicture} 
                            alt={employee.name} 
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <AvatarFallback className={`text-white text-xs ${getTypeColor(employee.type as EmployeeType)}`}>
                            {getInitials(employee.name)}
                          </AvatarFallback>
                        )}
                      </Avatar>
                      <span className="font-medium text-gray-900">{employee.name}</span>
                    </div>
                  </td>
                  <td className="table-cell">{employee.id}</td>
                  <td className="table-cell">{employee.position}</td>
                  <td className="table-cell">{employee.department}</td>
                  <td className="table-cell">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      getTypeStyles(employee.type as EmployeeType)
                    }`}>
                      {employee.type}
                    </span>
                  </td>
                  <td className="table-cell">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(employee.status)}`}>
                      {employee.status}
                    </span>
                  </td>
                  <td className="table-cell">{formatDate(employee.joinDate)}</td>
                  <td className="table-cell">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal size={16} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => navigate(`/employees/${employee.id}`)}>
                          View Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">Deactivate</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredEmployees.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12">
              <p className="text-gray-500">No employees found</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default EmployeeTable;
