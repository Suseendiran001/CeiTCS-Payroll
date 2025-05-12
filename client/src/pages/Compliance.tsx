
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, CheckSquare, FileText, Upload } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import ComplianceFilingList from '@/components/compliance/ComplianceFilingList';
import ComplianceDocuments from '@/components/compliance/ComplianceDocuments';

const Compliance = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Compliance Management</h1>
          <p className="text-gray-500">Track regulatory requirements and maintain compliance</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-lg font-medium">Compliance Score</CardTitle>
                <CardDescription>Overall compliance status</CardDescription>
              </div>
              <Badge className="bg-green-100 text-green-800 border-green-200">Good</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center text-sm">
                <span className="font-medium">92%</span>
                <span className="text-gray-500">Target: 100%</span>
              </div>
              <Progress value={92} className="h-2" />
              
              <div className="mt-4 text-xs text-gray-500">
                Last updated: April 10, 2023
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Upcoming Filings</CardTitle>
            <CardDescription>Due in the next 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-red-500" />
                  <div>
                    <p className="font-medium">TDS Filing</p>
                    <p className="text-xs text-gray-500">Due: April 30, 2023</p>
                  </div>
                </div>
                <Button size="sm" variant="outline">Prepare</Button>
              </div>
              
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-yellow-500" />
                  <div>
                    <p className="font-medium">PF Contribution</p>
                    <p className="text-xs text-gray-500">Due: May 15, 2023</p>
                  </div>
                </div>
                <Button size="sm" variant="outline">Prepare</Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Recent Activities</CardTitle>
            <CardDescription>Last 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-2">
                <CheckSquare className="h-4 w-4 text-green-500 mt-0.5" />
                <div>
                  <p className="font-medium">ESI Payment Completed</p>
                  <p className="text-xs text-gray-500">April 12, 2023</p>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <Upload className="h-4 w-4 text-blue-500 mt-0.5" />
                <div>
                  <p className="font-medium">TDS Certificate Uploaded</p>
                  <p className="text-xs text-gray-500">April 9, 2023</p>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <FileText className="h-4 w-4 text-purple-500 mt-0.5" />
                <div>
                  <p className="font-medium">Compliance Report Generated</p>
                  <p className="text-xs text-gray-500">April 7, 2023</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-medium">Compliance Calendar</CardTitle>
          <CardDescription>Manage regulatory filing deadlines</CardDescription>
        </CardHeader>
        <CardContent>
          <ComplianceFilingList />
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-medium">Compliance Documents</CardTitle>
          <CardDescription>Required regulatory documents and certificates</CardDescription>
        </CardHeader>
        <CardContent>
          <ComplianceDocuments />
        </CardContent>
      </Card>
    </div>
  );
};

export default Compliance;
