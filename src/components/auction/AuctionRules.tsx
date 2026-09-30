import React from 'react';
import { Auction } from '../../types';
import { Gavel, AlertCircle, FileText, CheckCircle2 } from 'lucide-react';

interface AuctionRulesProps {
  auction: Auction;
}

export const AuctionRules: React.FC<AuctionRulesProps> = ({ auction }) => {
  return (
    <div
      style={{
        backgroundColor: 'var(--bg-surface)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-lg)',
        padding: '24px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
        <Gavel size={22} className="text-orange" />
        <h4 className="font-display font-bold text-white text-lg">
          DestinyAuction Official Bidding Rules
        </h4>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '14px', color: 'var(--text-secondary)' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
          <CheckCircle2 size={18} className="text-orange" style={{ flexShrink: 0, marginTop: '2px' }} />
          <div>
            <strong className="text-white">Minimum Increment:</strong> Every successive bid must be at least ₹{auction.minimumIncrement.toLocaleString('en-IN')} higher than the standing current highest bid.
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
          <CheckCircle2 size={18} className="text-orange" style={{ flexShrink: 0, marginTop: '2px' }} />
          <div>
            <strong className="text-white">Legally Binding Commitment:</strong> All bids submitted on DestinyAuction are contractual. If you are the highest bidder when the timer reaches 00:00:00, you are awarded the motorcycle.
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
          <CheckCircle2 size={18} className="text-orange" style={{ flexShrink: 0, marginTop: '2px' }} />
          <div>
            <strong className="text-white">Settlement Window:</strong> Winning bidders receive immediate settlement documents and must remit payment into the secure escrow vault within 48 hours.
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
          <CheckCircle2 size={18} className="text-orange" style={{ flexShrink: 0, marginTop: '2px' }} />
          <div>
            <strong className="text-white">Lifetime Eligibility:</strong> Only riders with an active lifetime membership (one-time ₹4,999 registration fee completed) can participate in live bidding.
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
          <CheckCircle2 size={18} className="text-orange" style={{ flexShrink: 0, marginTop: '2px' }} />
          <div>
            <strong className="text-white">Inspection Guarantee:</strong> In the rare event that the physical motorcycle diverges from the 80-point inspection dossier, the buyer retains full refund rights prior to taking delivery.
          </div>
        </div>
      </div>
    </div>
  );
};
