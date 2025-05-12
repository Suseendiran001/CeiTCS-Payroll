
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const PayrollHistory = () => {
  // Sample data - in a real application, this would come from your API
  const data = [
    { month: 'Oct', amount: 580000 },
    { month: 'Nov', amount: 600000 },
    { month: 'Dec', amount: 610000 },
    { month: 'Jan', amount: 620000 },
    { month: 'Feb', amount: 630000 },
    { month: 'Mar', amount: 650000 },
    { month: 'Apr', amount: 625000 },
  ];

  return (
    <div className="h-80">
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
            formatter={(value) => [`₹${value.toLocaleString()}`, 'Total Payroll']}
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
    </div>
  );
};

export default PayrollHistory;
