import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { User, ShieldCheck, CreditCard, Bell, Lock, CheckCircle2, AlertCircle } from 'lucide-react';

interface ProfileSettingsPageProps {
  onNavigate: (path: string) => void;
}

export const ProfileSettingsPage: React.FC<ProfileSettingsPageProps> = ({ onNavigate }) => {
  const { currentUser, isActiveMember, isPendingMember, activateMembership } = useAuth();
  const { showToast } = useToast();

  const [name, setName] = useState(currentUser?.name || 'Siddharth Reddy');
  const [email, setEmail] = useState(currentUser?.email || 'siddharth@destinyauction.com');
  const [phone, setPhone] = useState(currentUser?.phone || '+91 98450 12345');

  const [outbidAlerts, setOutbidAlerts] = useState(true);
  const [endingSoonAlerts, setEndingSoonAlerts] = useState(true);
  const [marketingEmail, setMarketingEmail] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    showToast({
      type: 'success',
      title: 'Profile Updated',
      message: 'Your rider profile settings have been saved.',
    });
  };

  return (
    <div className="content-wrapper">
      <div style={{ maxWidth: '840px', margin: '0 auto' }}>
        <div style={{ marginBottom: '32px' }}>
          <h1 className="font-display font-bold text-white text-3xl">
            Rider Profile & Membership
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '15px', marginTop: '4px' }}>
            Manage your personal credentials, lifetime membership status, and notifications.
          </p>
        </div>

        {/* Membership Status Card per PRD Section 22 & 30 */}
        <div
          className="card"
          style={{
            padding: '28px',
            marginBottom: '32px',
            backgroundColor: 'var(--bg-surface)',
            border: isActiveMember ? '1px solid rgba(16, 185, 129, 0.4)' : '1px solid var(--border-strong)',
            background: isActiveMember
              ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(24, 28, 32, 0.9) 100%)'
              : 'var(--bg-surface)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div
                style={{
                  width: '54px',
                  height: '54px',
                  borderRadius: '50%',
                  backgroundColor: isActiveMember ? 'rgba(16, 185, 129, 0.2)' : 'rgba(245, 158, 11, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: isActiveMember ? '#34D399' : '#F59E0B',
                }}
              >
                {isActiveMember ? <ShieldCheck size={28} /> : <AlertCircle size={28} />}
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="text-xs uppercase text-muted font-display font-semibold">MEMBERSHIP</span>
                  {isActiveMember ? (
                    <span className="badge badge-won">● ACTIVE</span>
                  ) : (
                    <span className="badge badge-lost" style={{ backgroundColor: '#F59E0B22', color: '#F59E0B' }}>
                      REGISTRATION FEE PENDING
                    </span>
                  )}
                </div>
                <div className="font-display font-bold text-white text-xl" style={{ marginTop: '2px' }}>
                  {isActiveMember ? 'Lifetime Auction Access' : 'Incomplete Registration'}
                </div>
                {currentUser?.membershipId && (
                  <div className="font-mono text-xs text-orange" style={{ marginTop: '2px' }}>
                    ID: {currentUser.membershipId}
                  </div>
                )}
              </div>
            </div>

            {isPendingMember && (
              <button
                onClick={async () => {
                  await activateMembership();
                }}
                className="btn btn-primary"
              >
                Pay ₹4,999 & Activate Now
              </button>
            )}
          </div>
        </div>

        {/* Profile Edit Form */}
        <form onSubmit={handleSaveProfile} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="card" style={{ padding: '28px', backgroundColor: 'var(--bg-surface)' }}>
            <h3 className="font-display font-bold text-white text-lg" style={{ marginBottom: '18px' }}>
              Personal & Contact Information
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
              <div>
                <label className="label">Full Legal Name</label>
                <input
                  className="input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div>
                <label className="label">Email Address</label>
                <input
                  className="input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label className="label">Phone Number (Verified)</label>
                <input
                  className="input font-mono"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>

            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
              <button type="submit" className="btn btn-secondary">
                Update Profile
              </button>
            </div>
          </div>

          {/* Notification Preferences */}
          <div className="card" style={{ padding: '28px', backgroundColor: 'var(--bg-surface)' }}>
            <h3 className="font-display font-bold text-white text-lg" style={{ marginBottom: '16px' }}>
              Auction Alerts & Notification Preferences
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
                <div>
                  <div className="font-medium text-white text-sm">Instant Outbid Notifications</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                    Immediate alert when another bidder exceeds your standing bid.
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={outbidAlerts}
                  onChange={(e) => setOutbidAlerts(e.target.checked)}
                  style={{ width: '18px', height: '18px', accentColor: 'var(--accent-orange)' }}
                />
              </label>

              <div style={{ borderTop: '1px solid var(--border-subtle)' }} />

              <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
                <div>
                  <div className="font-medium text-white text-sm">Auction Closing Reminders</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                    15-minute countdown alert for watched motorcycles.
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={endingSoonAlerts}
                  onChange={(e) => setEndingSoonAlerts(e.target.checked)}
                  style={{ width: '18px', height: '18px', accentColor: 'var(--accent-orange)' }}
                />
              </label>

              <div style={{ borderTop: '1px solid var(--border-subtle)' }} />

              <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
                <div>
                  <div className="font-medium text-white text-sm">Superbike Drop Bulletins</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                    Weekly catalogue of rare collector and liter-class additions.
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={marketingEmail}
                  onChange={(e) => setMarketingEmail(e.target.checked)}
                  style={{ width: '18px', height: '18px', accentColor: 'var(--accent-orange)' }}
                />
              </label>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
