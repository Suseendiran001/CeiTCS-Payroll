
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Download, FileText, PlusCircle, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import PayrollTable from '@/components/payroll/PayrollTable';
import PayrollSummary from '@/components/payroll/PayrollSummary';
import PayrollHistory from '@/components/payroll/PayrollHistory';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import PayrollRunForm from '@/components/payroll/PayrollRunForm';

const Payroll = () => {
  const [period, setPeriod] = useState('april_2023');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Payroll Management</h1>
          <p className="text-gray-500">Process and manage employee payroll</p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-1">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </Button>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-primary-gradient">
                <PlusCircle className="mr-2 h-4 w-4" />
                Run Payroll
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Run Payroll</DialogTitle>
              </DialogHeader>
              <PayrollRunForm />
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <PayrollSummary title="Total Payroll" value="₹6,25,000" trend={{ value: 3.2, label: "vs last month", positive: true }} icon={<FileText className="text-white" size={20} />} />
        <PayrollSummary title="Basic Salary" value="₹4,85,000" trend={{ value: 2.5, label: "vs last month", positive: true }} icon={<FileText className="text-white" size={20} />} />
        <PayrollSummary title="Total Deductions" value="₹1,12,000" trend={{ value: 1.8, label: "vs last month", positive: false }} icon={<FileText className="text-white" size={20} />} />
      </div>
      
      <Card>
        <CardHeader className="pb-0">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <CardTitle className="text-lg font-medium">Payroll Register</CardTitle>
            
            <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center">
              <div className="relative w-full sm:w-auto">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                <Input 
                  type="search" 
                  placeholder="Search employees..." 
                  className="pl-9 w-full sm:w-[200px]" 
                />
              </div>
              
              <Select defaultValue={period} onValueChange={setPeriod}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="april_2023">April 2023</SelectItem>
                  <SelectItem value="march_2023">March 2023</SelectItem>
                  <SelectItem value="february_2023">February 2023</SelectItem>
                  <SelectItem value="january_2023">January 2023</SelectItem>
                  <SelectItem value="december_2022">December 2022</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        
        <Tabs defaultValue="all" className="mt-2">
          <CardContent className="pt-0">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="permanent">Permanent</TabsTrigger>
              <TabsTrigger value="contract">Contract</TabsTrigger>
              <TabsTrigger value="intern">Interns</TabsTrigger>
            </TabsList>
          </CardContent>
          
          <TabsContent value="all">
            <CardContent className="pt-0">
              <PayrollTable employeeType="all" period={period} />
            </CardContent>
          </TabsContent>
          
          <TabsContent value="permanent">
            <CardContent className="pt-0">
              <PayrollTable employeeType="permanent" period={period} />
            </CardContent>
          </TabsContent>
          
          <TabsContent value="contract">
            <CardContent className="pt-0">
              <PayrollTable employeeType="contract" period={period} />
            </CardContent>
          </TabsContent>
          
          <TabsContent value="intern">
            <CardContent className="pt-0">
              <PayrollTable employeeType="intern" period={period} />
            </CardContent>
          </TabsContent>
        </Tabs>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-medium">Payroll History</CardTitle>
        </CardHeader>
        <CardContent>
          <PayrollHistory />
        </CardContent>
      </Card>
    </div>
  );
};

export default Payroll;
