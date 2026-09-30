import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { paymentService } from '../../services/payment.service';
import {
  Flame,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  CreditCard,
  Smartphone,
  Building2,
  Lock,
  Sparkles,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface RegisterPageProps {
  onNavigate: (path: string) => void;
}

export const RegisterPage: React.FC<RegisterPageProps> = ({ onNavigate }) => {
  const { register, currentUser } = useAuth();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Step 1 Form
  const [name, setName] = useState('Raghav Chawla');
  const [email, setEmail] = useState('raghav.chawla@superbike.in');
  const [phone, setPhone] = useState('+91 98200 44556');
  const [password, setPassword] = useState('destiny2026');

  // Step 2 OTP
  const [otp, setOtp] = useState('');
  const generatedMockOtp = '884920';

  // Step 3 Payment
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'Credit Card' | 'Net Banking'>('UPI');
  const [upiId, setUpiId] = useState('raghav@okhdfcbank');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  // Created user cache
  const [registeredUserId, setRegisteredUserId] = useState<string>('');

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    const newUser = register({ name, email, phone, password });
    setRegisteredUserId(newUser.id);
    setStep(2);
  };

  const handleStep2Submit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3);
  };

  const handlePayRegistrationFee = async () => {
    setIsProcessingPayment(true);
    const userId = registeredUserId || currentUser?.id || 'user-pending';

    const result = await paymentService.processRegistrationPayment(userId, paymentMethod as any);
    setIsProcessingPayment(false);

    if (result.success) {
      setStep(4);
      try {
        confetti({
          particleCount: 80,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#FF5A1F', '#10B981', '#FFFFFF'],
        });
      } catch (e) {}
    }
  };

  return (
    <div className="content-wrapper" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '75vh' }}>
      <div
        className="card"
        style={{
          maxWidth: '540px',
          width: '100%',
          padding: '36px',
          backgroundColor: 'var(--bg-surface)',
          border: '1px solid var(--border-strong)',
          boxShadow: 'var(--shadow-lg), 0 0 40px rgba(0,0,0,0.8)',
        }}
      >
        {/* Step Indicator Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                backgroundColor: 'var(--accent-orange)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF',
              }}
            >
              <Flame size={18} />
            </div>
            <div>
              <div className="font-display font-bold text-white text-base">
                Rider Membership
              </div>
              <div style={{ fontSize: '11px', color: 'var(--accent-silver)' }}>
                DestinyAuction Onboarding
              </div>
            </div>
          </div>

          <div className="font-mono text-xs text-orange font-bold">
            {step < 4 ? `STEP ${step} OF 3` : 'ACTIVATED'}
          </div>
        </div>

        {/* Progress Bar */}
        <div
          style={{
            height: '4px',
            backgroundColor: 'var(--bg-carbon)',
            borderRadius: '2px',
            marginBottom: '28px',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              height: '100%',
              backgroundColor: 'var(--accent-orange)',
              width: step === 1 ? '33%' : step === 2 ? '66%' : '100%',
              transition: 'width 0.3s ease',
            }}
          />
        </div>

        {/* STEP 1: Account Information (PRD Section 21) */}
        {step === 1 && (
          <div>
            <div style={{ marginBottom: '20px' }}>
              <h2 className="font-display font-bold text-white text-xl">
                Create Your Account
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '13px', marginTop: '4px' }}>
                Join India's verified superbike auction network
              </p>
            </div>

            <form onSubmit={handleStep1Submit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label className="label">Full Legal Name</label>
                <input
                  className="input"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Raghav Chawla"
                />
              </div>

              <div>
                <label className="label">Email Address</label>
                <input
                  className="input"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="rider@domain.com"
                />
              </div>

              <div>
                <label className="label">Mobile Phone Number</label>
                <input
                  className="input font-mono"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98XXX XXXXX"
                />
              </div>

              <div>
                <label className="label">Create Password</label>
                <input
                  className="input"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button type="submit" className="btn btn-primary btn-lg" style={{ marginTop: '10px' }}>
                <span>Continue to Verification</span>
                <ArrowRight size={16} />
              </button>
            </form>
          </div>
        )}

        {/* STEP 2: Phone / Email OTP Verification (PRD Section 21) */}
        {step === 2 && (
          <div>
            <div style={{ marginBottom: '20px' }}>
              <h2 className="font-display font-bold text-white text-xl">
                Verify Your Identity
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '13px', marginTop: '4px' }}>
                We sent a 6-digit confirmation code to <strong className="text-white">{phone}</strong>
              </p>
            </div>

            <form onSubmit={handleStep2Submit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div>
                <label className="label">6-Digit Verification Code</label>
                <input
                  className="input font-mono text-center text-xl font-bold"
                  style={{ letterSpacing: '0.4em' }}
                  maxLength={6}
                  required
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="______"
                />
              </div>

              {/* Demo auto-fill helper */}
              <div
                style={{
                  backgroundColor: 'var(--bg-carbon)',
                  padding: '12px',
                  borderRadius: 'var(--radius-md)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  border: '1px solid var(--border-subtle)',
                }}
              >
                <span className="font-mono text-xs text-muted">
                  Demo Code: <strong className="text-orange">{generatedMockOtp}</strong>
                </span>
                <button
                  type="button"
                  onClick={() => setOtp(generatedMockOtp)}
                  className="btn btn-secondary btn-sm"
                  style={{ padding: '3px 8px', fontSize: '11px' }}
                >
                  Auto-Fill
                </button>
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="btn btn-secondary"
                  style={{ flex: 1 }}
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ flex: 2 }}
                  disabled={otp.length < 4}
                >
                  <span>Verify & Proceed</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </form>
          </div>
        )}

        {/* STEP 3: One-time Registration Fee Payment (PRD Section 21 & 22) */}
        {step === 3 && (
          <div>
            <div style={{ marginBottom: '20px' }}>
              <div className="badge badge-orange" style={{ marginBottom: '6px' }}>
                Final Step
              </div>
              <h2 className="font-display font-bold text-white text-xl">
                DESTINYAuction Membership
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '13px', marginTop: '4px' }}>
                One-time registration fee for lifetime superbike bidding access
              </p>
            </div>

            {/* Price & Benefits Box per PRD Section 21 */}
            <div
              style={{
                backgroundColor: 'var(--bg-carbon)',
                border: '1px solid var(--border-strong)',
                borderRadius: 'var(--radius-md)',
                padding: '20px',
                marginBottom: '20px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '12px', marginBottom: '14px' }}>
                <span className="text-xs uppercase text-muted font-display font-semibold">One-Time Registration Fee</span>
                <span className="font-display font-bold text-orange text-2xl">₹4,999</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
                <div className="flex items-center gap-2 text-white">
                  <CheckCircle2 size={15} color="#10B981" />
                  <span>Lifetime auction marketplace access</span>
                </div>
                <div className="flex items-center gap-2 text-white">
                  <CheckCircle2 size={15} color="#10B981" />
                  <span>Bid on live auctions in real-time</span>
                </div>
                <div className="flex items-center gap-2 text-white">
                  <CheckCircle2 size={15} color="#10B981" />
                  <span>Track your bids with outbid alerts</span>
                </div>
                <div className="flex items-center gap-2 text-white">
                  <CheckCircle2 size={15} color="#10B981" />
                  <span>View comprehensive auction logs & history</span>
                </div>
                <div className="flex items-center gap-2 text-white">
                  <CheckCircle2 size={15} color="#10B981" />
                  <span>Receive official winner documents & concierge escrow</span>
                </div>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div style={{ marginBottom: '20px' }}>
              <label className="label">Select Payment Gateway</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('UPI')}
                  className={`card ${paymentMethod === 'UPI' ? 'border-highlight' : ''}`}
                  style={{
                    padding: '12px 8px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    backgroundColor: paymentMethod === 'UPI' ? 'var(--bg-surface-elevated)' : 'var(--bg-carbon)',
                    borderColor: paymentMethod === 'UPI' ? 'var(--accent-orange)' : 'var(--border-subtle)',
                  }}
                >
                  <Smartphone size={18} color={paymentMethod === 'UPI' ? '#FF5A1F' : '#9CA3AF'} style={{ margin: '0 auto 4px auto' }} />
                  <div style={{ fontSize: '11px', fontWeight: 600, color: '#FFFFFF' }}>Instant UPI</div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('Credit Card')}
                  className={`card ${paymentMethod === 'Credit Card' ? 'border-highlight' : ''}`}
                  style={{
                    padding: '12px 8px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    backgroundColor: paymentMethod === 'Credit Card' ? 'var(--bg-surface-elevated)' : 'var(--bg-carbon)',
                    borderColor: paymentMethod === 'Credit Card' ? 'var(--accent-orange)' : 'var(--border-subtle)',
                  }}
                >
                  <CreditCard size={18} color={paymentMethod === 'Credit Card' ? '#FF5A1F' : '#9CA3AF'} style={{ margin: '0 auto 4px auto' }} />
                  <div style={{ fontSize: '11px', fontWeight: 600, color: '#FFFFFF' }}>Card</div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('Net Banking')}
                  className={`card ${paymentMethod === 'Net Banking' ? 'border-highlight' : ''}`}
                  style={{
                    padding: '12px 8px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    backgroundColor: paymentMethod === 'Net Banking' ? 'var(--bg-surface-elevated)' : 'var(--bg-carbon)',
                    borderColor: paymentMethod === 'Net Banking' ? 'var(--accent-orange)' : 'var(--border-subtle)',
                  }}
                >
                  <Building2 size={18} color={paymentMethod === 'Net Banking' ? '#FF5A1F' : '#9CA3AF'} style={{ margin: '0 auto 4px auto' }} />
                  <div style={{ fontSize: '11px', fontWeight: 600, color: '#FFFFFF' }}>Net Banking</div>
                </button>
              </div>

              {paymentMethod === 'UPI' && (
                <div style={{ marginTop: '12px' }}>
                  <input
                    className="input font-mono text-sm"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    placeholder="Enter UPI VPA (e.g. mobile@upi)"
                  />
                </div>
              )}
            </div>

            <button
              onClick={handlePayRegistrationFee}
              disabled={isProcessingPayment}
              className="btn btn-primary btn-lg"
              style={{ width: '100%' }}
            >
              <Lock size={16} />
              <span>{isProcessingPayment ? 'Processing Escrow Payment...' : 'Pay ₹4,999 & Activate Lifetime'}</span>
            </button>
          </div>
        )}

        {/* STEP 4: Success Activated State (PRD Section 22) */}
        {step === 4 && (
          <div style={{ textAlign: 'center', padding: '16px 0' }}>
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                backgroundColor: 'rgba(16, 185, 129, 0.15)',
                color: '#34D399',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px auto',
                border: '2px solid rgba(16, 185, 129, 0.4)',
              }}
            >
              <Sparkles size={32} />
            </div>

            <span className="badge badge-won" style={{ marginBottom: '10px' }}>
              MEMBERSHIP ACTIVATED
            </span>

            <h2 className="font-display font-bold text-white text-2xl">
              Welcome to DestinyAuction
            </h2>

            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginTop: '8px', lineHeight: 1.6, maxWidth: '400px', margin: '8px auto 24px auto' }}>
              Your lifetime auction credentials have been verified and activated. You can now place qualifying bids on every active superbike.
            </p>

            <div
              style={{
                backgroundColor: 'var(--bg-carbon)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
                padding: '16px',
                marginBottom: '24px',
                textAlign: 'left',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span className="text-xs text-muted">Status:</span>
                <span className="badge badge-won">● ACTIVE</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span className="text-xs text-muted">Access Tier:</span>
                <strong className="text-white text-xs">Perpetual Lifetime</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span className="text-xs text-muted">Receipt Ref:</span>
                <span className="font-mono text-xs text-orange">TXN-LIFETIME-VERIFIED</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={() => onNavigate('/auctions')}
                className="btn btn-primary"
                style={{ flex: 1 }}
              >
                Browse Live Auctions
              </button>
              <button
                onClick={() => onNavigate('/dashboard')}
                className="btn btn-secondary"
                style={{ flex: 1 }}
              >
                Go to Dashboard
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
