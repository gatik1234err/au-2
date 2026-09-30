import { NotificationItem } from '../types';
import { storageService } from './storage.service';

class NotificationService {
  public getNotifications(userId?: string): NotificationItem[] {
    const list = storageService.getNotifications();
    if (!userId) return list;
    return list.filter((n) => n.userId === userId || n.userId === 'all');
  }

  public getUnreadCount(userId?: string): number {
    const list = this.getNotifications(userId);
    return list.filter((n) => !n.read).length;
  }

  public markAsRead(id: string): void {
    const list = storageService.getNotifications();
    const updated = list.map((n) => (n.id === id ? { ...n, read: true } : n));
    storageService.saveNotifications(updated);
  }

  public markAllAsRead(userId?: string): void {
    const list = storageService.getNotifications();
    const updated = list.map((n) => {
      if (!userId || n.userId === userId || n.userId === 'all') {
        return { ...n, read: true };
      }
      return n;
    });
    storageService.saveNotifications(updated);
  }

  public createNotification(data: Omit<NotificationItem, 'id' | 'createdAt' | 'read'>): NotificationItem {
    const list = storageService.getNotifications();
    const newItem: NotificationItem = {
      ...data,
      id: `notif-${Date.now()}`,
      createdAt: new Date().toISOString(),
      read: false,
    };
    storageService.saveNotifications([newItem, ...list]);
    return newItem;
  }
}

export const notificationService = new NotificationService();
