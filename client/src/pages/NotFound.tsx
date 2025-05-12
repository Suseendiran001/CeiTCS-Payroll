
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from '@/components/ui/button';
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-6xl font-bold bg-clip-text text-transparent bg-primary-gradient">404</h1>
        <p className="text-xl text-gray-600 mb-6 mt-2">Page not found</p>
        <Button onClick={() => navigate('/')} className="bg-primary-gradient">
          Return to Dashboard
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
