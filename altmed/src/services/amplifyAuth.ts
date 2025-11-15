// Amplify Gen 2 Authentication Service
import {
  signUp as amplifySignUp,
  signIn,
  signOut,
  getCurrentUser,
  fetchUserAttributes,
  confirmSignUp,
  resendSignUpCode,
  resetPassword,
  confirmResetPassword,
  updatePassword,
  updateUserAttributes,
} from 'aws-amplify/auth';

export interface User {
  id: string;
  email: string;
  name?: string;
  attributes?: any;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

class AmplifyAuthService {
  private authState: AuthState = {
    user: null,
    isAuthenticated: false,
    isLoading: true,
  };

  private listeners: Set<(state: AuthState) => void> = new Set();

  constructor() {
    this.init();
  }

  // Initialize auth state
  private async init() {
    try {
      const user = await getCurrentUser();
      const attributes = await fetchUserAttributes();
      
      this.authState = {
        user: {
          id: attributes.sub || user.userId,
          email: attributes.email || '',
          name: attributes.name,
          attributes,
        },
        isAuthenticated: true,
        isLoading: false,
      };
    } catch (error) {
      // User not signed in
      this.authState = {
        user: null,
        isAuthenticated: false,
        isLoading: false,
      };
    }
    
    this.notifyListeners();
  }

  // Subscribe to auth state changes
  subscribe(listener: (state: AuthState) => void) {
    this.listeners.add(listener);
    listener(this.authState);
    
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notifyListeners() {
    this.listeners.forEach(listener => listener(this.authState));
  }

  // Get current auth state
  getState(): AuthState {
    return { ...this.authState };
  }

  // Sign up new user
  async signUp(email: string, password: string, name?: string): Promise<any> {
    // Check if Amplify is configured by trying to fetch auth session
    try {
      const { fetchAuthSession } = await import('aws-amplify/auth');
      await fetchAuthSession();
    } catch (error: any) {
      const friendlyError = new Error('Backend not configured. Please deploy the backend in Amplify Console first. Go to your app → Backend → Deploy backend');
      this.authState.error = friendlyError.message;
      this.notifyListeners();
      throw friendlyError;
    }

    try {
      const { userId } = await amplifySignUp({
        username: email,
        password,
        options: {
          userAttributes: {
            email,
            ...(name && { name }),
          },
        },
      });

      return { userId, email };
    } catch (error: any) {
      console.error('Sign up error:', error);
      throw error;
    }
  }

  // Confirm sign up with code
  async confirmSignUp(email: string, code: string): Promise<void> {
    try {
      await confirmSignUp({
        username: email,
        confirmationCode: code,
      });
    } catch (error: any) {
      console.error('Confirm sign up error:', error);
      throw error;
    }
  }

  // Resend confirmation code
  async resendSignUpCode(email: string): Promise<void> {
    try {
      await resendSignUpCode({ username: email });
    } catch (error: any) {
      console.error('Resend code error:', error);
      throw error;
    }
  }

  // Sign in existing user
  async signIn(email: string, password: string): Promise<User> {
    try {
      const { isSignedIn } = await signIn({
        username: email,
        password,
      });

      if (isSignedIn) {
        const user = await getCurrentUser();
        const attributes = await fetchUserAttributes();
        
        const userObj = {
          id: attributes.sub || user.userId,
          email: attributes.email || email,
          name: attributes.name,
          attributes,
        };

        this.authState = {
          user: userObj,
          isAuthenticated: true,
          isLoading: false,
        };
        
        this.notifyListeners();
        return userObj;
      }
      
      throw new Error('Sign in failed');
    } catch (error: any) {
      console.error('Sign in error:', error);
      throw error;
    }
  }

  // Sign out current user
  async signOut(): Promise<void> {
    try {
      await signOut();
      
      this.authState = {
        user: null,
        isAuthenticated: false,
        isLoading: false,
      };
      
      this.notifyListeners();
    } catch (error: any) {
      console.error('Sign out error:', error);
      throw error;
    }
  }

  // Get current user
  async getCurrentUser(): Promise<User | null> {
    try {
      const user = await getCurrentUser();
      const attributes = await fetchUserAttributes();
      
      return {
        id: attributes.sub || user.userId,
        email: attributes.email || '',
        name: attributes.name,
        attributes,
      };
    } catch (error) {
      return null;
    }
  }

  // Forgot password
  async forgotPassword(email: string): Promise<void> {
    try {
      await resetPassword({ username: email });
    } catch (error: any) {
      console.error('Forgot password error:', error);
      throw error;
    }
  }

  // Reset password with code
  async resetPassword(email: string, code: string, newPassword: string): Promise<void> {
    try {
      await confirmResetPassword({
        username: email,
        confirmationCode: code,
        newPassword,
      });
    } catch (error: any) {
      console.error('Reset password error:', error);
      throw error;
    }
  }

  // Change password for signed-in user
  async changePassword(oldPassword: string, newPassword: string): Promise<void> {
    try {
      await updatePassword({
        oldPassword,
        newPassword,
      });
    } catch (error: any) {
      console.error('Change password error:', error);
      throw error;
    }
  }

  // Update user attributes
  async updateUserAttributes(attributes: Record<string, string>): Promise<void> {
    try {
      await updateUserAttributes({
        userAttributes: attributes,
      });
      
      // Refresh user state
      const user = await this.getCurrentUser();
      if (user) {
        this.authState.user = user;
        this.notifyListeners();
      }
    } catch (error: any) {
      console.error('Update user attributes error:', error);
      throw error;
    }
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return this.authState.isAuthenticated;
  }

  // Check if user is loading
  isLoading(): boolean {
    return this.authState.isLoading;
  }
}

// Export singleton instance
export const amplifyAuthService = new AmplifyAuthService();

