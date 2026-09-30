import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useAuctions } from '../../context/AuctionContext';
import { bidService } from '../../services/bid.service';
import { CountdownTimer } from '../../components/auction/CountdownTimer';
import {
  Gavel,
  Trophy,
  Heart,
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Flame,
  ShieldCheck,
} from 'lucide-react';

interface UserDashboardPageProps {
  onNavigate: (path: string) => void;
  onSelectAuction: (auctionId: string) => void;
}

export const UserDashboardPage: React.FC<UserDashboardPageProps> = ({
  onNavigate,
  onSelectAuction,
}) => {
  const { currentUser, isActiveMember, isPendingMember } = useAuth();
  const { auctions, watchlist } = useAuctions();

  const userBids = currentUser ? bidService.getUserBids(currentUser.id) : [];

  // Group bids by auction
  const userAuctionIds = Array.from(new Set(userBids.map((b) => b.auctionId)));
  const userAuctions = auctions.filter((a) => userAuctionIds.includes(a.id));

  const activeAuctionsJoined = userAuctions.filter((a) => a.status === 'live');
  const wonAuctions = auctions.filter((a) => a.winnerId === currentUser?.id || (a.status === 'ended' && a.highestBidderId === currentUser?.id));

  return (
    <div className="content-wrapper">
      {/* Dashboard Greeting Header per PRD Section 24 */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <h1 className="font-display font-bold text-white text-3xl">
              Good day, {currentUser?.name || 'Rider'}.
            </h1>
            {isActiveMember ? (
              <span className="badge badge-won" title="Perpetual lifetime auction privileges">
                <CheckCircle2 size={12} /> Lifetime Active
              </span>
            ) : isPendingMember ? (
              <span className="badge badge-lost" style={{ backgroundColor: '#F59E0B22', color: '#F59E0B' }}>
                Payment Pending
              </span>
            ) : null}
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '15px', marginTop: '4px' }}>
            Ready to find your next ride? Here is your live auction summary.
          </p>
        </div>

        {isPendingMember && (
          <button
            onClick={() => onNavigate('/register')}
            className="btn btn-primary"
            style={{ padding: '10px 18px' }}
          >
            Pay ₹4,999 Registration Fee
          </button>
        )}
      </div>

      {/* Summary KPI Cards per PRD Section 24 */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '18px',
          marginBottom: '36px',
        }}
      >
        <div className="card" style={{ padding: '20px', backgroundColor: 'var(--bg-surface)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span className="text-xs text-muted uppercase font-display font-semibold">Active Live Bids</span>
            <div style={{ color: 'var(--accent-orange)' }}>
              <Flame size={20} />
            </div>
          </div>
          <div className="font-display font-bold text-white text-3xl" style={{ marginTop: '8px' }}>
            {activeAuctionsJoined.length.toString().padStart(2, '0')}
          </div>
          <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>
            In live bidding auctions
          </div>
        </div>

        <div className="card" style={{ padding: '20px', backgroundColor: 'var(--bg-surface)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span className="text-xs text-muted uppercase font-display font-semibold">Winning Auctions</span>
            <div style={{ color: '#10B981' }}>
              <Trophy size={20} />
            </div>
          </div>
          <div className="font-display font-bold text-white text-3xl" style={{ marginTop: '8px' }}>
            {wonAuctions.length.toString().padStart(2, '0')}
          </div>
          <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Auctions won & secured
          </div>
        </div>

        <div className="card" style={{ padding: '20px', backgroundColor: 'var(--bg-surface)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span className="text-xs text-muted uppercase font-display font-semibold">Total Bids Placed</span>
            <div style={{ color: 'var(--accent-silver)' }}>
              <Gavel size={20} />
            </div>
          </div>
          <div className="font-display font-bold text-white text-3xl" style={{ marginTop: '8px' }}>
            {userBids.length.toString().padStart(2, '0')}
          </div>
          <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Across all time
          </div>
        </div>

        <div className="card" style={{ padding: '20px', backgroundColor: 'var(--bg-surface)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span className="text-xs text-muted uppercase font-display font-semibold">Watchlist</span>
            <div style={{ color: '#EF4444' }}>
              <Heart size={20} fill="#EF4444" />
            </div>
          </div>
          <div className="font-display font-bold text-white text-3xl" style={{ marginTop: '8px' }}>
            {watchlist.length.toString().padStart(2, '0')}
          </div>
          <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Saved motorcycles
          </div>
        </div>
      </div>

      {/* Active Bids Section per PRD Section 24 */}
      <div style={{ marginBottom: '40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
          <div>
            <h2 className="font-display font-bold text-white text-xl">
              Active Bids Monitor
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>
              Real-time standing across your currently joined auctions
            </p>
          </div>

          <button
            onClick={() => onNavigate('/dashboard/bids')}
            className="btn btn-ghost btn-sm"
            style={{ color: 'var(--accent-orange)' }}
          >
            <span>All Bids History</span>
            <ArrowRight size={14} />
          </button>
        </div>

        {activeAuctionsJoined.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {activeAuctionsJoined.map((auction) => {
              const bike = auction.bike;
              const isLeading = auction.highestBidderId === currentUser?.id;
              const myHighestBid = Math.max(
                ...userBids.filter((b) => b.auctionId === auction.id).map((b) => b.amount),
                0
              );

              return (
                <div
                  key={auction.id}
                  className="card"
                  style={{
                    padding: '18px 20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '16px',
                    borderLeft: isLeading ? '4px solid #10B981' : '4px solid #EF4444',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <img
                      src={bike?.images[0]}
                      alt={bike?.model}
                      style={{
                        width: '70px',
                        height: '50px',
                        borderRadius: 'var(--radius-md)',
                        objectFit: 'cover',
                      }}
                    />
                    <div>
                      <div className="font-semibold text-white text-base">
                        {bike?.year} {bike?.brand} {bike?.model}
                      </div>
                      <div className="text-xs text-muted font-mono" style={{ marginTop: '2px' }}>
                        {bike?.engineCC}cc • {bike?.location}
                      </div>
                    </div>
                  </div>

                  {/* Standing Bids */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                    <div>
                      <div className="text-xs text-muted uppercase">Current Highest</div>
                      <div className="font-display font-bold text-white text-lg">
                        ₹{auction.currentBid.toLocaleString('en-IN')}
                      </div>
                    </div>

                    <div>
                      <div className="text-xs text-muted uppercase">Your Highest</div>
                      <div className="font-display font-bold text-orange text-lg">
                        ₹{myHighestBid.toLocaleString('en-IN')}
                      </div>
                    </div>

                    {/* Position Badge */}
                    <div>
                      {isLeading ? (
                        <span className="badge badge-won" style={{ padding: '6px 12px' }}>
                          HIGHEST BIDDER
                        </span>
                      ) : (
                        <span className="badge badge-lost" style={{ padding: '6px 12px' }}>
                          OUTBID
                        </span>
                      )}
                    </div>

                    {/* Countdown */}
                    <div style={{ minWidth: '100px' }}>
                      <div className="text-xs text-muted uppercase">Time Left</div>
                      <CountdownTimer endTime={auction.endTime} status={auction.status} compact />
                    </div>

                    <button
                      onClick={() => onSelectAuction(auction.id)}
                      className={`btn btn-sm ${isLeading ? 'btn-secondary' : 'btn-primary'}`}
                    >
                      {isLeading ? 'View Auction' : 'Raise Bid'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Empty Active Bids per PRD Section 51 */
          <div
            className="card"
            style={{
              padding: '40px 20px',
              textAlign: 'center',
              backgroundColor: 'var(--bg-surface)',
            }}
          >
            <Gavel size={32} style={{ margin: '0 auto 10px auto', color: 'var(--text-muted)' }} />
            <h3 className="font-display font-bold text-white text-lg">
              No Active Bids Found
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '13px', marginTop: '4px', marginBottom: '18px' }}>
              You are not currently participating in any live auctions.
            </p>
            <button onClick={() => onNavigate('/auctions')} className="btn btn-primary">
              Explore Live Auctions
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
