import React from 'react';
import { Home, Gavel, Award, User, Flame } from 'lucide-react';

interface MobileBottomNavProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ currentPath, onNavigate }) => {
  const items = [
    { label: 'Home', path: '/', icon: Home },
    { label: 'Auctions', path: '/auctions', icon: Flame },
    { label: 'My Bids', path: '/dashboard/bids', icon: Gavel },
    { label: 'Wins', path: '/dashboard/wins', icon: Award },
    { label: 'Profile', path: '/dashboard/profile', icon: User },
  ];

  return (
    <div className="mobile-bottom-nav">
      {items.map((item) => {
        const Icon = item.icon;
        const isActive =
          item.path === '/'
            ? currentPath === '/'
            : currentPath.startsWith(item.path);

        return (
          <button
            key={item.path}
            onClick={() => onNavigate(item.path)}
            style={{
              background: 'none',
              border: 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
              color: isActive ? 'var(--accent-orange)' : 'var(--text-muted)',
              cursor: 'pointer',
              padding: '6px 8px',
              fontSize: '11px',
              fontWeight: isActive ? 600 : 500,
              fontFamily: 'var(--font-display)',
            }}
          >
            <Icon size={19} />
            <span>{item.label}</span>
          </button>
        );
      })}
    </div>
  );
};
