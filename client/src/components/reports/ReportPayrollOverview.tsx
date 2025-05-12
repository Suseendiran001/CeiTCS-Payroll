
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';

interface ReportPayrollOverviewProps {
  period: string;
}

const ReportPayrollOverview = ({ period }: ReportPayrollOverviewProps) => {
  // Sample data - in a real application, this would come from your API
  // Adjusted based on the selected period
  const payrollTrendData = [
    { month: 'Nov 22', total: 580000, basic: 420000, allowances: 85000, deductions: 75000 },
    { month: 'Dec 22', total: 600000, basic: 435000, allowances: 90000, deductions: 75000 },
    { month: 'Jan 23', total: 610000, basic: 440000, allowances: 95000, deductions: 75000 },
    { month: 'Feb 23', total: 620000, basic: 450000, allowances: 95000, deductions: 75000 },
    { month: 'Mar 23', total: 630000, basic: 460000, allowances: 95000, deductions: 75000 },
    { month: 'Apr 23', total: 650000, basic: 480000, allowances: 95000, deductions: 75000 },
  ];

  const payrollComponentsData = [
    { name: 'Basic Salary', value: 480000 },
    { name: 'HRA', value: 120000 },
    { name: 'Special Allowance', value: 55000 },
    { name: 'Medical Allowance', value: 20000 },
    { name: 'Transport Allowance', value: 15000 },
    { name: 'Bonus', value: 35000 },
  ];

  const deductionsData = [
    { name: 'PF', value: 28000 },
    { name: 'TDS', value: 35000 },
    { name: 'Professional Tax', value: 2500 },
    { name: 'Insurance', value: 4500 },
    { name: 'Other Deductions', value: 5000 },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-medium">Payroll Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={payrollTrendData}
                margin={{ top: 10, right: 30, left: 20, bottom: 30 }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis 
                  dataKey="month" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12 }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => `₹${(value / 1000)}k`}
                />
                <Tooltip 
                  formatter={(value) => [`₹${value.toLocaleString()}`, 'Amount']}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="total" 
                  name="Total Payroll"
                  stroke="#5a67d8" 
                  strokeWidth={2}
                  dot={{ r: 3 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="basic" 
                  name="Basic Salary"
                  stroke="#48bb78" 
                  strokeWidth={2} 
                  dot={{ r: 3 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="allowances" 
                  name="Allowances"
                  stroke="#f6ad55" 
                  strokeWidth={2}
                  dot={{ r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium">Salary Components</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={payrollComponentsData}
                  layout="vertical"
                  margin={{ top: 10, right: 30, left: 100, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                  <XAxis 
                    type="number" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value) => `₹${(value / 1000)}k`}
                  />
                  <YAxis 
                    type="category"
                    dataKey="name" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12 }}
                    width={90}
                  />
                  <Tooltip 
                    formatter={(value) => [`₹${value.toLocaleString()}`, 'Amount']}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  />
                  <Bar 
                    dataKey="value" 
                    name="Amount" 
                    fill="#5a67d8" 
                    radius={[0, 4, 4, 0]} 
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium">Deductions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={deductionsData}
                  layout="vertical"
                  margin={{ top: 10, right: 30, left: 100, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                  <XAxis 
                    type="number" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value) => `₹${(value / 1000)}k`}
                  />
                  <YAxis 
                    type="category"
                    dataKey="name" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12 }}
                    width={90}
                  />
                  <Tooltip 
                    formatter={(value) => [`₹${value.toLocaleString()}`, 'Amount']}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  />
                  <Bar 
                    dataKey="value" 
                    name="Amount" 
                    fill="#fc8181" 
                    radius={[0, 4, 4, 0]} 
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ReportPayrollOverview;
