import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useAuctions } from '../../context/AuctionContext';
import { bidService } from '../../services/bid.service';
import { Gavel, Clock, ArrowRight, Trophy } from 'lucide-react';

interface MyBidsPageProps {
  onSelectAuction: (auctionId: string) => void;
  onNavigate: (path: string) => void;
}

export const MyBidsPage: React.FC<MyBidsPageProps> = ({ onSelectAuction, onNavigate }) => {
  const { currentUser } = useAuth();
  const { auctions } = useAuctions();
  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'won' | 'lost'>('active');

  const userBids = currentUser ? bidService.getUserBids(currentUser.id) : [];

  // Group bids by auction
  const auctionMap = new Map<string, { auction: any; myBids: any[] }>();
  userBids.forEach((bid) => {
    if (!auctionMap.has(bid.auctionId)) {
      const auction = auctions.find((a) => a.id === bid.auctionId);
      if (auction) {
        auctionMap.set(bid.auctionId, { auction, myBids: [] });
      }
    }
    const item = auctionMap.get(bid.auctionId);
    if (item) item.myBids.push(bid);
  });

  const auctionItems = Array.from(auctionMap.values()).map(({ auction, myBids }) => {
    const highestMyBid = Math.max(...myBids.map((b) => b.amount));
    const isLeading = auction.highestBidderId === currentUser?.id;
    const isWon = auction.status === 'ended' && auction.winnerId === currentUser?.id;
    const isLost = auction.status === 'ended' && !isWon;

    return {
      auction,
      myBids,
      highestMyBid,
      isLeading,
      isWon,
      isLost,
    };
  });

  const filteredItems = auctionItems.filter((item) => {
    if (activeTab === 'active') return item.auction.status === 'live';
    if (activeTab === 'won') return item.isWon;
    if (activeTab === 'lost') return item.isLost;
    return true;
  });

  return (
    <div className="content-wrapper">
      <div style={{ marginBottom: '28px' }}>
        <h1 className="font-display font-bold text-white text-3xl">
          My Bids Portfolio
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '15px', marginTop: '4px' }}>
          Track your bids across active, won, and past motorcycle auctions.
        </p>
      </div>

      {/* Tabs per PRD Section 25 */}
      <div
        style={{
          display: 'flex',
          gap: '8px',
          borderBottom: '1px solid var(--border-subtle)',
          paddingBottom: '12px',
          marginBottom: '24px',
        }}
      >
        <button
          onClick={() => setActiveTab('active')}
          className={`btn btn-sm ${activeTab === 'active' ? 'btn-primary' : 'btn-secondary'}`}
        >
          Active Live (
          {auctionItems.filter((i) => i.auction.status === 'live').length})
        </button>
        <button
          onClick={() => setActiveTab('won')}
          className={`btn btn-sm ${activeTab === 'won' ? 'btn-primary' : 'btn-secondary'}`}
        >
          Won Auctions ({auctionItems.filter((i) => i.isWon).length})
        </button>
        <button
          onClick={() => setActiveTab('lost')}
          className={`btn btn-sm ${activeTab === 'lost' ? 'btn-primary' : 'btn-secondary'}`}
        >
          Outbid / Lost ({auctionItems.filter((i) => i.isLost).length})
        </button>
        <button
          onClick={() => setActiveTab('all')}
          className={`btn btn-sm ${activeTab === 'all' ? 'btn-primary' : 'btn-secondary'}`}
        >
          All Bids ({auctionItems.length})
        </button>
      </div>

      {/* Table or Cards */}
      {filteredItems.length > 0 ? (
        <div className="table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Motorcycle</th>
                <th>Your Highest Bid</th>
                <th>Current / Final Bid</th>
                <th>Status</th>
                <th>Auction Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map(({ auction, highestMyBid, isLeading, isWon, isLost }) => (
                <tr key={auction.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <img
                        src={auction.bike?.images[0]}
                        alt={auction.bike?.model}
                        style={{
                          width: '54px',
                          height: '38px',
                          borderRadius: '6px',
                          objectFit: 'cover',
                        }}
                      />
                      <div>
                        <div className="font-semibold text-white">
                          {auction.bike?.year} {auction.bike?.brand} {auction.bike?.model}
                        </div>
                        <div className="font-mono text-xs text-muted">
                          {auction.bike?.engineCC}cc • {auction.bike?.location}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="font-display font-bold text-orange text-base">
                      ₹{highestMyBid.toLocaleString('en-IN')}
                    </span>
                  </td>
                  <td>
                    <span className="font-display font-bold text-white text-base">
                      ₹{auction.currentBid.toLocaleString('en-IN')}
                    </span>
                  </td>
                  <td>
                    {auction.status === 'live' ? (
                      isLeading ? (
                        <span className="badge badge-won">HIGHEST BIDDER</span>
                      ) : (
                        <span className="badge badge-lost">OUTBID</span>
                      )
                    ) : isWon ? (
                      <span className="badge badge-won">
                        <Trophy size={11} /> WON
                      </span>
                    ) : (
                      <span className="badge badge-ended">ENDED</span>
                    )}
                  </td>
                  <td className="font-mono text-xs text-secondary">
                    {new Date(auction.endTime).toLocaleDateString([], { day: '2-digit', month: 'short', year: 'numeric' })}
                  </td>
                  <td>
                    <button
                      onClick={() => onSelectAuction(auction.id)}
                      className="btn btn-secondary btn-sm"
                    >
                      {auction.status === 'live' ? 'View / Bid' : 'View Details'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div
          className="card"
          style={{
            padding: '48px 20px',
            textAlign: 'center',
            backgroundColor: 'var(--bg-surface)',
          }}
        >
          <Gavel size={36} style={{ margin: '0 auto 12px auto', color: 'var(--text-muted)' }} />
          <h3 className="font-display font-bold text-white text-lg">
            No Bids in this Tab
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '13px', marginTop: '4px', marginBottom: '20px' }}>
            Check other tabs or join an ongoing live superbike auction now.
          </p>
          <button onClick={() => onNavigate('/auctions')} className="btn btn-primary">
            Explore Live Auctions
          </button>
        </div>
      )}
    </div>
  );
};
