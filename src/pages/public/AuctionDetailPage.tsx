import React, { useState } from 'react';
import { useAuctions } from '../../context/AuctionContext';
import { bidService } from '../../services/bid.service';
import { BikeGallery } from '../../components/auction/BikeGallery';
import { BidPanel } from '../../components/auction/BidPanel';
import { BidHistory } from '../../components/auction/BidHistory';
import { BikeSpecifications } from '../../components/auction/BikeSpecifications';
import { VehicleDocuments } from '../../components/auction/VehicleDocuments';
import { AuctionRules } from '../../components/auction/AuctionRules';
import { CountdownTimer } from '../../components/auction/CountdownTimer';
import { ArrowLeft, Share2, Heart, ShieldCheck, MapPin, Gauge, AlertCircle } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

interface AuctionDetailPageProps {
  auctionId: string;
  onBack: () => void;
  onRegisterClick: () => void;
  onPaymentClick: () => void;
}

export const AuctionDetailPage: React.FC<AuctionDetailPageProps> = ({
  auctionId,
  onBack,
  onRegisterClick,
  onPaymentClick,
}) => {
  const { getAuction, isWatchlisted, toggleWatchlist } = useAuctions();
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<'specs' | 'bids' | 'docs' | 'rules'>('specs');

  const auction = getAuction(auctionId);

  if (!auction || !auction.bike) {
    return (
      /* Error State per PRD Section 52 */
      <div className="content-wrapper" style={{ textAlign: 'center', padding: '80px 20px' }}>
        <AlertCircle size={48} style={{ color: 'var(--status-lost)', margin: '0 auto 16px auto' }} />
        <h2 className="font-display font-bold text-white text-2xl">
          Auction Not Found
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginTop: '6px', marginBottom: '24px' }}>
          This motorcycle auction listing may have concluded or the URL is invalid.
        </p>
        <button onClick={onBack} className="btn btn-primary">
          <ArrowLeft size={16} /> Return to Auctions
        </button>
      </div>
    );
  }

  const bike = auction.bike;
  const isSaved = isWatchlisted(bike.id);
  const auctionBids = bidService.getBidsByAuctionId(auction.id);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast({
        type: 'success',
        title: 'Listing Link Copied',
        message: 'Share this live auction with your riding crew.',
      });
    }
  };

  return (
    <div className="content-wrapper">
      {/* Top Breadcrumb & Action bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '20px',
          flexWrap: 'wrap',
          gap: '12px',
        }}
      >
        <button
          onClick={onBack}
          className="btn btn-ghost"
          style={{ paddingLeft: 0, color: 'var(--text-secondary)' }}
        >
          <ArrowLeft size={16} /> Back to Auctions
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            onClick={() => toggleWatchlist(bike.id)}
            className="btn btn-secondary btn-sm"
          >
            <Heart
              size={14}
              color={isSaved ? '#FF5A1F' : 'currentColor'}
              fill={isSaved ? '#FF5A1F' : 'transparent'}
            />
            <span>{isSaved ? 'Watchlisted' : 'Watchlist'}</span>
          </button>

          <button onClick={handleShare} className="btn btn-secondary btn-sm">
            <Share2 size={14} />
            <span>Share</span>
          </button>
        </div>
      </div>

      {/* Main 2-Column Section */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.4fr) minmax(360px, 1fr)',
          gap: '32px',
          alignItems: 'start',
        }}
        className="auction-detail-grid"
      >
        {/* Left Column: Media & Specs */}
        <div>
          <BikeGallery images={bike.images} bikeName={`${bike.year} ${bike.brand} ${bike.model}`} />

          {/* Title Header */}
          <div style={{ marginTop: '24px', marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '8px' }}>
              <span className="font-mono text-xs font-bold text-orange uppercase tracking-wider">
                {bike.year} • {bike.brand}
              </span>
              <span className="badge badge-orange">{bike.condition}</span>
              {bike.inspectionScore && (
                <span className="badge badge-won">
                  <ShieldCheck size={11} /> {bike.inspectionScore}/100 Inspected
                </span>
              )}
            </div>

            <h1 className="font-display font-bold text-white text-3xl">
              {bike.model} {bike.variant && <span style={{ color: 'var(--accent-silver)' }}>{bike.variant}</span>}
            </h1>

            {/* Quick Specs Strip */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                marginTop: '12px',
                fontSize: '13px',
                color: 'var(--text-secondary)',
                flexWrap: 'wrap',
              }}
            >
              <span className="flex items-center gap-1">
                <Gauge size={14} className="text-orange" />
                <strong className="text-white">{bike.engineCC} cc</strong>
              </span>
              <span>•</span>
              <span>{bike.powerHP ? `${bike.powerHP} HP` : 'Superbike'}</span>
              <span>•</span>
              <span>{bike.mileage.toLocaleString('en-IN')} km</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <MapPin size={13} className="text-orange" />
                {bike.location}
              </span>
            </div>
          </div>

          {/* Tab Navigation */}
          <div
            style={{
              display: 'flex',
              borderBottom: '1px solid var(--border-subtle)',
              marginBottom: '24px',
              gap: '6px',
              overflowX: 'auto',
            }}
          >
            <button
              onClick={() => setActiveTab('specs')}
              style={{
                background: 'none',
                border: 'none',
                borderBottom: activeTab === 'specs' ? '2px solid var(--accent-orange)' : '2px solid transparent',
                color: activeTab === 'specs' ? '#FFFFFF' : 'var(--text-muted)',
                fontWeight: 600,
                fontSize: '14px',
                padding: '10px 16px',
                cursor: 'pointer',
                fontFamily: 'var(--font-display)',
                whiteSpace: 'nowrap',
              }}
            >
              Specifications & Inspection
            </button>

            <button
              onClick={() => setActiveTab('bids')}
              style={{
                background: 'none',
                border: 'none',
                borderBottom: activeTab === 'bids' ? '2px solid var(--accent-orange)' : '2px solid transparent',
                color: activeTab === 'bids' ? '#FFFFFF' : 'var(--text-muted)',
                fontWeight: 600,
                fontSize: '14px',
                padding: '10px 16px',
                cursor: 'pointer',
                fontFamily: 'var(--font-display)',
                whiteSpace: 'nowrap',
              }}
            >
              Live Bids ({auctionBids.length})
            </button>

            <button
              onClick={() => setActiveTab('docs')}
              style={{
                background: 'none',
                border: 'none',
                borderBottom: activeTab === 'docs' ? '2px solid var(--accent-orange)' : '2px solid transparent',
                color: activeTab === 'docs' ? '#FFFFFF' : 'var(--text-muted)',
                fontWeight: 600,
                fontSize: '14px',
                padding: '10px 16px',
                cursor: 'pointer',
                fontFamily: 'var(--font-display)',
                whiteSpace: 'nowrap',
              }}
            >
              Verified Documents
            </button>

            <button
              onClick={() => setActiveTab('rules')}
              style={{
                background: 'none',
                border: 'none',
                borderBottom: activeTab === 'rules' ? '2px solid var(--accent-orange)' : '2px solid transparent',
                color: activeTab === 'rules' ? '#FFFFFF' : 'var(--text-muted)',
                fontWeight: 600,
                fontSize: '14px',
                padding: '10px 16px',
                cursor: 'pointer',
                fontFamily: 'var(--font-display)',
                whiteSpace: 'nowrap',
              }}
            >
              Auction Terms
            </button>
          </div>

          {/* Tab Content Panels */}
          {activeTab === 'specs' && <BikeSpecifications bike={bike} />}
          {activeTab === 'bids' && <BidHistory bids={auctionBids} />}
          {activeTab === 'docs' && <VehicleDocuments bike={bike} />}
          {activeTab === 'rules' && <AuctionRules auction={auction} />}
        </div>

        {/* Right Column: Sticky Live Auction Panel */}
        <div style={{ position: 'sticky', top: '90px' }}>
          {/* Countdown Clock Card */}
          <div
            className="card"
            style={{
              padding: '20px',
              marginBottom: '20px',
              backgroundColor: 'var(--bg-carbon)',
              border: '1px solid var(--border-subtle)',
            }}
          >
            <div style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '8px', letterSpacing: '0.05em' }}>
              {auction.status === 'upcoming' ? 'AUCTION STARTS IN' : auction.status === 'ended' ? 'AUCTION HAS CONCLUDED' : 'AUCTION CLOSES IN'}
            </div>
            <CountdownTimer
              endTime={auction.endTime}
              startTime={auction.startTime}
              status={auction.status}
            />
          </div>

          {/* Interactive Bidding Panel */}
          <BidPanel
            auction={auction}
            onRegisterClick={onRegisterClick}
            onPaymentClick={onPaymentClick}
          />
        </div>
      </div>

      <style>{`
        @media (max-width: 960px) {
          .auction-detail-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};
