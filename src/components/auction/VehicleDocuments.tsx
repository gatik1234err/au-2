import React from 'react';
import { Bike } from '../../types';
import { FileCheck, Download, ShieldCheck, Check } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

interface VehicleDocumentsProps {
  bike: Bike;
}

export const VehicleDocuments: React.FC<VehicleDocumentsProps> = ({ bike }) => {
  const { showToast } = useToast();

  const handleDownload = (docName: string) => {
    showToast({
      type: 'info',
      title: 'Downloading Document',
      message: `Verified PDF dossier for "${docName}" is being retrieved from DestinyVault.`,
    });
  };

  const docs = [
    {
      title: 'Original RC (Smart Card Registration)',
      status: 'Verified Valid',
      validTill: bike.insuranceValidTill ? `Valid till ${bike.insuranceValidTill}` : 'Verified',
      fileSize: '2.4 MB PDF',
    },
    {
      title: 'Comprehensive Insurance Policy',
      status: 'Active Zero-Dep',
      validTill: bike.insuranceValidTill ? `Valid till ${bike.insuranceValidTill}` : 'Active',
      fileSize: '1.8 MB PDF',
    },
    {
      title: 'DestinyAuction 80-Point Inspection Dossier',
      status: 'Passed (98/100)',
      validTill: 'Certified Sept 2026',
      fileSize: '5.2 MB PDF',
    },
    {
      title: 'Authorized OEM Service History & Invoices',
      status: '100% Complete',
      validTill: 'All Stamps Present',
      fileSize: '4.1 MB PDF',
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '6px',
        }}
      >
        <div>
          <h4 className="font-display font-bold text-white text-base">
            Verified Ownership & Inspection Dossier
          </h4>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
            All documents audited by DestinyAuction legal team and government RTO database.
          </p>
        </div>
        <span className="badge badge-won">
          <ShieldCheck size={12} /> All Clear
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px' }}>
        {docs.map((doc, i) => (
          <div
            key={i}
            style={{
              backgroundColor: 'var(--bg-carbon)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '12px',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#FFFFFF', fontWeight: 600, fontSize: '14px' }}>
                <FileCheck size={17} className="text-orange" />
                <span>{doc.title}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '6px', fontSize: '12px' }}>
                <span style={{ color: '#34D399', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Check size={12} /> {doc.status}
                </span>
                <span className="text-muted">•</span>
                <span className="text-secondary">{doc.validTill}</span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border-subtle)', paddingTop: '10px' }}>
              <span className="font-mono text-xs text-muted">{doc.fileSize}</span>
              <button
                onClick={() => handleDownload(doc.title)}
                className="btn btn-secondary btn-sm"
                style={{ padding: '4px 10px', fontSize: '11px' }}
              >
                <Download size={12} /> View PDF
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
