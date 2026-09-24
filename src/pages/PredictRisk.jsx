import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Gauge, HeartPulse, Zap, AlertOctagon, CheckCircle2, ChevronRight, Info } from 'lucide-react';
import PredictionForm from '../components/PredictionForm.jsx';
import RiskGauge from '../components/RiskGauge.jsx';
import RiskBadge from '../components/RiskBadge.jsx';
import HealthIndicator from '../components/HealthIndicator.jsx';
import { predictCollisionRisk } from '../services/predictionService.js';

export default function PredictRisk() {
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handlePredict = async (formData) => {
    setIsLoading(true);
    setResult(null);
    try {
      const res = await predictCollisionRisk(formData);
      setResult(res);
    } catch (err) {
      console.error('Prediction calculation error:', err);
    }
    setIsLoading(false);
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h2 className="text-2xl lg:text-3xl font-bold text-[#F8FAFC]">Collision Prediction Engine</h2>
        <p className="text-sm text-[#94A3B8] mt-1 max-w-3xl">
          Evaluate multi-factor operational collision hazard by entering both <strong className="text-[#3B82F6]">Section A: Orbital Parameters</strong> (kinematic proximity) and <strong className="text-[#06B6D4]">Section B: Satellite Health</strong> (spacecraft responsiveness & maneuver capability).
        </p>
      </div>

      {/* Prediction Input Form */}
      <div className="bg-[#111827] border border-[#1E293B] rounded-2xl p-6 lg:p-8 shadow-xl">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#1E293B]">
          <h3 className="text-base font-semibold text-[#F8FAFC] flex items-center gap-2">
            <Gauge className="w-5 h-5 text-[#06B6D4]" /> Conjunction Telemetry Input
          </h3>
          <span className="text-xs text-[#94A3B8]">Choose a quick preset or enter custom parameters</span>
        </div>
        <PredictionForm onPredict={handlePredict} isLoading={isLoading} />
      </div>

      {/* Prediction Result Display */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-[#111827] border border-[#1E293B] rounded-2xl p-6 lg:p-8 shadow-2xl space-y-6"
          >
            <div className="flex items-center justify-between pb-4 border-b border-[#1E293B]">
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-[#F8FAFC]">Operational Risk Assessment Results</span>
                <RiskBadge level={result.riskLevel} />
              </div>
              <span className="text-xs font-mono text-[#06B6D4]">Confidence: {result.confidence}%</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              {/* Semi-Circular Risk Gauge */}
              <div className="flex flex-col items-center justify-center p-4 bg-[#0B1220] rounded-xl border border-[#1E293B]">
                <p className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wider mb-2">Calculated Risk Index</p>
                <RiskGauge value={result.riskScore} />
                <p className="text-xs text-[#64748B] mt-2">Combined Orbital & Health Score</p>
              </div>

              {/* Metrics Grid */}
              <div className="space-y-4">
                <div className="bg-[#0B1220] p-4 rounded-xl border border-[#1E293B] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <AlertOctagon className="w-5 h-5 text-[#EF4444]" />
                    <div>
                      <p className="text-xs text-[#94A3B8]">Collision Probability</p>
                      <p className="text-lg font-bold text-[#F8FAFC]">{(result.collisionProbability * 100).toFixed(2)}%</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-[#64748B]">{result.collisionProbability}</span>
                </div>

                <div className="bg-[#0B1220] p-4 rounded-xl border border-[#1E293B] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <HeartPulse className="w-5 h-5 text-[#22C55E]" />
                    <div>
                      <p className="text-xs text-[#94A3B8]">Operational Health Score</p>
                      <p className="text-lg font-bold text-[#F8FAFC]">{result.healthScore} / 100</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-[#22C55E]">{result.healthScore >= 70 ? 'Nominal' : result.healthScore >= 40 ? 'Degraded' : 'Critical'}</span>
                </div>

                <div className="bg-[#0B1220] p-4 rounded-xl border border-[#1E293B] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Zap className="w-5 h-5 text-[#F59E0B]" />
                    <div>
                      <p className="text-xs text-[#94A3B8]">Avoidance Capability</p>
                      <p className="text-lg font-bold text-[#F8FAFC]">{result.avoidance}</p>
                    </div>
                  </div>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded ${result.avoidance === 'High' ? 'bg-[#22C55E]/20 text-[#22C55E]' : result.avoidance === 'Moderate' ? 'bg-[#F59E0B]/20 text-[#F59E0B]' : 'bg-[#EF4444]/20 text-[#EF4444]'}`}>
                    {result.avoidance}
                  </span>
                </div>
              </div>

              {/* Action Recommendation Box */}
              <div className="flex flex-col h-full justify-between bg-[#0B1220] p-5 rounded-xl border border-[#1E293B]">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <ShieldCheck className="w-5 h-5 text-[#3B82F6]" />
                    <p className="text-sm font-semibold text-[#F8FAFC]">Recommended Maneuver Action</p>
                  </div>
                  <p className="text-sm text-[#94A3B8] leading-relaxed">
                    {result.recommendedAction}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#1E293B] space-y-2">
                  <HealthIndicator label="Subsystem Health" value={result.healthScore} />
                  <HealthIndicator label="Confidence Level" value={result.confidence} />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
