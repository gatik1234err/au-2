import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface CountdownTimerProps {
  endTime: string;
  startTime?: string;
  status: 'upcoming' | 'live' | 'ended';
  compact?: boolean;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({
  endTime,
  startTime,
  status,
  compact = false,
}) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false,
  });

  useEffect(() => {
    const calculateTime = () => {
      const now = Date.now();
      const target =
        status === 'upcoming' && startTime
          ? new Date(startTime).getTime()
          : new Date(endTime).getTime();

      const diff = target - now;

      if (diff <= 0 || status === 'ended') {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds, isExpired: false });
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, [endTime, startTime, status]);

  if (status === 'ended' || timeLeft.isExpired) {
    return (
      <div
        className="font-mono font-semibold"
        style={{
          color: 'var(--text-muted)',
          fontSize: compact ? '12px' : '14px',
          display: 'flex',
          alignItems: 'center',
          gap: '5px',
        }}
      >
        <Clock size={compact ? 13 : 15} />
        <span>AUCTION ENDED</span>
      </div>
    );
  }

  const pad = (n: number) => n.toString().padStart(2, '0');

  if (compact) {
    return (
      <div
        className="font-mono font-bold"
        style={{
          color: status === 'live' ? 'var(--accent-orange)' : 'var(--status-upcoming)',
          fontSize: '13px',
          display: 'flex',
          alignItems: 'center',
          gap: '5px',
        }}
      >
        <Clock size={13} />
        <span>
          {timeLeft.days > 0 && `${timeLeft.days}d `}
          {pad(timeLeft.hours)}:{pad(timeLeft.minutes)}:{pad(timeLeft.seconds)}
        </span>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      {timeLeft.days > 0 && (
        <div style={{ textAlign: 'center' }}>
          <div
            className="font-mono font-bold text-lg"
            style={{
              background: 'var(--bg-carbon)',
              padding: '6px 10px',
              borderRadius: '6px',
              border: '1px solid var(--border-subtle)',
              minWidth: '44px',
            }}
          >
            {pad(timeLeft.days)}
          </div>
          <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '2px' }}>DAYS</div>
        </div>
      )}

      <div style={{ textAlign: 'center' }}>
        <div
          className="font-mono font-bold text-lg"
          style={{
            background: 'var(--bg-carbon)',
            padding: '6px 10px',
            borderRadius: '6px',
            border: '1px solid var(--border-subtle)',
            minWidth: '44px',
            color: status === 'live' ? 'var(--accent-orange)' : 'var(--text-primary)',
          }}
        >
          {pad(timeLeft.hours)}
        </div>
        <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '2px' }}>HRS</div>
      </div>

      <span style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--text-muted)' }}>:</span>

      <div style={{ textAlign: 'center' }}>
        <div
          className="font-mono font-bold text-lg"
          style={{
            background: 'var(--bg-carbon)',
            padding: '6px 10px',
            borderRadius: '6px',
            border: '1px solid var(--border-subtle)',
            minWidth: '44px',
            color: status === 'live' ? 'var(--accent-orange)' : 'var(--text-primary)',
          }}
        >
          {pad(timeLeft.minutes)}
        </div>
        <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '2px' }}>MIN</div>
      </div>

      <span style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--text-muted)' }}>:</span>

      <div style={{ textAlign: 'center' }}>
        <div
          className="font-mono font-bold text-lg"
          style={{
            background: 'var(--bg-carbon)',
            padding: '6px 10px',
            borderRadius: '6px',
            border: '1px solid var(--border-subtle)',
            minWidth: '44px',
            color: 'var(--accent-orange)',
          }}
        >
          {pad(timeLeft.seconds)}
        </div>
        <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '2px' }}>SEC</div>
      </div>
    </div>
  );
};
