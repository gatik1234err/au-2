import React from 'react';
import { useAuctions } from '../../context/AuctionContext';
import { AuctionCard } from '../../components/auction/AuctionCard';
import { Heart, ArrowRight } from 'lucide-react';

interface WatchlistPageProps {
  onSelectAuction: (auctionId: string) => void;
  onNavigate: (path: string) => void;
}

export const WatchlistPage: React.FC<WatchlistPageProps> = ({
  onSelectAuction,
  onNavigate,
}) => {
  const { auctions, watchlist } = useAuctions();

  const watchlistedAuctions = auctions.filter((a) => a.bike && watchlist.includes(a.bike.id));

  return (
    <div className="content-wrapper">
      <div style={{ marginBottom: '32px' }}>
        <div className="badge badge-orange" style={{ marginBottom: '8px' }}>
          Saved Inventory
        </div>
        <h1 className="font-display font-bold text-white text-3xl">
          MY WATCHLIST ({watchlistedAuctions.length})
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '15px', marginTop: '4px' }}>
          Keep track of upcoming and active auctions you are monitoring.
        </p>
      </div>

      {watchlistedAuctions.length > 0 ? (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: '24px',
          }}
        >
          {watchlistedAuctions.map((auction) => (
            <AuctionCard
              key={auction.id}
              auction={auction}
              onSelect={onSelectAuction}
            />
          ))}
        </div>
      ) : (
        <div
          className="card"
          style={{
            padding: '60px 20px',
            textAlign: 'center',
            backgroundColor: 'var(--bg-surface)',
          }}
        >
          <Heart size={44} style={{ margin: '0 auto 16px auto', color: 'var(--text-muted)' }} />
          <h3 className="font-display font-bold text-white text-xl">
            Your Watchlist is Empty
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginTop: '6px', maxWidth: '380px', margin: '6px auto 20px auto' }}>
            Tap the heart icon on any superbike listing to track its countdown and receive outbid notifications.
          </p>
          <button onClick={() => onNavigate('/auctions')} className="btn btn-primary">
            Explore Auctions
          </button>
        </div>
      )}
    </div>
  );
};
