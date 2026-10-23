import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  adminEmail: string;
  login: (emailOrUser: string, pass: string) => { success: boolean; error?: string };
  logout: () => void;
  updatePassword: (oldPass: string, newPass: string) => { success: boolean; error?: string };
}

const AUTH_STORAGE_KEY = 'se_admin_session';
const PASS_STORAGE_KEY = 'se_admin_pass';
const DEFAULT_PASS = 'admin123';
const DEFAULT_EMAIL = 'lakshyaright@gmail.com';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      return localStorage.getItem(AUTH_STORAGE_KEY) === 'true';
    } catch {
      return false;
    }
  });

  const [adminEmail, setAdminEmail] = useState<string>(() => {
    try {
      return localStorage.getItem('se_admin_email') || DEFAULT_EMAIL;
    } catch {
      return DEFAULT_EMAIL;
    }
  });

  const getStoredPassword = (): string => {
    try {
      return localStorage.getItem(PASS_STORAGE_KEY) || DEFAULT_PASS;
    } catch {
      return DEFAULT_PASS;
    }
  };

  const login = (emailOrUser: string, pass: string) => {
    const validPass = getStoredPassword();
    const cleanUser = emailOrUser.trim().toLowerCase();
    
    // Accept lakshyaright@gmail.com, admin, or user's email
    const isValidUser =
      cleanUser === 'admin' ||
      cleanUser === DEFAULT_EMAIL.toLowerCase() ||
      cleanUser === adminEmail.toLowerCase() ||
      cleanUser === 'lakshya';

    if (!isValidUser) {
      return { success: false, error: 'Invalid username or email address.' };
    }

    if (pass !== validPass) {
      return { success: false, error: 'Incorrect password. Please try again.' };
    }

    setIsAuthenticated(true);
    try {
      localStorage.setItem(AUTH_STORAGE_KEY, 'true');
      if (emailOrUser.includes('@')) {
        localStorage.setItem('se_admin_email', emailOrUser.trim());
        setAdminEmail(emailOrUser.trim());
      }
    } catch (e) {
      console.error(e);
    }

    return { success: true };
  };

  const logout = () => {
    setIsAuthenticated(false);
    try {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    } catch (e) {
      console.error(e);
    }
  };

  const updatePassword = (oldPass: string, newPass: string) => {
    const currentPass = getStoredPassword();
    if (oldPass !== currentPass) {
      return { success: false, error: 'Current password does not match.' };
    }
    if (!newPass || newPass.length < 6) {
      return { success: false, error: 'New password must be at least 6 characters long.' };
    }
    try {
      localStorage.setItem(PASS_STORAGE_KEY, newPass);
      return { success: true };
    } catch {
      return { success: false, error: 'Failed to save new password to storage.' };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        adminEmail,
        login,
        logout,
        updatePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
