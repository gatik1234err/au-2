import React, { useState } from 'react';
import { Auction } from '../../types';
import { auctionService } from '../../services/auction.service';
import { useAuctions } from '../../context/AuctionContext';
import { useToast } from '../../context/ToastContext';
import { Plus, Edit2, StopCircle, Trash2, Gavel, CheckCircle2 } from 'lucide-react';

interface AdminAuctionsPageProps {
  onOpenCreate: () => void;
  onEditAuction: (auction: Auction) => void;
}

export const AdminAuctionsPage: React.FC<AdminAuctionsPageProps> = ({
  onOpenCreate,
  onEditAuction,
}) => {
  const { auctions, refreshAuctions } = useAuctions();
  const { showToast } = useToast();
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const handleEndAuction = (id: string) => {
    auctionService.endAuctionManually(id);
    refreshAuctions();
    showToast({
      type: 'warning',
      title: 'Auction Concluded',
      message: 'The auction has been marked ended. The highest bidder is designated winner.',
    });
  };

  const handleDelete = (id: string) => {
    auctionService.deleteAuction(id);
    refreshAuctions();
    setDeleteConfirmId(null);
    showToast({
      type: 'success',
      title: 'Auction Removed',
      message: 'The auction record has been purged.',
    });
  };

  return (
    <div style={{ padding: '28px', maxWidth: '1280px', width: '100%' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 className="font-display font-bold text-white text-3xl">
            Auctions Control Center ({auctions.length})
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginTop: '2px' }}>
            Schedule new auctions, manage starting prices, increments, and lifecycle states.
          </p>
        </div>

        <button onClick={onOpenCreate} className="btn btn-primary">
          <Plus size={16} /> Schedule New Auction
        </button>
      </div>

      {/* Table */}
      <div className="table-container">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Motorcycle</th>
              <th>Starting Price</th>
              <th>Current Bid</th>
              <th>Bids</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {auctions.map((a) => (
              <tr key={a.id}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <img
                      src={a.bike?.images[0]}
                      alt={a.bike?.model}
                      style={{ width: '56px', height: '38px', borderRadius: '6px', objectFit: 'cover' }}
                    />
                    <div>
                      <div className="font-semibold text-white">
                        {a.bike?.year} {a.bike?.brand} {a.bike?.model}
                      </div>
                      <div className="text-xs text-muted font-mono">
                        REF #{a.id.toUpperCase()}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="font-display font-bold text-white">
                  ₹{a.startingPrice.toLocaleString('en-IN')}
                </td>
                <td className="font-display font-bold text-orange text-base">
                  ₹{a.currentBid.toLocaleString('en-IN')}
                </td>
                <td className="font-mono text-center">
                  <span className="badge badge-orange" style={{ fontSize: '10px' }}>
                    {a.totalBids}
                  </span>
                </td>
                <td className="font-mono text-xs text-secondary">
                  {new Date(a.startTime).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}
                </td>
                <td className="font-mono text-xs text-secondary">
                  {new Date(a.endTime).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}
                </td>
                <td>
                  {a.status === 'live' && (
                    <span className="badge badge-live">
                      <span className="pulse-dot" /> LIVE
                    </span>
                  )}
                  {a.status === 'upcoming' && (
                    <span className="badge badge-upcoming">UPCOMING</span>
                  )}
                  {a.status === 'ended' && (
                    <span className="badge badge-ended">ENDED</span>
                  )}
                </td>
                <td>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <button
                      onClick={() => onEditAuction(a)}
                      className="btn btn-secondary btn-sm"
                      title="Edit auction parameters"
                    >
                      <Edit2 size={12} />
                    </button>

                    {a.status === 'live' && (
                      <button
                        onClick={() => handleEndAuction(a.id)}
                        className="btn btn-secondary btn-sm"
                        style={{ color: '#F59E0B' }}
                        title="End auction immediately"
                      >
                        <StopCircle size={12} />
                      </button>
                    )}

                    <button
                      onClick={() => setDeleteConfirmId(a.id)}
                      className="btn btn-ghost btn-sm"
                      style={{ color: 'var(--status-lost)' }}
                      title="Delete auction"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Delete Modal */}
      {deleteConfirmId && (
        <div className="modal-overlay">
          <div className="modal-box" style={{ padding: '24px' }}>
            <h3 className="font-display font-bold text-white text-lg">
              Delete this Auction?
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '13px', marginTop: '6px', marginBottom: '20px' }}>
              Are you sure you want to remove this auction record? This action is irrevocable.
            </p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button onClick={() => setDeleteConfirmId(null)} className="btn btn-secondary">
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="btn btn-primary"
                style={{ backgroundColor: 'var(--status-lost)', borderColor: 'var(--status-lost)' }}
              >
                Delete Auction
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
