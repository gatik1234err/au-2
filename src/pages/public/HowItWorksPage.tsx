import React from 'react';
import { ShieldCheck, UserCheck, Gavel, Award, ChevronRight, Check } from 'lucide-react';

interface HowItWorksPageProps {
  onNavigate: (path: string) => void;
}

export const HowItWorksPage: React.FC<HowItWorksPageProps> = ({ onNavigate }) => {
  return (
    <div className="content-wrapper">
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div className="badge badge-orange" style={{ marginBottom: '8px' }}>
            Rider Guide
          </div>
          <h1 className="font-display font-bold text-white text-4xl">
            HOW DESTINYAUCTION WORKS
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '16px', marginTop: '8px' }}>
            A transparent, collector-grade motorcycle bidding process from registration to delivery.
          </p>
        </div>

        {/* 4 Steps */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {/* Step 1 */}
          <div className="card" style={{ padding: '32px', display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                backgroundColor: 'rgba(255, 90, 31, 0.15)',
                color: 'var(--accent-orange)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                fontSize: '20px',
                flexShrink: 0,
              }}
            >
              1
            </div>
            <div>
              <h2 className="font-display font-bold text-white text-xl">
                Create Your Rider Account
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginTop: '6px', lineHeight: 1.6 }}>
                Register with your legal name, phone number, and email. Complete our rapid 2-factor OTP verification. This keeps our auction platform authentic and free of unauthorized bots.
              </p>
              <div style={{ display: 'flex', gap: '16px', marginTop: '14px', fontSize: '13px', color: '#34D399' }}>
                <span className="flex items-center gap-1"><Check size={14} /> Instant OTP verification</span>
                <span className="flex items-center gap-1"><Check size={14} /> Verified bidder badge</span>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="card" style={{ padding: '32px', display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                backgroundColor: 'rgba(255, 90, 31, 0.15)',
                color: 'var(--accent-orange)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                fontSize: '20px',
                flexShrink: 0,
              }}
            >
              2
            </div>
            <div>
              <h2 className="font-display font-bold text-white text-xl">
                Pay One-Time Lifetime Registration Fee (₹4,999)
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginTop: '6px', lineHeight: 1.6 }}>
                DestinyAuction operates on a lifetime membership model. A single payment grants perpetual access to all active and future motorcycle auctions. No recurring subscriptions or surprise maintenance fees.
              </p>
              <div style={{ display: 'flex', gap: '16px', marginTop: '14px', fontSize: '13px', color: '#34D399' }}>
                <span className="flex items-center gap-1"><Check size={14} /> Perpetual lifetime access</span>
                <span className="flex items-center gap-1"><Check size={14} /> Instant automated activation</span>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="card" style={{ padding: '32px', display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                backgroundColor: 'rgba(255, 90, 31, 0.15)',
                color: 'var(--accent-orange)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                fontSize: '20px',
                flexShrink: 0,
              }}
            >
              3
            </div>
            <div>
              <h2 className="font-display font-bold text-white text-xl">
                Participate in Live Superbike Bidding
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginTop: '6px', lineHeight: 1.6 }}>
                Browse verified motorcycles, check 80-point inspection dossiers, and place bids during the live auction window. You receive real-time outbid notifications and countdown timers ensuring full transparency.
              </p>
              <div style={{ display: 'flex', gap: '16px', marginTop: '14px', fontSize: '13px', color: '#34D399' }}>
                <span className="flex items-center gap-1"><Check size={14} /> Sub-second bid sync</span>
                <span className="flex items-center gap-1"><Check size={14} /> Transparent public bid log</span>
              </div>
            </div>
          </div>

          {/* Step 4 */}
          <div className="card" style={{ padding: '32px', display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                backgroundColor: 'rgba(255, 90, 31, 0.15)',
                color: 'var(--accent-orange)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                fontSize: '20px',
                flexShrink: 0,
              }}
            >
              4
            </div>
            <div>
              <h2 className="font-display font-bold text-white text-xl">
                Win, Escrow Settlement & Covered Transport
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginTop: '6px', lineHeight: 1.6 }}>
                When the timer expires and you are the top bidder, you secure the motorcycle. Funds are held in escrow while RTO ownership transfer and final checks take place, followed by enclosed doorstep transport across India.
              </p>
              <div style={{ display: 'flex', gap: '16px', marginTop: '14px', fontSize: '13px', color: '#34D399' }}>
                <span className="flex items-center gap-1"><Check size={14} /> Bank escrow protection</span>
                <span className="flex items-center gap-1"><Check size={14} /> Enclosed pan-India logistics</span>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Box */}
        <div
          style={{
            marginTop: '48px',
            textAlign: 'center',
            padding: '36px',
            backgroundColor: 'var(--bg-carbon)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-strong)',
          }}
        >
          <h3 className="font-display font-bold text-white text-2xl">
            Ready to Find Your Next Machine?
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginTop: '6px', marginBottom: '20px' }}>
            Browse active liter-class auctions or activate your lifetime rider credentials now.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '14px' }}>
            <button onClick={() => onNavigate('/auctions')} className="btn btn-primary">
              View Live Auctions
            </button>
            <button onClick={() => onNavigate('/register')} className="btn btn-secondary">
              Register Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
