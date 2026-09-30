import React from 'react';
import { useAuctions } from '../../context/AuctionContext';
import { useAuth } from '../../context/AuthContext';
import { AuctionCard } from '../../components/auction/AuctionCard';
import {
  Flame,
  ArrowRight,
  ShieldCheck,
  Zap,
  Award,
  ChevronRight,
  Users,
  Trophy,
  CheckCircle2,
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (path: string) => void;
  onSelectAuction: (auctionId: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onSelectAuction }) => {
  const { auctions } = useAuctions();
  const { isAuthenticated, isActiveMember } = useAuth();

  const liveAuctions = auctions.filter((a) => a.status === 'live');
  const upcomingAuctions = auctions.filter((a) => a.status === 'upcoming');
  const featuredAuction = auctions.find((a) => a.featured && a.status === 'live') || auctions[0];

  return (
    <div>
      {/* Hero Section per PRD Section 11 */}
      <section
        style={{
          position: 'relative',
          minHeight: '75vh',
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#07090B',
          backgroundImage: `
            radial-gradient(circle at 75% 40%, rgba(255, 90, 31, 0.16) 0%, transparent 60%),
            radial-gradient(circle at 20% 80%, rgba(10, 132, 255, 0.08) 0%, transparent 50%),
            linear-gradient(to bottom, rgba(11, 13, 15, 0.6) 0%, #0B0D0F 100%),
            url('https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=1800&auto=format&fit=crop&q=85')
          `,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderBottom: '1px solid var(--border-subtle)',
          overflow: 'hidden',
          padding: '60px 20px',
        }}
      >
        {/* Subtle grid speedline overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
            pointerEvents: 'none',
          }}
        />

        <div style={{ maxWidth: '1320px', margin: '0 auto', width: '100%', position: 'relative', zIndex: 2 }}>
          <div style={{ maxWidth: '680px' }}>
            {/* Live Indicator Pill */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 14px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'rgba(255, 90, 31, 0.15)',
                border: '1px solid rgba(255, 90, 31, 0.4)',
                marginBottom: '20px',
              }}
            >
              <span className="pulse-dot" style={{ backgroundColor: '#FF5A1F' }} />
              <span className="font-mono text-xs font-bold text-orange uppercase tracking-wider">
                {liveAuctions.length} Live Superbike Auctions Bidding Now
              </span>
            </div>

            {/* Headline */}
            <h1
              className="font-display font-bold text-white"
              style={{
                fontSize: 'clamp(36px, 6vw, 64px)',
                lineHeight: 1.05,
                letterSpacing: '-0.03em',
                marginBottom: '16px',
              }}
            >
              THE NEXT RIDE <br />
              <span style={{ color: 'var(--accent-orange)', textShadow: '0 0 30px rgba(255,90,31,0.4)' }}>
                COULD BE YOURS.
              </span>
            </h1>

            {/* Subtitle */}
            <p
              style={{
                fontSize: '17px',
                color: 'var(--accent-silver-light)',
                lineHeight: 1.6,
                marginBottom: '32px',
                maxWidth: '560px',
              }}
            >
              India’s premier digital motorcycle auction house. Verified liter-class superbikes, real-time transparent bidding, and perpetual lifetime rider access.
            </p>

            {/* CTAs */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
              <button
                onClick={() => onNavigate('/auctions')}
                className="btn btn-primary btn-lg"
                style={{ minWidth: '180px' }}
              >
                <Flame size={18} />
                <span>Explore Live Auctions</span>
              </button>

              <button
                onClick={() => onNavigate('/how-it-works')}
                className="btn btn-secondary btn-lg"
              >
                <span>How Bidding Works</span>
                <ChevronRight size={18} />
              </button>
            </div>

            {/* Trust highlights */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '24px',
                marginTop: '40px',
                paddingTop: '24px',
                borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                flexWrap: 'wrap',
              }}
            >
              <div>
                <div className="font-display font-bold text-white text-2xl">100%</div>
                <div style={{ fontSize: '11px', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
                  Verified Documents
                </div>
              </div>
              <div style={{ width: '1px', height: '30px', backgroundColor: 'rgba(255, 255, 255, 0.1)' }} />
              <div>
                <div className="font-display font-bold text-orange text-2xl">80-Point</div>
                <div style={{ fontSize: '11px', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
                  Mechanical Check
                </div>
              </div>
              <div style={{ width: '1px', height: '30px', backgroundColor: 'rgba(255, 255, 255, 0.1)' }} />
              <div>
                <div className="font-display font-bold text-white text-2xl">₹4,999</div>
                <div style={{ fontSize: '11px', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
                  Lifetime Membership
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Live Auctions Grid */}
      <section className="content-wrapper" style={{ paddingTop: '48px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <div className="badge badge-orange" style={{ marginBottom: '8px' }}>
              Motorsport Showcase
            </div>
            <h2 className="font-display font-bold text-white text-3xl">
              Featured Live Auctions
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginTop: '4px' }}>
              Real-time countdowns ticking. Place qualifying bids to claim ownership.
            </p>
          </div>

          <button
            onClick={() => onNavigate('/auctions')}
            className="btn btn-ghost"
            style={{ color: 'var(--accent-orange)', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <span>View All Auctions ({auctions.length})</span>
            <ArrowRight size={16} />
          </button>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: '24px',
          }}
        >
          {auctions.slice(0, 3).map((auction) => (
            <AuctionCard
              key={auction.id}
              auction={auction}
              onSelect={onSelectAuction}
            />
          ))}
        </div>
      </section>

      {/* How It Works 3-Step Banner */}
      <section
        style={{
          backgroundColor: 'var(--bg-carbon)',
          borderTop: '1px solid var(--border-subtle)',
          borderBottom: '1px solid var(--border-subtle)',
          padding: '60px 20px',
        }}
      >
        <div style={{ maxWidth: '1320px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 48px auto' }}>
            <div className="badge badge-orange" style={{ marginBottom: '8px' }}>
              Simple 4-Step Process
            </div>
            <h2 className="font-display font-bold text-white text-3xl">
              How DestinyAuction Works
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '15px', marginTop: '6px' }}>
              Engineered exclusively for riders seeking transparency and collector-quality machines.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '24px',
            }}
          >
            <div
              className="card"
              style={{ padding: '28px', backgroundColor: 'var(--bg-surface)' }}
            >
              <div
                className="font-mono font-bold text-orange text-3xl"
                style={{ opacity: 0.8, marginBottom: '14px' }}
              >
                01
              </div>
              <h3 className="font-display font-bold text-white text-lg">
                Register & Verify
              </h3>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '8px', lineHeight: 1.6 }}>
                Sign up with your phone or email. Instant verification ensures a clean, bot-free bidding arena with verified superbike enthusiasts.
              </p>
            </div>

            <div
              className="card"
              style={{ padding: '28px', backgroundColor: 'var(--bg-surface)' }}
            >
              <div
                className="font-mono font-bold text-orange text-3xl"
                style={{ opacity: 0.8, marginBottom: '14px' }}
              >
                02
              </div>
              <h3 className="font-display font-bold text-white text-lg">
                One-Time Lifetime Fee
              </h3>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '8px', lineHeight: 1.6 }}>
                Pay a one-time registration fee of ₹4,999. No subscriptions, no annual renewals — enjoy perpetual lifetime bidding privileges.
              </p>
            </div>

            <div
              className="card"
              style={{ padding: '28px', backgroundColor: 'var(--bg-surface)' }}
            >
              <div
                className="font-mono font-bold text-orange text-3xl"
                style={{ opacity: 0.8, marginBottom: '14px' }}
              >
                03
              </div>
              <h3 className="font-display font-bold text-white text-lg">
                Bid In Real-Time
              </h3>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '8px', lineHeight: 1.6 }}>
                Watch countdown clocks tick down. Use quick increment steppers (+₹5,000, +₹10,000) and track live outbid updates instantly.
              </p>
            </div>

            <div
              className="card"
              style={{ padding: '28px', backgroundColor: 'var(--bg-surface)' }}
            >
              <div
                className="font-mono font-bold text-orange text-3xl"
                style={{ opacity: 0.8, marginBottom: '14px' }}
              >
                04
              </div>
              <h3 className="font-display font-bold text-white text-lg">
                Escrow & Doorstep Delivery
              </h3>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '8px', lineHeight: 1.6 }}>
                Winning funds are held in secure bank escrow until RTO transfer and physical inspection are finalized. Pan-India covered transit.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Auctions Section */}
      {upcomingAuctions.length > 0 && (
        <section className="content-wrapper" style={{ paddingTop: '48px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '24px' }}>
            <div>
              <div className="badge badge-upcoming" style={{ marginBottom: '8px' }}>
                Preview Catalogue
              </div>
              <h2 className="font-display font-bold text-white text-3xl">
                Upcoming Superbike Drops
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginTop: '4px' }}>
                Review dossiers, schedule inspections, and save to your personal watchlist before bidding begins.
              </p>
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
              gap: '24px',
            }}
          >
            {upcomingAuctions.map((auction) => (
              <AuctionCard
                key={auction.id}
                auction={auction}
                onSelect={onSelectAuction}
              />
            ))}
          </div>
        </section>
      )}

      {/* Lifetime Membership Banner (PRD Section 21 & 22) */}
      {!isActiveMember && (
        <section className="content-wrapper" style={{ paddingBottom: '60px' }}>
          <div
            style={{
              background: 'linear-gradient(135deg, #1C2229 0%, #121518 100%)',
              border: '1px solid var(--border-strong)',
              borderRadius: 'var(--radius-lg)',
              padding: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '30px',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-lg), 0 0 30px rgba(255, 90, 31, 0.1)',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: '-50%',
                right: '-10%',
                width: '350px',
                height: '350px',
                background: 'radial-gradient(circle, rgba(255,90,31,0.15) 0%, transparent 70%)',
                pointerEvents: 'none',
              }}
            />

            <div style={{ maxWidth: '600px', position: 'relative', zIndex: 2 }}>
              <span className="badge badge-orange" style={{ marginBottom: '12px' }}>
                Perpetual Rider Privilege
              </span>
              <h2 className="font-display font-bold text-white text-3xl">
                Unlock Lifetime Auction Bidding
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '15px', marginTop: '8px', lineHeight: 1.6 }}>
                Join India's verified circle of motorcycle enthusiasts. A single one-time registration fee grants lifelong access to bid on every future superbike auction.
              </p>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '12px',
                  marginTop: '20px',
                  fontSize: '13px',
                  color: 'var(--text-primary)',
                }}
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-orange" />
                  <span>Lifetime Bidding Access</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-orange" />
                  <span>Real-time Outbid SMS & Alerts</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-orange" />
                  <span>Unrestricted Inspection Reports</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-orange" />
                  <span>Direct Escrow Concierge</span>
                </div>
              </div>
            </div>

            <div
              style={{
                backgroundColor: 'var(--bg-carbon)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-lg)',
                padding: '24px 32px',
                textAlign: 'center',
                minWidth: '240px',
                position: 'relative',
                zIndex: 2,
              }}
            >
              <div style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-muted)', fontFamily: 'var(--font-display)' }}>
                One-Time Lifetime Fee
              </div>
              <div className="font-display font-bold text-white text-3xl" style={{ margin: '6px 0' }}>
                ₹4,999
              </div>
              <div style={{ fontSize: '11px', color: '#10B981', marginBottom: '16px' }}>
                Perpetual Validity • No Annual Fees
              </div>
              <button
                onClick={() => onNavigate(isAuthenticated ? '/dashboard/profile' : '/register')}
                className="btn btn-primary"
                style={{ width: '100%' }}
              >
                {isAuthenticated ? 'Pay Fee & Activate' : 'Register Now'}
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
