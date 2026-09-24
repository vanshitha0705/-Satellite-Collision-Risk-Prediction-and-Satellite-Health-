export default function HealthIndicator({ label, value, max = 100, unit = '%' }) {
  const pct = Math.min(100, (value / max) * 100);
  const color = pct > 70 ? '#22C55E' : pct > 40 ? '#F59E0B' : '#EF4444';
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <span className="text-xs text-[#94A3B8]">{label}</span>
        <span className="text-xs font-medium text-[#F8FAFC]">{value}{unit}</span>
      </div>
      <div className="h-1.5 bg-[#1E293B] rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${pct}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}
