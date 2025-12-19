/**
 * Authentication Service - Amplify Gen 2 Auth
 * 
 * Uses AWS Amplify Auth (Cognito) for authentication.
 * Falls back to localStorage demo mode if Amplify is not configured.
 */

// ES6 imports ensure we use the same module instance as index.tsx
// This is critical - require() can create separate instances that don't see the config
import { signUp, signIn, signOut, getCurrentUser, fetchAuthSession, confirmSignUp } from 'aws-amplify/auth';
import { Hub } from 'aws-amplify/utils';

export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// Check if Amplify is configured
// Try multiple paths to find the config file
let isAmplifyConfigured = false;
try {
  let amplifyConfig;
  // Try src folder first (most reliable for Create React App)
  try {
    amplifyConfig = require('../amplify_outputs.json');
  } catch {
    // Fallback to parent directory
    try {
      amplifyConfig = require('../../amplify_outputs.json');
    } catch {
      throw new Error('Config file not found');
    }
  }
  
  isAmplifyConfigured = !!amplifyConfig?.auth;
  if (isAmplifyConfigured) {
    console.log('🔐 Auth Service: Using AWS Amplify Auth (Cognito)');
    console.log('   User Pool ID:', amplifyConfig.auth.user_pool_id);
  }
} catch (error: any) {
  isAmplifyConfigured = false;
  console.warn('⚠️ Auth Service: Amplify not configured - using localStorage demo mode');
  if (error?.message && !error.message.includes('not found')) {
    console.warn('   Error:', error.message);
  }
}

// Fallback localStorage keys for demo mode
const STORAGE_KEY = 'altmed_auth_user';
const STORAGE_KEY_USERS = 'altmed_users';

class AuthService {
  private listeners: Set<(state: AuthState) => void> = new Set();
  private hubUnsubscribe: (() => void) | null = null;

  constructor() {
    // Don't load modules in constructor - wait until we actually need them
    // This ensures Amplify.configure() has been called first
  }
  
  private initializeHub() {
    if (!isAmplifyConfigured) return;
    
    if (!this.hubUnsubscribe) {
      this.hubUnsubscribe = Hub.listen('auth', (data: any) => {
        this.handleAuthEvent(data);
      });
    }
  }

  /**
   * Handle Amplify auth events
   */
  private async handleAuthEvent(data: any) {
    switch (data.payload.event) {
      case 'signedIn':
      case 'tokenRefresh':
        await this.checkAuthState();
        break;
      case 'signedOut':
        this.notifyListeners({
          user: null,
          isAuthenticated: false,
          isLoading: false,
        });
        break;
    }
  }

  /**
   * Check current auth state
   */
  private async checkAuthState(): Promise<AuthState> {
    if (!isAmplifyConfigured) {
      return this.initDemoMode();
    }

    this.initializeHub();

    try {
      const amplifyUser = await getCurrentUser();
      const session = await fetchAuthSession();
      
      if (amplifyUser && session.tokens) {
        // Get user attributes
        const userId = amplifyUser.userId;
        const email = amplifyUser.signInDetails?.loginId || '';
        
        // Try to get name from user attributes (if available)
        // Note: In your setup, name is stored in UserProfile, not Cognito attributes
        const user: User = {
          id: userId,
          email: email,
          name: email.split('@')[0], // Fallback to email prefix
          createdAt: new Date().toISOString(),
        };

        const state: AuthState = {
          user,
          isAuthenticated: true,
          isLoading: false,
        };

        this.notifyListeners(state);
        return state;
      }
    } catch (error) {
      // User not authenticated
      console.log('No authenticated user');
    }

    const state: AuthState = {
      user: null,
      isAuthenticated: false,
      isLoading: false,
    };

    this.notifyListeners(state);
    return state;
  }

  /**
   * Initialize auth state
   */
  async init(): Promise<AuthState> {
    if (!isAmplifyConfigured) {
      return this.initDemoMode();
    }

    return await this.checkAuthState();
  }

  /**
   * Sign up a new user with Amplify
   */
  async signUp(email: string, password: string, name: string): Promise<User> {
    if (!isAmplifyConfigured) {
      console.log('📦 Sign up: Using localStorage (demo mode)');
      return this.signUpDemoMode(email, password, name);
    }
    
    this.initializeHub();
    console.log('☁️ Sign up: Using AWS Amplify Auth (Cognito)');

    // Wait for Amplify to fully initialize
    // Amplify.configure() is called in index.tsx, but it takes time for internal state to update
    // Using ES6 imports ensures we use the same module instance, so less wait time needed
    const waitForAmplify = async () => {
      console.log('⏳ Waiting for Amplify to initialize...');
      // Reduced wait time since we're using the same module instance now
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('✅ Proceeding with sign up (will retry if needed)');
    };

    // Retry wrapper for Amplify operations with exponential backoff
    const retryAmplifyOperation = async <T>(
      operation: () => Promise<T>,
      maxRetries = 8
    ): Promise<T> => {
      let lastError: any;
      for (let i = 0; i < maxRetries; i++) {
        try {
          return await operation();
        } catch (error: any) {
          lastError = error;
          const errorMsg = (error.message || error.toString() || '').toLowerCase();
          
          // Log the actual error for debugging
          if (i === 0) {
            console.log('🔍 First attempt error:', {
              message: error.message,
              name: error.name,
              stack: error.stack?.substring(0, 200)
            });
          }
          
          // Check if it's a configuration/timing error
          const isConfigError = 
            errorMsg.includes('not configured') ||
            errorMsg.includes('userpool') ||
            errorMsg.includes('auth') ||
            errorMsg.includes('configure') ||
            errorMsg.includes('amplify has not been');
          
          if (isConfigError && i < maxRetries - 1) {
            // Longer delays: 1000ms, 2000ms, 3000ms, 3000ms, 3000ms...
            const delay = Math.min(1000 * (i + 1), 3000);
            console.log(`⚠️ Amplify not ready, retrying in ${delay}ms... (${i + 1}/${maxRetries})`);
            await new Promise(resolve => setTimeout(resolve, delay));
            continue;
          }
          
          // For non-config errors, throw immediately
          throw error;
        }
      }
      // If we exhausted all retries, log the final error and throw
      console.error('❌ All retries exhausted. Final error:', lastError);
      throw lastError;
    };

    try {
      // Give Amplify time to fully initialize
      await waitForAmplify();
      
      // Sign up with Amplify (with retry logic)
      const { userId, nextStep } = await retryAmplifyOperation(async () => {
        return await signUp({
          username: email,
          password,
          options: {
            userAttributes: {
              email,
            },
          },
        });
      });

      // Handle confirmation step if needed
      if (nextStep.signUpStep === 'CONFIRM_SIGN_UP') {
        console.log('🔐 Sign up requires email confirmation');
        // Throw a special error that the UI can catch to show confirmation step
        const confirmationError: any = new Error('CONFIRMATION_REQUIRED');
        confirmationError.isConfirmationRequired = true;
        confirmationError.name = 'ConfirmationRequired';
        throw confirmationError;
      }

      // After successful signup, sign in the user to get the full user object
      const signedInUser = await this.signIn(email, password);

      // Return user object (use the one from signIn which has the proper ID)
      return signedInUser;
    } catch (error: any) {
      // If this is a confirmation required error, re-throw it as-is
      if (error.isConfirmationRequired || error.message === 'CONFIRMATION_REQUIRED') {
        throw error;
      }
      
      // Handle Amplify errors
      if (error.message && error.message.includes('not configured')) {
        throw new Error('Authentication service is initializing. Please wait a moment and try again.');
      } else if (error.name === 'UsernameExistsException') {
        throw new Error('An account with this email already exists');
      } else if (error.name === 'InvalidPasswordException') {
        throw new Error('Password does not meet requirements');
      } else if (error.message) {
        // Filter out technical Amplify errors for user-facing messages
        if (error.message.includes('UserPool') || error.message.includes('Auth')) {
          throw new Error('Authentication service error. Please try again in a moment.');
        }
        throw new Error(error.message);
      }
      throw new Error('Sign up failed. Please try again.');
    }
  }

  /**
   * Sign in existing user with Amplify
   */
  async signIn(email: string, password: string): Promise<User> {
    if (!isAmplifyConfigured) {
      console.log('📦 Sign in: Using localStorage (demo mode)');
      return this.signInDemoMode(email, password);
    }
    
    this.initializeHub();
    console.log('☁️ Sign in: Using AWS Amplify Auth (Cognito)');

    try {
      const { isSignedIn, nextStep } = await signIn({
        username: email,
        password,
      });

      // Handle additional steps if needed (MFA, etc.)
      if (nextStep.signInStep !== 'DONE') {
        throw new Error('Additional authentication steps required');
      }

      // Get user after sign in
      const amplifyUser = await getCurrentUser();
      const user: User = {
        id: amplifyUser.userId,
        email: amplifyUser.signInDetails?.loginId || email,
        name: email.split('@')[0], // Fallback - name should come from UserProfile
        createdAt: new Date().toISOString(),
      };

      // Notify listeners
      this.notifyListeners({
        user,
        isAuthenticated: true,
        isLoading: false,
      });

      return user;
    } catch (error: any) {
      // Handle Amplify errors
      if (error.name === 'NotAuthorizedException') {
        throw new Error('Invalid email or password');
      } else if (error.name === 'UserNotConfirmedException') {
        throw new Error('Please confirm your email before signing in');
      } else if (error.message) {
        throw new Error(error.message);
      }
      throw new Error('Sign in failed. Please check your credentials.');
    }
  }

  /**
   * Sign out current user
   */
  async signOut(): Promise<void> {
    if (!isAmplifyConfigured) {
      console.log('📦 Sign out: Using localStorage (demo mode)');
      localStorage.removeItem(STORAGE_KEY);
      this.notifyListeners({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
      return;
    }
    
    this.initializeHub();
    console.log('☁️ Sign out: Using AWS Amplify Auth (Cognito)');

    try {
      await signOut();
      // Immediately update state (Hub listener will also fire, but this ensures immediate UI update)
      this.notifyListeners({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
    } catch (error: any) {
      console.error('Sign out error:', error);
      // Still update state even if signOut fails
      this.notifyListeners({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  }

  /**
   * Get current user
   */
  async getCurrentUser(): Promise<User | null> {
    if (!isAmplifyConfigured) {
      try {
        const userData = localStorage.getItem(STORAGE_KEY);
        return userData ? JSON.parse(userData) : null;
      } catch {
        return null;
      }
    }

    this.initializeHub();

    try {
      const amplifyUser = await getCurrentUser();
      return {
        id: amplifyUser.userId,
        email: amplifyUser.signInDetails?.loginId || '',
        name: amplifyUser.signInDetails?.loginId?.split('@')[0] || '',
        createdAt: new Date().toISOString(),
      };
    } catch {
      return null;
    }
  }

  /**
   * Confirm sign up with verification code
   */
  async confirmSignUp(email: string, confirmationCode: string): Promise<void> {
    if (!isAmplifyConfigured) {
      throw new Error('Amplify is not configured');
    }
    
    if (!confirmSignUp) {
      throw new Error('Confirm sign up not available');
    }
    
    console.log('☁️ Confirming sign up: Using AWS Amplify Auth (Cognito)');
    
    try {
      await confirmSignUp({
        username: email,
        confirmationCode,
      });
      
      console.log('✅ Account confirmed successfully');
    } catch (error: any) {
      // Handle Amplify errors
      if (error.name === 'CodeMismatchException') {
        throw new Error('Invalid confirmation code. Please check your email and try again.');
      } else if (error.name === 'ExpiredCodeException') {
        throw new Error('Confirmation code has expired. Please request a new code.');
      } else if (error.name === 'NotAuthorizedException') {
        throw new Error('This account has already been confirmed.');
      } else if (error.message) {
        throw new Error(error.message);
      }
      throw new Error('Confirmation failed. Please try again.');
    }
  }

  /**
   * Check if user is authenticated
   */
  async isAuthenticated(): Promise<boolean> {
    const user = await this.getCurrentUser();
    return !!user;
  }

  /**
   * Subscribe to auth state changes
   */
  subscribe(listener: (state: AuthState) => void): () => void {
    this.listeners.add(listener);
    // Immediately check and notify with current state
    this.init().then((state) => {
      listener(state);
    });
    return () => {
      this.listeners.delete(listener);
    };
  }

  /**
   * Cleanup
   */
  cleanup() {
    if (this.hubUnsubscribe) {
      this.hubUnsubscribe();
    }
  }

  /**
   * Demo mode methods (fallback when Amplify not configured)
   */
  private initDemoMode(): AuthState {
    try {
      const userData = localStorage.getItem(STORAGE_KEY);
      if (userData) {
        const user = JSON.parse(userData);
        return {
          user,
          isAuthenticated: true,
          isLoading: false,
        };
      }
    } catch (error) {
      console.error('Error initializing demo auth:', error);
    }
    return {
      user: null,
      isAuthenticated: false,
      isLoading: false,
    };
  }

  private getAllUsers(): User[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY_USERS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  private async signUpDemoMode(email: string, password: string, name: string): Promise<User> {
    const existingUsers = this.getAllUsers();
    if (existingUsers.find(u => u.email === email)) {
      throw new Error('An account with this email already exists');
    }

    const user: User = {
      id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      email,
      name,
      createdAt: new Date().toISOString(),
    };

    existingUsers.push(user);
    localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(existingUsers));
    localStorage.setItem(`altmed_cred_${user.id}`, JSON.stringify({ userId: user.id, email, password }));

    this.setCurrentUser(user);
    return user;
  }

  private async signInDemoMode(email: string, password: string): Promise<User> {
    const users = this.getAllUsers();
    const user = users.find(u => u.email === email);

    if (!user) {
      throw new Error('Invalid email or password');
    }

    const credentials = localStorage.getItem(`altmed_cred_${user.id}`);
    if (credentials) {
      const creds = JSON.parse(credentials);
      if (creds.password !== password) {
        throw new Error('Invalid email or password');
      }
    }

    this.setCurrentUser(user);
    return user;
  }

  private setCurrentUser(user: User): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    this.notifyListeners({
      user,
      isAuthenticated: true,
      isLoading: false,
    });
  }

  private notifyListeners(state: AuthState): void {
    this.listeners.forEach(listener => listener(state));
  }
}

export const authService = new AuthService();

