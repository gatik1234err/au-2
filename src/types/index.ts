export type MembershipStatus = 'pending' | 'active' | 'suspended';
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded';
export type AuctionStatus = 'upcoming' | 'live' | 'ended';
export type BidStatus = 'accepted' | 'rejected' | 'outbid';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  role: 'user' | 'admin';
  membershipStatus: MembershipStatus;
  registrationPaymentStatus: PaymentStatus;
  membershipId?: string;
  createdAt: string;
  kycVerified: boolean;
  totalBidsCount?: number;
  totalWinsCount?: number;
}

export interface Bike {
  id: string;
  brand: string;
  model: string;
  variant?: string;
  year: number;
  engineCC: number;
  powerHP?: number;
  fuelType: string;
  transmission: string;
  mileage: number; // in km
  color: string;
  condition: 'Mint / Collector' | 'Excellent' | 'Very Good' | 'Good' | 'Restored';
  location: string;
  description: string;
  images: string[];
  features: string[];
  vinLast4?: string;
  registrationNumber?: string;
  ownershipCount: number;
  insuranceValidTill?: string;
  inspectionScore?: number; // out of 100
}

export interface Auction {
  id: string;
  bikeId: string;
  bike?: Bike;
  startingPrice: number;
  currentBid: number;
  minimumIncrement: number;
  reservePrice?: number;
  startTime: string; // ISO string
  endTime: string;   // ISO string
  status: AuctionStatus;
  totalBids: number;
  highestBidderId?: string;
  highestBidderName?: string;
  winnerId?: string;
  featured?: boolean;
}

export interface Bid {
  id: string;
  auctionId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  amount: number;
  createdAt: string;
  status: 'accepted' | 'rejected';
}

export interface Payment {
  id: string;
  userId: string;
  userName: string;
  amount: number;
  type: 'registration' | 'deposit' | 'settlement';
  status: 'pending' | 'success' | 'failed' | 'refunded';
  transactionReference: string;
  createdAt: string;
  paymentMethod: 'UPI' | 'Credit Card' | 'Net Banking' | 'Wire';
}

export interface Winner {
  id: string;
  auctionId: string;
  bikeTitle: string;
  winnerId: string;
  winnerName: string;
  winningBid: number;
  auctionEndDate: string;
  settlementStatus: 'pending_payment' | 'paid' | 'delivered' | 'cancelled';
  deliveryCity: string;
}

export interface NotificationItem {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'outbid' | 'auction_ending' | 'win' | 'payment' | 'system';
  createdAt: string;
  read: boolean;
  link?: string;
}

export interface AuctionFilterState {
  search: string;
  brand: string;
  category: string;
  status: 'all' | 'live' | 'upcoming' | 'ended';
  minPrice: number;
  maxPrice: number;
  minCC: number;
  maxCC: number;
  sortBy: 'endingSoon' | 'newlyAdded' | 'priceLow' | 'priceHigh' | 'mostBids';
}
