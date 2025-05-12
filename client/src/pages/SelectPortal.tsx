import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Building2, User, ChevronRight, Shield } from 'lucide-react';

const SelectPortal = () => {
  const navigate = useNavigate();

  const handleAdminLogin = () => {
    // In a real app, this would include an admin authentication check
    navigate('/dashboard');
  };

  const handleEmployeeLogin = () => {
    // In a real app, this would include employee authentication
    navigate('/employee-dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-8">
          <div className="h-16 w-16 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-800 text-white text-3xl font-bold flex items-center justify-center mx-auto mb-4">
            C
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome to CeiTCS Payroll Management</h1>
          <p className="text-gray-600 mt-2">Please select your portal to continue</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="overflow-hidden border-2 border-indigo-100 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="bg-gradient-to-r from-indigo-500 to-indigo-700 text-white">
              <CardTitle className="flex items-center gap-2">
                <User size={20} />
                Employee Portal
              </CardTitle>
              <CardDescription className="text-indigo-100">
                Access your personal dashboard, payslips, leaves, and more
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-indigo-100 p-2 rounded-full text-indigo-700">
                    <User size={16} />                  </div>
                  <div>
                    <h3 className="font-medium">Personal Dashboard</h3>
                    <p className="text-sm text-gray-500">View your profile and attendance information</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="bg-indigo-100 p-2 rounded-full text-indigo-700">
                    <FileText size={16} />
                  </div>
                  <div>
                    <h3 className="font-medium">Payslips</h3>
                    <p className="text-sm text-gray-500">Access your payslips and salary details</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="bg-indigo-100 p-2 rounded-full text-indigo-700">
                    <Calendar size={16} />
                  </div>
                  <div>
                    <h3 className="font-medium">Leave Management</h3>
                    <p className="text-sm text-gray-500">Apply for leave and check your balance</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-gray-50">
              <Button 
                className="w-full bg-indigo-600 hover:bg-indigo-700" 
                onClick={handleEmployeeLogin}
              >
                Access Employee Portal
                <ChevronRight size={16} className="ml-2" />
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="overflow-hidden border-2 border-purple-100 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="bg-gradient-to-r from-purple-500 to-purple-700 text-white">
              <CardTitle className="flex items-center gap-2">
                <Shield size={20} />
                Admin Portal
              </CardTitle>
              <CardDescription className="text-purple-100">
                Manage employees, payroll, attendance, and company settings
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-purple-100 p-2 rounded-full text-purple-700">
                    <Users size={16} />
                  </div>
                  <div>
                    <h3 className="font-medium">Employee Management</h3>
                    <p className="text-sm text-gray-500">Add, edit, and manage all employee records</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="bg-purple-100 p-2 rounded-full text-purple-700">
                    <CreditCard size={16} />
                  </div>
                  <div>
                    <h3 className="font-medium">Payroll Processing</h3>
                    <p className="text-sm text-gray-500">Run payroll and manage salary structures</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="bg-purple-100 p-2 rounded-full text-purple-700">
                    <BarChart size={16} />
                  </div>
                  <div>
                    <h3 className="font-medium">Reports & Compliance</h3>
                    <p className="text-sm text-gray-500">Generate reports and ensure legal compliance</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-gray-50">
              <Button 
                className="w-full bg-purple-600 hover:bg-purple-700" 
                onClick={handleAdminLogin}
              >
                Access Admin Portal
                <ChevronRight size={16} className="ml-2" />
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        <div className="text-center mt-8 text-gray-500 text-sm">
          <p>© 2025 CeiTCS. All rights reserved.</p>
          <div className="flex justify-center mt-2 space-x-4">
            <Button variant="link" size="sm" className="text-gray-500 hover:text-indigo-600">
              Privacy Policy
            </Button>
            <Button variant="link" size="sm" className="text-gray-500 hover:text-indigo-600">
              Terms of Service
            </Button>
            <Button variant="link" size="sm" className="text-gray-500 hover:text-indigo-600">
              Help & Support
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

import { Calendar, BarChart, CreditCard, FileText, Users } from 'lucide-react';

export default SelectPortal;
