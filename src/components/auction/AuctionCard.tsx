import React from 'react';
import { Auction } from '../../types';
import { CountdownTimer } from './CountdownTimer';
import { useAuctions } from '../../context/AuctionContext';
import { Heart, Flame, ShieldCheck, MapPin, Gauge } from 'lucide-react';

interface AuctionCardProps {
  auction: Auction;
  onSelect: (auctionId: string) => void;
}

export const AuctionCard: React.FC<AuctionCardProps> = ({ auction, onSelect }) => {
  const { isWatchlisted, toggleWatchlist } = useAuctions();
  const bike = auction.bike;
  const isSaved = bike ? isWatchlisted(bike.id) : false;

  const formatINR = (val: number) => {
    return '₹' + val.toLocaleString('en-IN');
  };

  const statusBadge = () => {
    switch (auction.status) {
      case 'live':
        return (
          <span className="badge badge-live">
            <span className="pulse-dot" /> LIVE
          </span>
        );
      case 'upcoming':
        return (
          <span className="badge badge-upcoming">
            UPCOMING
          </span>
        );
      case 'ended':
        return (
          <span className="badge badge-ended">
            ENDED
          </span>
        );
    }
  };

  const mainImage =
    bike?.images && bike.images.length > 0
      ? bike.images[0]
      : 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800';

  return (
    <div
      className="card card-hoverable"
      style={{
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        position: 'relative',
      }}
      onClick={() => onSelect(auction.id)}
    >
      {/* Bike Image Container */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '220px',
          overflow: 'hidden',
          backgroundColor: '#0F1215',
        }}
      >
        <img
          src={mainImage}
          alt={`${bike?.brand} ${bike?.model}`}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.4s ease',
          }}
          onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
          onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          loading="lazy"
        />

        {/* Gradient shadow over bottom of image */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(24, 28, 32, 0.95) 0%, transparent 60%)',
          }}
        />

        {/* Top Badges */}
        <div
          style={{
            position: 'absolute',
            top: '12px',
            left: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            zIndex: 2,
          }}
        >
          {statusBadge()}
          {bike?.inspectionScore && (
            <span
              className="badge"
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                backdropFilter: 'blur(6px)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#34D399',
                fontSize: '10px',
              }}
            >
              <ShieldCheck size={11} /> {bike.inspectionScore}/100 Verified
            </span>
          )}
        </div>

        {/* Watchlist Toggle */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (bike) toggleWatchlist(bike.id);
          }}
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            width: '34px',
            height: '34px',
            borderRadius: '50%',
            backgroundColor: 'rgba(0, 0, 0, 0.65)',
            backdropFilter: 'blur(6px)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 2,
            transition: 'transform 0.2s',
          }}
          title={isSaved ? 'Remove from Watchlist' : 'Add to Watchlist'}
        >
          <Heart
            size={16}
            color={isSaved ? '#FF5A1F' : '#FFFFFF'}
            fill={isSaved ? '#FF5A1F' : 'transparent'}
          />
        </button>

        {/* Image bottom info: Year & Brand */}
        <div
          style={{
            position: 'absolute',
            bottom: '10px',
            left: '14px',
            right: '14px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
          }}
        >
          <div>
            <span
              className="font-mono text-xs text-orange font-bold"
              style={{ letterSpacing: '0.08em' }}
            >
              {bike?.year} • {bike?.brand.toUpperCase()}
            </span>
            <h3
              className="font-display font-bold text-white text-lg"
              style={{ lineHeight: 1.2, marginTop: '2px' }}
            >
              {bike?.model}
            </h3>
          </div>
          {bike?.location && (
            <div
              className="flex items-center gap-1 text-xs text-secondary font-mono"
              style={{ fontSize: '11px' }}
            >
              <MapPin size={11} className="text-orange" />
              <span>{bike.location.split(',')[0]}</span>
            </div>
          )}
        </div>
      </div>

      {/* Card Content Body */}
      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', flex: 1, gap: '14px' }}>
        {/* Specs Pill Summary */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '12px',
            color: 'var(--text-secondary)',
            borderBottom: '1px solid var(--border-subtle)',
            paddingBottom: '12px',
            flexWrap: 'wrap',
          }}
        >
          <span className="flex items-center gap-1">
            <Gauge size={12} className="text-silver" />
            <strong className="text-white">{bike?.engineCC}cc</strong>
          </span>
          <span>•</span>
          <span>{bike?.fuelType.split(' ')[0]}</span>
          <span>•</span>
          <span>{bike?.mileage.toLocaleString('en-IN')} km</span>
          <span>•</span>
          <span style={{ color: 'var(--accent-silver)' }}>{bike?.condition}</span>
        </div>

        {/* Price & Bids Section */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <div style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-muted)', fontFamily: 'var(--font-display)', fontWeight: 600 }}>
              {auction.status === 'ended' ? 'Winning Bid' : auction.status === 'upcoming' ? 'Starting Bid' : 'Current Bid'}
            </div>
            <div
              className="font-display font-bold text-white"
              style={{
                fontSize: '22px',
                color: auction.status === 'live' ? 'var(--text-primary)' : 'var(--text-secondary)',
                marginTop: '2px',
              }}
            >
              {formatINR(auction.currentBid)}
            </div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <div
              className="font-mono text-xs flex items-center gap-1 justify-end"
              style={{ color: auction.totalBids > 0 ? 'var(--accent-orange)' : 'var(--text-muted)' }}
            >
              <Flame size={13} />
              <span>{auction.totalBids} {auction.totalBids === 1 ? 'Bid' : 'Bids'}</span>
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
              Min inc: {formatINR(auction.minimumIncrement)}
            </div>
          </div>
        </div>

        {/* Countdown & CTA */}
        <div
          style={{
            marginTop: 'auto',
            paddingTop: '12px',
            borderTop: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '10px',
          }}
        >
          <div>
            <div style={{ fontSize: '10px', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.05em' }}>
              {auction.status === 'upcoming' ? 'STARTS IN' : auction.status === 'ended' ? 'STATUS' : 'ENDS IN'}
            </div>
            <CountdownTimer
              endTime={auction.endTime}
              startTime={auction.startTime}
              status={auction.status}
              compact
            />
          </div>

          <button
            className={`btn btn-sm ${
              auction.status === 'live' ? 'btn-primary' : 'btn-secondary'
            }`}
            style={{ padding: '8px 14px' }}
          >
            {auction.status === 'live' ? 'Bid Now' : 'View Details'}
          </button>
        </div>
      </div>
    </div>
  );
};
