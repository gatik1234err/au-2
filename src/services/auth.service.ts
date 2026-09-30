import { User } from '../types';
import { storageService } from './storage.service';

export interface RegisterDTO {
  name: string;
  email: string;
  phone: string;
  password?: string;
}

class AuthService {
  public getCurrentUser(): User | null {
    const userId = storageService.getCurrentUserId();
    if (!userId || userId === 'guest') return null;
    const users = storageService.getUsers();
    return users.find((u) => u.id === userId) || null;
  }

  public login(emailOrPhone: string): { success: boolean; user?: User; message?: string } {
    const users = storageService.getUsers();
    const query = emailOrPhone.trim().toLowerCase();
    const user = users.find(
      (u) => u.email.toLowerCase() === query || u.phone.replace(/\s+/g, '') === query.replace(/\s+/g, '')
    );

    if (!user) {
      return { success: false, message: 'No account found with this email or phone' };
    }

    if (user.membershipStatus === 'suspended') {
      return { success: false, message: 'Your account is currently suspended. Please contact support.' };
    }

    storageService.setCurrentUserId(user.id);
    return { success: true, user };
  }

  public register(data: RegisterDTO): { success: boolean; user: User } {
    const users = storageService.getUsers();
    const newUser: User = {
      id: `user-${Date.now()}`,
      name: data.name,
      email: data.email,
      phone: data.phone,
      avatar: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80`,
      role: 'user',
      membershipStatus: 'pending',
      registrationPaymentStatus: 'pending',
      createdAt: new Date().toISOString(),
      kycVerified: false,
      totalBidsCount: 0,
      totalWinsCount: 0,
    };

    const updated = [newUser, ...users];
    storageService.saveUsers(updated);
    storageService.setCurrentUserId(newUser.id);
    return { success: true, user: newUser };
  }

  public activateMembership(userId: string): User | null {
    const users = storageService.getUsers();
    let updatedUser: User | null = null;
    const updated = users.map((u) => {
      if (u.id === userId) {
        updatedUser = {
          ...u,
          membershipStatus: 'active',
          registrationPaymentStatus: 'paid',
          membershipId: `DA-RIDER-${Math.floor(1000 + Math.random() * 9000)}`,
        };
        return updatedUser;
      }
      return u;
    });
    storageService.saveUsers(updated);
    return updatedUser;
  }

  public switchUser(userId: string): User | null {
    if (userId === 'guest') {
      storageService.setCurrentUserId('guest');
      return null;
    }
    const users = storageService.getUsers();
    const user = users.find((u) => u.id === userId);
    if (user) {
      storageService.setCurrentUserId(user.id);
      return user;
    }
    return null;
  }

  public logout(): void {
    storageService.setCurrentUserId('guest');
  }
}

export const authService = new AuthService();
