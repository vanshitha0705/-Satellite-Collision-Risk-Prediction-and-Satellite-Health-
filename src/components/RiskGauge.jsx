import { useEffect, useState } from 'react';

const getColor = (value) => {
  if (value < 25) return '#22C55E';
  if (value < 50) return '#F59E0B';
  if (value < 75) return '#EF4444';
  return '#DC2626';
};

const getLabel = (value) => {
  if (value < 25) return 'LOW';
  if (value < 50) return 'MEDIUM';
  if (value < 75) return 'HIGH';
  return 'CRITICAL';
};

export default function RiskGauge({ value = 0 }) {
  const [animatedValue, setAnimatedValue] = useState(0);
  useEffect(() => {
    const timer = setTimeout(() => setAnimatedValue(value), 100);
    return () => clearTimeout(timer);
  }, [value]);

  const clamped = Math.min(100, Math.max(0, animatedValue));
  const angle = (clamped / 100) * 180;
  const color = getColor(clamped);
  const label = getLabel(clamped);

  const radius = 80;
  const cx = 100;
  const cy = 100;
  const startAngle = Math.PI;
  const endAngle = Math.PI - (angle * Math.PI) / 180;

  const x1 = cx + radius * Math.cos(startAngle);
  const y1 = cy - radius * Math.sin(startAngle);
  const x2 = cx + radius * Math.cos(endAngle);
  const y2 = cy - radius * Math.sin(endAngle);

  const largeArc = angle > 180 ? 1 : 0;

  const needleAngle = 180 - angle;
  const needleX = cx + (radius - 15) * Math.cos((needleAngle * Math.PI) / 180);
  const needleY = cy - (radius - 15) * Math.sin((needleAngle * Math.PI) / 180);

  return (
    <div className="flex flex-col items-center">
      <svg viewBox="0 0 200 120" className="w-56 h-32">
        <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke="#1E293B" strokeWidth="12" strokeLinecap="round" />
        {clamped > 0 && (
          <path
            d={`M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 0 ${x2} ${y2}`}
            fill="none" stroke={color} strokeWidth="12" strokeLinecap="round"
            style={{ transition: 'all 0.8s ease-out' }}
          />
        )}
        <line x1={cx} y1={cy} x2={needleX} y2={needleY} stroke={color} strokeWidth="2.5" strokeLinecap="round" style={{ transition: 'all 0.8s ease-out' }} />
        <circle cx={cx} cy={cy} r="4" fill={color} />
        <text x={cx} y={cy - 18} textAnchor="middle" className="fill-[#F8FAFC]" style={{ fontSize: '24px', fontWeight: 700 }}>
          {Math.round(clamped)}%
        </text>
      </svg>
      <span className="text-sm font-bold tracking-widest mt-1" style={{ color }}>{label}</span>
    </div>
  );
}
