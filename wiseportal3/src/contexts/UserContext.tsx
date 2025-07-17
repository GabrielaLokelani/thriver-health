import React, { createContext, useContext, useState } from 'react';

// This should match what's in AWS Cognito
interface User {
  sub: string;
  // name: string | undefined;
  email: string | undefined;
  role: 'participant' | 'ssa' | 'admin' | 'mentor';
  givenName: string | undefined;
  familyName: string | undefined;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  // login: (role: 'participant' | 'ssa' | 'admin' | 'mentor') => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export default UserContext; 