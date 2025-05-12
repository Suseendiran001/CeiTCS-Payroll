import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { UploadIcon, User } from 'lucide-react';
import { generateEmployeeId, previewEmployeeId, createEmployee, EmployeeType } from '@/lib/employeeService';

const formSchema = z.object({
  // Basic Information
  employeeId: z.string().optional(), // Auto-generated ID
  name: z.string().min(2, "Name must be at least 2 characters"),
  gender: z.enum(["Male", "Female", "Other"]),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  maritalStatus: z.enum(["Single", "Married", "Divorced", "Widowed"]),
  nationality: z.string().min(1, "Nationality is required"),
  
  // Contact Information
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  permanentAddress: z.string().min(5, "Permanent address is required"),
  currentAddress: z.string().min(5, "Current address is required"),
  
  // Emergency Contact
  emergencyContact: z.object({
    name: z.string().min(2, "Contact name is required"),
    relationship: z.string().min(2, "Relationship is required"),
    phone: z.string().min(10, "Phone number must be at least 10 digits"),
    address: z.string().optional(),
  }),
  
  // Employment Information
  employeeType: z.enum(["Permanent", "Contract", "Internship"]),
  position: z.string().min(2, "Position is required"),
  department: z.string().min(2, "Department is required"),
  reportingTo: z.string().optional(),
  joinDate: z.string(),
  
  // Education
  education: z.array(
    z.object({
      degree: z.string().min(2, "Degree name is required"),
      institution: z.string().min(2, "Institution name is required"),
      year: z.string().min(4, "Year is required"),
      percentage: z.string().optional(),
    })
  ).default([]),
  
  // Previous Employment
  previousEmployment: z.array(
    z.object({
      company: z.string().min(2, "Company name is required"),
      position: z.string().min(2, "Position is required"),
      startDate: z.string(),
      endDate: z.string(),
      reasonForLeaving: z.string().optional(),
    })
  ).default([]),
  
  // Banking Information
  bankDetails: z.object({
    bankName: z.string().min(2, "Bank name is required"),
    accountNumber: z.string().min(8, "Account number is required"),
    ifscCode: z.string().min(11, "IFSC code is required"),
    accountHolderName: z.string().min(2, "Account holder name is required"),
    branch: z.string().min(2, "Branch name is required"),
    uanNumber: z.string().optional(),
  }),
  
  // Document Uploads (these will be handled separately)
  documents: z.object({
    aadharCardUploaded: z.boolean().default(false),
    panCardUploaded: z.boolean().default(false),
    photoUploaded: z.boolean().default(false),
    aadharCardData: z.string().optional(),
    panCardData: z.string().optional(),
  }).optional(),
  
  // Add profilePicture field
  profilePicture: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const EmployeeForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [employeeTypeSelected, setEmployeeTypeSelected] = useState<EmployeeType | ''>('');
  const [generatedId, setGeneratedId] = useState('');
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      gender: 'Male',
      dateOfBirth: '',
      maritalStatus: 'Single',
      nationality: 'Indian',
      email: '',
      phone: '',
      permanentAddress: '',
      currentAddress: '',
      emergencyContact: {
        name: '',
        relationship: '',
        phone: '',
        address: '',
      },
      employeeType: 'Permanent',
      position: '',
      department: '',
      reportingTo: '',
      joinDate: new Date().toISOString().split('T')[0],
      education: [
        {
          degree: '',
          institution: '',
          year: '',
          percentage: '',
        }
      ],
      previousEmployment: [
        {
          company: '',
          position: '',
          startDate: '',
          endDate: '',
          reasonForLeaving: '',
        }
      ],
      bankDetails: {
        bankName: '',
        accountNumber: '',
        ifscCode: '',
        accountHolderName: '',
        branch: '',
        uanNumber: '',
      },
      documents: {
        aadharCardUploaded: false,
        panCardUploaded: false,
        photoUploaded: false,
      },
      profilePicture: '',
    },
  });

  // Generate ID when employee type changes
  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === 'employeeType') {
        const type = value.employeeType as EmployeeType;
        if (type && type !== employeeTypeSelected) {
          setEmployeeTypeSelected(type);
          const newId = previewEmployeeId(type);
          setGeneratedId(newId);
          form.setValue('employeeId', newId);
        }
      }
    });
    
    // Generate initial ID
    const initialType = form.getValues('employeeType') as EmployeeType;
    if (initialType && !employeeTypeSelected) {
      setEmployeeTypeSelected(initialType);
      const newId = previewEmployeeId(initialType);
      setGeneratedId(newId);
      form.setValue('employeeId', newId);
    }
    
    return () => subscription.unsubscribe();
  }, [form, employeeTypeSelected]);

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    
    try {
      // The createEmployee function will use generateEmployeeId to get a new ID 
      // and increment the counter only when the employee is actually saved
      const employee = await createEmployee({
        name: data.name,
        email: data.email,
        position: data.position,
        department: data.department,
        type: data.employeeType as EmployeeType,
        status: 'Active',
        joinDate: data.joinDate,
        profilePicture: data.profilePicture,
      });
      
      toast.success('Employee added successfully');
      toast.info(`Employee ID: ${employee.id}`);
      navigate('/employees');
    } catch (error) {
      toast.error('Error adding employee');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="rounded-lg border shadow-sm p-4">
        <div className="pt-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <Tabs defaultValue="personal" className="w-full">
                <TabsList className="grid grid-cols-6 mb-4">
                  <TabsTrigger value="personal">Personal Info</TabsTrigger>
                  <TabsTrigger value="contact">Contact Info</TabsTrigger>
                  <TabsTrigger value="employment">Employment</TabsTrigger>
                  <TabsTrigger value="education">Education & Work</TabsTrigger>
                  <TabsTrigger value="banking">Banking</TabsTrigger>
                  <TabsTrigger value="documents">Documents</TabsTrigger>
                </TabsList>
                
                <TabsContent value="personal" className="space-y-4">
                  <div className="grid gap-6">
                    <div className="flex items-start gap-6">
                      {/* Profile Picture - Smaller and on the left */}
                      <div className="flex-shrink-0">
                        <FormField
                          control={form.control}
                          name="profilePicture"
                          render={({ field }) => (
                            <FormItem>
                              <div className="h-24 w-24 rounded-full relative overflow-hidden border-2 border-gray-200 cursor-pointer group">
                                <label className="cursor-pointer w-full h-full block">
                                  {field.value ? (
                                    <div className="w-full h-full relative">
                                      <img 
                                        src={field.value} 
                                        alt="Profile" 
                                        className="w-full h-full object-cover"
                                      />
                                      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <div className="flex flex-col items-center gap-2">
                                          <button
                                            type="button"
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              const input = e.currentTarget.closest('label')?.querySelector('input[type="file"]') as HTMLInputElement | null;
                                              if (input) {
                                                input.click();
                                              }
                                            }}
                                            className="bg-blue-500 hover:bg-blue-600 text-white p-1 rounded-full flex items-center justify-center w-7 h-7 shadow-sm"
                                          >
                                            <UploadIcon size={14} />
                                          </button>
                                          <button
                                            type="button"
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              field.onChange('');
                                            }}
                                            className="bg-red-500 hover:bg-red-600 text-white p-1 rounded-full flex items-center justify-center w-7 h-7 shadow-sm"
                                          >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                              <path d="M3 6h18"></path>
                                              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                                              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                                              <line x1="10" y1="11" x2="10" y2="17"></line>
                                              <line x1="14" y1="11" x2="14" y2="17"></line>
                                            </svg>
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400 group-hover:bg-gray-200 transition-colors">
                                      <User size={32} className="group-hover:opacity-50 transition-opacity" />
                                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <div className="bg-blue-500 hover:bg-blue-600 text-white p-1 rounded-full shadow-sm flex items-center justify-center w-7 h-7">
                                          <UploadIcon size={14} />
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                  <Input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => {
                                      const file = e.target.files?.[0];
                                      if (file) {
                                        const reader = new FileReader();
                                        reader.onload = (event) => {
                                          field.onChange(event.target?.result as string);
                                        };
                                        reader.readAsDataURL(file);
                                      }
                                    }}
                                  />
                                </label>
                              </div>
                            </FormItem>
                          )}
                        />
                      </div>

                      {/* Employee info fields - next to the profile picture */}
                      <div className="flex-1 grid gap-4 grid-cols-1">
                        <div className="grid gap-4 grid-cols-2">
                          <FormField
                            control={form.control}
                            name="employeeType"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-sm">Employee Type</FormLabel>
                                <FormControl>
                                  <Select 
                                    onValueChange={field.onChange} 
                                    defaultValue={field.value}
                                  >
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="Permanent">Permanent (P-series)</SelectItem>
                                      <SelectItem value="Contract">Contract (C-series)</SelectItem>
                                      <SelectItem value="Internship">Internship (I-series)</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </FormControl>
                                <FormDescription className="text-xs">
                                  Employee type determines benefits
                                </FormDescription>
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="employeeId"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-sm">Employee ID</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="Auto-generated" 
                                    {...field} 
                                    disabled 
                                    className={
                                      field.value?.startsWith('P') ? 'border-blue-500 bg-blue-50' :
                                      field.value?.startsWith('C') ? 'border-purple-500 bg-purple-50' :
                                      field.value?.startsWith('I') ? 'border-orange-500 bg-orange-50' :
                                      ''
                                    }
                                  />
                                </FormControl>
                                <FormDescription className="text-xs">
                                  Auto-generated based on type
                                </FormDescription>
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm">Full Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter full name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    
                    <div className="grid gap-4 grid-cols-2">
                      <FormField
                        control={form.control}
                        name="gender"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm">Gender</FormLabel>
                            <FormControl>
                              <div className="flex gap-1">
                                <label 
                                  className={`flex flex-1 items-center justify-center gap-1 py-1.5 px-1.5 rounded-md border cursor-pointer transition-all text-xs ${
                                    field.value === 'Male' 
                                      ? 'bg-blue-50 border-blue-500 text-blue-700 font-medium'
                                      : 'hover:bg-gray-50'
                                  }`}
                                >
                                  <input
                                    type="radio"
                                    value="Male"
                                    className="sr-only"
                                    checked={field.value === 'Male'}
                                    onChange={() => field.onChange('Male')}
                                  />
                                  <span className="text-sm">♂</span>
                                  <span>Male</span>
                                </label>
                                
                                <label 
                                  className={`flex flex-1 items-center justify-center gap-1 py-1.5 px-1.5 rounded-md border cursor-pointer transition-all text-xs ${
                                    field.value === 'Female' 
                                      ? 'bg-pink-50 border-pink-500 text-pink-700 font-medium'
                                      : 'hover:bg-gray-50'
                                  }`}
                                >
                                  <input
                                    type="radio"
                                    value="Female"
                                    className="sr-only"
                                    checked={field.value === 'Female'}
                                    onChange={() => field.onChange('Female')}
                                  />
                                  <span className="text-sm">♀</span>
                                  <span>Female</span>
                                </label>
                                
                                <label 
                                  className={`flex flex-1 items-center justify-center gap-1 py-1.5 px-1.5 rounded-md border cursor-pointer transition-all text-xs ${
                                    field.value === 'Other' 
                                      ? 'bg-purple-50 border-purple-500 text-purple-700 font-medium'
                                      : 'hover:bg-gray-50'
                                  }`}
                                >
                                  <input
                                    type="radio"
                                    value="Other"
                                    className="sr-only"
                                    checked={field.value === 'Other'}
                                    onChange={() => field.onChange('Other')}
                                  />
                                  <span className="text-sm">⊕</span>
                                  <span>Other</span>
                                </label>
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="dateOfBirth"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm">Date of Birth</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="nationality"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm">Nationality</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter nationality" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="maritalStatus"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm">Marital Status</FormLabel>
                            <FormControl>
                              <Select 
                                onValueChange={field.onChange} 
                                defaultValue={field.value}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Single">Single</SelectItem>
                                  <SelectItem value="Married">Married</SelectItem>
                                  <SelectItem value="Divorced">Divorced</SelectItem>
                                  <SelectItem value="Widowed">Widowed</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="contact" className="space-y-4">
                  <div className="grid gap-6">
                    <div className="grid gap-4 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="employee@example.com" {...field} />
                            </FormControl>
                            <FormDescription>
                              Login credentials will be sent to this email address
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input placeholder="+91 9876543210" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="permanentAddress"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Permanent Address</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Enter permanent address"
                              className="min-h-[100px]"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="currentAddress"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Current Address</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Enter current address"
                              className="min-h-[100px]"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="border-t pt-6">
                      <h3 className="text-lg font-medium mb-4">Emergency Contact</h3>
                      <div className="grid gap-4 md:grid-cols-2">
                        <FormField
                          control={form.control}
                          name="emergencyContact.name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Contact Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Full name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="emergencyContact.relationship"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Relationship</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g. Spouse, Parent, Sibling" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="emergencyContact.phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Contact Number</FormLabel>
                              <FormControl>
                                <Input placeholder="+91 9876543210" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="emergencyContact.address"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Contact Address</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="Enter address (optional)"
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="employment" className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="position"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Position/Title</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. Software Engineer" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="department"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Department</FormLabel>
                          <FormControl>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select department" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Engineering">Engineering</SelectItem>
                                <SelectItem value="Design">Design</SelectItem>
                                <SelectItem value="Product">Product</SelectItem>
                                <SelectItem value="Finance">Finance</SelectItem>
                                <SelectItem value="Human Resources">Human Resources</SelectItem>
                                <SelectItem value="Analytics">Analytics</SelectItem>
                                <SelectItem value="Marketing">Marketing</SelectItem>
                                <SelectItem value="Sales">Sales</SelectItem>
                                <SelectItem value="Customer Support">Customer Support</SelectItem>
                                <SelectItem value="Administration">Administration</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="reportingTo"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Reporting To</FormLabel>
                          <FormControl>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select reporting manager" />
                              </SelectTrigger>
                              <SelectContent>
                                {/* In a real app, this would be populated from API */}
                                <SelectItem value="Ajay Kumar">Ajay Kumar - Engineering</SelectItem>
                                <SelectItem value="Priya Singh">Priya Singh - Design</SelectItem>
                                <SelectItem value="Rahul Sharma">Rahul Sharma - Product</SelectItem>
                                <SelectItem value="Meera Patel">Meera Patel - Finance</SelectItem>
                                <SelectItem value="Kiran Rao">Kiran Rao - HR</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="joinDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Date of Joining</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                </TabsContent>
                
                <TabsContent value="education" className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium">Education Qualifications</h3>
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          const currentEducation = form.getValues('education');
                          form.setValue('education', [
                            ...currentEducation,
                            { degree: '', institution: '', year: '', percentage: '' }
                          ]);
                        }}
                      >
                        Add Education
                      </Button>
                    </div>
                    
                    {form.watch('education').map((_, index) => (
                      <div key={index} className="p-4 border rounded-md">
                        <div className="flex justify-between items-center mb-4">
                          <h4 className="font-medium">Qualification #{index + 1}</h4>
                          {index > 0 && (
                            <Button 
                              type="button" 
                              variant="ghost" 
                              size="sm"
                              className="text-red-500 hover:text-red-700 hover:bg-red-50"
                              onClick={() => {
                                const currentEducation = form.getValues('education');
                                form.setValue(
                                  'education', 
                                  currentEducation.filter((_, i) => i !== index)
                                );
                              }}
                            >
                              Remove
                            </Button>
                          )}
                        </div>
                        
                        <div className="grid gap-4 md:grid-cols-2">
                          <FormField
                            control={form.control}
                            name={`education.${index}.degree`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Degree/Diploma</FormLabel>
                                <FormControl>
                                  <Input placeholder="e.g. B.Tech, MBA" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name={`education.${index}.institution`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Institution/University</FormLabel>
                                <FormControl>
                                  <Input placeholder="Name of institution" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name={`education.${index}.year`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Year of Graduation</FormLabel>
                                <FormControl>
                                  <Input placeholder="e.g. 2020" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name={`education.${index}.percentage`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Percentage/CGPA</FormLabel>
                                <FormControl>
                                  <Input placeholder="e.g. 85% or 8.5" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="space-y-4 border-t pt-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium">Previous Employment</h3>
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          const currentEmployment = form.getValues('previousEmployment');
                          form.setValue('previousEmployment', [
                            ...currentEmployment,
                            { company: '', position: '', startDate: '', endDate: '', reasonForLeaving: '' }
                          ]);
                        }}
                      >
                        Add Employment
                      </Button>
                    </div>
                    
                    {form.watch('previousEmployment').map((_, index) => (
                      <div key={index} className="p-4 border rounded-md">
                        <div className="flex justify-between items-center mb-4">
                          <h4 className="font-medium">Employment #{index + 1}</h4>
                          {index > 0 && (
                            <Button 
                              type="button" 
                              variant="ghost" 
                              size="sm"
                              className="text-red-500 hover:text-red-700 hover:bg-red-50"
                              onClick={() => {
                                const currentEmployment = form.getValues('previousEmployment');
                                form.setValue(
                                  'previousEmployment', 
                                  currentEmployment.filter((_, i) => i !== index)
                                );
                              }}
                            >
                              Remove
                            </Button>
                          )}
                        </div>
                        
                        <div className="grid gap-4 md:grid-cols-2">
                          <FormField
                            control={form.control}
                            name={`previousEmployment.${index}.company`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Company Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="Company name" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name={`previousEmployment.${index}.position`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Position Held</FormLabel>
                                <FormControl>
                                  <Input placeholder="e.g. Software Engineer" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name={`previousEmployment.${index}.startDate`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Start Date</FormLabel>
                                <FormControl>
                                  <Input type="date" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name={`previousEmployment.${index}.endDate`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>End Date</FormLabel>
                                <FormControl>
                                  <Input type="date" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name={`previousEmployment.${index}.reasonForLeaving`}
                            render={({ field }) => (
                              <FormItem className="md:col-span-2">
                                <FormLabel>Reason for Leaving</FormLabel>
                                <FormControl>
                                  <Textarea 
                                    placeholder="Briefly explain reason for leaving"
                                    {...field} 
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="banking" className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="bankDetails.bankName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Bank Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Name of bank" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="bankDetails.accountHolderName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Account Holder's Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Name as per bank records" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="bankDetails.accountNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Account Number</FormLabel>
                          <FormControl>
                            <Input placeholder="Bank account number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="bankDetails.ifscCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>IFSC Code</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="11-character IFSC code" 
                              {...field} 
                              className="uppercase"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="bankDetails.branch"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Bank Branch</FormLabel>
                          <FormControl>
                            <Input placeholder="Branch name and location" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="bankDetails.uanNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>UAN Number</FormLabel>
                          <FormControl>
                            <Input placeholder="Universal Account Number (if existing)" {...field} />
                          </FormControl>
                          <FormDescription>
                            Provide if employee has an existing UAN from previous employment
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </TabsContent>
                
                <TabsContent value="documents" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 border rounded-md">
                      <h3 className="text-base font-medium mb-2">Aadhar Card</h3>
                      <div className="flex flex-col gap-2">
                        <div className="w-full border border-dashed border-gray-300 rounded-md overflow-hidden">
                          {form.watch('documents.aadharCardData') ? (
                            <div className="relative">
                              <img 
                                src={form.watch('documents.aadharCardData')} 
                                alt="Aadhar Card" 
                                className="w-full h-48 object-contain"
                              />
                              <button 
                                type="button"
                                className="absolute top-1 right-1 bg-red-500 rounded-full p-1 text-white hover:bg-red-600 w-6 h-6 flex items-center justify-center shadow-sm"
                                onClick={() => {
                                  form.setValue('documents.aadharCardData', '');
                                  form.setValue('documents.aadharCardUploaded', false);
                                }}
                              >
                                ✕
                              </button>
                            </div>
                          ) : (
                            <div className="h-48 flex items-center justify-center p-2 bg-gray-50">
                              <div className="flex flex-col items-center gap-3">
                                <UploadIcon size={24} className="text-gray-400" />
                                <input
                                  type="file"
                                  id="aadhar-upload"
                                  accept="image/*"
                                  className="hidden"
                                  onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                      const reader = new FileReader();
                                      reader.onload = (event) => {
                                        form.setValue('documents.aadharCardData', event.target?.result as string);
                                        form.setValue('documents.aadharCardUploaded', true);
                                      };
                                      reader.readAsDataURL(file);
                                    }
                                  }}
                                />
                                <Button 
                                  type="button" 
                                  variant="outline"
                                  size="sm"
                                  onClick={() => {
                                    document.getElementById('aadhar-upload')?.click();
                                  }}
                                >
                                  Upload Aadhar
                                </Button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-3 border rounded-md">
                      <h3 className="text-base font-medium mb-2">PAN Card</h3>
                      <div className="flex flex-col gap-2">
                        <div className="w-full border border-dashed border-gray-300 rounded-md overflow-hidden">
                          {form.watch('documents.panCardData') ? (
                            <div className="relative">
                              <img 
                                src={form.watch('documents.panCardData')} 
                                alt="PAN Card" 
                                className="w-full h-48 object-contain"
                              />
                              <button 
                                type="button"
                                className="absolute top-1 right-1 bg-red-500 rounded-full p-1 text-white hover:bg-red-600 w-6 h-6 flex items-center justify-center shadow-sm"
                                onClick={() => {
                                  form.setValue('documents.panCardData', '');
                                  form.setValue('documents.panCardUploaded', false);
                                }}
                              >
                                ✕
                              </button>
                            </div>
                          ) : (
                            <div className="h-48 flex items-center justify-center p-2 bg-gray-50">
                              <div className="flex flex-col items-center gap-3">
                                <UploadIcon size={24} className="text-gray-400" />
                                <input
                                  type="file"
                                  id="pan-upload"
                                  accept="image/*"
                                  className="hidden"
                                  onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                      const reader = new FileReader();
                                      reader.onload = (event) => {
                                        form.setValue('documents.panCardData', event.target?.result as string);
                                        form.setValue('documents.panCardUploaded', true);
                                      };
                                      reader.readAsDataURL(file);
                                    }
                                  }}
                                />
                                <Button 
                                  type="button" 
                                  variant="outline"
                                  size="sm"
                                  onClick={() => {
                                    document.getElementById('pan-upload')?.click();
                                  }}
                                >
                                  Upload PAN
                                </Button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="col-span-2 p-3 bg-blue-50 rounded-md border border-blue-200">
                      <p className="text-sm text-blue-700">
                        All uploaded documents will be securely stored and verified by the HR department. 
                      </p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
              
              <div className="flex justify-end gap-4 pt-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => navigate('/employees')}
                >
                  Cancel
                </Button>
                <Button type="submit" className="bg-primary-gradient" disabled={loading}>
                  {loading ? 'Saving...' : 'Save Employee'}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default EmployeeForm;
