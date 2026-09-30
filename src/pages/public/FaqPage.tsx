import React, { useState } from 'react';
import { ChevronDown, HelpCircle, ShieldCheck } from 'lucide-react';

interface FAQItem {
  q: string;
  a: string;
}

export const FaqPage: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      q: 'Why is there a one-time registration fee of ₹4,999?',
      a: 'The one-time registration fee acts as a quality filter ensuring only genuine, committed motorcycle buyers enter active bidding wars. This prevents troll accounts, fake bids, and intentional disruption. Best of all, it is a lifetime fee — once paid, you never have to pay another membership or subscription fee.',
    },
    {
      q: 'Are all motorcycles inspected in person before an auction?',
      a: 'Yes, 100%. Our factory-trained master technicians inspect every motorcycle across 80 points including engine health, compression, chassis straightness, electricals, tyre wear, and cosmetic paint depth. Complete reports and high-resolution photo dossiers are published directly on the listing page.',
    },
    {
      q: 'How does live bidding work?',
      a: 'During an active auction, registered members can place bids exceeding the current bid by at least the specified minimum increment (typically ₹5,000 to ₹25,000 depending on the bike value). If you are outbid, you receive immediate visual and SMS alerts so you can respond before the countdown hits 00:00:00.',
    },
    {
      q: 'What happens when I win an auction?',
      a: 'Congratulations! You receive a formal Winning Certificate and settlement invoice. You have 48 hours to complete bank escrow transfer. Our dedicated concierge team handles state RTO transfer paperwork, NOC generation, and coordinates enclosed flatbed doorstep transport.',
    },
    {
      q: 'What if the motorcycle does not match the inspection report upon delivery?',
      a: 'DestinyAuction provides an Inspection Guarantee. If there is a material discrepancy between our certified 80-point inspection report and the physical condition upon arrival, you have the legal right to decline handover and receive a 100% full refund from our escrow account.',
    },
    {
      q: 'How does low-connectivity mode work on highway rides?',
      a: 'We understand motorcycle riders often check auctions while on the road or at mountain tracks where 4G/5G signals are unstable. Our low-connectivity architecture minimizes image payloads, compresses data packets, and strictly verifies all bid responses with server acknowledgements before confirming.',
    },
  ];

  return (
    <div className="content-wrapper">
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div className="badge badge-orange" style={{ marginBottom: '8px' }}>
            Got Questions?
          </div>
          <h1 className="font-display font-bold text-white text-4xl">
            FREQUENTLY ASKED QUESTIONS
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '16px', marginTop: '8px' }}>
            Everything you need to know about bidding, registration, fees, and delivery.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="card"
                style={{
                  backgroundColor: isOpen ? 'var(--bg-surface-elevated)' : 'var(--bg-surface)',
                  border: isOpen ? '1px solid var(--accent-orange)' : '1px solid var(--border-subtle)',
                  transition: 'all 0.2s ease',
                  overflow: 'hidden',
                }}
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  style={{
                    width: '100%',
                    padding: '18px 20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    background: 'none',
                    border: 'none',
                    textAlign: 'left',
                    color: '#FFFFFF',
                    cursor: 'pointer',
                    gap: '12px',
                  }}
                >
                  <span className="font-display font-semibold text-base">
                    {faq.q}
                  </span>
                  <ChevronDown
                    size={18}
                    style={{
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.2s',
                      color: isOpen ? 'var(--accent-orange)' : 'var(--text-muted)',
                      flexShrink: 0,
                    }}
                  />
                </button>

                {isOpen && (
                  <div
                    style={{
                      padding: '0 20px 20px 20px',
                      color: 'var(--text-secondary)',
                      fontSize: '14px',
                      lineHeight: 1.7,
                      borderTop: '1px solid var(--border-subtle)',
                      paddingTop: '14px',
                    }}
                  >
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
