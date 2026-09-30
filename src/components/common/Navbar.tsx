import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { notificationService } from '../../services/notification.service';
import {
  Flame,
  Bell,
  Heart,
  User,
  Shield,
  LogOut,
  ChevronDown,
  Menu,
  X,
  Gavel,
  Trophy,
  LayoutDashboard,
  CheckCircle2,
} from 'lucide-react';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath, onNavigate }) => {
  const { currentUser, isAuthenticated, isAdmin, isActiveMember, isPendingMember, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const notifications = currentUser ? notificationService.getNotifications(currentUser.id) : [];
  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleNav = (path: string) => {
    onNavigate(path);
    setShowUserMenu(false);
    setShowNotifications(false);
    setMobileMenuOpen(false);
  };

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 500,
        backgroundColor: 'rgba(11, 13, 15, 0.94)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--border-subtle)',
      }}
    >
      <div
        style={{
          maxWidth: '1320px',
          margin: '0 auto',
          padding: '0 20px',
          height: '68px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Brand Logo */}
        <div
          onClick={() => handleNav('/')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            cursor: 'pointer',
            userSelect: 'none',
          }}
        >
          <div
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #FF5A1F 0%, #D84315 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 16px rgba(255, 90, 31, 0.4)',
            }}
          >
            <Flame size={22} color="#FFFFFF" />
          </div>
          <div>
            <div
              className="font-display font-bold"
              style={{
                fontSize: '20px',
                letterSpacing: '-0.02em',
                lineHeight: 1.1,
                display: 'flex',
                alignItems: 'baseline',
              }}
            >
              <span>DESTINY</span>
              <span className="text-orange" style={{ marginLeft: '2px' }}>
                AUCTION
              </span>
            </div>
            <div
              style={{
                fontSize: '9px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--accent-silver)',
                fontFamily: 'var(--font-mono)',
              }}
            >
              Superbike Auction House
            </div>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav
          style={{
            display: 'none',
            alignItems: 'center',
            gap: '28px',
          }}
          className="desktop-nav"
        >
          <button
            onClick={() => handleNav('/auctions')}
            className="btn-ghost"
            style={{
              fontSize: '14px',
              fontWeight: 600,
              color: currentPath.startsWith('/auctions') ? 'var(--accent-orange)' : 'var(--text-secondary)',
              cursor: 'pointer',
              background: 'none',
              border: 'none',
              padding: '8px 4px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <Gavel size={16} />
            <span>Auctions</span>
            <span className="badge badge-live" style={{ fontSize: '9px', padding: '2px 6px' }}>
              <span className="pulse-dot" /> LIVE
            </span>
          </button>

          <button
            onClick={() => handleNav('/how-it-works')}
            style={{
              fontSize: '14px',
              fontWeight: 500,
              color: currentPath === '/how-it-works' ? 'var(--accent-orange)' : 'var(--text-secondary)',
              cursor: 'pointer',
              background: 'none',
              border: 'none',
              padding: '8px 4px',
            }}
          >
            How It Works
          </button>

          <button
            onClick={() => handleNav('/about')}
            style={{
              fontSize: '14px',
              fontWeight: 500,
              color: currentPath === '/about' ? 'var(--accent-orange)' : 'var(--text-secondary)',
              cursor: 'pointer',
              background: 'none',
              border: 'none',
              padding: '8px 4px',
            }}
          >
            About
          </button>

          <button
            onClick={() => handleNav('/faq')}
            style={{
              fontSize: '14px',
              fontWeight: 500,
              color: currentPath === '/faq' ? 'var(--accent-orange)' : 'var(--text-secondary)',
              cursor: 'pointer',
              background: 'none',
              border: 'none',
              padding: '8px 4px',
            }}
          >
            FAQ
          </button>

          {isAdmin && (
            <button
              onClick={() => handleNav('/admin')}
              className="badge"
              style={{
                backgroundColor: 'rgba(255, 90, 31, 0.15)',
                color: 'var(--accent-orange)',
                border: '1px solid var(--accent-orange)',
                padding: '6px 12px',
                cursor: 'pointer',
              }}
            >
              <Shield size={13} />
              <span>Admin Console</span>
            </button>
          )}
        </nav>

        {/* Right Section: Auth / Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          {isAuthenticated && currentUser ? (
            <>
              {/* Watchlist Quick Button */}
              <button
                onClick={() => handleNav('/dashboard/watchlist')}
                title="Watchlist"
                style={{
                  background: 'none',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  width: '38px',
                  height: '38px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--text-secondary)',
                  cursor: 'pointer',
                }}
              >
                <Heart size={18} />
              </button>

              {/* Notifications Dropdown */}
              <div style={{ position: 'relative' }}>
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  style={{
                    position: 'relative',
                    background: 'none',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-md)',
                    width: '38px',
                    height: '38px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--text-secondary)',
                    cursor: 'pointer',
                  }}
                  title="Notifications"
                >
                  <Bell size={18} />
                  {unreadCount > 0 && (
                    <span
                      style={{
                        position: 'absolute',
                        top: '-4px',
                        right: '-4px',
                        backgroundColor: 'var(--status-live)',
                        color: '#FFFFFF',
                        fontSize: '10px',
                        fontWeight: 700,
                        width: '18px',
                        height: '18px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '2px solid var(--bg-asphalt)',
                      }}
                    >
                      {unreadCount}
                    </span>
                  )}
                </button>

                {showNotifications && (
                  <div
                    style={{
                      position: 'absolute',
                      right: 0,
                      top: '46px',
                      width: '330px',
                      background: 'var(--bg-surface-elevated)',
                      border: '1px solid var(--border-strong)',
                      borderRadius: 'var(--radius-lg)',
                      boxShadow: 'var(--shadow-lg)',
                      padding: '12px',
                      zIndex: 600,
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingBottom: '8px',
                        borderBottom: '1px solid var(--border-subtle)',
                      }}
                    >
                      <span className="font-semibold text-sm">Notifications</span>
                      <button
                        onClick={() => {
                          notificationService.markAllAsRead(currentUser.id);
                          setShowNotifications(false);
                        }}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: 'var(--accent-orange)',
                          fontSize: '11px',
                          cursor: 'pointer',
                        }}
                      >
                        Mark all read
                      </button>
                    </div>

                    <div style={{ maxHeight: '280px', overflowY: 'auto', marginTop: '8px' }}>
                      {notifications.length === 0 ? (
                        <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '13px' }}>
                          No notifications yet
                        </div>
                      ) : (
                        notifications.slice(0, 5).map((n) => (
                          <div
                            key={n.id}
                            onClick={() => {
                              notificationService.markAsRead(n.id);
                              if (n.link) handleNav(n.link);
                              setShowNotifications(false);
                            }}
                            style={{
                              padding: '10px',
                              borderRadius: 'var(--radius-sm)',
                              marginBottom: '6px',
                              backgroundColor: n.read ? 'transparent' : 'rgba(255, 90, 31, 0.08)',
                              cursor: 'pointer',
                              borderBottom: '1px solid var(--border-subtle)',
                            }}
                          >
                            <div style={{ fontWeight: 600, fontSize: '12px', color: '#FFFFFF' }}>
                              {n.title}
                            </div>
                            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                              {n.message}
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* User Profile Menu */}
              <div style={{ position: 'relative' }}>
                <div
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '4px 10px 4px 4px',
                    background: 'var(--bg-surface-elevated)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-full)',
                    cursor: 'pointer',
                  }}
                >
                  <img
                    src={currentUser.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100'}
                    alt={currentUser.name}
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                    }}
                  />
                  <div style={{ textAlign: 'left', lineHeight: 1.2 }}>
                    <div style={{ fontSize: '12px', fontWeight: 600 }}>
                      {currentUser.name.split(' ')[0]}
                    </div>
                    {isActiveMember ? (
                      <span className="badge badge-won" style={{ fontSize: '9px', padding: '1px 6px' }}>
                        <CheckCircle2 size={9} /> Lifetime
                      </span>
                    ) : isPendingMember ? (
                      <span className="badge badge-lost" style={{ fontSize: '9px', padding: '1px 6px', backgroundColor: 'rgba(245, 158, 11, 0.2)', color: '#F59E0B' }}>
                        Fee Pending
                      </span>
                    ) : (
                      <span className="text-muted" style={{ fontSize: '10px' }}>
                        Member
                      </span>
                    )}
                  </div>
                  <ChevronDown size={14} color="var(--text-secondary)" />
                </div>

                {showUserMenu && (
                  <div
                    style={{
                      position: 'absolute',
                      right: 0,
                      top: '46px',
                      width: '220px',
                      background: 'var(--bg-surface-elevated)',
                      border: '1px solid var(--border-strong)',
                      borderRadius: 'var(--radius-lg)',
                      boxShadow: 'var(--shadow-lg)',
                      padding: '8px',
                      zIndex: 600,
                    }}
                  >
                    <div style={{ padding: '8px 10px', borderBottom: '1px solid var(--border-subtle)' }}>
                      <div style={{ fontWeight: 600, fontSize: '13px' }}>{currentUser.name}</div>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{currentUser.email}</div>
                    </div>

                    <button
                      onClick={() => handleNav('/dashboard')}
                      className="btn-ghost"
                      style={{
                        width: '100%',
                        justifyContent: 'flex-start',
                        padding: '8px 10px',
                        fontSize: '13px',
                      }}
                    >
                      <LayoutDashboard size={15} /> Dashboard
                    </button>

                    <button
                      onClick={() => handleNav('/dashboard/bids')}
                      className="btn-ghost"
                      style={{
                        width: '100%',
                        justifyContent: 'flex-start',
                        padding: '8px 10px',
                        fontSize: '13px',
                      }}
                    >
                      <Gavel size={15} /> My Bids
                    </button>

                    <button
                      onClick={() => handleNav('/dashboard/wins')}
                      className="btn-ghost"
                      style={{
                        width: '100%',
                        justifyContent: 'flex-start',
                        padding: '8px 10px',
                        fontSize: '13px',
                      }}
                    >
                      <Trophy size={15} /> Won Auctions
                    </button>

                    <button
                      onClick={() => handleNav('/dashboard/profile')}
                      className="btn-ghost"
                      style={{
                        width: '100%',
                        justifyContent: 'flex-start',
                        padding: '8px 10px',
                        fontSize: '13px',
                      }}
                    >
                      <User size={15} /> Profile & Membership
                    </button>

                    {isAdmin && (
                      <button
                        onClick={() => handleNav('/admin')}
                        className="btn-ghost text-orange"
                        style={{
                          width: '100%',
                          justifyContent: 'flex-start',
                          padding: '8px 10px',
                          fontSize: '13px',
                        }}
                      >
                        <Shield size={15} /> Admin Console
                      </button>
                    )}

                    <div style={{ borderTop: '1px solid var(--border-subtle)', margin: '4px 0' }} />

                    <button
                      onClick={() => {
                        logout();
                        setShowUserMenu(false);
                        handleNav('/');
                      }}
                      className="btn-ghost"
                      style={{
                        width: '100%',
                        justifyContent: 'flex-start',
                        padding: '8px 10px',
                        fontSize: '13px',
                        color: 'var(--status-lost)',
                      }}
                    >
                      <LogOut size={15} /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button
                onClick={() => handleNav('/login')}
                className="btn btn-secondary btn-sm"
              >
                Sign In
              </button>

              <button
                onClick={() => handleNav('/register')}
                className="btn btn-primary btn-sm"
              >
                Register
              </button>
            </div>
          )}

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              display: 'none',
              background: 'none',
              border: 'none',
              color: 'var(--text-primary)',
              cursor: 'pointer',
              padding: '6px',
            }}
            className="mobile-menu-btn"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          style={{
            background: 'var(--bg-surface-elevated)',
            borderTop: '1px solid var(--border-subtle)',
            padding: '16px 20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          <button
            onClick={() => handleNav('/auctions')}
            className="btn btn-secondary"
            style={{ width: '100%', justifyContent: 'flex-start' }}
          >
            <Gavel size={16} /> Live Auctions
          </button>
          <button
            onClick={() => handleNav('/how-it-works')}
            className="btn btn-ghost"
            style={{ width: '100%', justifyContent: 'flex-start' }}
          >
            How It Works
          </button>
          <button
            onClick={() => handleNav('/about')}
            className="btn btn-ghost"
            style={{ width: '100%', justifyContent: 'flex-start' }}
          >
            About DestinyAuction
          </button>
          <button
            onClick={() => handleNav('/faq')}
            className="btn btn-ghost"
            style={{ width: '100%', justifyContent: 'flex-start' }}
          >
            Frequently Asked Questions
          </button>
          {isAdmin && (
            <button
              onClick={() => handleNav('/admin')}
              className="btn btn-primary"
              style={{ width: '100%', justifyContent: 'flex-start' }}
            >
              <Shield size={16} /> Admin Console
            </button>
          )}
        </div>
      )}

      <style>{`
        @media (min-width: 860px) {
          .desktop-nav {
            display: flex !important;
          }
          .mobile-menu-btn {
            display: none !important;
          }
        }
        @media (max-width: 859px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-menu-btn {
            display: block !important;
          }
        }
      `}</style>
    </header>
  );
};
