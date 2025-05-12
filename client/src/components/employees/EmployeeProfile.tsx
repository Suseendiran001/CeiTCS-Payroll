
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  User, 
  Briefcase, 
  GraduationCap, 
  FileText, 
  CreditCard, 
  Clock,
  Calendar,
  Mail,
  Phone,
  MapPin,
  Building,
  CalendarClock,
  ArrowLeft
} from 'lucide-react';

// For demo purposes - in a real app, this would come from an API
const employeeData = {
  id: 'P001',
  name: 'Ajay Kumar',
  email: 'ajay.kumar@example.com',
  phone: '+91 9876543210',
  position: 'Software Engineer',
  department: 'Engineering',
  type: 'Permanent',
  status: 'Active',
  joinDate: '2022-01-15',
  address: '123, Koramangala, Bangalore - 560034',
  nationality: 'Indian',
  aadharNumber: '1234 5678 9012',
  panNumber: 'ABCDE1234F',
  dob: '1990-05-15',
  gender: 'Male',
  maritalStatus: 'Married',
  emergencyContact: {
    name: 'Meena Kumar',
    relationship: 'Spouse',
    phone: '+91 9876543211'
  },
  reporting: {
    name: 'Rahul Sharma',
    position: 'Senior Engineering Manager',
    id: 'P105'
  },
  education: [
    {
      degree: 'B.Tech in Computer Science',
      university: 'IIT Bangalore',
      year: '2012'
    },
    {
      degree: 'M.Tech in Software Engineering',
      university: 'NIT Surathkal',
      year: '2014'
    }
  ],
  experience: [
    {
      company: 'TechCorp India',
      position: 'Junior Developer',
      duration: 'Jun 2014 - Dec 2016',
      reason: 'Career Growth'
    },
    {
      company: 'InnovateSoft',
      position: 'Software Engineer',
      duration: 'Jan 2017 - Dec 2021',
      reason: 'Better Opportunity'
    }
  ],
  banking: {
    bankName: 'HDFC Bank',
    accountNumber: 'XXXX XXXX 5678',
    ifscCode: 'HDFC0001234',
    uanNumber: '123456789012'
  }
};

const EmployeeProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // In a real app, you would fetch data based on the ID
  const employee = employeeData;
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .toUpperCase();
  };
  
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={() => navigate('/employees')}>
          <ArrowLeft size={18} />
        </Button>
        <h1 className="text-2xl font-bold">Employee Profile</h1>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card className="lg:col-span-1">
          <CardContent className="pt-6 flex flex-col items-center">
            <Avatar className="h-24 w-24 mb-4">
              <AvatarFallback className="bg-primary-gradient text-white text-xl">
                {getInitials(employee.name)}
              </AvatarFallback>
            </Avatar>
            <h2 className="text-xl font-semibold">{employee.name}</h2>
            <p className="text-gray-500">{employee.position}</p>
            <p className="text-sm font-medium mt-1 px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full">
              {employee.type}
            </p>
            
            <div className="w-full mt-6 space-y-3">
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-gray-400" />
                <span className="text-sm">{employee.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={18} className="text-gray-400" />
                <span className="text-sm">{employee.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <Building size={18} className="text-gray-400" />
                <span className="text-sm">{employee.department}</span>
              </div>
              <div className="flex items-center gap-3">
                <Calendar size={18} className="text-gray-400" />
                <span className="text-sm">Joined {formatDate(employee.joinDate)}</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin size={18} className="text-gray-400" />
                <span className="text-sm truncate" title={employee.address}>{employee.address}</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="lg:col-span-3 space-y-6">
          <Tabs defaultValue="personal">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="personal" className="flex items-center gap-2">
                <User size={16} />
                <span className="hidden sm:inline">Personal</span>
              </TabsTrigger>
              <TabsTrigger value="job" className="flex items-center gap-2">
                <Briefcase size={16} />
                <span className="hidden sm:inline">Job</span>
              </TabsTrigger>
              <TabsTrigger value="education" className="flex items-center gap-2">
                <GraduationCap size={16} />
                <span className="hidden sm:inline">Education</span>
              </TabsTrigger>
              <TabsTrigger value="documents" className="flex items-center gap-2">
                <FileText size={16} />
                <span className="hidden sm:inline">Documents</span>
              </TabsTrigger>
              <TabsTrigger value="banking" className="flex items-center gap-2">
                <CreditCard size={16} />
                <span className="hidden sm:inline">Banking</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="personal" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Personal Information</CardTitle>
                  <CardDescription>Details about the employee's personal information</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Full Name</h3>
                      <p>{employee.name}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Date of Birth</h3>
                      <p>{formatDate(employee.dob)}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Gender</h3>
                      <p>{employee.gender}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Marital Status</h3>
                      <p>{employee.maritalStatus}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Nationality</h3>
                      <p>{employee.nationality}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">PAN Number</h3>
                      <p>{employee.panNumber}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Aadhar Number</h3>
                      <p>{employee.aadharNumber}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Address</h3>
                      <p>{employee.address}</p>
                    </div>
                  </div>
                  
                  <div className="mt-8">
                    <h3 className="text-sm font-medium text-gray-500 mb-3">Emergency Contact</h3>
                    <div className="bg-gray-50 p-4 rounded-md">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <h4 className="text-xs font-medium text-gray-500 mb-1">Name</h4>
                          <p className="text-sm">{employee.emergencyContact.name}</p>
                        </div>
                        <div>
                          <h4 className="text-xs font-medium text-gray-500 mb-1">Relationship</h4>
                          <p className="text-sm">{employee.emergencyContact.relationship}</p>
                        </div>
                        <div>
                          <h4 className="text-xs font-medium text-gray-500 mb-1">Phone</h4>
                          <p className="text-sm">{employee.emergencyContact.phone}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="job" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Job Information</CardTitle>
                  <CardDescription>Details about the employee's position and work history</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Employee ID</h3>
                      <p>{employee.id}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Position</h3>
                      <p>{employee.position}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Department</h3>
                      <p>{employee.department}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Employee Type</h3>
                      <p>{employee.type}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Join Date</h3>
                      <p>{formatDate(employee.joinDate)}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Status</h3>
                      <p>{employee.status}</p>
                    </div>
                  </div>
                  
                  <div className="mt-8">
                    <h3 className="text-sm font-medium text-gray-500 mb-3">Reporting Manager</h3>
                    <div className="bg-gray-50 p-4 rounded-md">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <h4 className="text-xs font-medium text-gray-500 mb-1">Name</h4>
                          <p className="text-sm">{employee.reporting.name}</p>
                        </div>
                        <div>
                          <h4 className="text-xs font-medium text-gray-500 mb-1">Position</h4>
                          <p className="text-sm">{employee.reporting.position}</p>
                        </div>
                        <div>
                          <h4 className="text-xs font-medium text-gray-500 mb-1">Employee ID</h4>
                          <p className="text-sm">{employee.reporting.id}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8">
                    <h3 className="text-sm font-medium text-gray-500 mb-3">Previous Experience</h3>
                    <div className="space-y-4">
                      {employee.experience.map((exp, index) => (
                        <div key={index} className="bg-gray-50 p-4 rounded-md">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium">{exp.company}</h4>
                              <p className="text-sm">{exp.position}</p>
                            </div>
                            <div className="flex items-center gap-1 text-sm text-gray-500">
                              <CalendarClock size={14} />
                              <span>{exp.duration}</span>
                            </div>
                          </div>
                          <div className="mt-2">
                            <h4 className="text-xs font-medium text-gray-500 mb-1">Reason for Leaving</h4>
                            <p className="text-sm">{exp.reason}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="education" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Educational Background</CardTitle>
                  <CardDescription>Educational qualifications and certifications</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {employee.education.map((edu, index) => (
                      <div key={index} className="bg-gray-50 p-4 rounded-md">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium">{edu.degree}</h4>
                            <p className="text-sm">{edu.university}</p>
                          </div>
                          <div className="flex items-center gap-1 text-sm text-gray-500">
                            <Calendar size={14} />
                            <span>{edu.year}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="documents" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Documents</CardTitle>
                  <CardDescription>Employee documents and verification records</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="border border-gray-200 rounded-md p-4">
                      <h3 className="text-sm font-medium text-gray-500 mb-3">Aadhar Card</h3>
                      <div className="bg-gray-100 h-40 rounded-md flex items-center justify-center">
                        <FileText size={48} className="text-gray-400" />
                      </div>
                      <div className="mt-3 flex justify-between items-center">
                        <span className="text-sm">{employee.aadharNumber}</span>
                        <Button variant="outline" size="sm">View</Button>
                      </div>
                    </div>
                    
                    <div className="border border-gray-200 rounded-md p-4">
                      <h3 className="text-sm font-medium text-gray-500 mb-3">PAN Card</h3>
                      <div className="bg-gray-100 h-40 rounded-md flex items-center justify-center">
                        <FileText size={48} className="text-gray-400" />
                      </div>
                      <div className="mt-3 flex justify-between items-center">
                        <span className="text-sm">{employee.panNumber}</span>
                        <Button variant="outline" size="sm">View</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="banking" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Banking Information</CardTitle>
                  <CardDescription>Bank account and payment details</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Bank Name</h3>
                      <p>{employee.banking.bankName}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Account Number</h3>
                      <p>{employee.banking.accountNumber}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">IFSC Code</h3>
                      <p>{employee.banking.ifscCode}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">UAN Number</h3>
                      <p>{employee.banking.uanNumber}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfile;
