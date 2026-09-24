import { Satellite, Database, BrainCircuit, Rocket, Shield, Radio, Battery, Fuel, Clock, AlertTriangle, CheckCircle2, ArrowRight } from 'lucide-react';

const Section = ({ title, icon: Icon, children }) => (
  <div className="bg-[#111827] border border-[#1E293B] rounded-2xl p-6 lg:p-8 space-y-4">
    <div className="flex items-center gap-3 pb-3 border-b border-[#1E293B]">
      {Icon && <Icon className="w-5 h-5 text-[#3B82F6]" />}
      <h3 className="text-lg font-bold text-[#F8FAFC]">{title}</h3>
    </div>
    {children}
  </div>
);

export default function About() {
  return (
    <div className="space-y-6 max-w-5xl">
      {/* Title */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#3B82F6]/15 text-[#3B82F6]">Data Science Capstone Project</span>
        </div>
        <h2 className="text-2xl lg:text-3xl font-bold text-[#F8FAFC]">
          Data-Driven Predictive Analytics for Satellite Collision Risk Assessment Using Machine Learning and Satellite Health Data
        </h2>
        <p className="text-sm text-[#94A3B8] mt-2">
          A next-generation space situational awareness platform predicting actionable operational collision hazards.
        </p>
      </div>

      {/* Problem Statement */}
      <Section title="1. Problem Statement" icon={AlertTriangle}>
        <p className="text-sm text-[#94A3B8] leading-relaxed">
          Low Earth Orbit (LEO) and Geostationary Orbit (GEO) operate in increasingly congested spatial environments. With over <strong className="text-[#F8FAFC]">28,000 tracked orbital debris objects</strong> and thousands of active satellites (e.g. Starlink, OneWeb, Galileo), the probability of conjunction events is escalating exponentially.
        </p>
        <p className="text-sm text-[#94A3B8] leading-relaxed">
          Hypervelocity impacts occurring at relative velocities exceeding <strong className="text-[#EF4444]">10 to 14 km/s</strong> pose catastrophic threats capable of triggering the <strong className="text-[#F8FAFC]">Kessler Syndrome</strong>—a cascading chain reaction rendering orbital planes permanently hazardous.
        </p>
      </Section>

      {/* Project Novelty */}
      <Section title="2. Project Novelty: Operational Collision Risk" icon={Shield}>
        <p className="text-sm text-[#94A3B8] leading-relaxed mb-3">
          Traditional collision risk assessment relies exclusively on <strong className="text-[#3B82F6]">orbital geometry</strong> (miss distance, covariance ellipsoids, time of closest approach). However, orbital proximity alone does not dictate whether a collision is preventable.
        </p>
        <p className="text-sm text-[#94A3B8] leading-relaxed mb-4">
          This project introduces <strong className="text-[#06B6D4]">Operational Collision Risk Assessment</strong> by fusing orbital kinematics with real-time <strong className="text-[#22C55E]">Spacecraft Operational Health Telemetry</strong>:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            { icon: Fuel, label: 'Fuel Remaining (%)', desc: 'Determines delta-v burn margin for evasive maneuvers.' },
            { icon: Battery, label: 'Battery State of Health (%)', desc: 'Ensures reliable electrical bus power during eclipse phases.' },
            { icon: Rocket, label: 'Thruster Condition', desc: 'Nominal vs degraded vs inoperative propulsion readiness.' },
            { icon: Clock, label: 'Satellite Age (Years)', desc: 'Component wear and material degradation index.' },
            { icon: Radio, label: 'Communication Status', desc: 'Ground station command uplink and beacon stability.' },
            { icon: AlertTriangle, label: 'Telemetry Anomaly Flags', desc: 'Sensor anomaly indicators from NASA JPL channels.' },
          ].map(({ icon: I, label, desc }) => (
            <div key={label} className="bg-[#0B1220] border border-[#1E293B] rounded-xl p-4">
              <I className="w-5 h-5 text-[#06B6D4] mb-2" />
              <p className="text-xs font-bold text-[#F8FAFC]">{label}</p>
              <p className="text-[11px] text-[#94A3B8] mt-1">{desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Data Sources */}
      <Section title="3. Real Research Datasets" icon={Database}>
        <div className="space-y-3">
          <div className="bg-[#0B1220] border border-[#1E293B] rounded-xl p-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="text-sm font-bold text-[#3B82F6]">juliensimon/satellite-conjunctions</span>
              <span className="text-xs font-mono bg-[#3B82F6]/10 text-[#3B82F6] px-2 py-0.5 rounded">Hugging Face</span>
            </div>
            <p className="text-xs text-[#94A3B8] mt-2 leading-relaxed">
              Contains comprehensive orbital close-approach conjunction event logs, miss distances (km), relative velocities (km/s), covariance matrices, orbital inclination angles, and raw collision probability metrics.
            </p>
          </div>

          <div className="bg-[#0B1220] border border-[#1E293B] rounded-xl p-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="text-sm font-bold text-[#06B6D4]">appleparan/telemanom (A-1, A-2, A-3)</span>
              <span className="text-xs font-mono bg-[#06B6D4]/10 text-[#06B6D4] px-2 py-0.5 rounded">NASA JPL / Hugging Face</span>
            </div>
            <p className="text-xs text-[#94A3B8] mt-2 leading-relaxed">
              Real spacecraft telemetry streams from NASA missions (SMAP & MSL rover) containing multi-channel sensor readings across propulsion subsystems (A-1), electrical power buses (A-2), thermal regulation (A-3), and actuator telemetry anomaly flags.
            </p>
          </div>
        </div>
      </Section>

      {/* Data Science Methodology */}
      <Section title="4. Data Science Pipeline & Methodology" icon={BrainCircuit}>
        <div className="space-y-3 text-sm text-[#94A3B8]">
          <div className="flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-[#3B82F6]/20 text-[#3B82F6] font-mono text-xs flex items-center justify-center shrink-0 mt-0.5">1</span>
            <div>
              <strong className="text-[#F8FAFC]">Data Ingestion & Alignment:</strong> Joint alignment of orbital conjunction events with spacecraft subsystem telemetry.
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-[#3B82F6]/20 text-[#3B82F6] font-mono text-xs flex items-center justify-center shrink-0 mt-0.5">2</span>
            <div>
              <strong className="text-[#F8FAFC]">Feature Engineering:</strong> Extraction of kinematic proximity vectors, fuel burn margin penalties, and composite Operational Health Indices.
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-[#3B82F6]/20 text-[#3B82F6] font-mono text-xs flex items-center justify-center shrink-0 mt-0.5">3</span>
            <div>
              <strong className="text-[#F8FAFC]">Model Training & Cross-Validation:</strong> Comparative training across Logistic Regression, Decision Tree, Random Forest (active baseline), and XGBoost.
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-[#3B82F6]/20 text-[#3B82F6] font-mono text-xs flex items-center justify-center shrink-0 mt-0.5">4</span>
            <div>
              <strong className="text-[#F8FAFC]">Explainable AI (SHAP):</strong> Attribution of feature contributions to clarify whether high risk stems from orbital geometry or subsystem failure.
            </div>
          </div>
        </div>
      </Section>

      {/* Tech Stack */}
      <Section title="5. System Tech Stack" icon={Rocket}>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[
            { label: 'React 19 + Vite', type: 'Frontend Core' },
            { label: 'Tailwind CSS', type: 'NASA/ESA Dark Theme' },
            { label: 'Recharts', type: 'Data Visualization' },
            { label: 'Lucide Icons', type: 'UI System' },
            { label: 'Framer Motion', type: 'Transitions' },
            { label: 'FastAPI (Ready)', type: 'ML Inference Backend' },
          ].map(({ label, type }) => (
            <div key={label} className="bg-[#0B1220] border border-[#1E293B] rounded-xl p-3">
              <p className="text-xs font-bold text-[#F8FAFC]">{label}</p>
              <p className="text-[10px] text-[#64748B] mt-0.5">{type}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Future Scope */}
      <Section title="6. Future Scope & Roadmap" icon={CheckCircle2}>
        <ul className="space-y-2 text-xs text-[#94A3B8] list-disc list-inside">
          <li>Integration of live NORAD Two-Line Element (TLE) stream ingestion via Space-Track API.</li>
          <li>Autonomous avoidance burn optimization and delta-v thrust vector calculations.</li>
          <li>Deep temporal forecasting using Bidirectional LSTM networks on continuous telemetry streams.</li>
          <li>Full deployment of FastAPI endpoint serving serialized ONNX / scikit-learn models.</li>
        </ul>
      </Section>
    </div>
  );
}
