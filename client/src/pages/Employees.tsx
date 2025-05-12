
import React from 'react';
import EmployeeTable from '@/components/employees/EmployeeTable';

const Employees = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">Employee Management</h1>
        <p className="text-gray-500">Manage all employee information</p>
      </div>
      
      <EmployeeTable />
    </div>
  );
};

export default Employees;
