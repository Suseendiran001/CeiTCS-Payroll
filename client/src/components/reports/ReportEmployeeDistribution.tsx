
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';

interface ReportEmployeeDistributionProps {
  period: string;
}

const ReportEmployeeDistribution = ({ period }: ReportEmployeeDistributionProps) => {
  // Sample data - in a real application, this would come from your API
  const employeeTypeData = [
    { name: 'Permanent', value: 35, color: '#5a67d8' },
    { name: 'Contract', value: 15, color: '#8da2fb' },
    { name: 'Intern', value: 5, color: '#c3dafe' },
  ];
  
  const departmentDistributionData = [
    { department: 'Engineering', permanent: 15, contract: 8, intern: 3 },
    { department: 'Design', permanent: 6, contract: 2, intern: 1 },
    { department: 'Product', permanent: 5, contract: 1, intern: 0 },
    { department: 'QA', permanent: 4, contract: 2, intern: 1 },
    { department: 'HR', permanent: 3, contract: 1, intern: 0 },
    { department: 'Finance', permanent: 2, contract: 1, intern: 0 },
  ];
  
  const tenureDistributionData = [
    { range: '0-1 Years', count: 12 },
    { range: '1-2 Years', count: 18 },
    { range: '2-3 Years', count: 10 },
    { range: '3-5 Years', count: 8 },
    { range: '5+ Years', count: 7 },
  ];
  
  const monthlyHeadcountData = [
    { month: 'Nov 22', count: 50 },
    { month: 'Dec 22', count: 52 },
    { month: 'Jan 23', count: 52 },
    { month: 'Feb 23', count: 53 },
    { month: 'Mar 23', count: 54 },
    { month: 'Apr 23', count: 55 },
  ];
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium">Employee Type Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={employeeTypeData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    innerRadius={40}
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {employeeTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => [`${value} employees`, 'Count']}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium">Monthly Headcount</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={monthlyHeadcountData}
                  margin={{ top: 10, right: 30, left: 20, bottom: 30 }}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} vertical={false} />
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
                    domain={['dataMin - 5', 'dataMax + 5']}
                  />
                  <Tooltip 
                    formatter={(value) => [`${value} employees`, 'Total']}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  />
                  <Bar 
                    dataKey="count" 
                    name="Employees" 
                    fill="#5a67d8" 
                    radius={[4, 4, 0, 0]} 
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-medium">Department-wise Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={departmentDistributionData}
                margin={{ top: 10, right: 30, left: 20, bottom: 30 }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis 
                  dataKey="department" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12 }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12 }}
                />
                <Tooltip 
                  formatter={(value) => [`${value} employees`, 'Count']}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Legend />
                <Bar 
                  dataKey="permanent" 
                  name="Permanent" 
                  stackId="a"
                  fill="#5a67d8" 
                />
                <Bar 
                  dataKey="contract" 
                  name="Contract" 
                  stackId="a"
                  fill="#8da2fb" 
                />
                <Bar 
                  dataKey="intern" 
                  name="Intern" 
                  stackId="a"
                  fill="#c3dafe" 
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-medium">Employee Tenure Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={tenureDistributionData}
                margin={{ top: 10, right: 30, left: 20, bottom: 30 }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} vertical={false} />
                <XAxis 
                  dataKey="range" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12 }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12 }}
                />
                <Tooltip 
                  formatter={(value) => [`${value} employees`, 'Count']}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Bar 
                  dataKey="count" 
                  name="Employees" 
                  fill="#5a67d8" 
                  radius={[4, 4, 0, 0]} 
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportEmployeeDistribution;
