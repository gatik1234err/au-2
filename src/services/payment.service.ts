import { Payment } from '../types';
import { storageService } from './storage.service';
import { authService } from './auth.service';
import { notificationService } from './notification.service';

class PaymentService {
  public getAllPayments(): Payment[] {
    return storageService.getPayments();
  }

  public getUserPayments(userId: string): Payment[] {
    const list = storageService.getPayments();
    return list.filter((p) => p.userId === userId);
  }

  public async processRegistrationPayment(
    userId: string,
    paymentMethod: 'UPI' | 'Credit Card' | 'Net Banking' | 'Wire' = 'UPI'
  ): Promise<{ success: boolean; payment?: Payment; message: string }> {
    // Simulated processing delay
    await new Promise((r) => setTimeout(r, 800));

    const users = storageService.getUsers();
    const user = users.find((u) => u.id === userId);
    if (!user) {
      return { success: false, message: 'User not found' };
    }

    const newPayment: Payment = {
      id: `pay-${Date.now()}`,
      userId,
      userName: user.name,
      amount: 4999, // PRD one-time registration fee
      type: 'registration',
      status: 'success',
      transactionReference: `TXN-${paymentMethod.toUpperCase()}-${Math.floor(10000000 + Math.random() * 90000000)}`,
      createdAt: new Date().toISOString(),
      paymentMethod,
    };

    const payments = storageService.getPayments();
    storageService.savePayments([newPayment, ...payments]);

    // Activate membership
    authService.activateMembership(userId);

    // Notify user
    notificationService.createNotification({
      userId,
      title: 'Membership Activated! 💳',
      message: 'Your ₹4,999 registration fee was received. Lifetime auction access is now active.',
      type: 'payment',
      link: '/dashboard',
    });

    return {
      success: true,
      payment: newPayment,
      message: 'Payment completed successfully. Your membership is now active!',
    };
  }
}

export const paymentService = new PaymentService();
