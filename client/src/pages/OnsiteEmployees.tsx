
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import OnsiteEmployeeTable from '@/components/onsite/OnsiteEmployeeTable';
import OnsiteMap from '@/components/onsite/OnsiteMap';
import { Globe, Plus, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import OnsiteEmployeeForm from '@/components/onsite/OnsiteEmployeeForm';

const OnsiteEmployees = () => {
  const [activeCountry, setActiveCountry] = useState('all');
  
  // Sample data - in a real application, this would come from your API
  const onsiteStats = [
    { country: 'USA', count: 12, highlightColor: 'bg-blue-500' },
    { country: 'UK', count: 8, highlightColor: 'bg-green-500' },
    { country: 'Germany', count: 5, highlightColor: 'bg-yellow-500' },
    { country: 'Australia', count: 3, highlightColor: 'bg-purple-500' },
    { country: 'Singapore', count: 4, highlightColor: 'bg-red-500' },
  ];
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Onsite Employees</h1>
          <p className="text-gray-500">Manage employees working from international locations</p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-primary-gradient">
              <Plus className="mr-2 h-4 w-4" />
              Add Onsite Employee
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add New Onsite Employee</DialogTitle>
            </DialogHeader>
            <OnsiteEmployeeForm />
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Distribution by Country</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between px-1">
                <Button 
                  variant={activeCountry === 'all' ? 'default' : 'ghost'} 
                  className="w-full justify-start px-2"
                  onClick={() => setActiveCountry('all')}
                >
                  <Globe className="h-4 w-4 mr-2" />
                  <span className="font-medium">All Countries</span>
                  <span className="ml-auto bg-primary-gradient rounded-full px-2 py-0.5 text-xs text-white">
                    {onsiteStats.reduce((sum, stat) => sum + stat.count, 0)}
                  </span>
                </Button>
              </div>
              {onsiteStats.map((stat) => (
                <div key={stat.country} className="flex items-center justify-between px-1">
                  <Button 
                    variant={activeCountry === stat.country ? 'default' : 'ghost'} 
                    className="w-full justify-start px-2"
                    onClick={() => setActiveCountry(stat.country)}
                  >
                    <div className={`h-3 w-3 rounded-full mr-2 ${stat.highlightColor}`}></div>
                    <span>{stat.country}</span>
                    <span className="ml-auto bg-gray-100 rounded-full px-2 py-0.5 text-xs text-gray-700">
                      {stat.count}
                    </span>
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-4">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg font-medium">Global Distribution</CardTitle>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Users className="h-4 w-4" />
                <span>Total: {onsiteStats.reduce((sum, stat) => sum + stat.count, 0)}</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <OnsiteMap activeCountry={activeCountry} onsiteStats={onsiteStats} />
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full md:w-auto grid-cols-3 md:grid-cols-6">
          <TabsTrigger value="all" onClick={() => setActiveCountry('all')}>All</TabsTrigger>
          {onsiteStats.map((stat) => (
            <TabsTrigger 
              key={stat.country} 
              value={stat.country}
              onClick={() => setActiveCountry(stat.country)}
            >
              {stat.country}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value="all">
          <OnsiteEmployeeTable country="all" />
        </TabsContent>
        {onsiteStats.map((stat) => (
          <TabsContent key={stat.country} value={stat.country}>
            <OnsiteEmployeeTable country={stat.country} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default OnsiteEmployees;
