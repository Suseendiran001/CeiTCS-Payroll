import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Calendar, 
  Clock, 
  CreditCard, 
  FileText,
  Bell,
  Check,
  ArrowUpRight,
  CalendarClock
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

const EmployeeDashboard = () => {
  // Mock data - would come from API in real app
  const employeeData = {
    name: 'John Doe',
    position: 'Software Engineer',
    department: 'Engineering',
    employeeId: 'EMP001',
    joiningDate: '10 Jan 2022',
    leaveBalance: {
      casual: 8,
      sick: 5,
      earned: 15
    },
    upcomingPayday: '31 May 2025',
    attendance: {
      present: 22,
      absent: 1,
      leave: 2,
      percentage: 88
    },
    recentActivities: [
      { id: 1, type: 'leave', description: 'Leave request approved', date: '10 May 2025', status: 'approved' },
      { id: 2, type: 'payslip', description: 'April payslip generated', date: '30 Apr 2025', status: 'completed' },
      { id: 3, type: 'attendance', description: 'Marked late arrival', date: '05 May 2025', status: 'warning' }
    ],
    announcements: [
      { id: 1, title: 'Holiday: Diwali', description: 'Office will remain closed on 12th Nov 2025 for Diwali celebrations.', date: '12 Nov 2025' },
      { id: 2, title: 'Team Outing', description: 'Annual team outing planned for 20th May 2025. Mark your calendars!', date: '20 May 2025' }
    ]
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">My Dashboard</h1>
          <p className="text-gray-500">Welcome back, {employeeData.name}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Clock size={16} />
            Mark Attendance
          </Button>
          <Button size="sm" className="flex items-center gap-2">
            <FileText size={16} />
            Apply Leave
          </Button>
        </div>
      </div>

      {/* Quick Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Employee ID</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold">{employeeData.employeeId}</div>
              <div className="p-2 bg-primary/10 rounded-full">
                <FileText size={18} className="text-primary" />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-1">Joined on {employeeData.joiningDate}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Leave Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold">{employeeData.leaveBalance.casual + employeeData.leaveBalance.sick + employeeData.leaveBalance.earned} days</div>
              <div className="p-2 bg-green-100 rounded-full">
                <Calendar size={18} className="text-green-600" />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 mt-2">
              <div className="text-xs">
                <span className="text-gray-500">Casual:</span> {employeeData.leaveBalance.casual}
              </div>
              <div className="text-xs">
                <span className="text-gray-500">Sick:</span> {employeeData.leaveBalance.sick}
              </div>
              <div className="text-xs">
                <span className="text-gray-500">Earned:</span> {employeeData.leaveBalance.earned}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Next Payday</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold">{employeeData.upcomingPayday}</div>
              <div className="p-2 bg-blue-100 rounded-full">
                <CreditCard size={18} className="text-blue-600" />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-1">Your salary will be credited soon</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Attendance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold">{employeeData.attendance.percentage}%</div>
              <div className="p-2 bg-purple-100 rounded-full">
                <Clock size={18} className="text-purple-600" />
              </div>
            </div>
            <Progress value={employeeData.attendance.percentage} className="h-1.5 mt-2" />
            <div className="grid grid-cols-3 gap-1 mt-2">
              <div className="text-xs">
                <span className="text-gray-500">Present:</span> {employeeData.attendance.present}
              </div>
              <div className="text-xs">
                <span className="text-gray-500">Absent:</span> {employeeData.attendance.absent}
              </div>
              <div className="text-xs">
                <span className="text-gray-500">Leave:</span> {employeeData.attendance.leave}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Activities */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
              <CardDescription>Your latest activities and updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {employeeData.recentActivities.map(activity => (
                  <div key={activity.id} className="flex items-start gap-4 pb-4 border-b last:border-0 last:pb-0">
                    <div className={`p-2 rounded-full ${
                      activity.status === 'approved' ? 'bg-green-100' :
                      activity.status === 'warning' ? 'bg-yellow-100' : 'bg-blue-100'
                    }`}>
                      {activity.type === 'leave' && <CalendarClock size={20} className={
                        activity.status === 'approved' ? 'text-green-600' :
                        activity.status === 'warning' ? 'text-yellow-600' : 'text-blue-600'
                      } />}
                      {activity.type === 'payslip' && <CreditCard size={20} className="text-blue-600" />}
                      {activity.type === 'attendance' && <Clock size={20} className="text-yellow-600" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <p className="font-medium">{activity.description}</p>
                        <Badge variant={
                          activity.status === 'approved' ? 'success' :
                          activity.status === 'warning' ? 'warning' : 'default'
                        }>
                          {activity.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-500">{activity.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Links */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Links</CardTitle>
              <CardDescription>Frequently used services</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center gap-2">
                  <FileText size={24} className="text-primary" />
                  <span>View Payslips</span>
                </Button>
                <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center gap-2">
                  <Calendar size={24} className="text-primary" />
                  <span>Apply Leave</span>
                </Button>
                <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center gap-2">
                  <Clock size={24} className="text-primary" />
                  <span>Attendance Log</span>
                </Button>
                <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center gap-2">
                  <User size={24} className="text-primary" />
                  <span>Edit Profile</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          {/* Profile Card */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <Avatar className="h-20 w-20 mb-4">
                  <AvatarFallback className="text-xl bg-primary text-white">{employeeData.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-bold">{employeeData.name}</h3>
                <p className="text-gray-500">{employeeData.position}</p>
                <p className="text-gray-500 text-sm">{employeeData.department}</p>
                
                <Button variant="outline" size="sm" className="mt-4 w-full">
                  View Full Profile
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Announcements */}
          <Card>
            <CardHeader>
              <CardTitle>Announcements</CardTitle>
              <CardDescription>Company updates and news</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {employeeData.announcements.map(announcement => (
                  <div key={announcement.id} className="pb-4 border-b last:border-0 last:pb-0">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{announcement.title}</h4>
                      <Badge variant="outline">{announcement.date}</Badge>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{announcement.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
