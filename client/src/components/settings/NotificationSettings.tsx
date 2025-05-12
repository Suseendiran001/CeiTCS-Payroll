
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const NotificationSettings = () => {
  return (
    <div className="space-y-6">
      <Card className="border-none shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold">Email Notifications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium">New Employee Registration</h3>
                <p className="text-xs text-gray-500">Receive notifications when a new employee is added</p>
              </div>
              <Switch id="email-new-employee" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium">Payroll Processing</h3>
                <p className="text-xs text-gray-500">Notifications for payroll generation and approval</p>
              </div>
              <Switch id="email-payroll" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium">Leave Requests</h3>
                <p className="text-xs text-gray-500">Notifications for leave applications and approvals</p>
              </div>
              <Switch id="email-leave" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium">Document Uploads</h3>
                <p className="text-xs text-gray-500">Notifications when new documents are uploaded</p>
              </div>
              <Switch id="email-documents" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium">System Reports</h3>
                <p className="text-xs text-gray-500">Periodic system reports and analytics</p>
              </div>
              <Switch id="email-reports" />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="border-none shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold">System Notifications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium">Dashboard Alerts</h3>
                <p className="text-xs text-gray-500">Important alerts displayed on dashboard</p>
              </div>
              <Switch id="system-alerts" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium">Task Reminders</h3>
                <p className="text-xs text-gray-500">Reminders for pending tasks and approvals</p>
              </div>
              <Switch id="system-tasks" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium">System Updates</h3>
                <p className="text-xs text-gray-500">Notifications about system updates and maintenance</p>
              </div>
              <Switch id="system-updates" defaultChecked />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="border-none shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold">Notification Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium">Daily Summary</h3>
                <p className="text-xs text-gray-500">Daily summary of activities and events</p>
              </div>
              
              <Select defaultValue="end-of-day">
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="start-of-day">Start of Day</SelectItem>
                  <SelectItem value="mid-day">Mid-Day</SelectItem>
                  <SelectItem value="end-of-day">End of Day</SelectItem>
                  <SelectItem value="disabled">Disabled</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium">Weekly Report</h3>
                <p className="text-xs text-gray-500">Weekly summary of key metrics</p>
              </div>
              
              <Select defaultValue="monday">
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monday">Monday</SelectItem>
                  <SelectItem value="friday">Friday</SelectItem>
                  <SelectItem value="sunday">Sunday</SelectItem>
                  <SelectItem value="disabled">Disabled</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium">Monthly Report</h3>
                <p className="text-xs text-gray-500">Monthly performance and financial summary</p>
              </div>
              
              <Select defaultValue="first-day">
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="first-day">1st of Month</SelectItem>
                  <SelectItem value="last-day">Last Day</SelectItem>
                  <SelectItem value="disabled">Disabled</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="pt-2 flex justify-end">
              <Button className="bg-primary-gradient">Save Notification Settings</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotificationSettings;
