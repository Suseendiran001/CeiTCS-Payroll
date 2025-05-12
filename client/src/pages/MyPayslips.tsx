import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Download, 
  FileText, 
  Printer, 
  Mail, 
  Calendar, 
  ArrowDown, 
  CreditCard,
  Building,
  User,
  ArrowUpDown,
  Wallet,
  BarChart3,
  TrendingUp,
  ReceiptText,
  DollarSign
} from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  PieChart, 
  Pie, 
  Cell, 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';

const MyPayslips = () => {
  // Mock data - would come from API in real app
  const [selectedYear, setSelectedYear] = useState('2025');
  const [selectedPayslip, setSelectedPayslip] = useState(null);
  
  const years = ['2025', '2024', '2023', '2022'];
  
  const payslips = [
    { id: 1, month: 'April', year: '2025', netSalary: '₹75,000', grossSalary: '₹95,000', status: 'Paid', paidOn: '30 Apr 2025' },
    { id: 2, month: 'March', year: '2025', netSalary: '₹75,000', grossSalary: '₹95,000', status: 'Paid', paidOn: '31 Mar 2025' },
    { id: 3, month: 'February', year: '2025', netSalary: '₹72,500', grossSalary: '₹92,000', status: 'Paid', paidOn: '28 Feb 2025' },
    { id: 4, month: 'January', year: '2025', netSalary: '₹72,500', grossSalary: '₹92,000', status: 'Paid', paidOn: '31 Jan 2025' },
    { id: 5, month: 'December', year: '2024', netSalary: '₹72,500', grossSalary: '₹92,000', status: 'Paid', paidOn: '31 Dec 2024' }
  ];

  const employeeInfo = {
    name: 'John Doe',
    employeeId: 'EMP001',
    designation: 'Software Engineer',
    department: 'Engineering',
    joinDate: '15 Jan 2022',
    bankAccount: 'XXXX XXXX XXXX 1234',
    bankName: 'HDFC Bank',
    pfNumber: 'PF0012345678',
    uan: 'UAN1012345678',
    panNumber: 'ABCDE1234F'
  };

  const payslipDetails = {
    id: 1,
    employeeName: 'John Doe',
    employeeId: 'EMP001',
    designation: 'Software Engineer',
    department: 'Engineering',
    month: 'April',
    year: '2025',
    payPeriod: '01 Apr 2025 - 30 Apr 2025',
    paymentDate: '30 Apr 2025',
    earnings: [
      { name: 'Basic Salary', amount: '₹50,000' },
      { name: 'House Rent Allowance', amount: '₹20,000' },
      { name: 'Special Allowance', amount: '₹15,000' },
      { name: 'Conveyance Allowance', amount: '₹5,000' },
      { name: 'Medical Allowance', amount: '₹5,000' }
    ],
    totalEarnings: '₹95,000',
    deductions: [
      { name: 'Income Tax', amount: '₹10,000' },
      { name: 'Provident Fund', amount: '₹6,000' },
      { name: 'Professional Tax', amount: '₹200' },
      { name: 'Health Insurance', amount: '₹3,800' }
    ],
    totalDeductions: '₹20,000',
    netSalary: '₹75,000',
    bankDetails: {
      accountNumber: 'XXXX XXXX XXXX 1234',
      bankName: 'HDFC Bank',
      ifscCode: 'HDFC0001234'
    }
  };

  // Earnings chart data - would come from API in real app
  const earningsChartData = [
    { month: 'Jan', amount: 92000 },
    { month: 'Feb', amount: 92000 },
    { month: 'Mar', amount: 95000 },
    { month: 'Apr', amount: 95000 }
  ];

  // Deductions chart data
  const deductionsChartData = [
    { month: 'Jan', amount: 19500 },
    { month: 'Feb', amount: 19500 },
    { month: 'Mar', amount: 20000 },
    { month: 'Apr', amount: 20000 }
  ]; 

  // Net salary chart data
  const netSalaryChartData = [
    { month: 'Jan', amount: 72500 },
    { month: 'Feb', amount: 72500 },
    { month: 'Mar', amount: 75000 },
    { month: 'Apr', amount: 75000 }
  ];

  // Earnings breakdown pie chart data
  const earningsBreakdownData = [
    { name: 'Basic Salary', value: 50000, color: '#5a67d8' },
    { name: 'HRA', value: 20000, color: '#48bb78' },
    { name: 'Special Allowance', value: 15000, color: '#f6ad55' },
    { name: 'Conveyance', value: 5000, color: '#fc8181' },
    { name: 'Medical', value: 5000, color: '#90cdf4' },
  ];

  // Deductions breakdown pie chart data
  const deductionsBreakdownData = [
    { name: 'Income Tax', value: 10000, color: '#fc8181' },
    { name: 'Provident Fund', value: 6000, color: '#f6ad55' },
    { name: 'Health Insurance', value: 3800, color: '#48bb78' },
    { name: 'Professional Tax', value: 200, color: '#90cdf4' },
  ];

  const openPayslip = (payslip) => {
    setSelectedPayslip(payslip);
  };

  // Function to format currency
  const formatCurrency = (value) => {
    return `₹${value.toLocaleString()}`;
  };
  return (
    <div className="space-y-6">
      {/* Header with gradient background */}
      <div className="bg-gradient-to-r from-indigo-600 to-blue-500 rounded-lg p-6 shadow-md text-white">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <ReceiptText size={24} className="text-white/80" />
              My Payslips
            </h1>
            <p className="opacity-80">Access and download your salary statements</p>
          </div>
          <div className="flex items-center gap-2">
            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger className="w-[120px] bg-white/20 border-white/20 text-white">
                <SelectValue placeholder="Select Year" />
              </SelectTrigger>
              <SelectContent>
                {years.map(year => (
                  <SelectItem key={year} value={year}>{year}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-indigo-50 to-white shadow hover:shadow-md transition-shadow">
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500">Latest Net Salary</p>
                <h3 className="text-2xl font-bold text-indigo-700">₹75,000</h3>
                <p className="text-xs text-indigo-500 mt-1">April 2025</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                <Wallet className="h-5 w-5 text-indigo-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-white shadow hover:shadow-md transition-shadow">
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500">YTD Earnings</p>
                <h3 className="text-2xl font-bold text-green-700">₹3,74,000</h3>
                <p className="text-xs text-green-500 mt-1">Jan - Apr 2025</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-white shadow hover:shadow-md transition-shadow">
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500">YTD Deductions</p>
                <h3 className="text-2xl font-bold text-blue-700">₹79,000</h3>
                <p className="text-xs text-blue-500 mt-1">Jan - Apr 2025</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                <ArrowDown className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Employee Information Card */}
        <Card className="lg:col-span-1 shadow hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <User size={18} className="text-gray-500" />
              Employee Information
            </CardTitle>
          </CardHeader>
          <CardContent className="pb-6">
            <div className="flex flex-col items-center text-center mb-6">
              <Avatar className="h-20 w-20 mb-4 border-2 border-indigo-100 bg-gradient-to-r from-indigo-600 to-blue-500">
                <AvatarFallback className="text-xl text-white">{employeeInfo.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <h3 className="font-medium text-lg">{employeeInfo.name}</h3>
              <p className="text-gray-500 text-sm">{employeeInfo.designation}</p>
              <Badge className="mt-2 bg-indigo-100 text-indigo-700 hover:bg-indigo-200 border-none">
                {employeeInfo.department}
              </Badge>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2 border-b">
                <span className="text-sm text-gray-500">Employee ID</span>
                <span className="font-medium">{employeeInfo.employeeId}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b">
                <span className="text-sm text-gray-500">Join Date</span>
                <span className="font-medium">{employeeInfo.joinDate}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b">
                <span className="text-sm text-gray-500">Bank Account</span>
                <span className="font-medium">{employeeInfo.bankAccount}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b">
                <span className="text-sm text-gray-500">Bank Name</span>
                <span className="font-medium">{employeeInfo.bankName}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b">
                <span className="text-sm text-gray-500">PF Number</span>
                <span className="font-medium">{employeeInfo.pfNumber}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b">
                <span className="text-sm text-gray-500">UAN</span>
                <span className="font-medium">{employeeInfo.uan}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-sm text-gray-500">PAN Number</span>
                <span className="font-medium">{employeeInfo.panNumber}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Salary Breakdown and Charts */}
        <Card className="lg:col-span-2 shadow hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <BarChart3 size={18} className="text-gray-500" />
              Latest Salary Breakdown
            </CardTitle>
            <CardDescription>Showing breakdown for April 2025</CardDescription>
          </CardHeader>
          <CardContent className="pb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Earnings Breakdown Pie Chart */}
              <div>
                <h4 className="font-medium text-sm mb-3 flex items-center gap-1.5">
                  <TrendingUp size={16} className="text-green-600" />
                  Earnings Breakdown
                </h4>
                <div className="h-[220px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={earningsBreakdownData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        innerRadius={40}
                        paddingAngle={2}
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        labelLine={false}
                      >
                        {earningsBreakdownData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value) => [`₹${value.toLocaleString()}`, 'Amount']}
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-3 text-center">
                  <span className="text-sm text-gray-500">Total Earnings: </span>
                  <span className="font-semibold text-green-700">{payslipDetails.totalEarnings}</span>
                </div>
              </div>

              {/* Deductions Breakdown Pie Chart */}
              <div>
                <h4 className="font-medium text-sm mb-3 flex items-center gap-1.5">
                  <ArrowDown size={16} className="text-red-600" />
                  Deductions Breakdown
                </h4>
                <div className="h-[220px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={deductionsBreakdownData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        innerRadius={40}
                        paddingAngle={2}
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        labelLine={false}
                      >
                        {deductionsBreakdownData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value) => [`₹${value.toLocaleString()}`, 'Amount']}
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-3 text-center">
                  <span className="text-sm text-gray-500">Total Deductions: </span>
                  <span className="font-semibold text-red-700">{payslipDetails.totalDeductions}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl flex justify-between items-center">
              <div>
                <span className="text-gray-600 text-sm">Net Salary:</span>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-700 to-blue-700 bg-clip-text text-transparent">
                  {payslipDetails.netSalary}
                </h3>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="border-indigo-200 hover:bg-indigo-100">
                    View Full Payslip
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Payslip - {payslipDetails.month} {payslipDetails.year}</DialogTitle>
                  </DialogHeader>
                  <div className="mt-4 space-y-6 print:space-y-4 print:text-black">
                    {/* Company Header */}
                    <div className="flex justify-between items-center border-b pb-4">
                      <div>
                        <h2 className="text-2xl font-bold text-primary">CeiTCS</h2>
                        <p className="text-sm text-gray-500">123 Tech Park, Bangalore - 560001</p>
                      </div>
                      <div className="text-right">
                        <h3 className="font-bold">Salary Slip</h3>
                        <p className="text-sm text-gray-500">For the month of {payslipDetails.month} {payslipDetails.year}</p>
                      </div>
                    </div>

                    {/* Employee Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-b pb-4">
                      <div>
                        <h3 className="font-medium">Employee Details</h3>
                        <div className="grid grid-cols-2 gap-2 mt-2">
                          <div className="text-sm text-gray-500">Name:</div>
                          <div className="text-sm font-medium">{payslipDetails.employeeName}</div>
                          
                          <div className="text-sm text-gray-500">Employee ID:</div>
                          <div className="text-sm font-medium">{payslipDetails.employeeId}</div>
                          
                          <div className="text-sm text-gray-500">Designation:</div>
                          <div className="text-sm font-medium">{payslipDetails.designation}</div>
                          
                          <div className="text-sm text-gray-500">Department:</div>
                          <div className="text-sm font-medium">{payslipDetails.department}</div>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-medium">Payment Details</h3>
                        <div className="grid grid-cols-2 gap-2 mt-2">
                          <div className="text-sm text-gray-500">Pay Period:</div>
                          <div className="text-sm font-medium">{payslipDetails.payPeriod}</div>
                          
                          <div className="text-sm text-gray-500">Payment Date:</div>
                          <div className="text-sm font-medium">{payslipDetails.paymentDate}</div>
                          
                          <div className="text-sm text-gray-500">Bank Name:</div>
                          <div className="text-sm font-medium">{payslipDetails.bankDetails.bankName}</div>
                          
                          <div className="text-sm text-gray-500">Account Number:</div>
                          <div className="text-sm font-medium">{payslipDetails.bankDetails.accountNumber}</div>
                        </div>
                      </div>
                    </div>

                    {/* Earnings and Deductions */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="font-medium mb-2">Earnings</h3>
                        <div className="space-y-1">
                          {payslipDetails.earnings.map((item, index) => (
                            <div key={index} className="flex justify-between py-1.5 border-b text-sm">
                              <span>{item.name}</span>
                              <span className="font-medium">{item.amount}</span>
                            </div>
                          ))}
                          <div className="flex justify-between py-2 font-bold">
                            <span>Total Earnings</span>
                            <span>{payslipDetails.totalEarnings}</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-medium mb-2">Deductions</h3>
                        <div className="space-y-1">
                          {payslipDetails.deductions.map((item, index) => (
                            <div key={index} className="flex justify-between py-1.5 border-b text-sm">
                              <span>{item.name}</span>
                              <span className="font-medium">{item.amount}</span>
                            </div>
                          ))}
                          <div className="flex justify-between py-2 font-bold">
                            <span>Total Deductions</span>
                            <span>{payslipDetails.totalDeductions}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Net Salary */}
                    <div className="bg-gray-50 p-4 rounded-md">
                      <div className="flex justify-between items-center">
                        <span className="font-bold">Net Salary</span>
                        <span className="font-bold text-xl">{payslipDetails.netSalary}</span>
                      </div>
                    </div>
                    
                    {/* Footer Note */}
                    <div className="text-sm text-gray-500 border-t pt-4">
                      <p>This is a computer-generated payslip and does not require a signature.</p>
                      <p>For any queries, please contact HR at hr@ceitcs.com</p>
                    </div>
                  </div>
                  <div className="flex justify-between mt-6">
                    <Button variant="outline" className="flex items-center gap-2" onClick={() => window.print()}>
                      <Printer size={16} />
                      Print
                    </Button>
                    <Button className="flex items-center gap-2">
                      <Download size={16} />
                      Download PDF
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payslips List with enhanced styling */}
      <Card className="shadow hover:shadow-md transition-shadow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText size={18} className="text-gray-500" />
            Payslip History
          </CardTitle>
          <CardDescription>Showing payslips for {selectedYear}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader className="bg-gray-50">
                <TableRow>
                  <TableHead>Month</TableHead>
                  <TableHead>Pay Period</TableHead>
                  <TableHead>Net Salary</TableHead>
                  <TableHead>Gross Salary</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payslips.filter(p => p.year === selectedYear).map(payslip => (
                  <TableRow key={payslip.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium">{payslip.month} {payslip.year}</TableCell>
                    <TableCell>01 {payslip.month.substring(0, 3)} - {payslip.paidOn}</TableCell>
                    <TableCell className="font-semibold">{payslip.netSalary}</TableCell>
                    <TableCell>{payslip.grossSalary}</TableCell>
                    <TableCell>
                      <Badge className="bg-green-100 text-green-800 border-none">
                        {payslip.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => openPayslip(payslip)}
                              className="h-8 w-8 hover:bg-gray-100"
                            >
                              <FileText size={16} />
                            </Button>
                          </DialogTrigger>
                          {/* Dialog content same as above */}
                        </Dialog>
                        
                        <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-gray-100">
                          <Download size={16} />
                        </Button>
                        
                        <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-gray-100">
                          <Mail size={16} />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      
      {/* Yearly Summary with Charts */}
      <Card className="shadow hover:shadow-md transition-shadow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 size={18} className="text-gray-500" />
            Yearly Salary Summary - {selectedYear}
          </CardTitle>
          <CardDescription>Earnings and deductions analysis</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="earnings">
            <TabsList className="w-full mb-4 grid grid-cols-3">
              <TabsTrigger value="earnings" className="flex-1">Earnings</TabsTrigger>
              <TabsTrigger value="deductions" className="flex-1">Deductions</TabsTrigger>
              <TabsTrigger value="net" className="flex-1">Net Salary</TabsTrigger>
            </TabsList>
            
            <TabsContent value="earnings">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={earningsChartData}
                    margin={{ top: 10, right: 30, left: 20, bottom: 30 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis 
                      dataKey="month" 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12 }}
                      dy={10}
                    />
                    <YAxis 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12 }}
                      tickFormatter={(value) => `₹${(value / 1000)}k`}
                    />
                    <Tooltip 
                      formatter={(value) => [`₹${value.toLocaleString()}`, 'Gross Earnings']}
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="amount" 
                      name="Gross Earnings"
                      stroke="#48bb78" 
                      strokeWidth={3}
                      activeDot={{ r: 6, fill: '#48bb78' }}
                      dot={{ r: 4, fill: '#48bb78' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
            
            <TabsContent value="deductions">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={deductionsChartData}
                    margin={{ top: 10, right: 30, left: 20, bottom: 30 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis 
                      dataKey="month" 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12 }}
                      dy={10}
                    />
                    <YAxis 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12 }}
                      tickFormatter={(value) => `₹${(value / 1000)}k`}
                    />
                    <Tooltip 
                      formatter={(value) => [`₹${value.toLocaleString()}`, 'Total Deductions']}
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="amount" 
                      name="Total Deductions"
                      stroke="#fc8181" 
                      strokeWidth={3}
                      activeDot={{ r: 6, fill: '#fc8181' }}
                      dot={{ r: 4, fill: '#fc8181' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
            
            <TabsContent value="net">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={netSalaryChartData}
                    margin={{ top: 10, right: 30, left: 20, bottom: 30 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis 
                      dataKey="month" 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12 }}
                      dy={10}
                    />
                    <YAxis 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12 }}
                      tickFormatter={(value) => `₹${(value / 1000)}k`}
                    />
                    <Tooltip 
                      formatter={(value) => [`₹${value.toLocaleString()}`, 'Net Salary']}
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="amount" 
                      name="Net Salary"
                      stroke="#5a67d8" 
                      strokeWidth={3}
                      activeDot={{ r: 6, fill: '#5a67d8' }}
                      dot={{ r: 4, fill: '#5a67d8' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="border border-indigo-100 bg-indigo-50/50">
              <CardContent className="pt-6">
                <div className="text-center">
                  <h3 className="text-xl font-bold text-indigo-700">₹9,00,000</h3>
                  <p className="text-gray-500 flex items-center justify-center gap-1.5 mt-1">
                    <TrendingUp size={14} className="text-indigo-600" />
                    Total Earnings (YTD)
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border border-red-100 bg-red-50/50">
              <CardContent className="pt-6">
                <div className="text-center">
                  <h3 className="text-xl font-bold text-red-700">₹1,92,000</h3>
                  <p className="text-gray-500 flex items-center justify-center gap-1.5 mt-1">
                    <ArrowDown size={14} className="text-red-600" />
                    Total Deductions (YTD)
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border border-green-100 bg-green-50/50">
              <CardContent className="pt-6">
                <div className="text-center">
                  <h3 className="text-xl font-bold text-green-700">₹7,08,000</h3>
                  <p className="text-gray-500 flex items-center justify-center gap-1.5 mt-1">
                    <DollarSign size={14} className="text-green-600" />
                    Net Salary (YTD)
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
        <CardFooter className="border-t pt-4 bg-gray-50">
          <Button variant="outline" className="w-full flex items-center justify-center gap-2">
            <Download size={16} />
            Download Annual Statement
          </Button>
        </CardFooter>
      </Card>

      {/* Additional Salary Analysis Card */}
      <Card className="shadow hover:shadow-md transition-shadow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 size={18} className="text-gray-500" />
            Salary Component Analysis
          </CardTitle>
          <CardDescription>Comparison of salary components over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={[
                  { month: 'Jan', basic: 50000, hra: 20000, special: 15000, other: 7000 },
                  { month: 'Feb', basic: 50000, hra: 20000, special: 15000, other: 7000 },
                  { month: 'Mar', basic: 50000, hra: 20000, special: 15000, other: 10000 },
                  { month: 'Apr', basic: 50000, hra: 20000, special: 15000, other: 10000 }
                ]}
                margin={{ top: 20, right: 30, left: 20, bottom: 30 }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.1} vertical={false} />
                <XAxis 
                  dataKey="month" 
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(value) => `₹${(value / 1000)}k`}
                />
                <Tooltip 
                  formatter={(value) => [`₹${value.toLocaleString()}`, '']}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Legend />
                <Bar dataKey="basic" name="Basic Salary" stackId="a" fill="#5a67d8" radius={[4, 4, 0, 0]} />
                <Bar dataKey="hra" name="HRA" stackId="a" fill="#48bb78" radius={[4, 4, 0, 0]} />
                <Bar dataKey="special" name="Special Allowance" stackId="a" fill="#f6ad55" radius={[4, 4, 0, 0]} />
                <Bar dataKey="other" name="Other Allowances" stackId="a" fill="#90cdf4" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MyPayslips;
