import React from 'react';
import { Flame, ShieldCheck, Award, Zap, Phone, Mail, MapPin } from 'lucide-react';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer
      style={{
        backgroundColor: 'var(--bg-carbon)',
        borderTop: '1px solid var(--border-subtle)',
        marginTop: 'auto',
      }}
    >
      {/* Trust & Guarantee Banner */}
      <div
        style={{
          borderBottom: '1px solid var(--border-subtle)',
          padding: '30px 20px',
        }}
      >
        <div
          style={{
            maxWidth: '1320px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '24px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '8px',
                backgroundColor: 'rgba(255, 90, 31, 0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--accent-orange)',
                flexShrink: 0,
              }}
            >
              <ShieldCheck size={22} />
            </div>
            <div>
              <div className="font-semibold text-white" style={{ fontSize: '15px' }}>
                100% Verified Titles & RCs
              </div>
              <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                Every superbike undergoes 80-point mechanical inspection and RTO document audit.
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '8px',
                backgroundColor: 'rgba(255, 90, 31, 0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--accent-orange)',
                flexShrink: 0,
              }}
            >
              <Zap size={22} />
            </div>
            <div>
              <div className="font-semibold text-white" style={{ fontSize: '15px' }}>
                Zero-Delay Realtime Bidding
              </div>
              <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                Sub-millisecond bid synchronization built for true motorsport enthusiasts.
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '8px',
                backgroundColor: 'rgba(255, 90, 31, 0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--accent-orange)',
                flexShrink: 0,
              }}
            >
              <Award size={22} />
            </div>
            <div>
              <div className="font-semibold text-white" style={{ fontSize: '15px' }}>
                Lifetime Rider Access
              </div>
              <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                One-time registration fee grants perpetual bidding access to all future superbike auctions.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div
        style={{
          maxWidth: '1320px',
          margin: '0 auto',
          padding: '48px 20px 32px 20px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '36px',
        }}
      >
        {/* Brand Col */}
        <div style={{ gridColumn: 'span 1' }}>
          <div
            onClick={() => onNavigate('/')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              cursor: 'pointer',
              marginBottom: '16px',
            }}
          >
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '6px',
                background: 'linear-gradient(135deg, #FF5A1F 0%, #D84315 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Flame size={18} color="#FFFFFF" />
            </div>
            <div className="font-display font-bold text-lg">
              <span>DESTINY</span>
              <span className="text-orange">AUCTION</span>
            </div>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '13px', lineHeight: 1.6 }}>
            India's most trusted digital superbike auction house. Curated superbikes, transparent bidding logs, and pan-India insured doorstep delivery.
          </p>
          <div style={{ marginTop: '16px', fontSize: '12px', color: 'var(--accent-silver)' }}>
            <strong>Tagline:</strong> <em>Ride It. Bid It. Own It.</em>
          </div>
        </div>

        {/* Auctions Col */}
        <div>
          <div className="font-semibold font-display text-white text-sm" style={{ marginBottom: '14px', textTransform: 'uppercase' }}>
            Live Categories
          </div>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px', color: 'var(--text-secondary)' }}>
            <li style={{ cursor: 'pointer' }} onClick={() => onNavigate('/auctions')}>Liter-Class Superbikes</li>
            <li style={{ cursor: 'pointer' }} onClick={() => onNavigate('/auctions')}>Middleweight Supersports</li>
            <li style={{ cursor: 'pointer' }} onClick={() => onNavigate('/auctions')}>Custom Cafe Racers</li>
            <li style={{ cursor: 'pointer' }} onClick={() => onNavigate('/auctions')}>Adventure Tourers</li>
            <li style={{ cursor: 'pointer' }} onClick={() => onNavigate('/auctions')}>Collector Edition Models</li>
          </ul>
        </div>

        {/* Company Col */}
        <div>
          <div className="font-semibold font-display text-white text-sm" style={{ marginBottom: '14px', textTransform: 'uppercase' }}>
            DestinyAuction
          </div>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px', color: 'var(--text-secondary)' }}>
            <li style={{ cursor: 'pointer' }} onClick={() => onNavigate('/how-it-works')}>How Bidding Works</li>
            <li style={{ cursor: 'pointer' }} onClick={() => onNavigate('/about')}>About Our Auction House</li>
            <li style={{ cursor: 'pointer' }} onClick={() => onNavigate('/faq')}>FAQs & Registration Fee</li>
            <li style={{ cursor: 'pointer' }} onClick={() => onNavigate('/register')}>Join As A Lifetime Bidder</li>
            <li style={{ cursor: 'pointer' }} onClick={() => onNavigate('/admin')}>Administrator Gateway</li>
          </ul>
        </div>

        {/* Contact Col */}
        <div>
          <div className="font-semibold font-display text-white text-sm" style={{ marginBottom: '14px', textTransform: 'uppercase' }}>
            Auction House Concierge
          </div>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px', color: 'var(--text-secondary)' }}>
            <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Phone size={14} className="text-orange" />
              <span>+91 800-DESTINY (337-8469)</span>
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Mail size={14} className="text-orange" />
              <span>bids@destinyauction.com</span>
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <MapPin size={14} className="text-orange" />
              <span>Bandra-Kurla Complex, Mumbai, MH</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div
        style={{
          borderTop: '1px solid var(--border-subtle)',
          padding: '18px 20px',
          textAlign: 'center',
          fontSize: '12px',
          color: 'var(--text-muted)',
        }}
      >
        <div style={{ maxWidth: '1320px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
          <div>© {new Date().getFullYear()} DestinyAuction Inc. All rights reserved. Registered Auctioneer.</div>
          <div>Bidding implies acceptance of formal terms, escrow settlement, and vehicle inspection reports.</div>
        </div>
      </div>
    </footer>
  );
};
