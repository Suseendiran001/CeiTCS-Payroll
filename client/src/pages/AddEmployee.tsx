
import React from 'react';
import EmployeeForm from '@/components/employees/EmployeeForm';

const AddEmployee = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">Add New Employee</h1>
        <p className="text-gray-500">Enter employee details to create a new record</p>
      </div>
      
      <EmployeeForm />
    </div>
  );
};

export default AddEmployee;
