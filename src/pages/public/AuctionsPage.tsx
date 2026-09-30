import React, { useState, useMemo } from 'react';
import { useAuctions } from '../../context/AuctionContext';
import { AuctionCard } from '../../components/auction/AuctionCard';
import { Search, Filter, SlidersHorizontal, X, RotateCcw } from 'lucide-react';

interface AuctionsPageProps {
  onSelectAuction: (auctionId: string) => void;
}

export const AuctionsPage: React.FC<AuctionsPageProps> = ({ onSelectAuction }) => {
  const { auctions } = useAuctions();

  // Filters state per PRD Section 13
  const [search, setSearch] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'live' | 'upcoming' | 'ended'>('all');
  const [ccRange, setCcRange] = useState('all');
  const [sortBy, setSortBy] = useState<'endingSoon' | 'newlyAdded' | 'priceLow' | 'priceHigh' | 'mostBids'>('endingSoon');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Extract unique brands
  const brands = useMemo(() => {
    const set = new Set<string>();
    auctions.forEach((a) => {
      if (a.bike?.brand) set.add(a.bike.brand);
    });
    return Array.from(set);
  }, [auctions]);

  // Filtered and sorted auctions
  const filteredAuctions = useMemo(() => {
    return auctions
      .filter((a) => {
        const bike = a.bike;
        if (!bike) return false;

        // Search match
        if (search.trim()) {
          const q = search.toLowerCase();
          const matchTitle = `${bike.year} ${bike.brand} ${bike.model} ${bike.variant || ''}`.toLowerCase().includes(q);
          const matchLocation = bike.location.toLowerCase().includes(q);
          if (!matchTitle && !matchLocation) return false;
        }

        // Brand match
        if (selectedBrand !== 'all' && bike.brand !== selectedBrand) {
          return false;
        }

        // Status match
        if (statusFilter !== 'all' && a.status !== statusFilter) {
          return false;
        }

        // CC Range match
        if (ccRange === 'under600' && bike.engineCC >= 600) return false;
        if (ccRange === '600to900' && (bike.engineCC < 600 || bike.engineCC > 900)) return false;
        if (ccRange === 'literClass' && bike.engineCC < 900) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'endingSoon') {
          return new Date(a.endTime).getTime() - new Date(b.endTime).getTime();
        }
        if (sortBy === 'newlyAdded') {
          return new Date(b.startTime).getTime() - new Date(a.startTime).getTime();
        }
        if (sortBy === 'priceLow') {
          return a.currentBid - b.currentBid;
        }
        if (sortBy === 'priceHigh') {
          return b.currentBid - a.currentBid;
        }
        if (sortBy === 'mostBids') {
          return b.totalBids - a.totalBids;
        }
        return 0;
      });
  }, [auctions, search, selectedBrand, statusFilter, ccRange, sortBy]);

  const resetFilters = () => {
    setSearch('');
    setSelectedBrand('all');
    setStatusFilter('all');
    setCcRange('all');
    setSortBy('endingSoon');
  };

  const hasActiveFilters =
    search.trim() !== '' ||
    selectedBrand !== 'all' ||
    statusFilter !== 'all' ||
    ccRange !== 'all';

  return (
    <div className="content-wrapper">
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <div className="badge badge-orange" style={{ marginBottom: '8px' }}>
          Auction Catalogue
        </div>
        <h1 className="font-display font-bold text-white text-3xl">
          LIVE MOTORCYCLE AUCTIONS
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '15px', marginTop: '4px' }}>
          Find your next machine. Verified superbikes ready for live bidding.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div
        style={{
          backgroundColor: 'var(--bg-surface)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-lg)',
          padding: '20px',
          marginBottom: '32px',
        }}
      >
        {/* Top Row: Search and Sort */}
        <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'center', marginBottom: '16px' }}>
          <div style={{ position: 'relative', flex: 1, minWidth: '240px' }}>
            <Search
              size={18}
              style={{
                position: 'absolute',
                left: '14px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--text-muted)',
              }}
            />
            <input
              className="input"
              style={{ paddingLeft: '42px' }}
              placeholder="Search by bike model, brand, or location..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: '200px' }}>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', flexShrink: 0 }}>
              Sort:
            </span>
            <select
              className="select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
            >
              <option value="endingSoon">Ending Soon</option>
              <option value="newlyAdded">Newly Added</option>
              <option value="mostBids">Most Bids</option>
              <option value="priceLow">Price: Low → High</option>
              <option value="priceHigh">Price: High → Low</option>
            </select>
          </div>
        </div>

        {/* Second Row: Filter Tabs & Selectors */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
            borderTop: '1px solid var(--border-subtle)',
            paddingTop: '16px',
          }}
        >
          {/* Status Pills */}
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            <button
              onClick={() => setStatusFilter('all')}
              className={`btn btn-sm ${statusFilter === 'all' ? 'btn-primary' : 'btn-secondary'}`}
            >
              All ({auctions.length})
            </button>
            <button
              onClick={() => setStatusFilter('live')}
              className={`btn btn-sm ${statusFilter === 'live' ? 'btn-primary' : 'btn-secondary'}`}
            >
              <span className="pulse-dot" /> Live (
              {auctions.filter((a) => a.status === 'live').length})
            </button>
            <button
              onClick={() => setStatusFilter('upcoming')}
              className={`btn btn-sm ${statusFilter === 'upcoming' ? 'btn-primary' : 'btn-secondary'}`}
            >
              Upcoming ({auctions.filter((a) => a.status === 'upcoming').length})
            </button>
            <button
              onClick={() => setStatusFilter('ended')}
              className={`btn btn-sm ${statusFilter === 'ended' ? 'btn-primary' : 'btn-secondary'}`}
            >
              Past / Ended ({auctions.filter((a) => a.status === 'ended').length})
            </button>
          </div>

          {/* Quick Selectors: Brand & CC */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <select
              className="select"
              style={{ width: 'auto', minWidth: '130px', fontSize: '13px', padding: '6px 10px' }}
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
            >
              <option value="all">All Brands</option>
              {brands.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>

            <select
              className="select"
              style={{ width: 'auto', minWidth: '150px', fontSize: '13px', padding: '6px 10px' }}
              value={ccRange}
              onChange={(e) => setCcRange(e.target.value)}
            >
              <option value="all">Any Displacement</option>
              <option value="under600">&lt; 600 cc</option>
              <option value="600to900">600 cc – 900 cc</option>
              <option value="literClass">Liter-Class (1000 cc+)</option>
            </select>

            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="btn btn-ghost btn-sm"
                style={{ color: 'var(--status-lost)' }}
              >
                <RotateCcw size={13} /> Reset
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
          Showing <strong className="text-white">{filteredAuctions.length}</strong> motorcycle auctions
        </div>
      </div>

      {/* Grid or Empty State */}
      {filteredAuctions.length > 0 ? (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: '24px',
          }}
        >
          {filteredAuctions.map((auction) => (
            <AuctionCard
              key={auction.id}
              auction={auction}
              onSelect={onSelectAuction}
            />
          ))}
        </div>
      ) : (
        /* Empty State per PRD Section 51 */
        <div
          style={{
            textAlign: 'center',
            padding: '60px 20px',
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-lg)',
          }}
        >
          <SlidersHorizontal size={40} style={{ margin: '0 auto 14px auto', color: 'var(--text-muted)' }} />
          <h3 className="font-display font-bold text-white text-xl">
            No Auctions Match Your Filters
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginTop: '6px', maxWidth: '420px', margin: '6px auto 20px auto' }}>
            We couldn’t find any motorcycle matching your current search parameters. Try resetting your filters to see active inventory.
          </p>
          <button onClick={resetFilters} className="btn btn-secondary">
            <RotateCcw size={15} /> Reset All Filters
          </button>
        </div>
      )}
    </div>
  );
};
