
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend, PieChart, Pie, Cell } from 'recharts';

interface ReportDepartmentCostsProps {
  period: string;
}

const ReportDepartmentCosts = ({ period }: ReportDepartmentCostsProps) => {
  // Sample data - in a real application, this would come from your API
  const departmentCostsData = [
    { department: 'Engineering', cost: 285000 },
    { department: 'Design', cost: 120000 },
    { department: 'Product', cost: 95000 },
    { department: 'QA', cost: 75000 },
    { department: 'HR', cost: 45000 },
    { department: 'Finance', cost: 30000 },
  ];
  
  const costTrendData = [
    { month: 'Nov 22', engineering: 270000, design: 110000, product: 90000, qa: 70000, hr: 40000, finance: 30000 },
    { month: 'Dec 22', engineering: 275000, design: 115000, product: 90000, qa: 70000, hr: 40000, finance: 30000 },
    { month: 'Jan 23', engineering: 275000, design: 115000, product: 92000, qa: 72000, hr: 42000, finance: 30000 },
    { month: 'Feb 23', engineering: 280000, design: 118000, product: 92000, qa: 75000, hr: 42000, finance: 30000 },
    { month: 'Mar 23', engineering: 280000, design: 118000, product: 95000, qa: 75000, hr: 45000, finance: 30000 },
    { month: 'Apr 23', engineering: 285000, design: 120000, product: 95000, qa: 75000, hr: 45000, finance: 30000 },
  ];
  
  const costDistributionData = [
    { name: 'Engineering', value: 285000, color: '#5a67d8' },
    { name: 'Design', value: 120000, color: '#8da2fb' },
    { name: 'Product', value: 95000, color: '#c3dafe' },
    { name: 'QA', value: 75000, color: '#f6ad55' },
    { name: 'HR', value: 45000, color: '#68d391' },
    { name: 'Finance', value: 30000, color: '#fc8181' },
  ];
  
  const costPerEmployeeData = [
    { department: 'Engineering', cost: 11000 },
    { department: 'Design', cost: 13300 },
    { department: 'Product', cost: 15800 },
    { department: 'QA', cost: 10700 },
    { department: 'HR', cost: 11250 },
    { department: 'Finance', cost: 10000 },
  ];
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium">Department Cost Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={costDistributionData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    innerRadius={40}
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {costDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => [`₹${value.toLocaleString()}`, 'Total Cost']}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium">Department-wise Monthly Cost</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={departmentCostsData}
                  margin={{ top: 10, right: 30, left: 20, bottom: 30 }}
                  layout="vertical"
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
                    dataKey="department" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12 }}
                    width={80}
                  />
                  <Tooltip 
                    formatter={(value) => [`₹${value.toLocaleString()}`, 'Monthly Cost']}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  />
                  <Bar 
                    dataKey="cost" 
                    name="Cost" 
                    fill="#5a67d8" 
                    radius={[0, 4, 4, 0]} 
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-medium">Department Cost Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={costTrendData}
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
                  formatter={(value) => [`₹${value.toLocaleString()}`, 'Cost']}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="engineering" 
                  name="Engineering"
                  stroke="#5a67d8" 
                  strokeWidth={2}
                  dot={{ r: 3 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="design" 
                  name="Design"
                  stroke="#8da2fb" 
                  strokeWidth={2} 
                  dot={{ r: 3 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="product" 
                  name="Product"
                  stroke="#c3dafe" 
                  strokeWidth={2}
                  dot={{ r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-medium">Average Cost Per Employee</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={costPerEmployeeData}
                margin={{ top: 10, right: 30, left: 20, bottom: 30 }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} vertical={false} />
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
                  tickFormatter={(value) => `₹${(value / 1000)}k`}
                />
                <Tooltip 
                  formatter={(value) => [`₹${value.toLocaleString()}`, 'Cost Per Employee']}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Bar 
                  dataKey="cost" 
                  name="Cost Per Employee" 
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

export default ReportDepartmentCosts;
