import { motion } from 'framer-motion';

export default function ModelMetricCard({ model, isSelected }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-[#111827] border rounded-xl p-5 transition-all ${
        isSelected ? 'border-[#3B82F6] shadow-[0_0_20px_-5px_rgba(59,130,246,0.3)]' : 'border-[#1E293B] hover:border-[#334155]'
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-[#F8FAFC]">{model.name}</h3>
        {isSelected && (
          <span className="text-[10px] font-bold bg-[#3B82F6]/20 text-[#3B82F6] px-2 py-0.5 rounded-full uppercase">Active</span>
        )}
      </div>
      <p className="text-xs text-[#64748B] mb-4">{model.type}</p>
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: 'Accuracy', value: model.accuracy },
          { label: 'Precision', value: model.precision },
          { label: 'Recall', value: model.recall },
          { label: 'F1 Score', value: model.f1 },
        ].map((m) => (
          <div key={m.label}>
            <p className="text-[10px] text-[#94A3B8] uppercase">{m.label}</p>
            <p className="text-lg font-bold text-[#F8FAFC]">{m.value}%</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
