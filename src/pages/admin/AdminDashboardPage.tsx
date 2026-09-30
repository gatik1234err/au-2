import React from 'react';
import { useAuctions } from '../../context/AuctionContext';
import { storageService } from '../../services/storage.service';
import {
  Users,
  Gavel,
  Flame,
  CreditCard,
  Bike as BikeIcon,
  Plus,
  ArrowUpRight,
  TrendingUp,
} from 'lucide-react';

interface AdminDashboardPageProps {
  onNavigate: (path: string) => void;
  onOpenCreateBike: () => void;
  onOpenCreateAuction: () => void;
}

export const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({
  onNavigate,
  onOpenCreateBike,
  onOpenCreateAuction,
}) => {
  const { auctions } = useAuctions();
  const users = storageService.getUsers();
  const bikes = storageService.getBikes();
  const bids = storageService.getBids();
  const payments = storageService.getPayments();

  const liveAuctions = auctions.filter((a) => a.status === 'live');
  const upcomingAuctions = auctions.filter((a) => a.status === 'upcoming');
  const totalRegistrationRevenue = payments
    .filter((p) => p.status === 'success')
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <div style={{ padding: '28px', maxWidth: '1280px', width: '100%' }}>
      {/* Header with Quick Action Buttons */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 className="font-display font-bold text-white text-3xl">
            Admin Command Center
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginTop: '2px' }}>
            DestinyAuction platform metrics, real-time inventory, and live auction operations.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button onClick={onOpenCreateBike} className="btn btn-secondary">
            <Plus size={16} /> Add Motorcycle
          </button>
          <button onClick={onOpenCreateAuction} className="btn btn-primary">
            <Gavel size={16} /> Schedule Auction
          </button>
        </div>
      </div>

      {/* KPI Stat Cards per PRD Section 32 */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
          gap: '16px',
          marginBottom: '32px',
        }}
      >
        <div className="card" style={{ padding: '20px', backgroundColor: 'var(--bg-surface)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
            <span className="text-xs uppercase font-display font-semibold">Total Registered Riders</span>
            <Users size={18} />
          </div>
          <div className="font-display font-bold text-white text-3xl" style={{ marginTop: '8px' }}>
            {users.length.toLocaleString('en-IN')}
          </div>
          <div style={{ fontSize: '11px', color: '#10B981', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <TrendingUp size={12} /> +12% this week
          </div>
        </div>

        <div className="card" style={{ padding: '20px', backgroundColor: 'var(--bg-surface)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--accent-orange)' }}>
            <span className="text-xs uppercase font-display font-semibold">Active Live Auctions</span>
            <Flame size={18} />
          </div>
          <div className="font-display font-bold text-white text-3xl" style={{ marginTop: '8px' }}>
            {liveAuctions.length.toString().padStart(2, '0')}
          </div>
          <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '4px' }}>
            {upcomingAuctions.length} scheduled upcoming
          </div>
        </div>

        <div className="card" style={{ padding: '20px', backgroundColor: 'var(--bg-surface)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--accent-silver)' }}>
            <span className="text-xs uppercase font-display font-semibold">Total Superbikes</span>
            <BikeIcon size={18} />
          </div>
          <div className="font-display font-bold text-white text-3xl" style={{ marginTop: '8px' }}>
            {bikes.length.toString().padStart(2, '0')}
          </div>
          <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Inventory in vault
          </div>
        </div>

        <div className="card" style={{ padding: '20px', backgroundColor: 'var(--bg-surface)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
            <span className="text-xs uppercase font-display font-semibold">Live Bids Submitted</span>
            <Gavel size={18} />
          </div>
          <div className="font-display font-bold text-white text-3xl" style={{ marginTop: '8px' }}>
            {bids.length.toLocaleString('en-IN')}
          </div>
          <div style={{ fontSize: '11px', color: 'var(--accent-orange)', marginTop: '4px' }}>
            Real-time audit active
          </div>
        </div>

        <div className="card" style={{ padding: '20px', backgroundColor: 'var(--bg-surface)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#10B981' }}>
            <span className="text-xs uppercase font-display font-semibold">Registration Revenue</span>
            <CreditCard size={18} />
          </div>
          <div className="font-display font-bold text-white text-3xl" style={{ marginTop: '8px' }}>
            ₹{totalRegistrationRevenue.toLocaleString('en-IN')}
          </div>
          <div style={{ fontSize: '11px', color: '#10B981', marginTop: '4px' }}>
            One-time ₹4,999 fees
          </div>
        </div>
      </div>

      {/* Live Auctions Monitor Grid */}
      <div style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <h2 className="font-display font-bold text-white text-xl">
            Live Auctions Monitor
          </h2>
          <button
            onClick={() => onNavigate('/admin/auctions')}
            className="btn btn-ghost btn-sm"
            style={{ color: 'var(--accent-orange)' }}
          >
            Manage All Auctions <ArrowUpRight size={14} />
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
          {liveAuctions.map((a) => (
            <div
              key={a.id}
              className="card"
              style={{
                padding: '16px',
                backgroundColor: 'var(--bg-surface)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <img
                  src={a.bike?.images[0]}
                  alt={a.bike?.model}
                  style={{ width: '60px', height: '42px', borderRadius: '6px', objectFit: 'cover' }}
                />
                <div>
                  <div className="font-semibold text-white text-sm">
                    {a.bike?.year} {a.bike?.brand} {a.bike?.model}
                  </div>
                  <div className="font-mono text-xs text-orange font-bold">
                    Current: ₹{a.currentBid.toLocaleString('en-IN')}
                  </div>
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <span className="badge badge-live" style={{ fontSize: '10px' }}>
                  <span className="pulse-dot" /> LIVE
                </span>
                <div className="text-xs text-muted font-mono" style={{ marginTop: '4px' }}>
                  {a.totalBids} bids
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Links Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
        <div
          onClick={() => onNavigate('/admin/users')}
          className="card card-hoverable"
          style={{ padding: '20px', cursor: 'pointer', backgroundColor: 'var(--bg-carbon)' }}
        >
          <Users size={22} className="text-orange" style={{ marginBottom: '8px' }} />
          <div className="font-semibold text-white">Rider & User Management</div>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Audit verification, approve KYC, suspend or activate bidder accounts.
          </p>
        </div>

        <div
          onClick={() => onNavigate('/admin/bikes')}
          className="card card-hoverable"
          style={{ padding: '20px', cursor: 'pointer', backgroundColor: 'var(--bg-carbon)' }}
        >
          <BikeIcon size={22} className="text-orange" style={{ marginBottom: '8px' }} />
          <div className="font-semibold text-white">Bikes Master Inventory</div>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>
            CRUD operations on superbikes, specifications, and photo dossiers.
          </p>
        </div>

        <div
          onClick={() => onNavigate('/admin/payments')}
          className="card card-hoverable"
          style={{ padding: '20px', cursor: 'pointer', backgroundColor: 'var(--bg-carbon)' }}
        >
          <CreditCard size={22} className="text-orange" style={{ marginBottom: '8px' }} />
          <div className="font-semibold text-white">Registration Fees & Revenue</div>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Review ₹4,999 registration fee transactions and payment receipts.
          </p>
        </div>
      </div>
    </div>
  );
};
