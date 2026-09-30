import React from 'react';
import { Bike } from '../../types';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';

interface BikeSpecificationsProps {
  bike: Bike;
}

export const BikeSpecifications: React.FC<BikeSpecificationsProps> = ({ bike }) => {
  const specs = [
    { label: 'Manufacturer', value: bike.brand },
    { label: 'Model', value: bike.model },
    { label: 'Variant', value: bike.variant || 'Standard' },
    { label: 'Model Year', value: bike.year.toString() },
    { label: 'Displacement', value: `${bike.engineCC} cc` },
    { label: 'Peak Power', value: bike.powerHP ? `${bike.powerHP} HP` : 'N/A' },
    { label: 'Odometer', value: `${bike.mileage.toLocaleString('en-IN')} km` },
    { label: 'Fuel System', value: bike.fuelType },
    { label: 'Gearbox', value: bike.transmission },
    { label: 'Paint Finish', value: bike.color },
    { label: 'Ownership Count', value: `${bike.ownershipCount} ${bike.ownershipCount === 1 ? 'Owner' : 'Owners'}` },
    { label: 'RTO Registration', value: bike.registrationNumber || 'Available in RC' },
    { label: 'Inspection Grade', value: bike.condition },
    { label: 'Location', value: bike.location },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* 80-Point Inspection Score Card */}
      {bike.inspectionScore && (
        <div
          style={{
            backgroundColor: 'rgba(16, 185, 129, 0.08)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            borderRadius: 'var(--radius-lg)',
            padding: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div
              style={{
                width: '52px',
                height: '52px',
                borderRadius: '12px',
                backgroundColor: 'rgba(16, 185, 129, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#34D399',
              }}
            >
              <ShieldCheck size={30} />
            </div>
            <div>
              <div className="font-display font-bold text-white text-lg">
                Official Mechanical Inspection Score
              </div>
              <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                Certified by DestinyAuction Senior Motorcycle Technicians
              </div>
            </div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <div className="font-display font-bold text-3xl" style={{ color: '#34D399' }}>
              {bike.inspectionScore}
              <span style={{ fontSize: '18px', color: 'var(--text-muted)' }}>/100</span>
            </div>
            <div className="font-mono text-xs text-muted uppercase">Verified Condition</div>
          </div>
        </div>
      )}

      {/* Description */}
      <div>
        <h4 className="font-display font-semibold text-white text-base" style={{ marginBottom: '10px' }}>
          Motorcycle Overview
        </h4>
        <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.7 }}>
          {bike.description}
        </p>
      </div>

      {/* Specifications Grid */}
      <div>
        <h4 className="font-display font-semibold text-white text-base" style={{ marginBottom: '14px' }}>
          Technical Specifications
        </h4>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: '12px',
          }}
        >
          {specs.map((spec, i) => (
            <div
              key={i}
              style={{
                backgroundColor: 'var(--bg-carbon)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
                padding: '12px 14px',
              }}
            >
              <div
                style={{
                  fontSize: '11px',
                  textTransform: 'uppercase',
                  color: 'var(--text-muted)',
                  fontFamily: 'var(--font-display)',
                }}
              >
                {spec.label}
              </div>
              <div
                className="font-medium text-white"
                style={{ fontSize: '14px', marginTop: '3px' }}
              >
                {spec.value}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Features & Equipment */}
      {bike.features && bike.features.length > 0 && (
        <div>
          <h4 className="font-display font-semibold text-white text-base" style={{ marginBottom: '14px' }}>
            Factory & Performance Highlights
          </h4>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
              gap: '10px',
            }}
          >
            {bike.features.map((feat, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  backgroundColor: 'var(--bg-surface)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: '10px 14px',
                  fontSize: '13px',
                }}
              >
                <CheckCircle2 size={16} color="var(--accent-orange)" />
                <span className="text-white">{feat}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
