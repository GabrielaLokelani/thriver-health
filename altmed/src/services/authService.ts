/**
 * Authentication Service - LocalStorage-based (ready for backend swap)
 * 
 * Currently uses localStorage for demo purposes.
 * When backend is ready, replace localStorage calls with API calls.
 */

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

const STORAGE_KEY = 'altmed_auth_user';
const STORAGE_KEY_USERS = 'altmed_users'; // Store all users for login

class AuthService {
  private listeners: Set<(state: AuthState) => void> = new Set();

  /**
   * Initialize auth state from localStorage
   */
  init(): AuthState {
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
      console.error('Error initializing auth:', error);
    }
    return {
      user: null,
      isAuthenticated: false,
      isLoading: false,
    };
  }

  /**
   * Sign up a new user
   */
  async signUp(email: string, password: string, name: string): Promise<User> {
    // Check if user already exists
    const existingUsers = this.getAllUsers();
    if (existingUsers.find(u => u.email === email)) {
      throw new Error('An account with this email already exists');
    }

    // Create new user
    const user: User = {
      id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      email,
      name,
      createdAt: new Date().toISOString(),
    };

    // Save to users list
    existingUsers.push(user);
    localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(existingUsers));

    // Also save password (in production, this would be hashed on backend)
    const userCredentials = {
      userId: user.id,
      email,
      password, // In production, never store passwords in localStorage
    };
    localStorage.setItem(`altmed_cred_${user.id}`, JSON.stringify(userCredentials));

    // Auto-login after signup
    this.setCurrentUser(user);

    return user;
  }

  /**
   * Sign in existing user
   */
  async signIn(email: string, password: string): Promise<User> {
    const users = this.getAllUsers();
    const user = users.find(u => u.email === email);

    if (!user) {
      throw new Error('Invalid email or password');
    }

    // Check password (in production, this would be verified on backend)
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

  /**
   * Sign out current user
   */
  async signOut(): Promise<void> {
    localStorage.removeItem(STORAGE_KEY);
    this.notifyListeners({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
  }

  /**
   * Get current user
   */
  getCurrentUser(): User | null {
    try {
      const userData = localStorage.getItem(STORAGE_KEY);
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return !!this.getCurrentUser();
  }

  /**
   * Subscribe to auth state changes
   */
  subscribe(listener: (state: AuthState) => void): () => void {
    this.listeners.add(listener);
    // Immediately notify with current state
    listener(this.init());
    return () => {
      this.listeners.delete(listener);
    };
  }

  /**
   * Private helper methods
   */
  private getAllUsers(): User[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY_USERS);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      return [];
    }
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

