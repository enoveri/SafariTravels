import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginUser, registerUser, logoutUser, fetchCurrentUser } from '../services/api';

// Create Auth Context
const AuthContext = createContext(null);

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  // Check if user is already logged in on mount
  useEffect(() => {
    const checkAuthStatus = async () => {
      setLoading(true);
      try {
        // Check if there's a token in localStorage
        const token = localStorage.getItem('authToken');
        
        if (token) {
          // Verify the token and get user data
          const userData = await fetchCurrentUser();
          if (userData.success) {
            setCurrentUser(userData.user);
          } else {
            // If token is invalid, clear it
            localStorage.removeItem('authToken');
            setCurrentUser(null);
          }
        }
      } catch (error) {
        console.error('Auth status check failed:', error);
        localStorage.removeItem('authToken');
        setCurrentUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  // Login function
  const login = async (credentials) => {
    setAuthError(null);
    try {
      const response = await loginUser(credentials);
      
      if (response.success) {
        localStorage.setItem('authToken', response.token);
        setCurrentUser(response.user);
        return { success: true };
      } else {
        setAuthError(response.error || 'Login failed');
        return { success: false, error: response.error };
      }
    } catch (error) {
      const errorMessage = error.message || 'An error occurred during login';
      setAuthError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  // Register function
  const register = async (userData) => {
    setAuthError(null);
    try {
      const response = await registerUser(userData);
      
      if (response.success) {
        return { success: true };
      } else {
        setAuthError(response.error || 'Registration failed');
        return { success: false, error: response.error };
      }
    } catch (error) {
      const errorMessage = error.message || 'An error occurred during registration';
      setAuthError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('authToken');
      setCurrentUser(null);
    }
  };

  const value = {
    currentUser,
    loading,
    authError,
    login,
    register,
    logout,
    isAuthenticated: !!currentUser
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider; 