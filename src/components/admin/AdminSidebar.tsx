import React from 'react';
import {
  LayoutDashboard,
  Gavel,
  Bike as BikeIcon,
  Users,
  CreditCard,
  Trophy,
  History,
  Settings,
  ArrowLeft,
} from 'lucide-react';

interface AdminSidebarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ currentPath, onNavigate }) => {
  const menuItems = [
    { label: 'Overview', path: '/admin', icon: LayoutDashboard },
    { label: 'Auctions', path: '/admin/auctions', icon: Gavel },
    { label: 'Bikes Inventory', path: '/admin/bikes', icon: BikeIcon },
    { label: 'Riders & Users', path: '/admin/users', icon: Users },
    { label: 'Live Bids Audit', path: '/admin/bids', icon: History },
    { label: 'Registration Fees', path: '/admin/payments', icon: CreditCard },
    { label: 'Winners & Settlements', path: '/admin/winners', icon: Trophy },
  ];

  return (
    <aside
      style={{
        width: '260px',
        backgroundColor: 'var(--bg-carbon)',
        borderRight: '1px solid var(--border-subtle)',
        display: 'flex',
        flexDirection: 'column',
        padding: '24px 16px',
        gap: '6px',
        flexShrink: 0,
      }}
    >
      <div style={{ padding: '0 8px 16px 8px', borderBottom: '1px solid var(--border-subtle)', marginBottom: '8px' }}>
        <button
          onClick={() => onNavigate('/')}
          className="btn-ghost"
          style={{
            fontSize: '12px',
            color: 'var(--text-secondary)',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '4px 0',
            marginBottom: '8px',
          }}
        >
          <ArrowLeft size={14} /> Back to Public Site
        </button>
        <div className="font-display font-bold text-white text-base">
          Admin Portal
        </div>
        <div style={{ fontSize: '11px', color: 'var(--accent-silver)' }}>
          DestinyAuction Headquarters
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPath === item.path;

          return (
            <button
              key={item.path}
              onClick={() => onNavigate(item.path)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '10px 14px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: isActive ? 'var(--accent-orange)' : 'transparent',
                color: isActive ? '#FFFFFF' : 'var(--text-secondary)',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left',
                fontSize: '13px',
                fontWeight: isActive ? 600 : 500,
                transition: 'all 0.15s ease',
              }}
            >
              <Icon size={17} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)' }}>
        <div
          style={{
            backgroundColor: 'var(--bg-surface)',
            padding: '12px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-subtle)',
          }}
        >
          <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Logged in as</div>
          <div className="font-semibold text-white text-xs" style={{ marginTop: '2px' }}>
            Vikramaditya Rao
          </div>
          <div className="badge badge-orange" style={{ marginTop: '6px', fontSize: '9px' }}>
            Master Administrator
          </div>
        </div>
      </div>
    </aside>
  );
};
