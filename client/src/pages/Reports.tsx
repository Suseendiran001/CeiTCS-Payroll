
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Download, Filter } from 'lucide-react';
import ReportPayrollOverview from '@/components/reports/ReportPayrollOverview';
import ReportAttendance from '@/components/reports/ReportAttendance';
import ReportEmployeeDistribution from '@/components/reports/ReportEmployeeDistribution';
import ReportDepartmentCosts from '@/components/reports/ReportDepartmentCosts';

const Reports = () => {
  const [period, setPeriod] = useState('last_6_months');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Reports & Analytics</h1>
          <p className="text-gray-500">Data-driven insights for your organization</p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-1">
            <Filter className="h-4 w-4" />
            <span>Filters</span>
          </Button>
          
          <Button variant="outline" className="flex items-center gap-1">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </Button>
        </div>
      </div>
      
      <div className="flex justify-end">
        <Select defaultValue={period} onValueChange={setPeriod}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="last_month">Last Month</SelectItem>
            <SelectItem value="last_3_months">Last 3 Months</SelectItem>
            <SelectItem value="last_6_months">Last 6 Months</SelectItem>
            <SelectItem value="last_year">Last Year</SelectItem>
            <SelectItem value="custom">Custom Range</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full md:w-auto grid-cols-2 md:grid-cols-4">
          <TabsTrigger value="overview">Payroll Overview</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
          <TabsTrigger value="employee">Employee Distribution</TabsTrigger>
          <TabsTrigger value="department">Department Costs</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <ReportPayrollOverview period={period} />
        </TabsContent>
        
        <TabsContent value="attendance">
          <ReportAttendance period={period} />
        </TabsContent>
        
        <TabsContent value="employee">
          <ReportEmployeeDistribution period={period} />
        </TabsContent>
        
        <TabsContent value="department">
          <ReportDepartmentCosts period={period} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Reports;
