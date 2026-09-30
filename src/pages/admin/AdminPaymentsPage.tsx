import React from 'react';
import { storageService } from '../../services/storage.service';
import { CreditCard, CheckCircle2, Clock, AlertCircle } from 'lucide-react';

export const AdminPaymentsPage: React.FC = () => {
  const payments = storageService.getPayments();

  return (
    <div style={{ padding: '28px', maxWidth: '1280px', width: '100%' }}>
      <div style={{ marginBottom: '24px' }}>
        <h1 className="font-display font-bold text-white text-3xl">
          Registration Payments & Revenue ({payments.length})
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginTop: '2px' }}>
          One-time ₹4,999 registration fee remittances, payment methods, and transaction references.
        </p>
      </div>

      <div className="table-container">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Payment ID</th>
              <th>Rider</th>
              <th>Amount</th>
              <th>Type</th>
              <th>Payment Method</th>
              <th>Transaction Reference</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((p) => (
              <tr key={p.id}>
                <td className="font-mono text-xs text-orange font-bold">
                  {p.id}
                </td>
                <td className="font-semibold text-white">
                  {p.userName}
                </td>
                <td>
                  <span className="font-display font-bold text-white text-base">
                    ₹{p.amount.toLocaleString('en-IN')}
                  </span>
                </td>
                <td>
                  <span className="badge badge-orange" style={{ fontSize: '10px' }}>
                    {p.type.toUpperCase()}
                  </span>
                </td>
                <td className="text-secondary text-sm">
                  {p.paymentMethod}
                </td>
                <td className="font-mono text-xs text-muted">
                  {p.transactionReference}
                </td>
                <td className="font-mono text-xs text-secondary">
                  {new Date(p.createdAt).toLocaleString()}
                </td>
                <td>
                  {p.status === 'success' && (
                    <span className="badge badge-won">
                      <CheckCircle2 size={10} /> SUCCESS
                    </span>
                  )}
                  {p.status === 'pending' && (
                    <span className="badge badge-lost" style={{ backgroundColor: '#F59E0B22', color: '#F59E0B' }}>
                      <Clock size={10} /> PENDING
                    </span>
                  )}
                  {p.status === 'failed' && (
                    <span className="badge badge-lost">
                      <AlertCircle size={10} /> FAILED
                    </span>
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
