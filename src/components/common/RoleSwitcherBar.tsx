import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useAuctions } from '../../context/AuctionContext';
import { UserCheck, Shield, Clock, Wifi, WifiOff, Users } from 'lucide-react';

export const RoleSwitcherBar: React.FC = () => {
  const { currentUser, switchUserRole } = useAuth();
  const { isLowConn, toggleLowConn } = useAuctions();

  return (
    <div className="demo-topbar">
      <div className="flex items-center gap-3">
        <span className="flex items-center gap-1 text-muted text-xs font-mono">
          <Users size={13} className="text-orange" />
          <span>EVALUATION PERSONA:</span>
        </span>

        <button
          onClick={() => switchUserRole('active')}
          className={`btn btn-sm ${
            currentUser?.id === 'user-1' ? 'btn-primary' : 'btn-secondary'
          }`}
          style={{ padding: '3px 8px', fontSize: '11px' }}
          title="Active Lifetime Member (Siddharth)"
        >
          <UserCheck size={12} />
          <span>Active Member (Siddharth)</span>
        </button>

        <button
          onClick={() => switchUserRole('pending')}
          className={`btn btn-sm ${
            currentUser?.id === 'user-pending' ? 'btn-primary' : 'btn-secondary'
          }`}
          style={{ padding: '3px 8px', fontSize: '11px' }}
          title="Registered user pending ₹4,999 fee (Arjun)"
        >
          <Clock size={12} />
          <span>Pending Member (Arjun)</span>
        </button>

        <button
          onClick={() => switchUserRole('admin')}
          className={`btn btn-sm ${
            currentUser?.role === 'admin' ? 'btn-primary' : 'btn-secondary'
          }`}
          style={{ padding: '3px 8px', fontSize: '11px' }}
          title="Auction Administrator (Vikramaditya)"
        >
          <Shield size={12} />
          <span>Admin Portal</span>
        </button>

        <button
          onClick={() => switchUserRole('guest')}
          className={`btn btn-sm ${
            !currentUser ? 'btn-primary' : 'btn-secondary'
          }`}
          style={{ padding: '3px 8px', fontSize: '11px' }}
          title="Unauthenticated visitor"
        >
          <span>Guest</span>
        </button>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={toggleLowConn}
          className={`btn btn-sm ${isLowConn ? 'btn-outline-orange' : 'btn-ghost'}`}
          style={{
            padding: '3px 8px',
            fontSize: '11px',
            color: isLowConn ? '#F59E0B' : '#9CA3AF',
            borderColor: isLowConn ? '#F59E0B' : 'transparent',
          }}
          title="PRD §20: Toggle rider highway low connectivity mode"
        >
          {isLowConn ? (
            <>
              <WifiOff size={13} className="text-warning" />
              <span>Weak Connection (Active)</span>
            </>
          ) : (
            <>
              <Wifi size={13} style={{ color: '#10B981' }} />
              <span>Good Connection</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
