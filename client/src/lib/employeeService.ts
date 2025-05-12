import { toast } from 'sonner';

// Type definitions
export type EmployeeType = 'Permanent' | 'Contract' | 'Internship';

export interface Employee {
  id: string;
  name: string;
  email: string;
  position: string;
  department: string;
  type: EmployeeType;
  status: 'Active' | 'Inactive' | 'On Leave';
  joinDate: string;
  profilePicture?: string;
}

// Local storage keys
const EMPLOYEE_ID_COUNTER_KEY = 'ceitcs-employee-counters';

// Initialize counters in local storage if not exists
const initializeCounters = () => {
  if (!localStorage.getItem(EMPLOYEE_ID_COUNTER_KEY)) {
    localStorage.setItem(EMPLOYEE_ID_COUNTER_KEY, JSON.stringify({
      Permanent: 6,  // Starting from P006 as we already have some in the sample data
      Contract: 2,   // Starting from C002
      Internship: 2  // Starting from I002
    }));
  }
};

// Generate an employee ID based on type WITHOUT incrementing counter (for preview only)
export const previewEmployeeId = (type: EmployeeType): string => {
  initializeCounters();
  
  const counters = JSON.parse(localStorage.getItem(EMPLOYEE_ID_COUNTER_KEY) || '{}');
  
  // Just read the current counter value without incrementing
  const currentCount = counters[type] || 0;
  
  // Generate ID based on type
  const prefix = type.charAt(0);
  const paddedId = (currentCount + 1).toString().padStart(3, '0');
  
  return `${prefix}${paddedId}`;
};

// Generate an employee ID AND increment the counter (use only when saving)
export const generateEmployeeId = (type: EmployeeType): string => {
  initializeCounters();
  
  const counters = JSON.parse(localStorage.getItem(EMPLOYEE_ID_COUNTER_KEY) || '{}');
  
  // Increment the counter for this type
  counters[type] = (counters[type] || 0) + 1;
  localStorage.setItem(EMPLOYEE_ID_COUNTER_KEY, JSON.stringify(counters));
  
  // Generate ID based on type
  const prefix = type.charAt(0);
  const paddedId = counters[type].toString().padStart(3, '0');
  
  return `${prefix}${paddedId}`;
};

// Generate a random password
export const generateRandomPassword = (): string => {
  const length = 10;
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';
  let password = '';
  
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  
  return password;
};

// Send login credentials via email (mock function)
export const sendLoginCredentials = (email: string, password: string): Promise<boolean> => {
  // In a real application, this would make an API call to a backend service
  // that sends an email with login credentials
  
  // For demo, we're just simulating a successful email send
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Email sent to ${email} with password: ${password}`);
      toast.success(`Login credentials sent to ${email}`);
      resolve(true);
    }, 1000);
  });
};

// Create a new employee with generated ID and send credentials
export const createEmployee = async (employeeData: Omit<Employee, 'id'> & { password?: string }): Promise<Employee> => {
  // Generate employee ID - this will increment the counter
  const id = generateEmployeeId(employeeData.type as EmployeeType);
  
  // Generate password if not provided
  const password = employeeData.password || generateRandomPassword();
  
  // Create employee object
  const employee: Employee = {
    ...employeeData,
    id
  };
  
  // In a real app, save employee to database here
  
  // Send login credentials to employee email
  await sendLoginCredentials(employee.email, password);
  
  return employee;
};

// Get employee type color
export const getEmployeeTypeColor = (type: EmployeeType): string => {
  switch (type) {
    case 'Permanent':
      return 'blue';
    case 'Contract':
      return 'purple';
    case 'Internship':
      return 'orange';
    default:
      return 'gray';
  }
};

// Mock function to get all employees
export const getAllEmployees = (): Employee[] => {
  // In a real app, this would fetch from an API
  return [
    { id: 'P001', name: 'Ajay Kumar', position: 'Software Engineer', department: 'Engineering', type: 'Permanent', status: 'Active', joinDate: '2022-01-15', email: 'ajay@example.com' },
    { id: 'P002', name: 'Priya Singh', position: 'UI/UX Designer', department: 'Design', type: 'Permanent', status: 'Active', joinDate: '2022-02-03', email: 'priya@example.com' },
    { id: 'C001', name: 'Rahul Sharma', position: 'DevOps Engineer', department: 'Engineering', type: 'Contract', status: 'Active', joinDate: '2022-03-21', email: 'rahul@example.com' },
    { id: 'P003', name: 'Meera Patel', position: 'Product Manager', department: 'Product', type: 'Permanent', status: 'Active', joinDate: '2022-04-10', email: 'meera@example.com' },
    { id: 'I001', name: 'Vijay Reddy', position: 'Data Analyst Intern', department: 'Analytics', type: 'Internship', status: 'Active', joinDate: '2023-01-05', email: 'vijay@example.com' },
    { id: 'P004', name: 'Arjun Nair', position: 'Backend Developer', department: 'Engineering', type: 'Permanent', status: 'Active', joinDate: '2022-05-18', email: 'arjun@example.com' },
    { id: 'C002', name: 'Neha Gupta', position: 'Frontend Developer', department: 'Engineering', type: 'Contract', status: 'Active', joinDate: '2022-07-01', email: 'neha@example.com' },
    { id: 'P005', name: 'Kiran Rao', position: 'HR Manager', department: 'Human Resources', type: 'Permanent', status: 'Active', joinDate: '2021-11-12', email: 'kiran@example.com' },
    { id: 'I002', name: 'Amit Verma', position: 'QA Intern', department: 'Engineering', type: 'Internship', status: 'Active', joinDate: '2023-02-15', email: 'amit@example.com' },
    { id: 'P006', name: 'Lakshmi Narayan', position: 'Finance Analyst', department: 'Finance', type: 'Permanent', status: 'Active', joinDate: '2021-09-30', email: 'lakshmi@example.com' },
  ];
}; 