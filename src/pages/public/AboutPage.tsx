import React from 'react';
import { Shield, Award, MapPin, CheckCircle2, Flame, Wrench } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="content-wrapper">
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div className="badge badge-orange" style={{ marginBottom: '8px' }}>
            Our Heritage
          </div>
          <h1 className="font-display font-bold text-white text-4xl">
            ABOUT DESTINYAUCTION
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '16px', marginTop: '8px' }}>
            Built for passionate riders who demand authenticity, mechanical integrity, and adrenaline.
          </p>
        </div>

        {/* Story Section */}
        <div className="card" style={{ padding: '36px', marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
            <Flame size={24} className="text-orange" />
            <h2 className="font-display font-bold text-white text-2xl">
              Where Every Ride Finds Its Destiny
            </h2>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: 1.7, marginBottom: '16px' }}>
            DestinyAuction was born from a frustrating reality: buying a pre-owned superbike in India was fraught with uncertainty. Clocked odometers, hidden frame damage, counterfeit documents, and opaque pricing plagued the market.
          </p>
          <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: 1.7 }}>
            We reimagined the entire experience as a prestigious, digital motorcycle auction house. We combined the forensic scrutiny of world-class vehicle inspections with the exhilarating fairness of live bidding.
          </p>
        </div>

        {/* 3 Pillars */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', marginBottom: '40px' }}>
          <div className="card" style={{ padding: '24px', backgroundColor: 'var(--bg-carbon)' }}>
            <Wrench size={28} className="text-orange" style={{ marginBottom: '12px' }} />
            <h3 className="font-display font-bold text-white text-lg">Forensic Inspection</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '13px', marginTop: '6px', lineHeight: 1.6 }}>
              Our senior motorsport mechanics perform 80-point rigorous physical inspections including engine compression, laser frame alignment, and electrical diagnostics.
            </p>
          </div>

          <div className="card" style={{ padding: '24px', backgroundColor: 'var(--bg-carbon)' }}>
            <Shield size={28} className="text-orange" style={{ marginBottom: '12px' }} />
            <h3 className="font-display font-bold text-white text-lg">Legal & Title Escrow</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '13px', marginTop: '6px', lineHeight: 1.6 }}>
              Every bike's RC, hypothecation status, RTO NOC, and insurance are certified before auction launch. Buyers funds are held securely until transfer is accomplished.
            </p>
          </div>

          <div className="card" style={{ padding: '24px', backgroundColor: 'var(--bg-carbon)' }}>
            <Award size={28} className="text-orange" style={{ marginBottom: '12px' }} />
            <h3 className="font-display font-bold text-white text-lg">Curated Rarity</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '13px', marginTop: '6px', lineHeight: 1.6 }}>
              We reject over 70% of submitted motorcycles. Only pristine, well-maintained superbikes, track weapons, and collector classics make it to DestinyAuction.
            </p>
          </div>
        </div>

        {/* Physical Hubs */}
        <div className="card" style={{ padding: '32px' }}>
          <h3 className="font-display font-bold text-white text-xl" style={{ marginBottom: '16px' }}>
            Physical Inspection & Concierge Hubs
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
            <div style={{ display: 'flex', gap: '10px' }}>
              <MapPin size={20} className="text-orange" style={{ flexShrink: 0 }} />
              <div>
                <strong className="text-white">Mumbai Headquarters</strong>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                  Bandra-Kurla Complex, Mumbai, MH 400051
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <MapPin size={20} className="text-orange" style={{ flexShrink: 0 }} />
              <div>
                <strong className="text-white">Bangalore Inspection Vault</strong>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                  Indiranagar 100ft Road, Bangalore, KA 560038
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <MapPin size={20} className="text-orange" style={{ flexShrink: 0 }} />
              <div>
                <strong className="text-white">Delhi NCR Experience Center</strong>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                  Golf Course Road, Gurgaon, HR 122002
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
