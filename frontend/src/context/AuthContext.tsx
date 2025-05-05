import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
     isAuthenticated: boolean;
     userRole: string | null;
     setAuthenticated: (authenticated: boolean) => void;
     setUserRole: (role: string | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
     const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
     const [userRole, setUserRole] = useState<string | null>(null);

     return (
          <AuthContext.Provider
               value={{
                    isAuthenticated,
                    userRole,
                    setAuthenticated: setIsAuthenticated,
                    setUserRole, // ✅ Use state updater directly
               }}
          >
               {children}
          </AuthContext.Provider>
     );
};

export const useAuth = (): AuthContextType => {
     const context = useContext(AuthContext);
     if (!context) {
          throw new Error('useAuth must be used within an AuthProvider');
     }
     return context;
};
