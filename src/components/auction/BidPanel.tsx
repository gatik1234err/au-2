import React, { useState, useEffect } from 'react';
import { Auction } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { useAuctions } from '../../context/AuctionContext';
import { Gavel, AlertCircle, Plus, Minus, ArrowUpRight, Zap, ShieldCheck } from 'lucide-react';

interface BidPanelProps {
  auction: Auction;
  onRegisterClick: () => void;
  onPaymentClick: () => void;
}

export const BidPanel: React.FC<BidPanelProps> = ({
  auction,
  onRegisterClick,
  onPaymentClick,
}) => {
  const { currentUser, isAuthenticated, isActiveMember, isPendingMember } = useAuth();
  const { placeBid, simulateCompetitorBid, isLowConn } = useAuctions();

  const minNextBid = auction.currentBid + auction.minimumIncrement;
  const [bidAmount, setBidAmount] = useState<number>(minNextBid);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Sync bid amount when current bid updates externally
  useEffect(() => {
    if (bidAmount < minNextBid) {
      setBidAmount(minNextBid);
    }
  }, [minNextBid, bidAmount]);

  const handleIncrement = (inc: number) => {
    setBidAmount((prev) => Math.max(minNextBid, prev + inc));
    setErrorMsg(null);
  };

  const handleDecrement = () => {
    setBidAmount((prev) => Math.max(minNextBid, prev - auction.minimumIncrement));
    setErrorMsg(null);
  };

  const handleOpenConfirm = () => {
    if (bidAmount < minNextBid) {
      setErrorMsg(`Bid must be at least ₹${minNextBid.toLocaleString('en-IN')}`);
      return;
    }
    setErrorMsg(null);
    setShowConfirmModal(true);
  };

  const handleConfirmBid = async () => {
    setIsSubmitting(true);
    const result = await placeBid(auction.id, bidAmount);
    setIsSubmitting(false);

    if (result.success) {
      setShowConfirmModal(false);
      setBidAmount(bidAmount + auction.minimumIncrement);
    } else {
      setErrorMsg(result.message);
      setShowConfirmModal(false);
    }
  };

  const isUserLeading = currentUser && auction.highestBidderId === currentUser.id;

  return (
    <div
      className="card"
      style={{
        padding: '24px',
        backgroundColor: 'var(--bg-surface)',
        border: '1px solid var(--border-strong)',
        boxShadow: 'var(--shadow-lg), 0 0 30px rgba(0,0,0,0.6)',
      }}
    >
      {/* Live Auction Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className="badge badge-live">
            <span className="pulse-dot" /> LIVE AUCTION
          </span>
          {isLowConn && (
            <span className="badge" style={{ backgroundColor: '#F59E0B22', color: '#F59E0B', fontSize: '10px' }}>
              Rider Mode
            </span>
          )}
        </div>
        <div className="text-xs text-muted font-mono">
          REF: #{auction.id.toUpperCase()}
        </div>
      </div>

      {/* Leading Bidder Notification */}
      {isUserLeading && (
        <div
          style={{
            backgroundColor: 'rgba(16, 185, 129, 0.15)',
            border: '1px solid rgba(16, 185, 129, 0.4)',
            borderRadius: 'var(--radius-md)',
            padding: '10px 14px',
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            color: '#34D399',
            fontSize: '13px',
            fontWeight: 600,
          }}
        >
          <ShieldCheck size={18} />
          <span>You are currently the HIGHEST bidder!</span>
        </div>
      )}

      {/* Current Bid Display */}
      <div
        style={{
          background: 'var(--bg-carbon)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-md)',
          padding: '16px',
          marginBottom: '20px',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-muted)', fontFamily: 'var(--font-display)', fontWeight: 600 }}>
              CURRENT HIGHEST BID
            </div>
            <div
              className="font-display font-bold text-white text-3xl"
              style={{ marginTop: '2px', letterSpacing: '-0.02em' }}
            >
              ₹{auction.currentBid.toLocaleString('en-IN')}
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <span className="text-xs text-muted">Total Bids</span>
            <div className="font-mono font-bold text-orange text-lg">
              {auction.totalBids}
            </div>
          </div>
        </div>

        <div
          style={{
            marginTop: '12px',
            paddingTop: '10px',
            borderTop: '1px solid var(--border-subtle)',
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '12px',
            color: 'var(--text-secondary)',
          }}
        >
          <span>Minimum Next Bid:</span>
          <strong className="text-white font-mono">₹{minNextBid.toLocaleString('en-IN')}</strong>
        </div>
      </div>

      {/* State-specific Bidding Form */}
      {auction.status === 'ended' ? (
        <div
          style={{
            textAlign: 'center',
            padding: '24px 16px',
            background: 'rgba(255, 255, 255, 0.02)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-subtle)',
          }}
        >
          <div className="font-display font-bold text-lg text-muted">This Auction Has Closed</div>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Winning bid: ₹{auction.currentBid.toLocaleString('en-IN')} by{' '}
            {auction.highestBidderName || 'Private Bidder'}.
          </p>
        </div>
      ) : !isAuthenticated ? (
        // Unauthenticated visitor
        <div
          style={{
            textAlign: 'center',
            padding: '20px',
            backgroundColor: 'rgba(255, 90, 31, 0.05)',
            border: '1px solid rgba(255, 90, 31, 0.2)',
            borderRadius: 'var(--radius-md)',
          }}
        >
          <Gavel size={28} className="text-orange" style={{ margin: '0 auto 8px auto' }} />
          <div className="font-semibold text-white text-base">Registration Required</div>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px', marginBottom: '16px' }}>
            Bidding is exclusive to verified members. Register once to unlock lifetime superbike auction access.
          </p>
          <button onClick={onRegisterClick} className="btn btn-primary" style={{ width: '100%' }}>
            Register To Bid
          </button>
        </div>
      ) : isPendingMember ? (
        // Registered but fee pending
        <div
          style={{
            textAlign: 'center',
            padding: '20px',
            backgroundColor: 'rgba(245, 158, 11, 0.08)',
            border: '1px solid rgba(245, 158, 11, 0.3)',
            borderRadius: 'var(--radius-md)',
          }}
        >
          <AlertCircle size={28} style={{ color: '#F59E0B', margin: '0 auto 8px auto' }} />
          <div className="font-semibold text-white text-base">Membership Fee Pending</div>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px', marginBottom: '16px' }}>
            Pay the one-time ₹4,999 registration fee to activate lifetime live bidding privileges.
          </p>
          <button onClick={onPaymentClick} className="btn btn-primary" style={{ width: '100%' }}>
            Pay ₹4,999 & Activate
          </button>
        </div>
      ) : (
        // Active verified member - full live bidding UI
        <div>
          {/* Stepper Input */}
          <div style={{ marginBottom: '14px' }}>
            <label className="label">Place Your Bid (₹ INR)</label>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: 'var(--bg-carbon)',
                border: '1px solid var(--border-strong)',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
              }}
            >
              <button
                onClick={handleDecrement}
                disabled={bidAmount <= minNextBid}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-primary)',
                  padding: '14px 18px',
                  cursor: bidAmount <= minNextBid ? 'not-allowed' : 'pointer',
                  opacity: bidAmount <= minNextBid ? 0.3 : 1,
                }}
              >
                <Minus size={18} />
              </button>

              <div
                className="font-display font-bold text-center text-xl text-white"
                style={{ flex: 1, letterSpacing: '0.02em' }}
              >
                ₹{bidAmount.toLocaleString('en-IN')}
              </div>

              <button
                onClick={() => handleIncrement(auction.minimumIncrement)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--accent-orange)',
                  padding: '14px 18px',
                  cursor: 'pointer',
                }}
              >
                <Plus size={18} />
              </button>
            </div>
          </div>

          {/* Quick Increment Chips */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginBottom: '18px' }}>
            <button
              onClick={() => handleIncrement(5000)}
              className="btn btn-secondary btn-sm"
              style={{ fontSize: '11px', padding: '6px 4px' }}
            >
              +₹5,000
            </button>
            <button
              onClick={() => handleIncrement(10000)}
              className="btn btn-secondary btn-sm"
              style={{ fontSize: '11px', padding: '6px 4px' }}
            >
              +₹10,000
            </button>
            <button
              onClick={() => handleIncrement(25000)}
              className="btn btn-secondary btn-sm"
              style={{ fontSize: '11px', padding: '6px 4px' }}
            >
              +₹25,000
            </button>
          </div>

          {errorMsg && (
            <div
              style={{
                backgroundColor: 'rgba(239, 68, 68, 0.15)',
                border: '1px solid rgba(239, 68, 68, 0.4)',
                borderRadius: 'var(--radius-sm)',
                padding: '8px 12px',
                fontSize: '12px',
                color: '#F87171',
                marginBottom: '14px',
              }}
            >
              {errorMsg}
            </div>
          )}

          {/* Submit Bid Button */}
          <button
            onClick={handleOpenConfirm}
            className="btn btn-primary btn-lg"
            style={{ width: '100%', fontSize: '15px' }}
            disabled={isSubmitting}
          >
            <Gavel size={18} />
            <span>BID ₹{bidAmount.toLocaleString('en-IN')}</span>
          </button>

          {/* Interactive Simulation Helper */}
          <div
            style={{
              marginTop: '16px',
              paddingTop: '14px',
              borderTop: '1px solid var(--border-subtle)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
              Evaluation Demo:
            </span>
            <button
              onClick={() => simulateCompetitorBid(auction.id)}
              className="btn btn-ghost btn-sm"
              style={{ fontSize: '11px', color: 'var(--accent-orange)' }}
              title="Simulates a competitor placing a higher bid"
            >
              <Zap size={13} />
              <span>Simulate Competitor Bid</span>
            </button>
          </div>
        </div>
      )}

      {/* Confirmation Modal (PRD Section 18) */}
      {showConfirmModal && (
        <div className="modal-overlay">
          <div className="modal-box" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 90, 31, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--accent-orange)',
                }}
              >
                <Gavel size={20} />
              </div>
              <div className="font-display font-bold text-lg text-white">
                Confirm Your Bid
              </div>
            </div>

            <div
              style={{
                backgroundColor: 'var(--bg-carbon)',
                padding: '16px',
                borderRadius: 'var(--radius-md)',
                margin: '16px 0',
                border: '1px solid var(--border-subtle)',
              }}
            >
              <div className="text-xs text-muted uppercase">Selected Motorcycle</div>
              <div className="font-semibold text-white text-base">
                {auction.bike?.year} {auction.bike?.brand} {auction.bike?.model}
              </div>
              <div style={{ marginTop: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span className="text-xs text-secondary">Your Binding Bid Amount:</span>
                <span className="font-display font-bold text-orange text-2xl">
                  ₹{bidAmount.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '20px' }}>
              By placing this bid, you agree to the platform auction terms. If your bid wins at auction close, you will be obligated to proceed with settlement within 48 hours.
            </p>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
              <button
                onClick={() => setShowConfirmModal(false)}
                className="btn btn-secondary"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmBid}
                className="btn btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Confirm & Place Bid'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
