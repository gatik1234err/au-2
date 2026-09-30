import React from 'react';
import { Bid } from '../../types';
import { Crown, User, Clock } from 'lucide-react';

interface BidHistoryProps {
  bids: Bid[];
}

export const BidHistory: React.FC<BidHistoryProps> = ({ bids }) => {
  if (bids.length === 0) {
    return (
      <div
        style={{
          textAlign: 'center',
          padding: '36px 20px',
          color: 'var(--text-muted)',
          backgroundColor: 'var(--bg-carbon)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-subtle)',
        }}
      >
        <Clock size={28} style={{ margin: '0 auto 8px auto', opacity: 0.5 }} />
        <div className="font-semibold text-white">No Bids Placed Yet</div>
        <div style={{ fontSize: '13px', marginTop: '4px' }}>
          Be the first rider to place a qualifying bid on this superbike.
        </div>
      </div>
    );
  }

  const formatTime = (iso: string) => {
    const date = new Date(iso);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  return (
    <div
      style={{
        backgroundColor: 'var(--bg-surface)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          padding: '14px 20px',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div className="font-semibold font-display text-white text-base flex items-center gap-2">
          <span>Live Bidding Log</span>
          <span className="badge badge-orange" style={{ fontSize: '10px' }}>
            {bids.length} Total
          </span>
        </div>
        <span className="text-xs text-muted font-mono">Sync: REALTIME</span>
      </div>

      <div style={{ maxHeight: '380px', overflowY: 'auto' }}>
        {bids.map((bid, index) => {
          const isHighest = index === 0;
          return (
            <div
              key={bid.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 20px',
                borderBottom: '1px solid var(--border-subtle)',
                backgroundColor: isHighest ? 'rgba(255, 90, 31, 0.04)' : 'transparent',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ position: 'relative' }}>
                  {bid.userAvatar ? (
                    <img
                      src={bid.userAvatar}
                      alt={bid.userName}
                      style={{
                        width: '34px',
                        height: '34px',
                        borderRadius: '50%',
                        objectFit: 'cover',
                        border: isHighest ? '2px solid var(--accent-orange)' : '1px solid var(--border-subtle)',
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        width: '34px',
                        height: '34px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--bg-surface-elevated)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--text-secondary)',
                      }}
                    >
                      <User size={16} />
                    </div>
                  )}

                  {isHighest && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '-6px',
                        right: '-6px',
                        backgroundColor: 'var(--accent-orange)',
                        borderRadius: '50%',
                        width: '16px',
                        height: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#FFFFFF',
                      }}
                    >
                      <Crown size={10} />
                    </div>
                  )}
                </div>

                <div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: isHighest ? '#FFFFFF' : 'var(--text-secondary)' }}>
                    {bid.userName}
                    {isHighest && (
                      <span className="badge badge-live" style={{ marginLeft: '8px', fontSize: '9px', padding: '1px 5px' }}>
                        Leader
                      </span>
                    )}
                  </div>
                  <div className="font-mono text-xs text-muted" style={{ fontSize: '11px' }}>
                    {formatTime(bid.createdAt)}
                  </div>
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <div
                  className="font-display font-bold"
                  style={{
                    fontSize: isHighest ? '16px' : '14px',
                    color: isHighest ? 'var(--accent-orange)' : 'var(--text-primary)',
                  }}
                >
                  ₹{bid.amount.toLocaleString('en-IN')}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
