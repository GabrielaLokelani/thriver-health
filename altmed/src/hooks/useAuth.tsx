import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { authService, type User, type AuthState } from '../services/authService';

interface AuthContextType extends AuthState {
  signUp: (email: string, password: string, name: string) => Promise<User>;
  signIn: (email: string, password: string) => Promise<User>;
  signOut: () => Promise<void>;
  confirmSignUp: (email: string, confirmationCode: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  useEffect(() => {
    // Initialize auth state
    authService.init().then((initialState) => {
      setAuthState(initialState);
    });

    // Subscribe to auth state changes
    const unsubscribe = authService.subscribe((newState) => {
      setAuthState(newState);
    });

    return () => {
      unsubscribe();
      authService.cleanup();
    };
  }, []);

  const value: AuthContextType = {
    ...authState,
    signUp: authService.signUp.bind(authService),
    signIn: authService.signIn.bind(authService),
    signOut: authService.signOut.bind(authService),
    confirmSignUp: authService.confirmSignUp.bind(authService),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

