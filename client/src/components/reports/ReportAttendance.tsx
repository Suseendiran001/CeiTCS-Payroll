
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend, PieChart, Pie, Cell } from 'recharts';

interface ReportAttendanceProps {
  period: string;
}

const ReportAttendance = ({ period }: ReportAttendanceProps) => {
  // Sample data - in a real application, this would come from your API
  // Adjusted based on the selected period
  const attendanceTrendData = [
    { month: 'Nov 22', present: 92, leave: 5, absent: 3 },
    { month: 'Dec 22', present: 90, leave: 7, absent: 3 },
    { month: 'Jan 23', present: 91, leave: 6, absent: 3 },
    { month: 'Feb 23', present: 94, leave: 4, absent: 2 },
    { month: 'Mar 23', present: 93, leave: 5, absent: 2 },
    { month: 'Apr 23', present: 95, leave: 3, absent: 2 },
  ];
  
  const leaveData = [
    { name: 'Annual Leave', value: 120, color: '#5a67d8' },
    { name: 'Sick Leave', value: 45, color: '#fc8181' },
    { name: 'Casual Leave', value: 30, color: '#f6ad55' },
    { name: 'Unpaid Leave', value: 15, color: '#a0aec0' },
    { name: 'Comp Off', value: 10, color: '#68d391' },
  ];
  
  const departmentAttendanceData = [
    { department: 'Engineering', attendance: 96 },
    { department: 'Design', attendance: 94 },
    { department: 'Product', attendance: 95 },
    { department: 'QA', attendance: 93 },
    { department: 'HR', attendance: 97 },
    { department: 'Finance', attendance: 98 },
  ];
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-medium">Attendance Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={attendanceTrendData}
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
                  tickFormatter={(value) => `${value}%`}
                />
                <Tooltip 
                  formatter={(value) => [`${value}%`, 'Percentage']}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="present" 
                  name="Present"
                  stroke="#48bb78" 
                  strokeWidth={2}
                  dot={{ r: 3 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="leave" 
                  name="Leave"
                  stroke="#f6ad55" 
                  strokeWidth={2} 
                  dot={{ r: 3 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="absent" 
                  name="Absent"
                  stroke="#fc8181" 
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
            <CardTitle className="text-lg font-medium">Leave Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={leaveData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    innerRadius={40}
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {leaveData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => [`${value} days`, 'Total']}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium">Department-wise Attendance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={departmentAttendanceData}
                  margin={{ top: 10, right: 30, left: 20, bottom: 30 }}
                  layout="vertical"
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                  <XAxis 
                    type="number" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12 }}
                    domain={[85, 100]}
                    tickFormatter={(value) => `${value}%`}
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
                    formatter={(value) => [`${value}%`, 'Average Attendance']}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  />
                  <Bar 
                    dataKey="attendance" 
                    name="Attendance" 
                    fill="#5a67d8" 
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

export default ReportAttendance;
