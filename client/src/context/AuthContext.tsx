import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define a User type
interface User {
  email: string;
}

// Define the context type
interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, password: string) => {
    // Simulate API call for login
    setUser({ email });
  };

  const logout = () => {
    // Simulate API call for logout
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
