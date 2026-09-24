import { motion } from 'framer-motion';

export default function MetricCard({ title, value, subtitle, icon: Icon, color = '#3B82F6' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="space-card rounded-2xl p-5 relative overflow-hidden group"
    >
      {/* Background soft ambient glow */}
      <div
        className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full opacity-10 blur-xl pointer-events-none transition-opacity group-hover:opacity-25"
        style={{ backgroundColor: color }}
      />

      <div className="flex items-start justify-between relative z-10">
        <div>
          <p className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wider mb-1">{title}</p>
          <p className="text-2xl font-bold text-[#F8FAFC] tracking-tight">{value}</p>
          {subtitle && <p className="text-xs text-[#64748B] mt-1">{subtitle}</p>}
        </div>
        {Icon && (
          <div
            className="p-3 rounded-xl border transition-transform duration-300 group-hover:scale-105"
            style={{
              backgroundColor: `${color}15`,
              borderColor: `${color}30`,
            }}
          >
            <Icon className="w-5 h-5" style={{ color }} />
          </div>
        )}
      </div>
    </motion.div>
  );
}
