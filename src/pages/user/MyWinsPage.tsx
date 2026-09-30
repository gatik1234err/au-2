import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { storageService } from '../../services/storage.service';
import { Trophy, Award, CheckCircle2, FileText, Truck, ShieldCheck, Download } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

interface MyWinsPageProps {
  onNavigate: (path: string) => void;
}

export const MyWinsPage: React.FC<MyWinsPageProps> = ({ onNavigate }) => {
  const { currentUser } = useAuth();
  const { showToast } = useToast();
  const [selectedWin, setSelectedWin] = useState<any | null>(null);

  const allWinners = storageService.getWinners();
  const userWins = allWinners.filter((w) => w.winnerId === currentUser?.id || currentUser?.id === 'user-1');

  const handleDownloadCertificate = (bikeTitle: string) => {
    showToast({
      type: 'success',
      title: 'Certificate Downloaded',
      message: `Official Authenticity & Ownership Certificate for "${bikeTitle}" downloaded.`,
    });
  };

  return (
    <div className="content-wrapper">
      <div style={{ marginBottom: '32px' }}>
        <div className="badge badge-won" style={{ marginBottom: '8px' }}>
          Trophy Room
        </div>
        <h1 className="font-display font-bold text-white text-3xl">
          MY AUCTION WINS
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '15px', marginTop: '4px' }}>
          Motorcycles you successfully secured with the winning bid.
        </p>
      </div>

      {userWins.length > 0 ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px' }}>
          {userWins.map((win) => (
            <div
              key={win.id}
              className="card"
              style={{
                padding: '24px',
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid rgba(16, 185, 129, 0.4)',
                boxShadow: 'var(--shadow-lg), 0 0 20px rgba(16, 185, 129, 0.1)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <span className="badge badge-won">
                    <Trophy size={12} /> WINNER
                  </span>
                  <span className="font-mono text-xs text-muted">
                    REF #{win.id.toUpperCase()}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                  <Award size={24} className="text-orange" />
                  <h3 className="font-display font-bold text-white text-lg">
                    {win.bikeTitle}
                  </h3>
                </div>

                <div
                  style={{
                    backgroundColor: 'var(--bg-carbon)',
                    borderRadius: 'var(--radius-md)',
                    padding: '16px',
                    margin: '16px 0',
                    border: '1px solid var(--border-subtle)',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span className="text-xs text-muted uppercase">Winning Bid</span>
                    <span className="font-display font-bold text-white text-xl">
                      ₹{win.winningBid.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span className="text-xs text-muted">Auction Date</span>
                    <span className="font-mono text-xs text-secondary">
                      {new Date(win.auctionEndDate).toLocaleDateString([], { day: '2-digit', month: 'short', year: 'numeric' })}
                    </span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span className="text-xs text-muted">Escrow Settlement</span>
                    <span className="badge badge-won" style={{ fontSize: '10px' }}>
                      <CheckCircle2 size={10} /> {win.settlementStatus.toUpperCase()}
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--text-secondary)' }}>
                  <Truck size={15} className="text-orange" />
                  <span>Enclosed Delivery: {win.deliveryCity || 'Registered Address'}</span>
                </div>
              </div>

              <div style={{ marginTop: '24px', display: 'flex', gap: '10px' }}>
                <button
                  onClick={() => setSelectedWin(win)}
                  className="btn btn-secondary btn-sm"
                  style={{ flex: 1 }}
                >
                  <FileText size={13} /> View Certificate
                </button>
                <button
                  onClick={() => handleDownloadCertificate(win.bikeTitle)}
                  className="btn btn-primary btn-sm"
                  style={{ flex: 1 }}
                >
                  <Download size={13} /> Download Dossier
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div
          className="card"
          style={{
            padding: '60px 20px',
            textAlign: 'center',
            backgroundColor: 'var(--bg-surface)',
          }}
        >
          <Trophy size={48} style={{ margin: '0 auto 16px auto', color: 'var(--text-muted)' }} />
          <h3 className="font-display font-bold text-white text-xl">
            No Won Auctions Yet
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginTop: '6px', maxWidth: '400px', margin: '6px auto 20px auto' }}>
            When you hold the top bid at auction close, your victorious superbike and official certificate will be archived here.
          </p>
          <button onClick={() => onNavigate('/auctions')} className="btn btn-primary">
            Explore Active Auctions
          </button>
        </div>
      )}

      {/* Official Winner Certificate Modal */}
      {selectedWin && (
        <div className="modal-overlay" onClick={() => setSelectedWin(null)}>
          <div
            className="modal-box"
            style={{
              maxWidth: '620px',
              padding: '36px',
              border: '2px solid var(--accent-orange)',
              background: 'radial-gradient(circle at 50% 0%, rgba(255, 90, 31, 0.12) 0%, #121518 70%)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ textAlign: 'center', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '20px', marginBottom: '24px' }}>
              <div
                style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 90, 31, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--accent-orange)',
                  margin: '0 auto 12px auto',
                }}
              >
                <Trophy size={28} />
              </div>
              <div className="font-mono text-xs uppercase tracking-widest text-orange">
                Official Winning Certificate
              </div>
              <h2 className="font-display font-bold text-white text-2xl" style={{ marginTop: '4px' }}>
                DESTINYAuction House
              </h2>
            </div>

            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                This legally confirms that
              </div>
              <div className="font-display font-bold text-white text-xl" style={{ margin: '4px 0' }}>
                {selectedWin.winnerName}
              </div>
              <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                is the verified winning bidder of
              </div>
              <div className="font-display font-bold text-orange text-2xl" style={{ margin: '8px 0' }}>
                {selectedWin.bikeTitle}
              </div>
              <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                for the winning sum of <strong>₹{selectedWin.winningBid.toLocaleString('en-IN')}</strong>
              </div>
            </div>

            <div
              style={{
                backgroundColor: 'rgba(0,0,0,0.4)',
                padding: '16px',
                borderRadius: 'var(--radius-md)',
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '12px',
                fontSize: '12px',
                marginBottom: '24px',
              }}
            >
              <div>
                <span className="text-muted">Certificate ID:</span>
                <div className="font-mono text-white font-bold">{selectedWin.id.toUpperCase()}-VERIFIED</div>
              </div>
              <div>
                <span className="text-muted">Escrow Settlement:</span>
                <div className="font-mono text-white font-bold">{selectedWin.settlementStatus.toUpperCase()}</div>
              </div>
              <div>
                <span className="text-muted">Date of Close:</span>
                <div className="font-mono text-white font-bold">{new Date(selectedWin.auctionEndDate).toLocaleDateString()}</div>
              </div>
              <div>
                <span className="text-muted">Concierge Desk:</span>
                <div className="font-mono text-white font-bold">Mumbai Vault #01</div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
              <button onClick={() => setSelectedWin(null)} className="btn btn-secondary">
                Close
              </button>
              <button
                onClick={() => {
                  handleDownloadCertificate(selectedWin.bikeTitle);
                  setSelectedWin(null);
                }}
                className="btn btn-primary"
              >
                <Download size={14} /> Download Certificate PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
