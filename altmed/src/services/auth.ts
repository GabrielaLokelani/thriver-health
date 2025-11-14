// Authentication Service for AWS Cognito
// This will integrate with AWS Amplify Auth after setup

interface User {
  id: string;
  email: string;
  name?: string;
  attributes?: any;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

class AuthService {
  private authState: AuthState = {
    user: null,
    isAuthenticated: false,
    isLoading: true,
  };

  private listeners: Set<(state: AuthState) => void> = new Set();

  constructor() {
    this.init();
  }

  // Initialize auth state (check if user is already signed in)
  private async init() {
    try {
      // After Amplify setup, replace with:
      // const user = await Auth.currentAuthenticatedUser();
      
      // For now, check localStorage for demo mode
      const demoUser = localStorage.getItem('altmed_demo_user');
      if (demoUser) {
        this.authState = {
          user: JSON.parse(demoUser),
          isAuthenticated: true,
          isLoading: false,
        };
      } else {
        this.authState.isLoading = false;
      }
      
      this.notifyListeners();
    } catch (error) {
      this.authState = {
        user: null,
        isAuthenticated: false,
        isLoading: false,
      };
      this.notifyListeners();
    }
  }

  // Subscribe to auth state changes
  subscribe(listener: (state: AuthState) => void) {
    this.listeners.add(listener);
    // Immediately call with current state
    listener(this.authState);
    
    // Return unsubscribe function
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
  async signUp(email: string, password: string, name: string): Promise<any> {
    try {
      // After Amplify setup, replace with:
      // const result = await Auth.signUp({
      //   username: email,
      //   password,
      //   attributes: {
      //     email,
      //     name,
      //   },
      // });
      
      // Demo mode
      const user = {
        id: Date.now().toString(),
        email,
        name,
      };
      
      localStorage.setItem('altmed_demo_user', JSON.stringify(user));
      
      this.authState = {
        user,
        isAuthenticated: true,
        isLoading: false,
      };
      
      this.notifyListeners();
      return user;
    } catch (error) {
      console.error('Sign up error:', error);
      throw error;
    }
  }

  // Confirm sign up with code (for email verification)
  async confirmSignUp(email: string, code: string): Promise<void> {
    try {
      // After Amplify setup, replace with:
      // await Auth.confirmSignUp(email, code);
      
      console.log('Confirm sign up:', email, code);
    } catch (error) {
      console.error('Confirm sign up error:', error);
      throw error;
    }
  }

  // Sign in existing user
  async signIn(email: string, password: string): Promise<User> {
    try {
      // After Amplify setup, replace with:
      // const result = await Auth.signIn(email, password);
      // const user = {
      //   id: result.attributes.sub,
      //   email: result.attributes.email,
      //   name: result.attributes.name,
      //   attributes: result.attributes,
      // };
      
      // Demo mode
      const user = {
        id: 'demo-user-123',
        email,
        name: 'Demo User',
      };
      
      localStorage.setItem('altmed_demo_user', JSON.stringify(user));
      
      this.authState = {
        user,
        isAuthenticated: true,
        isLoading: false,
      };
      
      this.notifyListeners();
      return user;
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    }
  }

  // Sign out current user
  async signOut(): Promise<void> {
    try {
      // After Amplify setup, replace with:
      // await Auth.signOut();
      
      localStorage.removeItem('altmed_demo_user');
      localStorage.removeItem('altmed_user_profile');
      localStorage.removeItem('altmed_demo_mode');
      
      this.authState = {
        user: null,
        isAuthenticated: false,
        isLoading: false,
      };
      
      this.notifyListeners();
    } catch (error) {
      console.error('Sign out error:', error);
      throw error;
    }
  }

  // Get current user
  async getCurrentUser(): Promise<User | null> {
    try {
      // After Amplify setup, replace with:
      // const user = await Auth.currentAuthenticatedUser();
      
      const demoUser = localStorage.getItem('altmed_demo_user');
      return demoUser ? JSON.parse(demoUser) : null;
    } catch (error) {
      return null;
    }
  }

  // Get auth token (JWT)
  async getAuthToken(): Promise<string | null> {
    try {
      // After Amplify setup, replace with:
      // const session = await Auth.currentSession();
      // return session.getIdToken().getJwtToken();
      
      return 'demo-token';
    } catch (error) {
      return null;
    }
  }

  // Forgot password
  async forgotPassword(email: string): Promise<void> {
    try {
      // After Amplify setup, replace with:
      // await Auth.forgotPassword(email);
      
      console.log('Forgot password for:', email);
    } catch (error) {
      console.error('Forgot password error:', error);
      throw error;
    }
  }

  // Reset password with code
  async forgotPasswordSubmit(email: string, code: string, newPassword: string): Promise<void> {
    try {
      // After Amplify setup, replace with:
      // await Auth.forgotPasswordSubmit(email, code, newPassword);
      
      console.log('Reset password for:', email);
    } catch (error) {
      console.error('Reset password error:', error);
      throw error;
    }
  }

  // Change password for signed-in user
  async changePassword(oldPassword: string, newPassword: string): Promise<void> {
    try {
      // After Amplify setup, replace with:
      // const user = await Auth.currentAuthenticatedUser();
      // await Auth.changePassword(user, oldPassword, newPassword);
      
      console.log('Change password');
    } catch (error) {
      console.error('Change password error:', error);
      throw error;
    }
  }

  // Update user attributes
  async updateUserAttributes(attributes: any): Promise<void> {
    try {
      // After Amplify setup, replace with:
      // const user = await Auth.currentAuthenticatedUser();
      // await Auth.updateUserAttributes(user, attributes);
      
      if (this.authState.user) {
        const updatedUser = { ...this.authState.user, ...attributes };
        localStorage.setItem('altmed_demo_user', JSON.stringify(updatedUser));
        
        this.authState.user = updatedUser;
        this.notifyListeners();
      }
    } catch (error) {
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
export const authService = new AuthService();

// Export types
export type { User, AuthState };

