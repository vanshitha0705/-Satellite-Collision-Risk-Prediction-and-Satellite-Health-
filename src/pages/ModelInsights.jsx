import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell } from 'recharts';
import ChartCard from '../components/ChartCard.jsx';
import ModelMetricCard from '../components/ModelMetricCard.jsx';
import { MODEL_COMPARISONS, FEATURE_IMPORTANCES, CONFUSION_MATRIX, SHAP_EXPLANATIONS } from '../data/mockModels.js';
import { Brain, Cpu, ArrowUp, ArrowDown, Info } from 'lucide-react';

export default function ModelInsights() {
  const comparisonData = MODEL_COMPARISONS.map((m) => ({
    name: m.name.split(' ')[0] + (m.name.split(' ')[1] ? ' ' + m.name.split(' ')[1] : ''),
    Accuracy: m.accuracy,
    Precision: m.precision,
    Recall: m.recall,
    'F1 Score': m.f1,
  }));

  return (
    <div className="space-y-6">
      {/* Header with active model highlight notice */}
      <div>
        <h2 className="text-2xl lg:text-3xl font-bold text-[#F8FAFC]">Model Insights & Evaluation</h2>
        <p className="text-sm text-[#94A3B8] mt-1">
          Comparative benchmarking across ML classifiers trained on orbital conjunction parameters and NASA telemetry anomaly features.
        </p>
      </div>

      {/* Active Model Banner */}
      <div className="bg-[#111827] border-l-4 border-[#06B6D4] border-y border-r border-[#1E293B] p-4 rounded-xl flex items-start gap-3 shadow-[0_0_20px_-5px_rgba(6,182,212,0.2)]">
        <Info className="w-5 h-5 text-[#06B6D4] mt-0.5 shrink-0" />
        <p className="text-xs text-[#94A3B8] leading-relaxed">
          <strong className="text-[#F8FAFC]">Active Model Selection:</strong> Random Forest Classifier is currently configured as the active baseline model for collision risk scoring. Final production rankings between Random Forest and XGBoost will be finalized upon complete cross-validation on full Space-Track and Telemanom test partitions.
        </p>
      </div>

      {/* Model Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {MODEL_COMPARISONS.map((m) => (
          <ModelMetricCard key={m.id} model={m} isSelected={m.isSelected} />
        ))}
      </div>

      {/* Model Performance Grouped Bar Chart */}
      <ChartCard
        title="Model Performance Comparison"
        subtitle="Accuracy, Precision, Recall, and F1 Score across all four candidate classifiers"
      >
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={comparisonData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" opacity={0.6} />
            <XAxis dataKey="name" tick={{ fill: '#94A3B8', fontSize: 11 }} />
            <YAxis domain={[60, 100]} tick={{ fill: '#94A3B8', fontSize: 11 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#0B1220',
                border: '1px solid #1E293B',
                borderRadius: '10px',
                color: '#F8FAFC',
                boxShadow: '0 8px 24px rgba(0,0,0,0.6)'
              }}
            />
            <Legend />
            <Bar dataKey="Accuracy" fill="#06B6D4" radius={[6, 6, 0, 0]} />
            <Bar dataKey="Precision" fill="#8B5CF6" radius={[6, 6, 0, 0]} />
            <Bar dataKey="Recall" fill="#10B981" radius={[6, 6, 0, 0]} />
            <Bar dataKey="F1 Score" fill="#F59E0B" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Feature Importance Horizontal Bar Chart */}
      <ChartCard
        title="Feature Importance (Random Forest)"
        subtitle="Relative contribution of orbital mechanics (Electric Cyan) vs. satellite health parameters (Cosmic Violet)"
      >
        <ResponsiveContainer width="100%" height={340}>
          <BarChart data={FEATURE_IMPORTANCES} layout="vertical" margin={{ left: 40, right: 30 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" opacity={0.6} />
            <XAxis type="number" unit="%" tick={{ fill: '#94A3B8', fontSize: 11 }} />
            <YAxis dataKey="feature" type="category" width={180} tick={{ fill: '#94A3B8', fontSize: 11 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#0B1220',
                border: '1px solid #1E293B',
                borderRadius: '10px',
                color: '#F8FAFC',
                boxShadow: '0 8px 24px rgba(0,0,0,0.6)'
              }}
            />
            <Bar dataKey="importance" name="Relative Weight (%)" radius={[0, 6, 6, 0]}>
              {FEATURE_IMPORTANCES.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Confusion Matrix Visualization */}
      <ChartCard title="Confusion Matrix Analysis" subtitle={`${CONFUSION_MATRIX.model} — Multi-class test partition evaluation`}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#1E293B]">
                <th className="p-3 text-left text-xs font-semibold text-[#94A3B8] uppercase">Ground Truth \ Predicted</th>
                {CONFUSION_MATRIX.classes.map((c) => (
                  <th key={c} className="p-3 text-center text-xs font-semibold text-[#94A3B8] uppercase">{c}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {CONFUSION_MATRIX.classes.map((cls, ri) => (
                <tr key={cls} className="border-b border-[#1E293B]/40">
                  <td className="p-3 text-xs font-semibold text-[#F8FAFC] whitespace-nowrap">{cls}</td>
                  {CONFUSION_MATRIX.matrix[ri].map((val, ci) => {
                    const isDiagonal = ri === ci;
                    return (
                      <td
                        key={ci}
                        className={`p-3 text-center font-mono text-sm ${
                          isDiagonal
                            ? 'bg-[#10B981]/20 text-[#10B981] font-bold border border-[#10B981]/40 rounded-lg shadow-[0_0_10px_rgba(16,185,129,0.2)]'
                            : 'text-[#94A3B8]'
                        }`}
                      >
                        {val}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ChartCard>

      {/* SHAP Explanation Section */}
      <ChartCard
        title="SHAP (SHapley Additive exPlanations) Feature Impact"
        subtitle="Individual feature attribution direction and impact on operational collision risk log-odds"
      >
        <div className="space-y-3">
          {SHAP_EXPLANATIONS.map((s, i) => (
            <div key={i} className="flex items-start gap-4 p-4 bg-[#0B1220] rounded-xl border border-[#1E293B] hover:border-cyan-500/30 transition-colors">
              <div
                className={`p-2 rounded-lg mt-0.5 ${
                  s.direction.includes('Increases') ? 'bg-[#EF4444]/15' : 'bg-[#10B981]/15'
                }`}
              >
                {s.direction.includes('Increases') ? (
                  <ArrowUp className="w-4 h-4 text-[#EF4444]" />
                ) : (
                  <ArrowDown className="w-4 h-4 text-[#10B981]" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between flex-wrap gap-2 mb-1">
                  <span className="text-sm font-semibold text-[#F8FAFC]">{s.feature}</span>
                  <span className="text-xs font-mono font-bold text-[#06B6D4] bg-[#06B6D4]/10 px-2 py-0.5 rounded border border-[#06B6D4]/20">{s.impact}</span>
                </div>
                <p className="text-xs text-[#94A3B8] leading-relaxed">{s.detail}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-[10px] text-[#64748B] uppercase tracking-wider">Telemetry Stream:</span>
                  <span className="text-[11px] font-mono text-[#8B5CF6]">{s.telemetrySource}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ChartCard>
    </div>
  );
}
