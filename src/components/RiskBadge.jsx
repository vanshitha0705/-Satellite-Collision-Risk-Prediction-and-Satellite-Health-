const config = {
  Low: { bg: 'bg-[#22C55E]/15', text: 'text-[#22C55E]', dot: 'bg-[#22C55E]' },
  Medium: { bg: 'bg-[#F59E0B]/15', text: 'text-[#F59E0B]', dot: 'bg-[#F59E0B]' },
  High: { bg: 'bg-[#EF4444]/15', text: 'text-[#EF4444]', dot: 'bg-[#EF4444]' },
  Critical: { bg: 'bg-[#EF4444]/20', text: 'text-[#EF4444]', dot: 'bg-[#EF4444] animate-pulse' },
};

export default function RiskBadge({ level }) {
  const c = config[level] || config.Low;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${c.bg} ${c.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
      {level}
    </span>
  );
}
