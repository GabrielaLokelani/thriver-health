// React Hook for Amplify Authentication
import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { amplifyAuthService, type AuthState, type User } from '../services/amplifyAuth';

interface AuthContextType extends AuthState {
  signUp: (email: string, password: string, name?: string) => Promise<any>;
  signIn: (email: string, password: string) => Promise<User>;
  signOut: () => Promise<void>;
  confirmSignUp: (email: string, code: string) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (email: string, code: string, newPassword: string) => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>(amplifyAuthService.getState());

  useEffect(() => {
    // Subscribe to auth state changes
    const unsubscribe = amplifyAuthService.subscribe((newState) => {
      setAuthState(newState);
    });

    return unsubscribe;
  }, []);

  const refreshUser = async () => {
    const user = await amplifyAuthService.getCurrentUser();
    setAuthState({
      user,
      isAuthenticated: !!user,
      isLoading: false,
      error: null,
    });
  };

  const value: AuthContextType = {
    ...authState,
    signUp: amplifyAuthService.signUp.bind(amplifyAuthService),
    signIn: amplifyAuthService.signIn.bind(amplifyAuthService),
    signOut: amplifyAuthService.signOut.bind(amplifyAuthService),
    confirmSignUp: amplifyAuthService.confirmSignUp.bind(amplifyAuthService),
    forgotPassword: amplifyAuthService.forgotPassword.bind(amplifyAuthService),
    resetPassword: amplifyAuthService.resetPassword.bind(amplifyAuthService),
    refreshUser,
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

