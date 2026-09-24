export default function ChartCard({ title, subtitle, children, className = '' }) {
  return (
    <div className={`space-card rounded-2xl p-5 relative overflow-hidden ${className}`}>
      {/* Subtle top corner telemetry indicator */}
      <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none opacity-20">
        <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-[#06B6D4]" />
        <div className="absolute top-2 right-5 w-4 h-[1px] bg-[#06B6D4]" />
      </div>

      <div className="mb-4">
        <h3 className="text-base font-semibold text-[#F8FAFC] tracking-wide">{title}</h3>
        {subtitle && <p className="text-xs text-[#94A3B8] mt-0.5">{subtitle}</p>}
      </div>
      {children}
    </div>
  );
}
