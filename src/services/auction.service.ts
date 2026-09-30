import { Auction, AuctionStatus } from '../types';
import { storageService } from './storage.service';
import { bikeService } from './bike.service';

class AuctionService {
  public getAllAuctions(): Auction[] {
    const auctions = storageService.getAuctions();
    const bikes = bikeService.getAllBikes();
    const now = Date.now();

    // Dynamically reconcile time-based status unless manually ended
    return auctions.map((auction) => {
      const bike = bikes.find((b) => b.id === auction.bikeId);
      const startMs = new Date(auction.startTime).getTime();
      const endMs = new Date(auction.endTime).getTime();

      let derivedStatus: AuctionStatus = auction.status;
      if (auction.status !== 'ended') {
        if (now < startMs) {
          derivedStatus = 'upcoming';
        } else if (now >= startMs && now < endMs) {
          derivedStatus = 'live';
        } else {
          derivedStatus = 'ended';
        }
      }

      return {
        ...auction,
        status: derivedStatus,
        bike,
      };
    });
  }

  public getAuctionById(id: string): Auction | undefined {
    const auctions = this.getAllAuctions();
    return auctions.find((a) => a.id === id);
  }

  public createAuction(data: {
    bikeId: string;
    startingPrice: number;
    minimumIncrement: number;
    reservePrice?: number;
    startTime: string;
    endTime: string;
    featured?: boolean;
  }): Auction {
    const auctions = storageService.getAuctions();
    const now = Date.now();
    const startMs = new Date(data.startTime).getTime();
    const endMs = new Date(data.endTime).getTime();

    let status: AuctionStatus = 'upcoming';
    if (now >= startMs && now < endMs) {
      status = 'live';
    } else if (now >= endMs) {
      status = 'ended';
    }

    const newAuction: Auction = {
      id: `auction-${Date.now()}`,
      bikeId: data.bikeId,
      startingPrice: data.startingPrice,
      currentBid: data.startingPrice,
      minimumIncrement: data.minimumIncrement || 5000,
      reservePrice: data.reservePrice,
      startTime: data.startTime,
      endTime: data.endTime,
      status,
      totalBids: 0,
      featured: !!data.featured,
    };

    storageService.saveAuctions([newAuction, ...auctions]);
    return newAuction;
  }

  public updateAuction(id: string, updates: Partial<Auction>): Auction | null {
    const auctions = storageService.getAuctions();
    let updatedAuction: Auction | null = null;
    const updated = auctions.map((a) => {
      if (a.id === id) {
        updatedAuction = { ...a, ...updates };
        return updatedAuction;
      }
      return a;
    });
    storageService.saveAuctions(updated);
    return updatedAuction;
  }

  public endAuctionManually(id: string): Auction | null {
    return this.updateAuction(id, {
      status: 'ended',
      endTime: new Date().toISOString(),
    });
  }

  public deleteAuction(id: string): boolean {
    const auctions = storageService.getAuctions();
    const filtered = auctions.filter((a) => a.id !== id);
    if (filtered.length !== auctions.length) {
      storageService.saveAuctions(filtered);
      return true;
    }
    return false;
  }
}

export const auctionService = new AuctionService();
