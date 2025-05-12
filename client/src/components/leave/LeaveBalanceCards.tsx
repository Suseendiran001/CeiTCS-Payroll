
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const LeaveBalanceCards = () => {
  // Sample data - in a real application, this would come from your API
  const leaveBalances = [
    { type: 'Annual Leave', allocated: 20, taken: 8, balance: 12 },
    { type: 'Sick Leave', allocated: 12, taken: 2, balance: 10 },
    { type: 'Casual Leave', allocated: 7, taken: 3, balance: 4 },
    { type: 'Compensatory Off', allocated: 0, taken: 0, balance: 2 },
  ];
  
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      {leaveBalances.map((leave) => (
        <Card key={leave.type} className="bg-white">
          <CardContent className="p-4">
            <h3 className="text-sm font-medium text-gray-500">{leave.type}</h3>
            
            <div className="mt-4 flex justify-between items-center">
              <div className="text-2xl font-semibold">{leave.balance}</div>
              <div className="text-sm text-gray-500">
                <span className="text-gray-900 font-medium">{leave.taken}</span>
                {' '}/{' '}
                <span>{leave.allocated}</span>
              </div>
            </div>
            
            <div className="mt-3 w-full bg-gray-200 rounded-full h-1.5">
              <div 
                className="bg-primary-gradient h-1.5 rounded-full" 
                style={{ width: `${(leave.taken / leave.allocated) * 100}%` }}
              ></div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default LeaveBalanceCards;
