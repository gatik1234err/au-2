import { User, Bike, Auction, Bid, Payment, Winner, NotificationItem } from '../types';
import {
  INITIAL_USERS,
  INITIAL_BIKES,
  INITIAL_AUCTIONS,
  INITIAL_BIDS,
  INITIAL_PAYMENTS,
  INITIAL_WINNERS,
  INITIAL_NOTIFICATIONS,
} from '../constants/mockData';

const STORAGE_KEYS = {
  USERS: 'destiny_auction_users',
  CURRENT_USER_ID: 'destiny_auction_current_user_id',
  BIKES: 'destiny_auction_bikes',
  AUCTIONS: 'destiny_auction_auctions',
  BIDS: 'destiny_auction_bids',
  PAYMENTS: 'destiny_auction_payments',
  WINNERS: 'destiny_auction_winners',
  NOTIFICATIONS: 'destiny_auction_notifications',
  WATCHLIST: 'destiny_auction_watchlist',
  LOW_CONNECTIVITY: 'destiny_auction_low_conn',
};

class StorageService {
  private get<T>(key: string, fallback: T): T {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : fallback;
    } catch (e) {
      console.error(`Error reading ${key} from storage:`, e);
      return fallback;
    }
  }

  private set<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error(`Error writing ${key} to storage:`, e);
    }
  }

  // Initialize defaults if not present
  public initialize(): void {
    if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
      this.set(STORAGE_KEYS.USERS, INITIAL_USERS);
    }
    if (!localStorage.getItem(STORAGE_KEYS.CURRENT_USER_ID)) {
      this.set(STORAGE_KEYS.CURRENT_USER_ID, 'user-1'); // Default to active member Siddharth
    }
    if (!localStorage.getItem(STORAGE_KEYS.BIKES)) {
      this.set(STORAGE_KEYS.BIKES, INITIAL_BIKES);
    }
    if (!localStorage.getItem(STORAGE_KEYS.AUCTIONS)) {
      this.set(STORAGE_KEYS.AUCTIONS, INITIAL_AUCTIONS);
    }
    if (!localStorage.getItem(STORAGE_KEYS.BIDS)) {
      this.set(STORAGE_KEYS.BIDS, INITIAL_BIDS);
    }
    if (!localStorage.getItem(STORAGE_KEYS.PAYMENTS)) {
      this.set(STORAGE_KEYS.PAYMENTS, INITIAL_PAYMENTS);
    }
    if (!localStorage.getItem(STORAGE_KEYS.WINNERS)) {
      this.set(STORAGE_KEYS.WINNERS, INITIAL_WINNERS);
    }
    if (!localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS)) {
      this.set(STORAGE_KEYS.NOTIFICATIONS, INITIAL_NOTIFICATIONS);
    }
    if (!localStorage.getItem(STORAGE_KEYS.WATCHLIST)) {
      this.set(STORAGE_KEYS.WATCHLIST, ['bike-1', 'bike-3']);
    }
  }

  public resetAllToDefaults(): void {
    localStorage.clear();
    this.initialize();
  }

  // Users
  public getUsers(): User[] {
    return this.get<User[]>(STORAGE_KEYS.USERS, INITIAL_USERS);
  }

  public saveUsers(users: User[]): void {
    this.set(STORAGE_KEYS.USERS, users);
  }

  public getCurrentUserId(): string {
    return this.get<string>(STORAGE_KEYS.CURRENT_USER_ID, 'user-1');
  }

  public setCurrentUserId(id: string): void {
    this.set(STORAGE_KEYS.CURRENT_USER_ID, id);
  }

  // Bikes
  public getBikes(): Bike[] {
    return this.get<Bike[]>(STORAGE_KEYS.BIKES, INITIAL_BIKES);
  }

  public saveBikes(bikes: Bike[]): void {
    this.set(STORAGE_KEYS.BIKES, bikes);
  }

  // Auctions
  public getAuctions(): Auction[] {
    return this.get<Auction[]>(STORAGE_KEYS.AUCTIONS, INITIAL_AUCTIONS);
  }

  public saveAuctions(auctions: Auction[]): void {
    this.set(STORAGE_KEYS.AUCTIONS, auctions);
  }

  // Bids
  public getBids(): Bid[] {
    return this.get<Bid[]>(STORAGE_KEYS.BIDS, INITIAL_BIDS);
  }

  public saveBids(bids: Bid[]): void {
    this.set(STORAGE_KEYS.BIDS, bids);
  }

  // Payments
  public getPayments(): Payment[] {
    return this.get<Payment[]>(STORAGE_KEYS.PAYMENTS, INITIAL_PAYMENTS);
  }

  public savePayments(payments: Payment[]): void {
    this.set(STORAGE_KEYS.PAYMENTS, payments);
  }

  // Winners
  public getWinners(): Winner[] {
    return this.get<Winner[]>(STORAGE_KEYS.WINNERS, INITIAL_WINNERS);
  }

  public saveWinners(winners: Winner[]): void {
    this.set(STORAGE_KEYS.WINNERS, winners);
  }

  // Notifications
  public getNotifications(): NotificationItem[] {
    return this.get<NotificationItem[]>(STORAGE_KEYS.NOTIFICATIONS, INITIAL_NOTIFICATIONS);
  }

  public saveNotifications(notifications: NotificationItem[]): void {
    this.set(STORAGE_KEYS.NOTIFICATIONS, notifications);
  }

  // Watchlist
  public getWatchlist(): string[] {
    return this.get<string[]>(STORAGE_KEYS.WATCHLIST, ['bike-1', 'bike-3']);
  }

  public saveWatchlist(bikeIds: string[]): void {
    this.set(STORAGE_KEYS.WATCHLIST, bikeIds);
  }

  // Low Connectivity Mode
  public isLowConnectivity(): boolean {
    return this.get<boolean>(STORAGE_KEYS.LOW_CONNECTIVITY, false);
  }

  public setLowConnectivity(enabled: boolean): void {
    this.set(STORAGE_KEYS.LOW_CONNECTIVITY, enabled);
  }
}

export const storageService = new StorageService();
