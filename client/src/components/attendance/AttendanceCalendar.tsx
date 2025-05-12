import React, { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Badge } from '@/components/ui/badge';

interface AttendanceRecord {
  date: Date;
  status: 'Present' | 'Absent' | 'Late' | 'Early Departure' | 'Leave' | 'Holiday' | 'Weekend';
  checkIn?: string;
  checkOut?: string;
  workHours?: string;
}

interface AttendanceCalendarProps {
  month?: number;
  year?: number;
  onSelectDate?: (date: Date) => void;
}

const AttendanceCalendar = ({ month, year, onSelectDate }: AttendanceCalendarProps) => {
  const currentDate = new Date();
  const [date, setDate] = useState<Date | undefined>(currentDate);
  
  // Sample data - in a real application, this would come from your API
  const attendanceData: AttendanceRecord[] = [
    { date: new Date(2025, 4, 1), status: 'Present', checkIn: '09:02 AM', checkOut: '06:05 PM', workHours: '09:03' },
    { date: new Date(2025, 4, 2), status: 'Present', checkIn: '08:55 AM', checkOut: '06:15 PM', workHours: '09:20' },
    { date: new Date(2025, 4, 3), status: 'Weekend' },
    { date: new Date(2025, 4, 4), status: 'Weekend' },
    { date: new Date(2025, 4, 5), status: 'Late', checkIn: '09:15 AM', checkOut: '06:02 PM', workHours: '08:47' },
    { date: new Date(2025, 4, 6), status: 'Present', checkIn: '09:00 AM', checkOut: '06:10 PM', workHours: '09:10' },
    { date: new Date(2025, 4, 7), status: 'Present', checkIn: '08:52 AM', checkOut: '06:05 PM', workHours: '09:13' },
    { date: new Date(2025, 4, 8), status: 'Present', checkIn: '09:05 AM', checkOut: '06:00 PM', workHours: '08:55' },
    { date: new Date(2025, 4, 9), status: 'Early Departure', checkIn: '09:00 AM', checkOut: '05:30 PM', workHours: '08:30' },
    { date: new Date(2025, 4, 10), status: 'Weekend' },
    { date: new Date(2025, 4, 11), status: 'Weekend' },
    { date: new Date(2025, 4, 12), status: 'Leave' },
  ];
  
  const getStatusForDate = (date: Date): AttendanceRecord | undefined => {
    return attendanceData.find(record => 
      record.date.getDate() === date.getDate() && 
      record.date.getMonth() === date.getMonth() && 
      record.date.getFullYear() === date.getFullYear()
    );
  };
  
  const getStatusColor = (status: string): string => {
    switch(status) {
      case 'Present': return 'bg-green-500';
      case 'Absent': return 'bg-red-500';
      case 'Late': return 'bg-yellow-500';
      case 'Early Departure': return 'bg-orange-500';
      case 'Leave': return 'bg-blue-500';
      case 'Holiday': return 'bg-purple-500';
      case 'Weekend': return 'bg-gray-400';
      default: return 'bg-gray-300';
    }
  };

  const getStatusTextColor = (status: string): string => {
    switch(status) {
      case 'Present': return 'text-green-800';
      case 'Absent': return 'text-red-800';
      case 'Late': return 'text-yellow-800';
      case 'Early Departure': return 'text-orange-800';
      case 'Leave': return 'text-blue-800';
      case 'Holiday': return 'text-purple-800';
      case 'Weekend': return 'text-gray-700';
      default: return 'text-gray-700';
    }
  };
  
  const handleDateSelect = (newDate: Date | undefined) => {
    setDate(newDate);
    if (newDate && onSelectDate) {
      onSelectDate(newDate);
    }
  };
  
  return (
    <div className="flex flex-col md:flex-row gap-6 justify-center">
      <div className="flex-1 max-w-md mx-auto">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleDateSelect}
          className="rounded-md border w-full"
          components={{
            DayContent: (props) => {
              const record = getStatusForDate(props.date);
              
              if (!record) {
                return <div>{props.date.getDate()}</div>;
              }
              
              return (
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <div className="relative cursor-pointer">
                      <div>{props.date.getDate()}</div>
                      <div 
                        className={`absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 ${getStatusColor(record.status)} rounded-full`}
                      ></div>
                    </div>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-64">
                    <div className="space-y-2">
                      <h4 className="font-medium">
                        {props.date.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </h4>
                      
                      <div>
                        <Badge className={`${getStatusTextColor(record.status)} bg-opacity-20`}>
                          {record.status}
                        </Badge>
                      </div>
                      
                      {record.checkIn && (
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <p className="text-gray-500">Check In:</p>
                            <p className="font-medium">{record.checkIn}</p>
                          </div>
                          {record.checkOut && (
                            <div>
                              <p className="text-gray-500">Check Out:</p>
                              <p className="font-medium">{record.checkOut}</p>
                            </div>
                          )}
                        </div>
                      )}
                      
                      {record.workHours && (
                        <div className="text-sm">
                          <p className="text-gray-500">Work Hours:</p>
                          <p className="font-medium">{record.workHours}</p>
                        </div>
                      )}
                    </div>
                  </HoverCardContent>
                </HoverCard>
              );
            }
          }}
        />
      </div>
    </div>
  );
};

export default AttendanceCalendar;