
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

type PayrollSummaryProps = {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: {
    value: number;
    label: string;
    positive: boolean;
  };
  className?: string;
};

const PayrollSummary = ({ title, value, icon, trend, className }: PayrollSummaryProps) => {
  return (
    <Card className={cn("border-none", className)}>
      <CardContent className="p-6 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-medium text-gray-500">{title}</h3>
          <div className="h-10 w-10 rounded-md flex items-center justify-center bg-primary-gradient bg-opacity-10 text-white">
            {icon}
          </div>
        </div>
        
        <div className="flex flex-col gap-1">
          <div className="text-2xl font-semibold">{value}</div>
          
          {trend && (
            <div className="flex items-center gap-1 text-xs">
              <span className={trend.positive ? "text-green-600" : "text-red-600"}>
                {trend.positive ? '↑' : '↓'} {Math.abs(trend.value)}%
              </span>
              <span className="text-gray-500">{trend.label}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PayrollSummary;
