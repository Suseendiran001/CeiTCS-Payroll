import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Lock, User, UserCog, Users, ChevronLeft } from 'lucide-react';

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [selectedRole, setSelectedRole] = useState<'admin' | 'employee' | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectRole = (role: 'admin' | 'employee') => {
    setSelectedRole(role);
  };
  
  const handleBackToRoleSelection = () => {
    setSelectedRole(null);
    setCredentials({ username: '', password: '' });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
      // This is a mock authentication. In a real app, you would call an API
    setTimeout(() => {
      // For demo purposes only: Hardcoded credentials
      if (selectedRole === 'admin' && credentials.username === 'admin' && credentials.password === 'password') {
        localStorage.setItem('ceitcs-user', JSON.stringify({ role: 'admin', name: 'Admin User' }));
        navigate('/dashboard');
      } else if (selectedRole === 'employee' && credentials.username === 'employee' && credentials.password === 'password') {
        localStorage.setItem('ceitcs-user', JSON.stringify({ role: 'employee', name: 'John Doe' }));
        navigate('/employee-dashboard');
      } else {
        toast({
          title: "Authentication Error",
          description: "Invalid username or password",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1000);
  };
  
  return (
    <Card className="w-full border-white border-[10px] shadow-xl overflow-hidden bg-white rounded-xl">
      {!selectedRole ? (
        // Role Selection View
        <div className="p-10">
          <CardHeader className="space-y-2 p-0 mb-8">
            <CardTitle className="text-2xl font-bold text-center">Choose Your Role</CardTitle>
            <CardDescription className="text-center text-base">
              Select your role to continue to the login screen
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0 grid md:grid-cols-2 gap-8">
            <div 
              className="flex flex-col items-center p-8 rounded-lg hover:shadow-md cursor-pointer transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50 h-64"
              onClick={() => handleSelectRole('admin')}
            >
              <div className="h-24 w-24 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white mb-6">
                <UserCog size={40} />
              </div>
              <div className="text-center flex-grow flex flex-col justify-center">
                <h3 className="font-semibold text-xl mb-2">Admin</h3>
                <p className="text-gray-500 text-base text-center h-12">Management access to the system</p>
              </div>
            </div>
            
            <div 
              className="flex flex-col items-center p-8 rounded-lg hover:shadow-md cursor-pointer transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 bg-gradient-to-r from-orange-50 to-red-50 h-64"
              onClick={() => handleSelectRole('employee')}
            >
              <div className="h-24 w-24 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center text-white mb-6">
                <Users size={40} />
              </div>
              <div className="text-center flex-grow flex flex-col justify-center">
                <h3 className="font-semibold text-xl mb-2">Employee</h3>
                <p className="text-gray-500 text-base text-center h-12">Access to view payroll information</p>
              </div>
            </div>
          </CardContent>
        </div>
      ) : (
        // Login Form View
        <div className="flex flex-col md:flex-row relative">
          {/* Back button moved to top of the form */}
          <button 
            onClick={handleBackToRoleSelection}
            className="absolute top-4 left-4 z-10 p-2 rounded-full transition-colors bg-white bg-opacity-30 text-gray-700 hover:bg-opacity-50"
          >
            <ChevronLeft size={20} />
          </button>
          
          {/* Welcome Panel */}
          <div className={`p-10 text-white flex flex-col justify-center items-center md:w-1/2 animate-fade-in ${
            selectedRole === 'admin' 
              ? 'bg-gradient-to-br from-blue-600 to-indigo-700' 
              : 'bg-gradient-to-br from-orange-500 to-red-600'
          }`}>
            <div className="h-24 w-24 rounded-full bg-white bg-opacity-20 flex items-center justify-center mb-6">
              {selectedRole === 'admin' ? <UserCog size={48} /> : <Users size={48} />}
            </div>
            <h2 className="text-2xl font-bold mb-3">{selectedRole === 'admin' ? 'Admin Login' : 'Employee Login'}</h2>
            <p className="text-white text-opacity-80 text-center text-lg max-w-sm">
              {selectedRole === 'admin' 
                ? 'Access the management dashboard to control your company\'s payroll system' 
                : 'Access your personal payroll information and details'}
            </p>
          </div>
          
          {/* Login Form */}
          <div className="p-10 md:w-1/2 animate-fade-in">
            <CardHeader className="p-0 mb-8">
              <CardTitle className="text-2xl font-bold">Sign in</CardTitle>
              <CardDescription className="text-base">
                Enter your credentials
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-3">
                  <Label htmlFor="username" className="text-base">Username</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <Input
                      id="username"
                      name="username"
                      placeholder="Your username"
                      className="pl-10 border-gray-300 focus:ring focus:ring-opacity-50 focus:border-transparent transition-all py-6 text-base"
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <Label htmlFor="password" className="text-base">Password</Label>
                    <a href="#" className={`text-base hover:underline ${
                      selectedRole === 'admin' ? 'text-blue-600' : 'text-orange-600'
                    }`}>
                      Forgot password?
                    </a>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Your password"
                      className="pl-10 border-gray-300 focus:ring focus:ring-opacity-50 focus:border-transparent transition-all py-6 text-base"
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <Button 
                  type="submit" 
                  className={`w-full transition-all transform hover:-translate-y-1 hover:shadow-lg py-6 text-base ${
                    selectedRole === 'admin' 
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-700' 
                      : 'bg-gradient-to-r from-orange-500 to-red-600'
                  }`} 
                  disabled={isLoading}
                >
                  {isLoading ? 'Signing in...' : 'Sign in'}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="p-0 mt-8">
              <p className="text-base text-center w-full text-gray-500">
                For demo: use "{selectedRole}" / "password"
              </p>
            </CardFooter>
          </div>
        </div>
      )}
    </Card>
  );
};

export default LoginForm;
