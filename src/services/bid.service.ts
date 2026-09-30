import { Bid } from '../types';
import { storageService } from './storage.service';
import { auctionService } from './auction.service';
import { authService } from './auth.service';
import { notificationService } from './notification.service';

export interface PlaceBidResult {
  success: boolean;
  bid?: Bid;
  message: string;
  code?: 'NOT_LOGGED_IN' | 'MEMBERSHIP_PENDING' | 'AUCTION_ENDED' | 'BID_TOO_LOW' | 'NETWORK_ERROR' | 'SUCCESS';
}

class BidService {
  public getAllBids(): Bid[] {
    return storageService.getBids();
  }

  public getBidsByAuctionId(auctionId: string): Bid[] {
    const bids = storageService.getBids();
    return bids
      .filter((b) => b.auctionId === auctionId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  public getUserBids(userId: string): Bid[] {
    const bids = storageService.getBids();
    return bids
      .filter((b) => b.userId === userId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  public async placeBid(auctionId: string, amount: number): Promise<PlaceBidResult> {
    const currentUser = authService.getCurrentUser();

    // Check low connectivity
    if (storageService.isLowConnectivity()) {
      // Small simulated latency
      await new Promise((r) => setTimeout(r, 600));
    }

    if (!currentUser) {
      return {
        success: false,
        message: 'Registration & login is required to participate in bidding.',
        code: 'NOT_LOGGED_IN',
      };
    }

    if (currentUser.membershipStatus !== 'active' || currentUser.registrationPaymentStatus !== 'paid') {
      return {
        success: false,
        message: 'Complete your one-time registration payment to unlock lifetime bidding.',
        code: 'MEMBERSHIP_PENDING',
      };
    }

    const auction = auctionService.getAuctionById(auctionId);
    if (!auction) {
      return {
        success: false,
        message: 'Auction not found.',
        code: 'AUCTION_ENDED',
      };
    }

    if (auction.status !== 'live') {
      return {
        success: false,
        message: auction.status === 'upcoming' ? 'This auction has not opened yet.' : 'This auction has ended.',
        code: 'AUCTION_ENDED',
      };
    }

    const minAllowed = auction.currentBid + auction.minimumIncrement;
    if (amount < minAllowed) {
      return {
        success: false,
        message: `Your bid must be at least ₹${minAllowed.toLocaleString('en-IN')}`,
        code: 'BID_TOO_LOW',
      };
    }

    // Previous highest bidder to notify
    const previousHighestBidderId = auction.highestBidderId;

    const newBid: Bid = {
      id: `bid-${Date.now()}`,
      auctionId,
      userId: currentUser.id,
      userName: currentUser.name,
      userAvatar: currentUser.avatar,
      amount,
      createdAt: new Date().toISOString(),
      status: 'accepted',
    };

    // Save bid
    const bids = storageService.getBids();
    storageService.saveBids([newBid, ...bids]);

    // Update auction
    auctionService.updateAuction(auctionId, {
      currentBid: amount,
      totalBids: auction.totalBids + 1,
      highestBidderId: currentUser.id,
      highestBidderName: currentUser.name,
    });

    // Notify previous highest bidder if different from current
    if (previousHighestBidderId && previousHighestBidderId !== currentUser.id) {
      notificationService.createNotification({
        userId: previousHighestBidderId,
        title: 'Outbid Alert 🔥',
        message: `${currentUser.name} outbid you with ₹${amount.toLocaleString('en-IN')} on ${
          auction.bike?.model || 'the bike'
        }.`,
        type: 'outbid',
        link: `/auctions/${auctionId}`,
      });
    }

    return {
      success: true,
      bid: newBid,
      message: `Bid of ₹${amount.toLocaleString('en-IN')} placed successfully!`,
      code: 'SUCCESS',
    };
  }

  // Simulated bot bid for live interactive excitement
  public simulateCompetitorBid(auctionId: string): Bid | null {
    const auction = auctionService.getAuctionById(auctionId);
    if (!auction || auction.status !== 'live') return null;

    const competitors = [
      { name: 'Rohan Varma', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&auto=format&fit=crop&q=80' },
      { name: 'Aditya Singhal', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80' },
      { name: 'Devendra Joshi', avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=100&auto=format&fit=crop&q=80' },
    ];
    const comp = competitors[Math.floor(Math.random() * competitors.length)];
    const newAmount = auction.currentBid + auction.minimumIncrement;

    const botBid: Bid = {
      id: `bid-bot-${Date.now()}`,
      auctionId,
      userId: `bot-${Date.now()}`,
      userName: comp.name,
      userAvatar: comp.avatar,
      amount: newAmount,
      createdAt: new Date().toISOString(),
      status: 'accepted',
    };

    const bids = storageService.getBids();
    storageService.saveBids([botBid, ...bids]);

    const prevBidder = auction.highestBidderId;

    auctionService.updateAuction(auctionId, {
      currentBid: newAmount,
      totalBids: auction.totalBids + 1,
      highestBidderId: botBid.userId,
      highestBidderName: comp.name,
    });

    if (prevBidder && prevBidder.startsWith('user-')) {
      notificationService.createNotification({
        userId: prevBidder,
        title: 'Outbid Alert 🔥',
        message: `${comp.name} just outbid you with ₹${newAmount.toLocaleString('en-IN')}!`,
        type: 'outbid',
        link: `/auctions/${auctionId}`,
      });
    }

    return botBid;
  }
}

export const bidService = new BidService();
