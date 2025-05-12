import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { 
  Calendar, 
  Clock, 
  CreditCard, 
  FileText,
  User,
  Bell,
  ArrowRight,
  BarChart3,
  CheckCircle,
  AlertCircle,
  CalendarClock,
  Mail,
  HelpCircle,
  FileBarChart,
  ChevronRight,
  Activity,
  Calendar as CalendarIcon,
  Sparkles,
  Home,
  Info
} from 'lucide-react';

const EmployeeWelcome = () => {
  const navigate = useNavigate();
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  
  // Get current time of day greeting
  const getGreeting = () => {
    const hour = currentDate.getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  // Navigate to different sections
  const navigateTo = (path) => {
    navigate(path);
  };

  // Mock data
  const userProfile = {
    name: 'John Doe',
    role: 'Software Engineer',
    department: 'Product Development',
    empId: 'EMP001',
    joinDate: 'January 15, 2023',
    email: 'john.doe@ceitcs.com',
    phone: '+91 9876543210',
    avatar: null, // In a real app, this would be a URL
  };

  const quickStats = {
    attendance: {
      present: 22,
      total: 25,
      percentage: 88
    },
    leaveBalance: {
      casual: 8,
      sick: 5,
      earned: 15,
      total: 28
    },
    upcomingPayday: 'May 31, 2025',
    todayMarked: true,
    timeIn: '09:05 AM'
  };

  const importantNotices = [
    {
      id: 1,
      title: 'Office Closed for Diwali',
      date: 'November 12, 2025',
      type: 'Holiday',
      priority: 'Medium'
    },
    {
      id: 2,
      title: 'Complete Performance Self-Assessment',
      date: 'May 20, 2025',
      type: 'Task',
      priority: 'High'
    },
    {
      id: 3,
      title: 'Team Outing Next Week',
      date: 'May 22, 2025',
      type: 'Event',
      priority: 'Medium'
    }
  ];

  const quickActions = [
    { 
      title: 'Apply for Leave', 
      icon: <Calendar className="h-5 w-5 text-blue-600" />, 
      path: '/my-leave',
      description: 'Request time off or check leave balance',
      color: 'blue'
    },
    { 
      title: 'View Latest Payslip', 
      icon: <CreditCard className="h-5 w-5 text-green-600" />, 
      path: '/my-payslips',
      description: 'Access your April 2025 salary details',
      color: 'green'
    },
    { 
      title: 'Update Profile', 
      icon: <User className="h-5 w-5 text-purple-600" />, 
      path: '/my-profile',
      description: 'Keep your personal information up to date',
      color: 'purple'
    },
    { 
      title: 'Mark Attendance', 
      icon: <Clock className="h-5 w-5 text-amber-600" />, 
      path: '/my-attendance',
      description: 'Check-in or view today\'s attendance',
      color: 'amber'
    }
  ];

  // Recent activities mock data
  const recentActivities = [
    {
      id: 1,
      type: 'attendance',
      action: 'Marked attendance',
      date: 'Today, 09:05 AM',
      icon: <Clock className="h-4 w-4 text-blue-500" />,
    },
    {
      id: 2,
      type: 'leave',
      action: 'Leave request approved',
      date: 'Yesterday, 02:30 PM',
      icon: <Calendar className="h-4 w-4 text-green-500" />,
    },
    {
      id: 3,
      type: 'payslip',
      action: 'April 2025 payslip generated',
      date: 'May 01, 2025',
      icon: <CreditCard className="h-4 w-4 text-purple-500" />,
    }
  ];
  return (
    <div className="p-3 md:p-6 space-y-5">
      {/* Header Section */}
      <header className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center space-x-4">
            <Avatar className="h-14 w-14 border border-indigo-100">
              {userProfile.avatar ? (
                <AvatarImage src={userProfile.avatar} alt={userProfile.name} />
              ) : (
                <AvatarFallback className="bg-indigo-100 text-indigo-700 text-xl font-semibold">
                  {userProfile.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              )}
            </Avatar>
            <div>
              <p className="text-gray-500 text-sm">{formattedDate}</p>
              <h1 className="text-xl md:text-2xl font-bold text-gray-800">{getGreeting()}, {userProfile.name}!</h1>
              <div className="flex items-center space-x-2 mt-1">
                <Badge className="bg-indigo-100 text-indigo-700 hover:bg-indigo-200 border-none">
                  {userProfile.role}
                </Badge>
                <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200 border-none">
                  {userProfile.department}
                </Badge>
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
            {quickStats.todayMarked ? (
              <div className="flex items-center px-4 py-2 bg-green-50 border border-green-100 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <div>
                  <p className="text-green-700 text-sm font-medium">Attendance Marked</p>
                  <p className="text-green-600 text-xs">{quickStats.timeIn} Today</p>
                </div>
              </div>
            ) : (
              <Button 
                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700"
                onClick={() => navigateTo('/my-attendance')}
              >
                <Clock className="h-4 w-4" /> 
                Mark Attendance
              </Button>
            )}
            <Button 
              variant="outline" 
              className="flex items-center gap-2 border-indigo-200 text-indigo-700 hover:bg-indigo-50"
              onClick={() => navigateTo('/my-leave')}
            >
              <Calendar className="h-4 w-4" /> 
              Apply for Leave
            </Button>
          </div>
        </div>
      </header>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-indigo-50 to-indigo-100 border-indigo-200">
          <CardContent className="p-4 md:p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-indigo-600 text-sm font-medium">Monthly Attendance</p>
                <h3 className="text-2xl font-bold text-indigo-900 mt-1">
                  {quickStats.attendance.present}/{quickStats.attendance.total}
                </h3>
                <p className="text-indigo-700 text-sm mt-1">{quickStats.attendance.percentage}% Present</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-indigo-200 flex items-center justify-center">
                <BarChart3 className="h-5 w-5 text-indigo-700" />
              </div>
            </div>
            <Progress value={quickStats.attendance.percentage} className="h-1.5 mt-4" />
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4 md:p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-blue-600 text-sm font-medium">Leave Balance</p>
                <h3 className="text-2xl font-bold text-blue-900 mt-1">
                  {quickStats.leaveBalance.total}
                </h3>
                <p className="text-blue-700 text-sm mt-1">Days Available</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-blue-200 flex items-center justify-center">
                <CalendarClock className="h-5 w-5 text-blue-700" />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-1 mt-4">
              <div className="bg-white bg-opacity-60 p-1 rounded text-center">
                <p className="text-xs text-blue-800">Casual</p>
                <p className="text-sm font-semibold text-blue-900">{quickStats.leaveBalance.casual}</p>
              </div>
              <div className="bg-white bg-opacity-60 p-1 rounded text-center">
                <p className="text-xs text-blue-800">Sick</p>
                <p className="text-sm font-semibold text-blue-900">{quickStats.leaveBalance.sick}</p>
              </div>
              <div className="bg-white bg-opacity-60 p-1 rounded text-center">
                <p className="text-xs text-blue-800">Earned</p>
                <p className="text-sm font-semibold text-blue-900">{quickStats.leaveBalance.earned}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4 md:p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-green-600 text-sm font-medium">Next Payday</p>
                <h3 className="text-lg md:text-xl font-bold text-green-900 mt-1">
                  {quickStats.upcomingPayday}
                </h3>
                <Button 
                  variant="ghost" 
                  className="text-green-700 hover:text-green-800 hover:bg-green-200 p-0 h-8 mt-1"
                  onClick={() => navigateTo('/my-payslips')}
                >
                  View Payslips <ChevronRight className="h-3 w-3 ml-1" />
                </Button>
              </div>
              <div className="h-10 w-10 rounded-full bg-green-200 flex items-center justify-center">
                <CreditCard className="h-5 w-5 text-green-700" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
          <CardContent className="p-4 md:p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-amber-600 text-sm font-medium">Profile Completion</p>
                <h3 className="text-2xl font-bold text-amber-900 mt-1">
                  75%
                </h3>
                <Button 
                  variant="ghost" 
                  className="text-amber-700 hover:text-amber-800 hover:bg-amber-200 p-0 h-8 mt-1"
                  onClick={() => navigateTo('/my-profile')}
                >
                  Complete Profile <ChevronRight className="h-3 w-3 ml-1" />
                </Button>
              </div>
              <div className="h-10 w-10 rounded-full bg-amber-200 flex items-center justify-center">
                <User className="h-5 w-5 text-amber-700" />
              </div>
            </div>
            <Progress value={75} className="h-1.5 mt-4" />
          </CardContent>
        </Card>
      </div>

      {/* Main Content with Tabs */}
      <Tabs defaultValue="dashboard" className="w-full">
        <TabsList className="grid grid-cols-3 mb-4 bg-gray-100 p-1">
          <TabsTrigger value="dashboard" className="data-[state=active]:bg-white rounded">
            <Home className="h-4 w-4 mr-2" /> Dashboard
          </TabsTrigger>
          <TabsTrigger value="activities" className="data-[state=active]:bg-white rounded">
            <Activity className="h-4 w-4 mr-2" /> Recent Activities
          </TabsTrigger>
          <TabsTrigger value="announcements" className="data-[state=active]:bg-white rounded">
            <Bell className="h-4 w-4 mr-2" /> Announcements
          </TabsTrigger>
        </TabsList>

        {/* Dashboard Tab */}
        <TabsContent value="dashboard" className="space-y-6 mt-2">
          {/* Quick Actions */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Quick Actions</h2>
              <Button variant="ghost" size="sm" className="text-gray-500">
                View All <ChevronRight className="h-3 w-3" />
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {quickActions.map((action, index) => (
                <Card 
                  key={index} 
                  className={`overflow-hidden border-${action.color}-200 hover:border-${action.color}-400 hover:shadow-md transition-all cursor-pointer`} 
                  onClick={() => navigateTo(action.path)}
                >
                  <CardContent className="p-5">
                    <div className={`h-12 w-12 rounded-full bg-${action.color}-100 flex items-center justify-center mb-4`}>
                      {action.icon}
                    </div>
                    <h3 className="font-semibold text-gray-800">{action.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">{action.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* My Modules Section */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800">My Modules</h2>
              <Badge className="bg-indigo-100 text-indigo-800 hover:bg-indigo-200">4 Active</Badge>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <Card 
                className="hover:bg-indigo-50 hover:border-indigo-300 hover:shadow-sm transition-all cursor-pointer group"
                onClick={() => navigateTo('/my-profile')}
              >
                <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                  <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center mb-3 group-hover:bg-indigo-200">
                    <User className="h-5 w-5 text-indigo-600" />
                  </div>
                  <h3 className="font-medium text-gray-800">My Profile</h3>
                  <p className="text-xs text-gray-500 mt-1">View & edit profile</p>
                </CardContent>
              </Card>

              <Card 
                className="hover:bg-blue-50 hover:border-blue-300 hover:shadow-sm transition-all cursor-pointer group"
                onClick={() => navigateTo('/my-attendance')}
              >
                <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mb-3 group-hover:bg-blue-200">
                    <Clock className="h-5 w-5 text-blue-600" />
                  </div>
                  <h3 className="font-medium text-gray-800">Attendance</h3>
                  <p className="text-xs text-gray-500 mt-1">Manage time records</p>
                </CardContent>
              </Card>

              <Card 
                className="hover:bg-purple-50 hover:border-purple-300 hover:shadow-sm transition-all cursor-pointer group"
                onClick={() => navigateTo('/my-leave')}
              >
                <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                  <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center mb-3 group-hover:bg-purple-200">
                    <Calendar className="h-5 w-5 text-purple-600" />
                  </div>
                  <h3 className="font-medium text-gray-800">Leave</h3>
                  <p className="text-xs text-gray-500 mt-1">Request time off</p>
                </CardContent>
              </Card>
              
              <Card 
                className="hover:bg-green-50 hover:border-green-300 hover:shadow-sm transition-all cursor-pointer group"
                onClick={() => navigateTo('/my-payslips')}
              >
                <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                  <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center mb-3 group-hover:bg-green-200">
                    <CreditCard className="h-5 w-5 text-green-600" />
                  </div>
                  <h3 className="font-medium text-gray-800">Payslips</h3>
                  <p className="text-xs text-gray-500 mt-1">Salary information</p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Profile Completion Section */}
          <section>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-amber-500" />
                  Complete Your Profile
                </CardTitle>
                <CardDescription>Add remaining information to access all features</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="flex justify-between mb-1 text-sm">
                    <span className="font-medium">75% Complete</span>
                    <span className="text-indigo-600 font-medium">3 items pending</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 rounded-md bg-gray-50">
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                      <span className="text-sm font-medium">Basic Information</span>
                    </div>
                    <Badge className="bg-green-100 text-green-800 border-none">Completed</Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-md bg-gray-50">
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                      <span className="text-sm font-medium">Contact Details</span>
                    </div>
                    <Badge className="bg-green-100 text-green-800 border-none">Completed</Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-md bg-gray-50">
                    <div className="flex items-center">
                      <AlertCircle className="h-4 w-4 text-amber-600 mr-2" />
                      <span className="text-sm font-medium">Emergency Contacts</span>
                    </div>
                    <Badge className="bg-amber-100 text-amber-800 border-none">Pending</Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-md bg-gray-50">
                    <div className="flex items-center">
                      <AlertCircle className="h-4 w-4 text-amber-600 mr-2" />
                      <span className="text-sm font-medium">Bank Details</span>
                    </div>
                    <Badge className="bg-amber-100 text-amber-800 border-none">Pending</Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-md bg-gray-50">
                    <div className="flex items-center">
                      <AlertCircle className="h-4 w-4 text-amber-600 mr-2" />
                      <span className="text-sm font-medium">Upload Documents</span>
                    </div>
                    <Badge className="bg-amber-100 text-amber-800 border-none">Pending</Badge>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-0">
                <Button className="w-full" onClick={() => navigateTo('/my-profile')}>
                  Complete Your Profile
                </Button>
              </CardFooter>
            </Card>
          </section>
        </TabsContent>

        {/* Activities Tab */}
        <TabsContent value="activities" className="mt-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Activity className="h-5 w-5 text-indigo-500" />
                Recent Activities
              </CardTitle>
              <CardDescription>Your latest actions and updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg border border-gray-100">
                    <div className="rounded-full bg-gray-100 p-2">
                      {activity.icon}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-800">{activity.action}</p>
                      <p className="text-sm text-gray-500">{activity.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View All Activities
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Announcements Tab */}
        <TabsContent value="announcements" className="mt-2">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Bell className="h-5 w-5 text-amber-500" />
                  Important Announcements
                </CardTitle>
                <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200 border-none">
                  {importantNotices.length} New
                </Badge>
              </div>
              <CardDescription>Company-wide updates and important notices</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {importantNotices.map((notice) => (
                <div 
                  key={notice.id} 
                  className="p-4 rounded-lg border border-gray-200 hover:border-indigo-200 hover:bg-indigo-50 transition-colors cursor-pointer"
                >
                  <div className="flex justify-between">
                    <Badge 
                      variant="outline" 
                      className={
                        notice.type === 'Holiday' ? 'border-blue-200 text-blue-800 bg-blue-50' : 
                        notice.type === 'Task' ? 'border-purple-200 text-purple-800 bg-purple-50' : 
                        'border-green-200 text-green-800 bg-green-50'
                      }
                    >
                      {notice.type}
                    </Badge>
                    <Badge 
                      variant="outline" 
                      className={
                        notice.priority === 'High' ? 'border-red-200 text-red-800 bg-red-50' : 
                        'border-amber-200 text-amber-800 bg-amber-50'
                      }
                    >
                      {notice.priority}
                    </Badge>
                  </div>
                  <h3 className="font-medium mt-3 text-gray-800">{notice.title}</h3>
                  <div className="flex items-center mt-2 text-sm text-gray-500">
                    <CalendarIcon className="h-3 w-3 mr-1" />
                    {notice.date}
                  </div>
                </div>
              ))}
            </CardContent>
            <CardFooter className="pt-0">
              <Button variant="ghost" className="w-full text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50">
                View All Announcements
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Footer */}
      <footer className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-5 mt-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-indigo-600" />
            <span className="text-gray-700">Need help? <span className="text-indigo-600 font-medium cursor-pointer hover:underline">Contact IT Support</span></span>
          </div>
          
          <Separator orientation="vertical" className="h-6 hidden md:block" />
          
          <div className="flex items-center gap-2">
            <Info className="h-5 w-5 text-indigo-600" />
            <span className="text-gray-700">Last login: Today, 08:55 AM</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default EmployeeWelcome;
