
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Trash, Edit, Check } from 'lucide-react';

const IntegrationSettings = () => {
  return (
    <div className="space-y-6">
      <Card className="border-none shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold">Active Integrations</CardTitle>
          <CardDescription>Manage your connected systems and applications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-md">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-md bg-blue-100 flex items-center justify-center">
                  <svg className="h-6 w-6 text-blue-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"></path>
                    <path d="M18 14h-8"></path>
                    <path d="M15 18h-5"></path>
                    <path d="M10 6h8v4h-8V6Z"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-medium">Attendance System</h3>
                  <p className="text-xs text-gray-500">Connected via API • Last synced: 2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center">
                <Button variant="outline" size="sm" className="mr-2">Configure</Button>
                <Switch defaultChecked id="attendance-active" />
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-md">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-md bg-green-100 flex items-center justify-center">
                  <svg className="h-6 w-6 text-green-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-medium">Document Management</h3>
                  <p className="text-xs text-gray-500">Connected via API • Last synced: 1 day ago</p>
                </div>
              </div>
              <div className="flex items-center">
                <Button variant="outline" size="sm" className="mr-2">Configure</Button>
                <Switch defaultChecked id="document-active" />
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-md">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-md bg-purple-100 flex items-center justify-center">
                  <svg className="h-6 w-6 text-purple-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-medium">Email Notification Service</h3>
                  <p className="text-xs text-gray-500">Connected via SMTP • Last activity: Today</p>
                </div>
              </div>
              <div className="flex items-center">
                <Button variant="outline" size="sm" className="mr-2">Configure</Button>
                <Switch defaultChecked id="email-active" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="border-none shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold">API Keys</CardTitle>
          <CardDescription>Manage your API keys for external integrations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium">Attendance System API</h3>
                <p className="text-xs text-gray-500">Created: Jan 15, 2023 • Last used: Today</p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="flex items-center">
                  <Edit size={16} className="mr-1" />
                  Edit
                </Button>
                <Button variant="outline" size="sm" className="text-red-600 border-red-200 hover:bg-red-50">
                  <Trash size={16} className="mr-1" />
                  Revoke
                </Button>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium">Document Storage API</h3>
                <p className="text-xs text-gray-500">Created: Feb 20, 2023 • Last used: Yesterday</p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="flex items-center">
                  <Edit size={16} className="mr-1" />
                  Edit
                </Button>
                <Button variant="outline" size="sm" className="text-red-600 border-red-200 hover:bg-red-50">
                  <Trash size={16} className="mr-1" />
                  Revoke
                </Button>
              </div>
            </div>
            
            <div className="pt-2">
              <Button variant="outline">Generate New API Key</Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="border-none shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold">Add New Integration</CardTitle>
          <CardDescription>Connect additional third-party services</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card className="border p-4 hover:border-primary cursor-pointer transition-all">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-md bg-blue-100 flex items-center justify-center">
                    <svg className="h-6 w-6 text-blue-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                      <polyline points="3.29 7 12 12 20.71 7"></polyline>
                      <line x1="12" y1="22" x2="12" y2="12"></line>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">Accounting Software</h3>
                    <p className="text-xs text-gray-500">Connect your financial systems</p>
                  </div>
                </div>
              </Card>
              
              <Card className="border p-4 hover:border-primary cursor-pointer transition-all">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-md bg-green-100 flex items-center justify-center">
                    <svg className="h-6 w-6 text-green-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 15v4c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2v-4M17 9l-5 5-5-5M12 12.8V3"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">Cloud Storage</h3>
                    <p className="text-xs text-gray-500">Connect cloud storage providers</p>
                  </div>
                </div>
              </Card>
              
              <Card className="border p-4 hover:border-primary cursor-pointer transition-all">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-md bg-yellow-100 flex items-center justify-center">
                    <svg className="h-6 w-6 text-yellow-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">GPS Tracking</h3>
                    <p className="text-xs text-gray-500">Track field employees location</p>
                  </div>
                </div>
              </Card>
              
              <Card className="border p-4 hover:border-primary cursor-pointer transition-all">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-md bg-purple-100 flex items-center justify-center">
                    <svg className="h-6 w-6 text-purple-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2H2v10h10V2z"></path>
                      <path d="M22 12h-10v10h10V12z"></path>
                      <path d="M12 12H2v10h10V12z"></path>
                      <path d="M22 2h-10v10h10V2z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">CRM System</h3>
                    <p className="text-xs text-gray-500">Connect customer relationship tools</p>
                  </div>
                </div>
              </Card>
            </div>
            
            <div className="flex items-center justify-between pt-4">
              <div>
                <h3 className="text-sm font-medium">Custom Integration</h3>
                <p className="text-xs text-gray-500">Connect any service with our API</p>
              </div>
              <Button>Setup Integration</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IntegrationSettings;
