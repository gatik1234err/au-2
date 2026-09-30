import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { User } from '../types';
import { authService, RegisterDTO } from '../services/auth.service';
import { storageService } from '../services/storage.service';
import { useToast } from './ToastContext';

interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isActiveMember: boolean;
  isPendingMember: boolean;
  login: (emailOrPhone: string) => boolean;
  register: (data: RegisterDTO) => User;
  logout: () => void;
  activateMembership: () => Promise<boolean>;
  switchUserRole: (type: 'active' | 'pending' | 'admin' | 'guest') => void;
  refreshUser: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { showToast } = useToast();
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Initialize storage defaults on mount
  useEffect(() => {
    storageService.initialize();
    const user = authService.getCurrentUser();
    setCurrentUser(user);
  }, []);

  const refreshUser = useCallback(() => {
    const user = authService.getCurrentUser();
    setCurrentUser(user);
  }, []);

  const login = (emailOrPhone: string): boolean => {
    const res = authService.login(emailOrPhone);
    if (res.success && res.user) {
      setCurrentUser(res.user);
      showToast({
        type: 'success',
        title: `Welcome back, ${res.user.name.split(' ')[0]}!`,
        message: 'Signed in successfully.',
      });
      return true;
    } else {
      showToast({
        type: 'error',
        title: 'Sign In Failed',
        message: res.message || 'Invalid credentials',
      });
      return false;
    }
  };

  const register = (data: RegisterDTO): User => {
    const res = authService.register(data);
    setCurrentUser(res.user);
    showToast({
      type: 'success',
      title: 'Account Created',
      message: 'Complete your registration payment to activate bidding.',
    });
    return res.user;
  };

  const logout = () => {
    authService.logout();
    setCurrentUser(null);
    showToast({
      type: 'info',
      title: 'Logged Out',
      message: 'You have been signed out of DestinyAuction.',
    });
  };

  const activateMembership = async (): Promise<boolean> => {
    if (!currentUser) return false;
    const updated = authService.activateMembership(currentUser.id);
    if (updated) {
      setCurrentUser(updated);
      showToast({
        type: 'success',
        title: 'Membership Activated! 🏆',
        message: 'You now have lifetime access to live motorcycle auctions.',
      });
      return true;
    }
    return false;
  };

  const switchUserRole = (type: 'active' | 'pending' | 'admin' | 'guest') => {
    let targetId = 'user-1';
    if (type === 'guest') targetId = 'guest';
    else if (type === 'admin') targetId = 'user-admin';
    else if (type === 'pending') targetId = 'user-pending';
    else if (type === 'active') targetId = 'user-1';

    const user = authService.switchUser(targetId);
    setCurrentUser(user);

    showToast({
      type: 'info',
      title: 'Demo Persona Switched',
      message:
        type === 'guest'
          ? 'Browsing as Unauthenticated Visitor'
          : type === 'admin'
          ? 'Switched to Auction House Administrator'
          : type === 'pending'
          ? 'Switched to Registered User (Fee Pending)'
          : 'Switched to Siddharth Reddy (Active Lifetime Member)',
    });
  };

  const isAuthenticated = !!currentUser;
  const isAdmin = currentUser?.role === 'admin';
  const isActiveMember = currentUser?.membershipStatus === 'active' && currentUser?.registrationPaymentStatus === 'paid';
  const isPendingMember = currentUser?.membershipStatus === 'pending' || currentUser?.registrationPaymentStatus === 'pending';

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated,
        isAdmin,
        isActiveMember,
        isPendingMember,
        login,
        register,
        logout,
        activateMembership,
        switchUserRole,
        refreshUser,
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
