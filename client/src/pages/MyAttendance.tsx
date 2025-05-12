import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Calendar as CalendarIcon, Clock, CheckCircle2, XCircle, FileText, Download, Calendar, Plus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { format } from 'date-fns';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import AttendanceCalendar from '@/components/attendance/AttendanceCalendar';

const MyAttendance = () => {
  const [month, setMonth] = useState('May');
  const [year, setYear] = useState('2025');
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  // Mock data - would come from API in real app
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const years = ['2025', '2024', '2023'];
  
  const attendanceSummary = {
    workingDays: 25,
    present: 22,
    absent: 1,
    leave: 2,
    holiday: 0,
    weekend: 0,
    late: 2,
    earlyDeparture: 1,
    overtime: 3,
    percentage: 88
  };
  
  const attendanceRecords = [
    { id: 1, date: '01 May 2025', day: 'Thursday', checkIn: '09:02 AM', checkOut: '06:05 PM', workHours: '09:03', status: 'Present', location: 'Office' },
    { id: 2, date: '02 May 2025', day: 'Friday', checkIn: '08:55 AM', checkOut: '06:15 PM', workHours: '09:20', status: 'Present', location: 'Office' },
    { id: 3, date: '03 May 2025', day: 'Saturday', checkIn: '--', checkOut: '--', workHours: '--', status: 'Weekend', location: '--' },
    { id: 4, date: '04 May 2025', day: 'Sunday', checkIn: '--', checkOut: '--', workHours: '--', status: 'Weekend', location: '--' },
    { id: 5, date: '05 May 2025', day: 'Monday', checkIn: '09:15 AM', checkOut: '06:02 PM', workHours: '08:47', status: 'Late', location: 'Office' },
    { id: 6, date: '06 May 2025', day: 'Tuesday', checkIn: '09:00 AM', checkOut: '06:10 PM', workHours: '09:10', status: 'Present', location: 'Office' },
    { id: 7, date: '07 May 2025', day: 'Wednesday', checkIn: '08:52 AM', checkOut: '06:05 PM', workHours: '09:13', status: 'Present', location: 'Office' },
    { id: 8, date: '08 May 2025', day: 'Thursday', checkIn: '09:05 AM', checkOut: '06:00 PM', workHours: '08:55', status: 'Present', location: 'Office' },
    { id: 9, date: '09 May 2025', day: 'Friday', checkIn: '09:00 AM', checkOut: '05:30 PM', workHours: '08:30', status: 'Early Departure', location: 'Office' },
    { id: 10, date: '10 May 2025', day: 'Saturday', checkIn: '--', checkOut: '--', workHours: '--', status: 'Weekend', location: '--' },
    { id: 11, date: '11 May 2025', day: 'Sunday', checkIn: '--', checkOut: '--', workHours: '--', status: 'Weekend', location: '--' },
    { id: 12, date: '12 May 2025', day: 'Monday', checkIn: '--', checkOut: '--', workHours: '--', status: 'Leave', location: '--' },
  ];
  
  const regularizationRequests = [
    { id: 1, date: '29 Apr 2025', type: 'Missed Check-in', reason: 'Forgot to mark attendance', status: 'Approved', requestedOn: '29 Apr 2025 06:00 PM' },
    { id: 2, date: '15 Apr 2025', type: 'Late Arrival', reason: 'Traffic congestion', status: 'Rejected', requestedOn: '15 Apr 2025 07:00 PM' },
    { id: 3, date: '05 May 2025', type: 'Late Arrival', reason: 'System issue', status: 'Pending', requestedOn: '05 May 2025 06:30 PM' }
  ];
  
  const overtimeRecords = [
    { id: 1, date: '22 Apr 2025', hours: 2.5, reason: 'Project Deadline', status: 'Approved', requestedOn: '23 Apr 2025' },
    { id: 2, date: '28 Apr 2025', hours: 1.5, reason: 'Production Issue', status: 'Approved', requestedOn: '29 Apr 2025' },
    { id: 3, date: '06 May 2025', hours: 2.0, reason: 'Client Meeting', status: 'Pending', requestedOn: '07 May 2025' }
  ];

  const getStatusBadge = (status) => {
    switch(status) {
      case 'Present':
        return <Badge className="bg-green-100 text-green-800 border-none">Present</Badge>;
      case 'Absent':
        return <Badge className="bg-red-100 text-red-800 border-none">Absent</Badge>;
      case 'Leave':
        return <Badge className="bg-blue-100 text-blue-800 border-none">Leave</Badge>;
      case 'Weekend':
        return <Badge className="bg-gray-100 text-gray-800 border-none">Weekend</Badge>;
      case 'Holiday':
        return <Badge className="bg-purple-100 text-purple-800 border-none">Holiday</Badge>;
      case 'Late':
        return <Badge className="bg-yellow-100 text-yellow-800 border-none">Late</Badge>;
      case 'Early Departure':
        return <Badge className="bg-orange-100 text-orange-800 border-none">Early Departure</Badge>;
      case 'Approved':
        return <Badge className="bg-green-100 text-green-800 border-none">Approved</Badge>;
      case 'Rejected':
        return <Badge className="bg-red-100 text-red-800 border-none">Rejected</Badge>;
      case 'Pending':
        return <Badge className="bg-yellow-100 text-yellow-800 border-none">Pending</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">My Attendance</h1>
          <p className="text-gray-500">Track your attendance records and time logs</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Clock size={16} />
            Mark Attendance
          </Button>
          <Button className="flex items-center gap-2">
            <FileText size={16} />
            Regularize
          </Button>
        </div>
      </div>

      {/* Current Status Card */}
      <Card className="bg-gradient-to-r from-primary/10 to-primary/5">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-full bg-primary flex items-center justify-center">
                <Clock className="h-8 w-8 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-medium">Today's Status</h2>
                <div className="flex items-center gap-2 mt-1">
                  <Badge className="bg-green-100 text-green-800 border-none">Present</Badge>
                  <span className="text-sm text-gray-500">12 May 2025</span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
              <div>
                <p className="text-sm text-gray-500">Check In</p>
                <p className="text-lg font-medium">09:02 AM</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Check Out</p>
                <p className="text-lg font-medium">-- : --</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Working Hours</p>
                <p className="text-lg font-medium">-- : --</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Location</p>
                <p className="text-lg font-medium">Office</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Attendance Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold">{attendanceSummary.percentage}%</div>
              {attendanceSummary.percentage >= 90 ? (
                <div className="p-2 bg-green-100 rounded-full">
                  <CheckCircle2 size={18} className="text-green-600" />
                </div>
              ) : (
                <div className="p-2 bg-yellow-100 rounded-full">
                  <Clock size={18} className="text-yellow-600" />
                </div>
              )}
            </div>
            <Progress value={attendanceSummary.percentage} className="h-1.5 mt-2" />
            <p className="text-xs text-gray-500 mt-1">Based on working days this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Present Days</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold">{attendanceSummary.present} / {attendanceSummary.workingDays}</div>
              <div className="p-2 bg-green-100 rounded-full">
                <CheckCircle2 size={18} className="text-green-600" />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-1 mt-2">
              <div className="text-xs">
                <span className="text-gray-500">Late:</span> {attendanceSummary.late}
              </div>
              <div className="text-xs">
                <span className="text-gray-500">Early:</span> {attendanceSummary.earlyDeparture}
              </div>
              <div className="text-xs">
                <span className="text-gray-500">OT:</span> {attendanceSummary.overtime}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Leave Taken</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold">{attendanceSummary.leave} days</div>
              <div className="p-2 bg-blue-100 rounded-full">
                <Calendar size={18} className="text-blue-600" />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-1">Approved leave days this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Absences</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold">{attendanceSummary.absent} day</div>
              <div className="p-2 bg-red-100 rounded-full">
                <XCircle size={18} className="text-red-600" />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-1">Unplanned absences this month</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="daily">
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="daily">Daily Log</TabsTrigger>
            <TabsTrigger value="calendar">Calendar View</TabsTrigger>
            <TabsTrigger value="regularization">Regularization</TabsTrigger>
            <TabsTrigger value="overtime">Overtime</TabsTrigger>
          </TabsList>
          
          <div className="flex items-center gap-2">
            <Select value={month} onValueChange={setMonth}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Month" />
              </SelectTrigger>
              <SelectContent>
                {months.map(m => (
                  <SelectItem key={m} value={m}>{m}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={year} onValueChange={setYear}>
              <SelectTrigger className="w-[100px]">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                {years.map(y => (
                  <SelectItem key={y} value={y}>{y}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Daily Log Tab */}
        <TabsContent value="daily">
          <Card>
            <CardHeader>
              <CardTitle>Attendance Records - {month} {year}</CardTitle>
              <CardDescription>Daily attendance logs and work hours</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Day</TableHead>
                    <TableHead>Check In</TableHead>
                    <TableHead>Check Out</TableHead>
                    <TableHead>Working Hours</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Location</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {attendanceRecords.map(record => (
                    <TableRow key={record.id}>
                      <TableCell>{record.date}</TableCell>
                      <TableCell>{record.day}</TableCell>
                      <TableCell>{record.checkIn}</TableCell>
                      <TableCell>{record.checkOut}</TableCell>
                      <TableCell>{record.workHours}</TableCell>
                      <TableCell>{getStatusBadge(record.status)}</TableCell>
                      <TableCell>{record.location}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-4">
              <div className="text-sm text-gray-500">
                Showing records for {month} {year}
              </div>
              <Button variant="outline" className="flex items-center gap-2">
                <Download size={16} />
                Export
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Calendar View Tab */}
        <TabsContent value="calendar">
          <Card>
            <CardHeader>
              <CardTitle>Attendance Calendar - {month} {year}</CardTitle>
              <CardDescription>Monthly overview of your attendance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-6">                <div className="flex-1">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal mb-4"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {format(selectedDate, 'MMMM yyyy')}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <CalendarComponent
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  
                  <div className="flex justify-center items-center">
                    <AttendanceCalendar
                      month={months.indexOf(month)}
                      year={parseInt(year)}
                      onSelectDate={setSelectedDate}
                    />
                  </div>
                </div>
                
                <div className="w-full md:w-72 border rounded-md p-4">
                  <h3 className="font-medium mb-4">Legend</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 rounded-full bg-green-500"></div>
                      <span className="text-sm">Present</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 rounded-full bg-red-500"></div>
                      <span className="text-sm">Absent</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 rounded-full bg-blue-500"></div>
                      <span className="text-sm">Leave</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 rounded-full bg-yellow-500"></div>
                      <span className="text-sm">Late Arrival</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 rounded-full bg-orange-500"></div>
                      <span className="text-sm">Early Departure</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 rounded-full bg-purple-500"></div>
                      <span className="text-sm">Holiday</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 rounded-full bg-gray-400"></div>
                      <span className="text-sm">Weekend</span>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-4 border-t">
                    <h3 className="font-medium mb-2">Selected Date: {format(selectedDate, 'dd MMM yyyy')}</h3>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Status:</span>
                        <span className="font-medium">Present</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Check In:</span>
                        <span className="font-medium">09:02 AM</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Check Out:</span>
                        <span className="font-medium">06:05 PM</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Work Hours:</span>
                        <span className="font-medium">09:03</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Regularization Tab */}
        <TabsContent value="regularization">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Attendance Regularization</CardTitle>
                  <CardDescription>Request corrections for attendance records</CardDescription>
                </div>
                <Button className="flex items-center gap-2">
                  <Plus size={16} />
                  New Request
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Regularization Type</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Requested On</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {regularizationRequests.map(request => (
                    <TableRow key={request.id}>
                      <TableCell>{request.date}</TableCell>
                      <TableCell>{request.type}</TableCell>
                      <TableCell>{request.reason}</TableCell>
                      <TableCell>{getStatusBadge(request.status)}</TableCell>
                      <TableCell>{request.requestedOn}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Overtime Tab */}
        <TabsContent value="overtime">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Overtime Records</CardTitle>
                  <CardDescription>Track your additional work hours</CardDescription>
                </div>
                <Button className="flex items-center gap-2">
                  <Plus size={16} />
                  Log Overtime
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Hours</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Requested On</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {overtimeRecords.map(record => (
                    <TableRow key={record.id}>
                      <TableCell>{record.date}</TableCell>
                      <TableCell>{record.hours} hrs</TableCell>
                      <TableCell>{record.reason}</TableCell>
                      <TableCell>{getStatusBadge(record.status)}</TableCell>
                      <TableCell>{record.requestedOn}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="border-t pt-4">
              <div className="w-full flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Total Overtime (Month)</p>
                    <p className="font-medium">6.0 hours</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Approved</p>
                    <p className="font-medium">4.0 hours</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Pending</p>
                    <p className="font-medium">2.0 hours</p>
                  </div>
                </div>
                <Button variant="outline" className="flex items-center gap-2">
                  <Download size={16} />
                  Export
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MyAttendance;
