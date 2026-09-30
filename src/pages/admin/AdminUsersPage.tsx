import React, { useState } from 'react';
import { User } from '../../types';
import { storageService } from '../../services/storage.service';
import { useToast } from '../../context/ToastContext';
import { UserCheck, ShieldAlert, CheckCircle2, UserX, Trash2, Mail, Phone } from 'lucide-react';

export const AdminUsersPage: React.FC = () => {
  const { showToast } = useToast();
  const [users, setUsers] = useState<User[]>(storageService.getUsers());
  const [search, setSearch] = useState('');

  const refreshList = () => {
    setUsers(storageService.getUsers());
  };

  const toggleSuspend = (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'suspended' ? 'active' : 'suspended';
    const updated = users.map((u) => (u.id === id ? { ...u, membershipStatus: newStatus as any } : u));
    setUsers(updated);
    storageService.saveUsers(updated);

    showToast({
      type: newStatus === 'suspended' ? 'warning' : 'success',
      title: newStatus === 'suspended' ? 'User Suspended' : 'User Activated',
      message: `Rider account status changed to ${newStatus}.`,
    });
  };

  const filteredUsers = users.filter((u) => {
    const q = search.toLowerCase();
    return u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q) || u.phone.includes(q);
  });

  return (
    <div style={{ padding: '28px', maxWidth: '1280px', width: '100%' }}>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <h1 className="font-display font-bold text-white text-3xl">
          Rider & User Registry ({users.length})
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginTop: '2px' }}>
          Inspect rider accounts, verify KYC and lifetime membership payments, suspend or reactivate bidders.
        </p>
      </div>

      <div style={{ marginBottom: '20px', maxWidth: '380px' }}>
        <input
          className="input"
          placeholder="Search by name, email, or phone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="table-container">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Rider</th>
              <th>Contact</th>
              <th>Role</th>
              <th>Membership Status</th>
              <th>Registration Fee</th>
              <th>Registered Since</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((u) => (
              <tr key={u.id}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <img
                      src={u.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100'}
                      alt={u.name}
                      style={{ width: '38px', height: '38px', borderRadius: '50%', objectFit: 'cover' }}
                    />
                    <div>
                      <div className="font-semibold text-white">{u.name}</div>
                      <div className="font-mono text-xs text-muted">ID: {u.id}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <div style={{ fontSize: '13px', color: 'var(--text-primary)' }}>{u.email}</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }} className="font-mono">{u.phone}</div>
                </td>
                <td>
                  <span className={`badge ${u.role === 'admin' ? 'badge-orange' : 'badge-ended'}`}>
                    {u.role.toUpperCase()}
                  </span>
                </td>
                <td>
                  {u.membershipStatus === 'active' && (
                    <span className="badge badge-won">
                      <CheckCircle2 size={10} /> ACTIVE
                    </span>
                  )}
                  {u.membershipStatus === 'pending' && (
                    <span className="badge badge-lost" style={{ backgroundColor: '#F59E0B22', color: '#F59E0B' }}>
                      PENDING
                    </span>
                  )}
                  {u.membershipStatus === 'suspended' && (
                    <span className="badge badge-lost">SUSPENDED</span>
                  )}
                </td>
                <td>
                  {u.registrationPaymentStatus === 'paid' ? (
                    <span className="badge badge-won">PAID (₹4,999)</span>
                  ) : (
                    <span className="badge badge-ended">UNPAID</span>
                  )}
                </td>
                <td className="font-mono text-xs text-secondary">
                  {new Date(u.createdAt).toLocaleDateString()}
                </td>
                <td>
                  {u.role !== 'admin' && (
                    <button
                      onClick={() => toggleSuspend(u.id, u.membershipStatus)}
                      className={`btn btn-sm ${u.membershipStatus === 'suspended' ? 'btn-primary' : 'btn-secondary'}`}
                      style={{ fontSize: '11px', padding: '4px 10px' }}
                    >
                      {u.membershipStatus === 'suspended' ? 'Reactivate' : 'Suspend'}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
