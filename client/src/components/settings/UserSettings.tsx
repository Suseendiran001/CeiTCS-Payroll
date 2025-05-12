
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { MoreHorizontal, Plus, UserPlus } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

// Sample users data
const usersData = [
  { id: 1, name: 'Ajay Kumar', email: 'ajay@ceitcs.com', role: 'Admin', status: 'Active', lastLogin: '2023-04-15 09:30 AM' },
  { id: 2, name: 'Priya Singh', email: 'priya@ceitcs.com', role: 'HR Manager', status: 'Active', lastLogin: '2023-04-14 05:45 PM' },
  { id: 3, name: 'Rahul Sharma', email: 'rahul@ceitcs.com', role: 'Payroll Manager', status: 'Active', lastLogin: '2023-04-13 11:20 AM' },
  { id: 4, name: 'Meera Patel', email: 'meera@ceitcs.com', role: 'Employee', status: 'Active', lastLogin: '2023-04-12 03:15 PM' },
  { id: 5, name: 'Vijay Reddy', email: 'vijay@ceitcs.com', role: 'Employee', status: 'Inactive', lastLogin: '2023-03-28 10:10 AM' },
  { id: 6, name: 'Neha Gupta', email: 'neha@ceitcs.com', role: 'HR Assistant', status: 'Active', lastLogin: '2023-04-14 02:30 PM' },
];

const getInitials = (name: string) => {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase();
};

const getStatusColor = (status: string) => {
  return status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800';
};

const UserSettings = () => {
  return (
    <div className="space-y-6">
      <Card className="border-none shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg font-semibold">User Management</CardTitle>
            <Button className="bg-primary-gradient">
              <UserPlus size={16} className="mr-2" />
              Add User
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Login</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {usersData.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-primary-gradient text-white text-xs">
                            {getInitials(user.name)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium text-gray-900">{user.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                        {user.status}
                      </span>
                    </TableCell>
                    <TableCell>{user.lastLogin}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal size={16} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Edit User</DropdownMenuItem>
                          <DropdownMenuItem>Change Password</DropdownMenuItem>
                          <DropdownMenuItem>Change Role</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {user.status === 'Active' ? (
                            <DropdownMenuItem className="text-red-600">Deactivate User</DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem className="text-green-600">Activate User</DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      
      <Card className="border-none shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold">Role Permissions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
              <div>
                <h3 className="text-sm font-medium">Admin</h3>
                <p className="text-xs text-gray-500">Full system access and control</p>
              </div>
              <Button variant="outline" size="sm">Manage Permissions</Button>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
              <div>
                <h3 className="text-sm font-medium">HR Manager</h3>
                <p className="text-xs text-gray-500">Employee management and HR functions</p>
              </div>
              <Button variant="outline" size="sm">Manage Permissions</Button>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
              <div>
                <h3 className="text-sm font-medium">Payroll Manager</h3>
                <p className="text-xs text-gray-500">Payroll processing and financial reports</p>
              </div>
              <Button variant="outline" size="sm">Manage Permissions</Button>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
              <div>
                <h3 className="text-sm font-medium">Employee</h3>
                <p className="text-xs text-gray-500">Limited access to personal data</p>
              </div>
              <Button variant="outline" size="sm">Manage Permissions</Button>
            </div>
            
            <Button className="mt-2" variant="outline">
              <Plus size={16} className="mr-2" />
              Create New Role
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserSettings;
