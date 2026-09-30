import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Auction } from '../types';
import { auctionService } from '../services/auction.service';
import { bidService, PlaceBidResult } from '../services/bid.service';
import { storageService } from '../services/storage.service';
import { useToast } from './ToastContext';
import confetti from 'canvas-confetti';

interface AuctionContextType {
  auctions: Auction[];
  watchlist: string[];
  isLowConn: boolean;
  toggleLowConn: () => void;
  toggleWatchlist: (bikeId: string) => void;
  isWatchlisted: (bikeId: string) => boolean;
  refreshAuctions: () => void;
  placeBid: (auctionId: string, amount: number) => Promise<PlaceBidResult>;
  simulateCompetitorBid: (auctionId: string) => void;
  getAuction: (id: string) => Auction | undefined;
}

const AuctionContext = createContext<AuctionContextType | undefined>(undefined);

export const AuctionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { showToast } = useToast();
  const [auctions, setAuctions] = useState<Auction[]>([]);
  const [watchlist, setWatchlist] = useState<string[]>([]);
  const [isLowConn, setIsLowConn] = useState<boolean>(false);

  const refreshAuctions = useCallback(() => {
    const list = auctionService.getAllAuctions();
    setAuctions(list);
  }, []);

  useEffect(() => {
    refreshAuctions();
    setWatchlist(storageService.getWatchlist());
    setIsLowConn(storageService.isLowConnectivity());

    // Sync auction statuses every 5 seconds for countdown precision
    const interval = setInterval(() => {
      refreshAuctions();
    }, 5000);

    return () => clearInterval(interval);
  }, [refreshAuctions]);

  const toggleLowConn = () => {
    const nextState = !isLowConn;
    setIsLowConn(nextState);
    storageService.setLowConnectivity(nextState);
    showToast({
      type: nextState ? 'warning' : 'info',
      title: nextState ? 'Low-Connectivity Mode Active' : 'Normal Network Restored',
      message: nextState
        ? 'Simulating high-latency / poor cellular connection on highway routes.'
        : 'Fast 5G / Broadband connection restored.',
    });
  };

  const toggleWatchlist = (bikeId: string) => {
    const list = storageService.getWatchlist();
    let updated: string[];
    const isSaved = list.includes(bikeId);
    if (isSaved) {
      updated = list.filter((id) => id !== bikeId);
      showToast({
        type: 'info',
        title: 'Removed from Watchlist',
        message: 'Motorcycle removed from your saved list.',
      });
    } else {
      updated = [...list, bikeId];
      showToast({
        type: 'success',
        title: 'Saved to Watchlist ♥',
        message: 'You will receive reminders before this auction closes.',
      });
    }
    setWatchlist(updated);
    storageService.saveWatchlist(updated);
  };

  const isWatchlisted = (bikeId: string) => watchlist.includes(bikeId);

  const getAuction = (id: string): Auction | undefined => {
    return auctions.find((a) => a.id === id) || auctionService.getAuctionById(id);
  };

  const placeBid = async (auctionId: string, amount: number): Promise<PlaceBidResult> => {
    const result = await bidService.placeBid(auctionId, amount);

    if (result.success) {
      refreshAuctions();
      showToast({
        type: 'success',
        title: 'Highest Bidder! 🔥',
        message: result.message,
      });

      // Subtle confetti blast for celebratory feel
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#FF5A1F', '#FFA07A', '#FFFFFF'],
        });
      } catch (e) {
        // Safe fallback
      }
    } else {
      showToast({
        type: 'error',
        title: 'Bid Rejected',
        message: result.message,
      });
    }

    return result;
  };

  const simulateCompetitorBid = (auctionId: string) => {
    const botBid = bidService.simulateCompetitorBid(auctionId);
    if (botBid) {
      refreshAuctions();
      showToast({
        type: 'warning',
        title: 'Competitor Placed Bid! 🚨',
        message: `${botBid.userName} bid ₹${botBid.amount.toLocaleString('en-IN')}. Current bid raised!`,
      });
    }
  };

  return (
    <AuctionContext.Provider
      value={{
        auctions,
        watchlist,
        isLowConn,
        toggleLowConn,
        toggleWatchlist,
        isWatchlisted,
        refreshAuctions,
        placeBid,
        simulateCompetitorBid,
        getAuction,
      }}
    >
      {children}
    </AuctionContext.Provider>
  );
};

export const useAuctions = () => {
  const context = useContext(AuctionContext);
  if (!context) {
    throw new Error('useAuctions must be used within an AuctionProvider');
  }
  return context;
};
