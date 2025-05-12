
import React, { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const LeaveCalendar = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  // Sample data - in a real application, this would come from your API
  const leaveData = [
    { date: new Date(2023, 3, 10), employee: 'Ajay Kumar', type: 'Sick Leave' },
    { date: new Date(2023, 3, 11), employee: 'Ajay Kumar', type: 'Sick Leave' },
    { date: new Date(2023, 3, 12), employee: 'Ajay Kumar', type: 'Sick Leave' },
    { date: new Date(2023, 3, 15), employee: 'Priya Singh', type: 'Annual Leave' },
    { date: new Date(2023, 3, 16), employee: 'Priya Singh', type: 'Annual Leave' },
    { date: new Date(2023, 3, 17), employee: 'Priya Singh', type: 'Annual Leave' },
    { date: new Date(2023, 3, 18), employee: 'Priya Singh', type: 'Annual Leave' },
    { date: new Date(2023, 3, 19), employee: 'Priya Singh', type: 'Annual Leave' },
    { date: new Date(2023, 3, 20), employee: 'Priya Singh', type: 'Annual Leave' },
    { date: new Date(2023, 3, 21), employee: 'Priya Singh', type: 'Annual Leave' },
    { date: new Date(2023, 3, 22), employee: 'Priya Singh', type: 'Annual Leave' },
  ];
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .toUpperCase();
  };
  
  const getLeavesForDate = (date: Date) => {
    return leaveData.filter(leave => 
      leave.date.getDate() === date.getDate() && 
      leave.date.getMonth() === date.getMonth() && 
      leave.date.getFullYear() === date.getFullYear()
    );
  };
    return (
    <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
      <div className="flex-1 max-w-md mx-auto">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border w-full"
          modifiers={{
            booked: (date) => 
              leaveData.some(leave => 
                leave.date.getDate() === date.getDate() && 
                leave.date.getMonth() === date.getMonth() && 
                leave.date.getFullYear() === date.getFullYear()
              )
          }}
          modifiersStyles={{
            booked: { backgroundColor: '#EBF4FF', color: '#1A56DB', fontWeight: 'bold' }
          }}
          components={{
            DayContent: (props) => {
              const leaves = getLeavesForDate(props.date);
              
              if (leaves.length === 0) {
                return <div>{props.date.getDate()}</div>;
              }
              
              return (
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <div className="relative cursor-pointer">
                      {props.date.getDate()}
                      <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-500 rounded-full"></div>
                    </div>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80">
                    <div className="space-y-2">
                      <h4 className="font-medium">
                        {props.date.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </h4>
                      <div className="space-y-1">
                        {leaves.map((leave, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarFallback className="bg-primary-gradient text-white text-[10px]">
                                {getInitials(leave.employee)}
                              </AvatarFallback>
                            </Avatar>
                            <span>{leave.employee}</span>
                            <span className="text-xs text-gray-500">({leave.type})</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </HoverCardContent>
                </HoverCard>
              );
            }
          }}
        />
      </div>
      
      <div className="flex-1">
        {date && (
          <div className="space-y-4">
            <h3 className="font-medium text-lg">
              {date.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
            </h3>
            
            {getLeavesForDate(date).length > 0 ? (
              <div className="space-y-2">
                {getLeavesForDate(date).map((leave, index) => (
                  <div key={index} className="flex items-center p-3 border rounded-md gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-primary-gradient text-white">
                        {getInitials(leave.employee)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{leave.employee}</p>
                      <p className="text-sm text-gray-500">{leave.type}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No leave requests for this date.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LeaveCalendar;
