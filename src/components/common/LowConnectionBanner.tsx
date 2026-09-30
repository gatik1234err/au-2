import React from 'react';
import { useAuctions } from '../../context/AuctionContext';
import { AlertTriangle, X } from 'lucide-react';

export const LowConnectionBanner: React.FC = () => {
  const { isLowConn, toggleLowConn } = useAuctions();

  if (!isLowConn) return null;

  return (
    <div className="low-conn-banner">
      <AlertTriangle size={15} />
      <span>
        <strong>WEAK CONNECTION DETECTED:</strong> Low-bandwidth rider mode enabled. Live auction updates may experience slight delay. Bids are strictly verified with server.
      </span>
      <button
        onClick={toggleLowConn}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          marginLeft: '8px',
        }}
        title="Dismiss mode"
      >
        <X size={14} />
      </button>
    </div>
  );
};
