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
  const { currentUser, isAuthenticated, isAdmin, isActiveMember, isPendingMember, logout, switchUserRole } = useAuth();
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
                  <div className="user-menu-dropdown">
                    <div style={{ padding: '2px 4px 12px 4px', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', marginBottom: '12px' }}>
                      <div style={{ fontWeight: 700, fontSize: '15px', color: '#FFFFFF', letterSpacing: '-0.01em' }}>
                        {currentUser.name}
                      </div>
                      <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.5)', marginTop: '2px' }}>
                        {currentUser.email}
                      </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <button
                        onClick={() => handleNav('/dashboard')}
                        className="dropdown-boxed-btn"
                      >
                        <LayoutDashboard size={17} />
                        <span>Dashboard</span>
                      </button>

                      <button
                        onClick={() => handleNav('/dashboard/bids')}
                        className="dropdown-boxed-btn"
                      >
                        <Gavel size={17} />
                        <span>My Bids</span>
                      </button>

                      <button
                        onClick={() => handleNav('/dashboard/wins')}
                        className="dropdown-boxed-btn"
                      >
                        <Trophy size={17} />
                        <span>Won Auctions</span>
                      </button>

                      <button
                        onClick={() => handleNav('/dashboard/profile')}
                        className="dropdown-boxed-btn"
                      >
                        <User size={17} />
                        <span>Profile & Membership</span>
                      </button>

                      {isAdmin && (
                        <button
                          onClick={() => {
                            handleNav('/admin');
                          }}
                          className="dropdown-boxed-btn dropdown-btn-admin"
                        >
                          <Shield size={17} />
                          <span>Admin Portal</span>
                        </button>
                      )}

                      <button
                        onClick={() => {
                          logout();
                          setShowUserMenu(false);
                          handleNav('/');
                        }}
                        className="dropdown-boxed-btn dropdown-btn-signout"
                      >
                        <LogOut size={17} />
                        <span>Sign Out</span>
                      </button>
                    </div>
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
        .user-menu-dropdown {
          position: absolute;
          right: 0;
          top: 50px;
          width: 250px;
          background-color: #161a20;
          border: 1px solid rgba(255, 255, 255, 0.22);
          border-radius: 12px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.75);
          padding: 14px;
          z-index: 600;
        }

        .dropdown-boxed-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 11px 14px;
          background-color: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.22);
          border-radius: 6px;
          color: #E5E7EB;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.15s ease-in-out;
        }

        .dropdown-boxed-btn:hover {
          background-color: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.45);
          color: #FFFFFF;
        }

        .dropdown-btn-admin {
          color: #FF5A1F;
          border-color: rgba(255, 90, 31, 0.35);
        }

        .dropdown-btn-admin:hover {
          background-color: rgba(255, 90, 31, 0.12);
          border-color: #FF5A1F;
          color: #FF5A1F;
        }

        .dropdown-btn-signout {
          color: #EF4444 !important;
          border-color: rgba(239, 68, 68, 0.3) !important;
        }

        .dropdown-btn-signout:hover {
          background-color: rgba(239, 68, 68, 0.12) !important;
          border-color: rgba(239, 68, 68, 0.6) !important;
          color: #EF4444 !important;
        }

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
