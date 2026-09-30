import React, { useState } from 'react';
import { Auction, Bike } from '../../types';
import { X, Gavel, Calendar } from 'lucide-react';

interface AuctionModalProps {
  auction?: Auction | null;
  bikes: Bike[];
  isOpen: boolean;
  onClose: () => void;
  onSave: (auctionData: any) => void;
}

export const AuctionModal: React.FC<AuctionModalProps> = ({
  auction,
  bikes,
  isOpen,
  onClose,
  onSave,
}) => {
  const now = new Date();
  const defaultStartTime = new Date(now.getTime() + 10 * 60 * 1000).toISOString().slice(0, 16);
  const defaultEndTime = new Date(now.getTime() + 24 * 60 * 60 * 1000).toISOString().slice(0, 16);

  const [bikeId, setBikeId] = useState(auction?.bikeId || (bikes.length > 0 ? bikes[0].id : ''));
  const [startingPrice, setStartingPrice] = useState(auction?.startingPrice || 1000000);
  const [minimumIncrement, setMinimumIncrement] = useState(auction?.minimumIncrement || 10000);
  const [reservePrice, setReservePrice] = useState(auction?.reservePrice || 1200000);
  const [startTime, setStartTime] = useState(
    auction?.startTime ? new Date(auction.startTime).toISOString().slice(0, 16) : defaultStartTime
  );
  const [endTime, setEndTime] = useState(
    auction?.endTime ? new Date(auction.endTime).toISOString().slice(0, 16) : defaultEndTime
  );
  const [featured, setFeatured] = useState(auction?.featured || false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...(auction ? { id: auction.id } : {}),
      bikeId,
      startingPrice: Number(startingPrice),
      minimumIncrement: Number(minimumIncrement),
      reservePrice: Number(reservePrice),
      startTime: new Date(startTime).toISOString(),
      endTime: new Date(endTime).toISOString(),
      featured,
    });
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box" style={{ maxWidth: '600px' }}>
        <div
          style={{
            padding: '20px 24px',
            borderBottom: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                backgroundColor: 'rgba(255, 90, 31, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--accent-orange)',
              }}
            >
              <Gavel size={20} />
            </div>
            <div>
              <div className="font-display font-bold text-white text-lg">
                {auction ? 'Modify Auction Settings' : 'Schedule New Superbike Auction'}
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                DestinyAuction Auction Master Control
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
            }}
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div>
            <label className="label">Select Motorcycle from Inventory</label>
            <select
              className="select"
              value={bikeId}
              onChange={(e) => setBikeId(e.target.value)}
              required
            >
              {bikes.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.year} {b.brand} {b.model} ({b.engineCC}cc - {b.location})
                </option>
              ))}
            </select>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px' }}>
            <div>
              <label className="label">Starting Price (₹)</label>
              <input
                type="number"
                className="input"
                required
                value={startingPrice}
                onChange={(e) => setStartingPrice(Number(e.target.value))}
              />
            </div>
            <div>
              <label className="label">Min. Increment (₹)</label>
              <input
                type="number"
                className="input"
                required
                value={minimumIncrement}
                onChange={(e) => setMinimumIncrement(Number(e.target.value))}
              />
            </div>
            <div>
              <label className="label">Reserve Price (₹)</label>
              <input
                type="number"
                className="input"
                value={reservePrice}
                onChange={(e) => setReservePrice(Number(e.target.value))}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px' }}>
            <div>
              <label className="label">Auction Start Time</label>
              <input
                type="datetime-local"
                className="input font-mono"
                required
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </div>
            <div>
              <label className="label">Auction End Time</label>
              <input
                type="datetime-local"
                className="input font-mono"
                required
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '6px' }}>
            <input
              type="checkbox"
              id="featuredCheck"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
              style={{ width: '18px', height: '18px', accentColor: 'var(--accent-orange)' }}
            />
            <label htmlFor="featuredCheck" style={{ fontSize: '14px', color: '#FFFFFF', cursor: 'pointer' }}>
              Feature this auction on the Homepage Hero carousel
            </label>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '12px' }}>
            <button type="button" onClick={onClose} className="btn btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {auction ? 'Update Auction' : 'Schedule Auction'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
