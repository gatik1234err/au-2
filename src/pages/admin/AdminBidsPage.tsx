import React from 'react';
import { storageService } from '../../services/storage.service';
import { Gavel, History } from 'lucide-react';

export const AdminBidsPage: React.FC = () => {
  const bids = storageService.getBids();
  const auctions = storageService.getAuctions();
  const bikes = storageService.getBikes();

  return (
    <div style={{ padding: '28px', maxWidth: '1280px', width: '100%' }}>
      <div style={{ marginBottom: '24px' }}>
        <h1 className="font-display font-bold text-white text-3xl">
          Live Bidding Audit Trail ({bids.length})
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginTop: '2px' }}>
          Immutable ledger of all qualifying bids received across DestinyAuction.
        </p>
      </div>

      <div className="table-container">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Bid ID</th>
              <th>Rider Name</th>
              <th>Auction Reference</th>
              <th>Bid Amount</th>
              <th>Timestamp</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {bids.map((bid) => {
              const auction = auctions.find((a) => a.id === bid.auctionId);
              const bike = bikes.find((b) => b.id === auction?.bikeId);

              return (
                <tr key={bid.id}>
                  <td className="font-mono text-xs text-orange font-bold">
                    {bid.id}
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <img
                        src={bid.userAvatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=60'}
                        alt={bid.userName}
                        style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover' }}
                      />
                      <span className="font-medium text-white">{bid.userName}</span>
                    </div>
                  </td>
                  <td>
                    <div className="text-white text-sm">
                      {bike ? `${bike.year} ${bike.brand} ${bike.model}` : bid.auctionId}
                    </div>
                    <div className="font-mono text-xs text-muted">
                      #{bid.auctionId}
                    </div>
                  </td>
                  <td>
                    <span className="font-display font-bold text-white text-base">
                      ₹{bid.amount.toLocaleString('en-IN')}
                    </span>
                  </td>
                  <td className="font-mono text-xs text-secondary">
                    {new Date(bid.createdAt).toLocaleString()}
                  </td>
                  <td>
                    <span className="badge badge-won">
                      {bid.status.toUpperCase()}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
