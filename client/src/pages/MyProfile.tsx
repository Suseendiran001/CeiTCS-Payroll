import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogTitle, DialogHeader, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  CreditCard, 
  Building, 
  GraduationCap, 
  FileText,
  Key,
  Edit,
  Clock,
  Shield,
  Briefcase,
  Cake,
  UserCircle,
  Users,
  Landmark,
  CalendarDays,
  BadgeCheck,
  Award,
  Upload,
  PenTool,
  Heart
} from 'lucide-react';

const MyProfile = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isEditingPhoto, setIsEditingPhoto] = useState(false);
  const [isEditingPersonal, setIsEditingPersonal] = useState(false);
  const [isEditingBank, setIsEditingBank] = useState(false);
  
  // Mock data - would come from API in real app
  const employeeData = {
    id: 'EMP001',
    name: 'John Doe',
    email: 'john.doe@ceitcs.com',
    phone: '+91 9876543210',
    position: 'Software Engineer',
    department: 'Engineering',
    team: 'Frontend Development',
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
    profileCompleteness: 85,
    bloodGroup: 'O+',
    anniversary: null,
    bankDetails: {
      accountNumber: 'XXXX XXXX XXXX 1234',
      bankName: 'HDFC Bank',
      ifscCode: 'HDFC0001234',
      branch: 'Koramangala, Bangalore'
    },
    emergencyContact: {
      name: 'Jane Doe',
      relationship: 'Spouse',
      phone: '+91 9876543211'
    },
    reporting: {
      name: 'Rahul Sharma',
      position: 'Senior Engineering Manager',
      id: 'EMP105',
      email: 'rahul.sharma@ceitcs.com',
      image: null
    },
    education: [
      {
        id: 1,
        degree: 'Bachelor of Technology',
        field: 'Computer Science',
        institution: 'Anna University',
        year: '2018',
        score: '8.5 CGPA'
      }
    ],
    experience: [
      {
        id: 1,
        company: 'ABC Technologies',
        position: 'Junior Software Developer',
        duration: 'Jan 2019 - Dec 2021',
        location: 'Chennai, India',
        responsibilities: 'Frontend development using React, User interface design'
      }
    ],
    skills: ['JavaScript', 'React', 'Node.js', 'TypeScript', 'CSS', 'HTML', 'Git'],
    certifications: [
      {
        id: 1,
        name: 'React Developer Certification',
        issuedBy: 'Meta',
        year: '2023',
        validUntil: '2026'
      }
    ]
  };
  return (
    <div className="space-y-6 pb-10">
      {/* Header with Profile Completeness */}
      <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">My Profile</h1>
            <p className="text-gray-500 mt-1">Manage your personal and work information</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex flex-col text-right mr-2">
              <span className="text-sm font-medium">Profile Completeness</span>
              <span className="text-xs text-gray-500">{employeeData.profileCompleteness}% Complete</span>
            </div>
            <Progress value={employeeData.profileCompleteness} className="w-24 h-2" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Sidebar - Profile Card */}
        <div className="lg:col-span-1">
          <Card className="border shadow-sm">
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="relative">
                  <Avatar className="h-32 w-32 border-4 border-white shadow-md">
                    <AvatarFallback className="text-3xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
                      {employeeData.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <Button 
                    size="icon" 
                    variant="secondary" 
                    className="absolute bottom-0 right-0 h-8 w-8 rounded-full shadow-sm border border-gray-200"
                    onClick={() => setIsEditingPhoto(true)}
                  >
                    <Edit size={14} />
                  </Button>
                </div>
                
                <div>
                  <h2 className="text-xl font-bold text-gray-800">{employeeData.name}</h2>
                  <p className="text-gray-500">{employeeData.position}</p>
                  <Badge className="mt-2 bg-indigo-100 text-indigo-700 hover:bg-indigo-200">{employeeData.department}</Badge>
                </div>
                
                <Separator />
                
                <div className="w-full space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <User size={16} className="text-gray-400" />
                      <span className="text-gray-600">Employee ID</span>
                    </div>
                    <span className="font-medium">{employeeData.id}</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <Mail size={16} className="text-gray-400" />
                      <span className="text-gray-600">Email</span>
                    </div>
                    <span className="font-medium">{employeeData.email}</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <Phone size={16} className="text-gray-400" />
                      <span className="text-gray-600">Phone</span>
                    </div>
                    <span className="font-medium">{employeeData.phone}</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <CalendarDays size={16} className="text-gray-400" />
                      <span className="text-gray-600">Joined</span>
                    </div>
                    <span className="font-medium">{employeeData.joinDate}</span>
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex justify-center w-full gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm" variant="outline" className="flex items-center gap-1">
                        <Key size={14} />
                        Password
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Change Password</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4 pt-4">
                        <div className="space-y-2">
                          <Label htmlFor="current-password">Current Password</Label>
                          <Input id="current-password" type="password" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="new-password">New Password</Label>
                          <Input id="new-password" type="password" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="confirm-password">Confirm New Password</Label>
                          <Input id="confirm-password" type="password" />
                        </div>
                      </div>
                      <DialogFooter className="mt-4">
                        <Button type="submit">Update Password</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  
                  <Button size="sm" className="flex items-center gap-1 bg-indigo-600 hover:bg-indigo-700">
                    <Edit size={14} />
                    Edit Profile
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Manager Card */}
          <Card className="mt-6 border shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Reporting Manager</CardTitle>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-indigo-100 text-indigo-700">
                    {employeeData.reporting.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-gray-800">{employeeData.reporting.name}</p>
                  <p className="text-xs text-gray-500">{employeeData.reporting.position}</p>
                </div>
              </div>
              
              <div className="mt-3 text-sm space-y-2">
                <div className="flex items-center gap-2">
                  <Mail size={14} className="text-gray-400" />
                  <span className="text-gray-600">{employeeData.reporting.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User size={14} className="text-gray-400" />
                  <span className="text-gray-600">{employeeData.reporting.id}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Main Content */}
        <div className="lg:col-span-3">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-5 h-auto p-1 bg-muted rounded-lg">
              <TabsTrigger value="overview" className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md">
                Overview
              </TabsTrigger>
              <TabsTrigger value="personal" className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md">
                Personal
              </TabsTrigger>
              <TabsTrigger value="work" className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md">
                Work
              </TabsTrigger>
              <TabsTrigger value="finance" className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md">
                Finance
              </TabsTrigger>
              <TabsTrigger value="documents" className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md">
                Documents
              </TabsTrigger>
            </TabsList>
            
            {/* Overview Tab */}
            <TabsContent value="overview" className="mt-6 space-y-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Personal Highlights</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex gap-3 bg-blue-50 p-4 rounded-lg border border-blue-100">
                      <Cake className="h-8 w-8 text-blue-500" />
                      <div>
                        <p className="text-sm text-blue-700">Date of Birth</p>
                        <p className="font-medium">{employeeData.dob}</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-3 bg-indigo-50 p-4 rounded-lg border border-indigo-100">
                      <MapPin className="h-8 w-8 text-indigo-500" />
                      <div>
                        <p className="text-sm text-indigo-700">Location</p>
                        <p className="font-medium">Bangalore</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-3 bg-green-50 p-4 rounded-lg border border-green-100">
                      <Heart className="h-8 w-8 text-green-500" />
                      <div>
                        <p className="text-sm text-green-700">Blood Group</p>
                        <p className="font-medium">{employeeData.bloodGroup}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex justify-between">
                      <CardTitle>Skills</CardTitle>
                      <Button variant="ghost" size="sm" className="text-indigo-600 h-8">
                        <PenTool size={14} className="mr-1" />
                        Update
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {employeeData.skills.map((skill, index) => (
                        <div key={index} className="px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-full text-sm border border-indigo-100">
                          {skill}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex justify-between">
                      <CardTitle>Certifications</CardTitle>
                      <Button variant="ghost" size="sm" className="text-indigo-600 h-8">
                        <Award size={14} className="mr-1" />
                        Add New
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {employeeData.certifications.map((cert) => (
                      <div key={cert.id} className="flex items-center justify-between border-b pb-3 mb-3 last:border-0 last:mb-0 last:pb-0">
                        <div>
                          <p className="font-medium">{cert.name}</p>
                          <p className="text-sm text-gray-500">Issued by {cert.issuedBy} • {cert.year}</p>
                        </div>
                        <Badge className="bg-green-100 text-green-700 hover:bg-green-200">
                          Valid till {cert.validUntil}
                        </Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader>
                  <div className="flex justify-between">
                    <CardTitle>Work Experience</CardTitle>
                    <Button variant="outline" size="sm" className="h-8">
                      <Edit size={14} className="mr-1" />
                      Edit
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {employeeData.experience.map((exp) => (
                    <div key={exp.id} className="flex gap-4">
                      <div className="flex-none">
                        <div className="h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center">
                          <Briefcase size={20} className="text-gray-500" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h3 className="font-medium">{exp.position}</h3>
                          <Badge variant="outline">{exp.duration}</Badge>
                        </div>
                        <p className="text-gray-600 text-sm">{exp.company} • {exp.location}</p>
                        <p className="text-gray-500 text-sm mt-2">{exp.responsibilities}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Personal Info Tab */}
            <TabsContent value="personal" className="mt-6 space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Personal Information</CardTitle>
                    <Button 
                      variant={isEditingPersonal ? "default" : "outline"} 
                      size="sm" 
                      className={isEditingPersonal ? "bg-indigo-600 hover:bg-indigo-700" : ""} 
                      onClick={() => setIsEditingPersonal(!isEditingPersonal)}
                    >
                      {isEditingPersonal ? (
                        <>
                          <BadgeCheck size={16} className="mr-1" />
                          Save Changes
                        </>
                      ) : (
                        <>
                          <Edit size={16} className="mr-1" />
                          Edit Information
                        </>
                      )}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-gray-500">Full Name</Label>
                      {isEditingPersonal ? (
                        <Input value={employeeData.name} />
                      ) : (
                        <p className="font-medium">{employeeData.name}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="text-gray-500">Date of Birth</Label>
                      {isEditingPersonal ? (
                        <Input type="date" value={employeeData.dob} />
                      ) : (
                        <p className="font-medium">{employeeData.dob}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="text-gray-500">Gender</Label>
                      {isEditingPersonal ? (
                        <Input value={employeeData.gender} />
                      ) : (
                        <p className="font-medium">{employeeData.gender}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="text-gray-500">Blood Group</Label>
                      {isEditingPersonal ? (
                        <Input value={employeeData.bloodGroup} />
                      ) : (
                        <p className="font-medium">{employeeData.bloodGroup}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="text-gray-500">Marital Status</Label>
                      {isEditingPersonal ? (
                        <Input value={employeeData.maritalStatus} />
                      ) : (
                        <p className="font-medium">{employeeData.maritalStatus}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="text-gray-500">Nationality</Label>
                      {isEditingPersonal ? (
                        <Input value={employeeData.nationality} />
                      ) : (
                        <p className="font-medium">{employeeData.nationality}</p>
                      )}
                    </div>
                  </div>

                  <Separator className="my-6" />
                  
                  <div>
                    <h3 className="font-medium mb-4 text-gray-700">Contact Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label className="text-gray-500">Email Address</Label>
                        {isEditingPersonal ? (
                          <Input value={employeeData.email} />
                        ) : (
                          <p className="font-medium">{employeeData.email}</p>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <Label className="text-gray-500">Phone Number</Label>
                        {isEditingPersonal ? (
                          <Input value={employeeData.phone} />
                        ) : (
                          <p className="font-medium">{employeeData.phone}</p>
                        )}
                      </div>
                      
                      <div className="space-y-2 md:col-span-2">
                        <Label className="text-gray-500">Current Address</Label>
                        {isEditingPersonal ? (
                          <Input value={employeeData.address} />
                        ) : (
                          <p className="font-medium">{employeeData.address}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  <Separator className="my-6" />

                  <div>
                    <h3 className="font-medium mb-4 text-gray-700">Government IDs</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label className="text-gray-500">Aadhaar Number</Label>
                        {isEditingPersonal ? (
                          <Input value={employeeData.aadharNumber} />
                        ) : (
                          <p className="font-medium">{employeeData.aadharNumber}</p>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <Label className="text-gray-500">PAN Number</Label>
                        {isEditingPersonal ? (
                          <Input value={employeeData.panNumber} />
                        ) : (
                          <p className="font-medium">{employeeData.panNumber}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Emergency Contact</CardTitle>
                    <Button variant="outline" size="sm">
                      <Edit size={16} className="mr-1" />
                      Edit
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label className="text-gray-500">Name</Label>
                      <p className="font-medium">{employeeData.emergencyContact.name}</p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="text-gray-500">Relationship</Label>
                      <p className="font-medium">{employeeData.emergencyContact.relationship}</p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="text-gray-500">Contact Number</Label>
                      <p className="font-medium">{employeeData.emergencyContact.phone}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Work Info Tab */}
            <TabsContent value="work" className="mt-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Employment Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label className="text-gray-500">Employee ID</Label>
                      <p className="font-medium">{employeeData.id}</p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="text-gray-500">Designation</Label>
                      <p className="font-medium">{employeeData.position}</p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="text-gray-500">Department</Label>
                      <p className="font-medium">{employeeData.department}</p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="text-gray-500">Team</Label>
                      <p className="font-medium">{employeeData.team}</p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="text-gray-500">Employment Type</Label>
                      <p className="font-medium">{employeeData.type}</p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="text-gray-500">Status</Label>
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-200">{employeeData.status}</Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="text-gray-500">Join Date</Label>
                      <p className="font-medium">{employeeData.joinDate}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <div className="flex justify-between">
                    <CardTitle>Education</CardTitle>
                    <Button variant="outline" size="sm">
                      <Edit size={16} className="mr-1" />
                      Edit
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {employeeData.education.map(edu => (
                    <div key={edu.id} className="flex gap-4 p-4 border rounded-md mb-4 bg-gray-50">
                      <div className="flex-none">
                        <div className="h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center">
                          <GraduationCap size={20} className="text-indigo-600" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h3 className="font-medium">{edu.degree} in {edu.field}</h3>
                          <span className="text-sm text-gray-500">{edu.year}</span>
                        </div>
                        <p className="text-gray-600 text-sm">{edu.institution}</p>
                        <p className="text-gray-500 text-sm mt-2">Score: {edu.score}</p>
                      </div>
                    </div>
                  ))}
                  
                  <Button variant="outline" className="w-full mt-2">
                    <PenTool size={16} className="mr-2" />
                    Add Education
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Finance Tab */}
            <TabsContent value="finance" className="mt-6 space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Bank Account Details</CardTitle>
                    <Button 
                      variant={isEditingBank ? "default" : "outline"} 
                      size="sm" 
                      className={isEditingBank ? "bg-indigo-600 hover:bg-indigo-700" : ""} 
                      onClick={() => setIsEditingBank(!isEditingBank)}
                    >
                      {isEditingBank ? (
                        <>
                          <BadgeCheck size={16} className="mr-1" />
                          Save Changes
                        </>
                      ) : (
                        <>
                          <Edit size={16} className="mr-1" />
                          Edit
                        </>
                      )}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-gray-500">Account Number</Label>
                      {isEditingBank ? (
                        <Input value={employeeData.bankDetails.accountNumber} type="password" />
                      ) : (
                        <p className="font-medium">{employeeData.bankDetails.accountNumber}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="text-gray-500">Bank Name</Label>
                      {isEditingBank ? (
                        <Input value={employeeData.bankDetails.bankName} />
                      ) : (
                        <p className="font-medium">{employeeData.bankDetails.bankName}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="text-gray-500">IFSC Code</Label>
                      {isEditingBank ? (
                        <Input value={employeeData.bankDetails.ifscCode} />
                      ) : (
                        <p className="font-medium">{employeeData.bankDetails.ifscCode}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="text-gray-500">Branch</Label>
                      {isEditingBank ? (
                        <Input value={employeeData.bankDetails.branch} />
                      ) : (
                        <p className="font-medium">{employeeData.bankDetails.branch}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex justify-center mt-6">
                    <div className="bg-yellow-50 text-yellow-800 border border-yellow-100 rounded-lg p-3 flex items-center gap-2 text-sm max-w-md">
                      <Shield size={16} className="text-yellow-600 flex-shrink-0" />
                      <span>Your bank details are encrypted and secured. Only authorized personnel from Finance can view the complete details.</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Tax Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-gray-500">PAN Number</Label>
                      <p className="font-medium">{employeeData.panNumber}</p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="text-gray-500">Tax Regime</Label>
                      <p className="font-medium">New Regime</p>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <Button variant="outline" size="sm">
                      <FileText size={16} className="mr-2" />
                      Download Form 16
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Documents Tab */}
            <TabsContent value="documents" className="mt-6 space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Personal Documents</CardTitle>
                    <Button variant="outline" size="sm">
                      <Upload size={16} className="mr-1" />
                      Upload
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="flex justify-between items-center p-4 border rounded-md">
                      <div className="flex items-center gap-3">
                        <FileText size={20} className="text-indigo-600" />
                        <div>
                          <h4 className="font-medium">Aadhaar Card</h4>
                          <p className="text-sm text-gray-500">Uploaded on Feb 15, 2022</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        Download
                      </Button>
                    </div>
                    
                    <div className="flex justify-between items-center p-4 border rounded-md">
                      <div className="flex items-center gap-3">
                        <FileText size={20} className="text-indigo-600" />
                        <div>
                          <h4 className="font-medium">PAN Card</h4>
                          <p className="text-sm text-gray-500">Uploaded on Feb 15, 2022</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        Download
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Professional Documents</CardTitle>
                    <Button variant="outline" size="sm">
                      <Upload size={16} className="mr-1" />
                      Upload
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="flex justify-between items-center p-4 border rounded-md">
                      <div className="flex items-center gap-3">
                        <FileText size={20} className="text-indigo-600" />
                        <div>
                          <h4 className="font-medium">Resume</h4>
                          <p className="text-sm text-gray-500">Uploaded on Jan 10, 2022</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        Download
                      </Button>
                    </div>
                    
                    <div className="flex justify-between items-center p-4 border rounded-md">
                      <div className="flex items-center gap-3">
                        <FileText size={20} className="text-indigo-600" />
                        <div>
                          <h4 className="font-medium">Previous Experience Certificate</h4>
                          <p className="text-sm text-gray-500">Uploaded on Jan 10, 2022</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        Download
                      </Button>
                    </div>
                    
                    <div className="flex justify-between items-center p-4 border rounded-md">
                      <div className="flex items-center gap-3">
                        <FileText size={20} className="text-indigo-600" />
                        <div>
                          <h4 className="font-medium">Educational Certificates</h4>
                          <p className="text-sm text-gray-500">Uploaded on Jan 10, 2022</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        Download
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      {/* Photo Upload Dialog */}
      <Dialog open={isEditingPhoto} onOpenChange={setIsEditingPhoto}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Profile Photo</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4 flex flex-col items-center">
            <Avatar className="h-32 w-32 border-4 border-white shadow-md">
              <AvatarFallback className="text-3xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
                {employeeData.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="photo">Upload new photo</Label>
              <Input id="photo" type="file" />
            </div>
          </div>
          <DialogFooter className="flex space-x-2 justify-end">
            <Button variant="outline" onClick={() => setIsEditingPhoto(false)}>Cancel</Button>
            <Button onClick={() => setIsEditingPhoto(false)}>Save Photo</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MyProfile;
