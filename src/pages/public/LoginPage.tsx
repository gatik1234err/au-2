import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Flame, Lock, Mail, ArrowRight, UserCheck, Shield } from 'lucide-react';

interface LoginPageProps {
  onNavigate: (path: string) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onNavigate }) => {
  const { login } = useAuth();
  const [identifier, setIdentifier] = useState('siddharth@destinyauction.com');
  const [password, setPassword] = useState('••••••••');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(identifier);
    if (success) {
      onNavigate('/dashboard');
    }
  };

  const handleQuickLogin = (email: string) => {
    setIdentifier(email);
    login(email);
    onNavigate(email.includes('admin') ? '/admin' : '/dashboard');
  };

  return (
    <div className="content-wrapper" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '70vh' }}>
      <div
        className="card"
        style={{
          maxWidth: '460px',
          width: '100%',
          padding: '36px',
          backgroundColor: 'var(--bg-surface)',
          border: '1px solid var(--border-strong)',
          boxShadow: 'var(--shadow-lg), 0 0 40px rgba(0,0,0,0.8)',
        }}
      >
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '10px',
              backgroundColor: 'var(--accent-orange)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 12px auto',
              boxShadow: '0 0 20px rgba(255, 90, 31, 0.4)',
            }}
          >
            <Flame size={24} color="#FFFFFF" />
          </div>
          <h2 className="font-display font-bold text-white text-2xl">
            Sign In to DestinyAuction
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '13px', marginTop: '4px' }}>
            Access your live superbike bids and account dashboard
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label className="label">Email or Phone Number</label>
            <div style={{ position: 'relative' }}>
              <Mail
                size={16}
                style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--text-muted)',
                }}
              />
              <input
                className="input"
                style={{ paddingLeft: '38px' }}
                type="text"
                required
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="e.g. rider@domain.com"
              />
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <label className="label" style={{ margin: 0 }}>Password</label>
              <a
                href="#"
                onClick={(e) => { e.preventDefault(); alert('In this prototype, password verification is simulated. You can use any password or click a quick login persona.'); }}
                style={{ fontSize: '11px', color: 'var(--accent-orange)' }}
              >
                Forgot Password?
              </a>
            </div>
            <div style={{ position: 'relative' }}>
              <Lock
                size={16}
                style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--text-muted)',
                }}
              />
              <input
                className="input"
                style={{ paddingLeft: '38px' }}
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary btn-lg" style={{ marginTop: '8px' }}>
            <span>Sign In</span>
            <ArrowRight size={16} />
          </button>
        </form>

        {/* Demo Quick Logins */}
        <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: '1px solid var(--border-subtle)' }}>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '10px', textAlign: 'center' }}>
            Quick Demo Login Personas:
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <button
              onClick={() => handleQuickLogin('siddharth@destinyauction.com')}
              className="btn btn-secondary btn-sm"
              style={{ justifyContent: 'flex-start', fontSize: '12px' }}
            >
              <UserCheck size={14} className="text-orange" />
              <span>Siddharth Reddy (Active Member)</span>
            </button>

            <button
              onClick={() => handleQuickLogin('arjun.mehta@gmail.com')}
              className="btn btn-secondary btn-sm"
              style={{ justifyContent: 'flex-start', fontSize: '12px' }}
            >
              <UserCheck size={14} style={{ color: '#F59E0B' }} />
              <span>Arjun Mehta (Fee Pending)</span>
            </button>

            <button
              onClick={() => handleQuickLogin('admin@destinyauction.com')}
              className="btn btn-secondary btn-sm"
              style={{ justifyContent: 'flex-start', fontSize: '12px' }}
            >
              <Shield size={14} className="text-orange" />
              <span>Vikramaditya Rao (Administrator)</span>
            </button>
          </div>
        </div>

        {/* Don't have an account */}
        <div style={{ marginTop: '24px', textAlign: 'center', fontSize: '13px', color: 'var(--text-secondary)' }}>
          Don't have a rider account?{' '}
          <button
            onClick={() => onNavigate('/register')}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--accent-orange)',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Register Now
          </button>
        </div>
      </div>
    </div>
  );
};
