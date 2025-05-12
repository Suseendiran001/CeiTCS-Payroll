
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Jan', amount: 580000 },
  { month: 'Feb', amount: 600000 },
  { month: 'Mar', amount: 610000 },
  { month: 'Apr', amount: 620000 },
  { month: 'May', amount: 630000 },
  { month: 'Jun', amount: 650000 },
];

const PayrollTrendChart = () => {
  return (
    <Card className="h-[400px]">
      <CardHeader className="pb-0">
        <CardTitle className="text-lg font-semibold">Payroll Trend</CardTitle>
      </CardHeader>
      <CardContent className="h-[calc(100%-5rem)]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 10, right: 30, left: 20, bottom: 30 }}
          >
            <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
            <XAxis 
              dataKey="month" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12 }}
              dy={10}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => `₹${(value / 1000)}k`}
            />
            <Tooltip 
              formatter={(value) => [`₹${value.toLocaleString()}`, 'Total']}
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
            />
            <Line 
              type="monotone" 
              dataKey="amount" 
              stroke="#5a67d8" 
              strokeWidth={3}
              activeDot={{ r: 6, fill: '#5a67d8' }}
              dot={{ r: 4, fill: '#5a67d8' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default PayrollTrendChart;
