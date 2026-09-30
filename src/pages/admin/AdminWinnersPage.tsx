import React, { useState } from 'react';
import { Winner } from '../../types';
import { storageService } from '../../services/storage.service';
import { useToast } from '../../context/ToastContext';
import { Trophy, CheckCircle2, Truck, Clock } from 'lucide-react';

export const AdminWinnersPage: React.FC = () => {
  const { showToast } = useToast();
  const [winners, setWinners] = useState<Winner[]>(storageService.getWinners());

  const handleUpdateStatus = (winId: string, nextStatus: any) => {
    const updated = winners.map((w) => (w.id === winId ? { ...w, settlementStatus: nextStatus } : w));
    setWinners(updated);
    storageService.saveWinners(updated);
    showToast({
      type: 'success',
      title: 'Settlement Updated',
      message: `Status updated to ${nextStatus}.`,
    });
  };

  return (
    <div style={{ padding: '28px', maxWidth: '1280px', width: '100%' }}>
      <div style={{ marginBottom: '24px' }}>
        <h1 className="font-display font-bold text-white text-3xl">
          Winners & Settlement Tracking ({winners.length})
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginTop: '2px' }}>
          Concluded auctions, winning bid settlements, RTO transfer progress, and doorstep logistics.
        </p>
      </div>

      <div className="table-container">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Settlement Ref</th>
              <th>Motorcycle Won</th>
              <th>Winner Name</th>
              <th>Winning Bid</th>
              <th>End Date</th>
              <th>Delivery Destination</th>
              <th>Settlement Status</th>
              <th>Update Status</th>
            </tr>
          </thead>
          <tbody>
            {winners.map((win) => (
              <tr key={win.id}>
                <td className="font-mono text-xs text-orange font-bold">
                  {win.id}
                </td>
                <td className="font-semibold text-white">
                  {win.bikeTitle}
                </td>
                <td className="text-secondary text-sm">
                  {win.winnerName}
                </td>
                <td>
                  <span className="font-display font-bold text-white text-base">
                    ₹{win.winningBid.toLocaleString('en-IN')}
                  </span>
                </td>
                <td className="font-mono text-xs text-secondary">
                  {new Date(win.auctionEndDate).toLocaleDateString()}
                </td>
                <td className="text-secondary text-sm">
                  {win.deliveryCity || 'Mumbai'}
                </td>
                <td>
                  {win.settlementStatus === 'delivered' && (
                    <span className="badge badge-won">
                      <Truck size={10} /> DELIVERED
                    </span>
                  )}
                  {win.settlementStatus === 'paid' && (
                    <span className="badge badge-won">
                      <CheckCircle2 size={10} /> ESCROW PAID
                    </span>
                  )}
                  {win.settlementStatus === 'pending_payment' && (
                    <span className="badge badge-lost" style={{ backgroundColor: '#F59E0B22', color: '#F59E0B' }}>
                      <Clock size={10} /> PENDING
                    </span>
                  )}
                </td>
                <td>
                  <select
                    className="select"
                    style={{ width: 'auto', fontSize: '12px', padding: '4px 8px' }}
                    value={win.settlementStatus}
                    onChange={(e) => handleUpdateStatus(win.id, e.target.value)}
                  >
                    <option value="pending_payment">Pending Payment</option>
                    <option value="paid">Paid (In Escrow)</option>
                    <option value="delivered">Delivered to Rider</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
