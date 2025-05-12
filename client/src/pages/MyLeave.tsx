import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Calendar as CalendarIcon, 
  Plus, 
  Calendar, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  FileText, 
  AlertCircle,
  ChevronRight,
  Users,
  BarChart,
  CheckCircle,
  Info,
  Download
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { addDays, differenceInDays } from 'date-fns';
import LeaveCalendar from '@/components/leave/LeaveCalendar';

const MyLeave = () => {
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [leaveType, setLeaveType] = useState('');
  const [isApplyLeaveOpen, setIsApplyLeaveOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  
  // Calculate duration between dates
  const calculateDuration = () => {
    if (startDate && endDate) {
      const days = differenceInDays(endDate, startDate) + 1;
      return days > 0 ? days : 0;
    }
    return 0;
  };
  
  // Mock data - would come from API in real app
  const leaveBalances = [
    { type: 'Casual Leave', used: 4, total: 12, color: 'bg-blue-600', colorClass: 'blue' },
    { type: 'Sick Leave', used: 2, total: 7, color: 'bg-red-500', colorClass: 'red' },
    { type: 'Earned Leave', used: 3, total: 18, color: 'bg-green-600', colorClass: 'green' },
    { type: 'Comp Off', used: 1, total: 2, color: 'bg-amber-500', colorClass: 'amber' }
  ];
  
  const leaveRequests = [
    { 
      id: 1, 
      type: 'Casual Leave', 
      from: '10 May 2025', 
      to: '12 May 2025', 
      days: 3, 
      reason: 'Family function', 
      status: 'Approved', 
      appliedOn: '01 May 2025',
      approvedBy: 'Rahul Sharma',
      approvedOn: '02 May 2025'
    },
    { 
      id: 2, 
      type: 'Sick Leave', 
      from: '22 Apr 2025', 
      to: '23 Apr 2025', 
      days: 2, 
      reason: 'Not feeling well', 
      status: 'Approved', 
      appliedOn: '21 Apr 2025',
      approvedBy: 'Rahul Sharma',
      approvedOn: '21 Apr 2025'
    },
    { 
      id: 3, 
      type: 'Casual Leave', 
      from: '15 May 2025', 
      to: '15 May 2025', 
      days: 1, 
      reason: 'Personal work', 
      status: 'Pending', 
      appliedOn: '10 May 2025'
    },
    { 
      id: 4, 
      type: 'Earned Leave', 
      from: '01 Mar 2025', 
      to: '05 Mar 2025', 
      days: 5, 
      reason: 'Vacation', 
      status: 'Approved', 
      appliedOn: '15 Feb 2025',
      approvedBy: 'Rahul Sharma',
      approvedOn: '18 Feb 2025'
    },
    { 
      id: 5, 
      type: 'Casual Leave', 
      from: '27 Jan 2025', 
      to: '27 Jan 2025', 
      days: 1, 
      reason: 'Personal work', 
      status: 'Rejected', 
      appliedOn: '25 Jan 2025',
      rejectedBy: 'Rahul Sharma',
      rejectedOn: '26 Jan 2025',
      rejectionReason: 'Critical project deadline'
    }
  ];
  
  const holidays = [
    { id: 1, name: 'New Year', date: '01 Jan 2025', day: 'Wednesday', type: 'National Holiday' },
    { id: 2, name: 'Republic Day', date: '26 Jan 2025', day: 'Sunday', type: 'National Holiday' },
    { id: 3, name: 'Holi', date: '14 Mar 2025', day: 'Friday', type: 'Festival Holiday' },
    { id: 4, name: 'Good Friday', date: '18 Apr 2025', day: 'Friday', type: 'Optional Holiday' },
    { id: 5, name: 'Labor Day', date: '01 May 2025', day: 'Thursday', type: 'National Holiday' },
    { id: 6, name: 'Independence Day', date: '15 Aug 2025', day: 'Friday', type: 'National Holiday' },
    { id: 7, name: 'Diwali', date: '12 Nov 2025', day: 'Wednesday', type: 'Festival Holiday' },
    { id: 8, name: 'Christmas', date: '25 Dec 2025', day: 'Thursday', type: 'National Holiday' }
  ];
  
  const teamLeave = [
    { 
      id: 1, 
      name: 'Priya Singh', 
      department: 'Engineering', 
      from: '05 May 2025', 
      to: '07 May 2025', 
      status: 'Approved',
      avatar: null
    },
    { 
      id: 2, 
      name: 'Amitabh Kumar', 
      department: 'Engineering', 
      from: '12 May 2025', 
      to: '16 May 2025', 
      status: 'Pending',
      avatar: null
    },
    { 
      id: 3, 
      name: 'Rajesh Verma', 
      department: 'Engineering', 
      from: '20 May 2025', 
      to: '20 May 2025', 
      status: 'Approved',
      avatar: null
    }
  ];

  // Get initials from name
  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('');
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'Approved':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200 border-green-200">
          <CheckCircle className="h-3 w-3 mr-1" /> Approved
        </Badge>;
      case 'Pending':
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200 border-amber-200">
          <Clock className="h-3 w-3 mr-1" /> Pending
        </Badge>;
      case 'Rejected':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-200 border-red-200">
          <XCircle className="h-3 w-3 mr-1" /> Rejected
        </Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };
  
  const getTypeColor = (type) => {
    if (type.includes('Casual')) return 'text-blue-600';
    if (type.includes('Sick')) return 'text-red-600';
    if (type.includes('Earned')) return 'text-green-600';
    if (type.includes('Comp')) return 'text-amber-600';
    return 'text-gray-600';
  };

  // Function to handle opening the leave details dialog
  const openLeaveDetails = (request) => {
    setSelectedRequest(request);
  };

  return (
    <div className="p-3 md:p-6 space-y-6">
      {/* Header Section */}
      <header className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Leave Management</h1>
            <p className="text-gray-500 mt-1">Track, apply and manage your leave requests</p>
          </div>
          <Button 
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700"
            onClick={() => setIsApplyLeaveOpen(true)}
          >
            <Plus size={16} />
            Apply for Leave
          </Button>
        </div>
      </header>

      {/* Leave Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {leaveBalances.map((leave, index) => (
          <Card key={index} className="border hover:shadow-md transition-all">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">{leave.type}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div className="text-2xl font-bold">{leave.used} / {leave.total}</div>
                <div className={`h-10 w-10 rounded-full flex items-center justify-center ${leave.color} text-white font-medium`}>
                  {leave.total - leave.used}
                </div>
              </div>
              <Progress 
                value={(leave.used / leave.total) * 100} 
                className="h-2 mt-3"
              />
              <p className="text-xs text-gray-500 mt-2">{leave.total - leave.used} days remaining</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content with Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-6">
        <Tabs defaultValue="requests" className="w-full">
          <TabsList className="grid grid-cols-4 mb-6 bg-gray-100 p-1">
            <TabsTrigger value="requests" className="data-[state=active]:bg-white rounded">
              <FileText className="h-4 w-4 mr-2" /> My Requests
            </TabsTrigger>
            <TabsTrigger value="calendar" className="data-[state=active]:bg-white rounded">
              <Calendar className="h-4 w-4 mr-2" /> Calendar
            </TabsTrigger>
            <TabsTrigger value="holidays" className="data-[state=active]:bg-white rounded">
              <CalendarIcon className="h-4 w-4 mr-2" /> Holidays
            </TabsTrigger>
            <TabsTrigger value="team" className="data-[state=active]:bg-white rounded">
              <Users className="h-4 w-4 mr-2" /> Team
            </TabsTrigger>
          </TabsList>

          {/* My Requests Tab */}
          <TabsContent value="requests" className="pt-2">
            <div className="rounded-lg border border-gray-200">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader className="bg-gray-50">
                    <TableRow>
                      <TableHead className="font-semibold">Type</TableHead>
                      <TableHead className="font-semibold">From</TableHead>
                      <TableHead className="font-semibold">To</TableHead>
                      <TableHead className="font-semibold">Days</TableHead>
                      <TableHead className="font-semibold">Reason</TableHead>
                      <TableHead className="font-semibold">Status</TableHead>
                      <TableHead className="font-semibold">Applied On</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {leaveRequests.map(request => (
                      <TableRow 
                        key={request.id} 
                        className="cursor-pointer hover:bg-gray-50"
                        onClick={() => openLeaveDetails(request)}
                      >
                        <TableCell className={`font-medium ${getTypeColor(request.type)}`}>
                          {request.type}
                        </TableCell>
                        <TableCell>{request.from}</TableCell>
                        <TableCell>{request.to}</TableCell>
                        <TableCell>{request.days}</TableCell>
                        <TableCell className="max-w-[200px] truncate">{request.reason}</TableCell>
                        <TableCell>{getStatusBadge(request.status)}</TableCell>
                        <TableCell>{request.appliedOn}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="icon">
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
            
            <div className="flex justify-between items-center mt-4">
              <p className="text-sm text-gray-500">Showing {leaveRequests.length} leave requests</p>
              <Button variant="outline" className="text-sm h-8">
                <Download className="h-3 w-3 mr-1" /> Export
              </Button>
            </div>
          </TabsContent>

          {/* Leave Calendar Tab */}
          <TabsContent value="calendar" className="pt-2">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle>Leave Calendar</CardTitle>
                  <div className="flex gap-2 items-center">
                    <Badge className="bg-blue-100 text-blue-800 border-blue-200">You</Badge>
                    <Badge className="bg-green-100 text-green-800 border-green-200">Approved</Badge>
                    <Badge className="bg-amber-100 text-amber-800 border-amber-200">Pending</Badge>
                  </div>
                </div>
                <CardDescription>Visual representation of your leaves and team availability</CardDescription>              </CardHeader>
              <CardContent className="flex justify-center items-center">
                <LeaveCalendar />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Holidays Tab */}
          <TabsContent value="holidays" className="pt-2">
            <div className="space-y-5">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Official Holidays - 2025</h3>
                <Badge className="bg-indigo-100 text-indigo-800 border-indigo-200">
                  {holidays.length} Holidays
                </Badge>
              </div>
              
              <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
                {holidays.map(holiday => (
                  <Card key={holiday.id} className="overflow-hidden border-gray-200 hover:border-indigo-300 hover:shadow-sm transition-all">
                    <CardContent className="p-0">
                      <div className={`
                        ${holiday.type === 'National Holiday' ? 'bg-green-500' : 
                          holiday.type === 'Festival Holiday' ? 'bg-purple-500' : 'bg-blue-500'} 
                        py-1.5 px-3 text-white font-medium text-sm`}>
                        {holiday.type}
                      </div>
                      <div className="p-4">
                        <h4 className="font-semibold text-gray-800">{holiday.name}</h4>
                        <div className="flex items-center mt-2 text-sm text-gray-500">
                          <CalendarIcon className="h-3.5 w-3.5 mr-1.5" />
                          {holiday.date} ({holiday.day})
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Team On Leave Tab */}
          <TabsContent value="team" className="pt-2">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Team Members On Leave</CardTitle>
                <CardDescription>Upcoming team leaves this month (May 2025)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {teamLeave.map(member => (
                    <div 
                      key={member.id} 
                      className="p-3 rounded-lg border border-gray-200 hover:border-indigo-200 hover:bg-indigo-50 transition-all"
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-9 w-9 border border-gray-200">
                            {member.avatar ? (
                              <AvatarImage src={member.avatar} alt={member.name} />
                            ) : (
                              <AvatarFallback className="bg-indigo-100 text-indigo-700">
                                {getInitials(member.name)}
                              </AvatarFallback>
                            )}
                          </Avatar>
                          <div>
                            <h4 className="font-medium text-gray-800">{member.name}</h4>
                            <p className="text-sm text-gray-500">{member.department}</p>
                          </div>
                        </div>
                        {getStatusBadge(member.status)}
                      </div>
                      <div className="mt-3 flex items-center gap-6 text-sm">
                        <div className="flex items-center">
                          <Calendar className="h-3.5 w-3.5 text-gray-500 mr-1.5" />
                          <span>From: <span className="text-gray-700 font-medium">{member.from}</span></span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-3.5 w-3.5 text-gray-500 mr-1.5" />
                          <span>To: <span className="text-gray-700 font-medium">{member.to}</span></span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Apply Leave Dialog */}
      <Dialog open={isApplyLeaveOpen} onOpenChange={setIsApplyLeaveOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-xl">Apply For Leave</DialogTitle>
            <DialogDescription>Submit your leave request for approval</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="leave-type" className="font-medium">Leave Type</Label>
              <Select value={leaveType} onValueChange={setLeaveType}>
                <SelectTrigger id="leave-type" className="w-full">
                  <SelectValue placeholder="Select leave type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="casual">Casual Leave</SelectItem>
                  <SelectItem value="sick">Sick Leave</SelectItem>
                  <SelectItem value="earned">Earned Leave</SelectItem>
                  <SelectItem value="compoff">Comp Off</SelectItem>
                </SelectContent>
              </Select>
              {leaveType && (
                <div className="flex justify-between text-xs mt-1">
                  <span className="text-gray-500">
                    Available Balance: <span className="text-gray-700 font-medium">
                      {leaveType === 'casual' ? '8' : leaveType === 'sick' ? '5' : leaveType === 'earned' ? '15' : '1'} days
                    </span>
                  </span>
                </div>
              )}
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="font-medium">From Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {startDate ? format(startDate, 'PPP') : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent
                      mode="single"
                      selected={startDate}
                      onSelect={setStartDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="space-y-2">
                <Label className="font-medium">To Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {endDate ? format(endDate, 'PPP') : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent
                      mode="single"
                      selected={endDate}
                      onSelect={setEndDate}
                      initialFocus
                      disabled={(date) => date < (startDate || new Date())}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            
            {startDate && endDate && (
              <div className="bg-indigo-50 p-3 rounded-md border border-indigo-100 flex items-center">
                <Info className="h-4 w-4 text-indigo-500 mr-2" />
                <span className="text-sm text-indigo-700">
                  Duration: <span className="font-semibold">{calculateDuration()} day{calculateDuration() !== 1 ? 's' : ''}</span>
                </span>
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="reason" className="font-medium">Reason for Leave</Label>
              <Textarea id="reason" placeholder="Please provide a reason for your leave request" className="resize-none" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="contact" className="font-medium">Contact During Leave (Optional)</Label>
              <Input id="contact" placeholder="Phone number or email" />
            </div>
          </div>
          <DialogFooter className="flex space-x-2 justify-end">
            <Button variant="outline" onClick={() => setIsApplyLeaveOpen(false)}>Cancel</Button>
            <Button 
              className="bg-indigo-600 hover:bg-indigo-700"
              onClick={() => setIsApplyLeaveOpen(false)}
            >
              Submit Request
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Leave Details Dialog */}
      {selectedRequest && (
        <Dialog open={!!selectedRequest} onOpenChange={() => setSelectedRequest(null)}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <div className="flex items-center gap-2">
                <DialogTitle>Leave Request Details</DialogTitle>
                {getStatusBadge(selectedRequest.status)}
              </div>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                  <div>
                    <p className="text-sm text-gray-500">Leave Type</p>
                    <p className={`font-medium ${getTypeColor(selectedRequest.type)}`}>{selectedRequest.type}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Duration</p>
                    <p className="font-medium text-gray-800">{selectedRequest.days} day{selectedRequest.days !== 1 ? 's' : ''}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">From Date</p>
                    <p className="font-medium text-gray-800">{selectedRequest.from}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">To Date</p>
                    <p className="font-medium text-gray-800">{selectedRequest.to}</p>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <p className="text-sm text-gray-500">Reason</p>
                  <p className="font-medium text-gray-800">{selectedRequest.reason}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Applied On</p>
                  <p className="font-medium text-gray-800">{selectedRequest.appliedOn}</p>
                </div>
                
                {selectedRequest.status === 'Approved' && (
                  <div className="bg-green-50 p-3 rounded-md border border-green-100">
                    <p className="text-sm text-green-800 font-medium mb-1">Approved by {selectedRequest.approvedBy}</p>
                    <p className="text-xs text-green-700">on {selectedRequest.approvedOn}</p>
                  </div>
                )}
                
                {selectedRequest.status === 'Rejected' && (
                  <div className="bg-red-50 p-3 rounded-md border border-red-100">
                    <p className="text-sm text-red-800 font-medium mb-1">Rejected by {selectedRequest.rejectedBy}</p>
                    <p className="text-xs text-red-700">on {selectedRequest.rejectedOn}</p>
                    <Separator className="my-2 bg-red-200" />
                    <p className="text-xs text-red-700">Reason: {selectedRequest.rejectionReason}</p>
                  </div>
                )}
              </div>
            </div>
            <DialogFooter>
              {selectedRequest.status === 'Pending' ? (
                <Button variant="outline" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                  Cancel Request
                </Button>
              ) : (
                <Button 
                  className="bg-indigo-600 hover:bg-indigo-700" 
                  onClick={() => setSelectedRequest(null)}
                >
                  Close
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default MyLeave;
