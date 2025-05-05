import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
     children: React.ReactNode;
     allowedRoles: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
     const { isAuthenticated, userRole } = useAuth();
     const location = useLocation();

     if (!isAuthenticated || !userRole) {
          return <Navigate to="/" replace state={{ from: location }} />;
     }

     if (!allowedRoles.includes(userRole)) {
          if (userRole === 'admin') return <Navigate to="/admindashboard" replace />;
          if (userRole === 'customer') return <Navigate to="/dashboard" replace />;
          return <Navigate to="/" replace />;
     }

     return <>{children}</>;
};

export default ProtectedRoute;
