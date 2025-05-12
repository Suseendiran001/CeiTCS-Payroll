
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from './components/layout/AppLayout';
import EmployeeLayout from './components/layout/EmployeeLayout';
import Login from "./pages/Login";
import SplashScreen from "./pages/SplashScreen";
import SelectPortal from "./pages/SelectPortal";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import AddEmployee from "./pages/AddEmployee";
import EmployeeDetails from "./pages/EmployeeDetails";
import NotFound from "./pages/NotFound";
import LeaveManagement from "./pages/LeaveManagement";
import OnsiteEmployees from "./pages/OnsiteEmployees";
import Payroll from "./pages/Payroll";
import Reports from "./pages/Reports";
import Compliance from "./pages/Compliance";
import Settings from "./pages/Settings";
// Employee-side pages
import EmployeeDashboard from "./pages/EmployeeDashboard";
import EmployeeWelcome from "./pages/EmployeeWelcome";
import MyProfile from "./pages/MyProfile";
import MyPayslips from "./pages/MyPayslips";
import MyLeave from "./pages/MyLeave";
import MyAttendance from "./pages/MyAttendance";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          {/* Login route kept for backward compatibility */}
          <Route path="/login" element={<Login />} />
          
          {/* Admin Routes */}
          <Route path="/" element={<AppLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/employees" element={<Employees />} />
            <Route path="/employees/new" element={<AddEmployee />} />
            <Route path="/employees/:id" element={<EmployeeDetails />} />
            <Route path="/leave" element={<LeaveManagement />} />
            <Route path="/onsite" element={<OnsiteEmployees />} />
            <Route path="/payroll" element={<Payroll />} />            <Route path="/reports" element={<Reports />} />
            <Route path="/compliance" element={<Compliance />} />
            <Route path="/settings" element={<Settings />} />
          </Route>          {/* Employee Routes */}
          <Route element={<EmployeeLayout />}>
            <Route path="/employee-dashboard" element={<EmployeeWelcome />} />
            <Route path="/my-profile" element={<MyProfile />} />
            <Route path="/my-payslips" element={<MyPayslips />} />
            <Route path="/my-leave" element={<MyLeave />} />
            <Route path="/my-attendance" element={<MyAttendance />} />
          </Route>
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
