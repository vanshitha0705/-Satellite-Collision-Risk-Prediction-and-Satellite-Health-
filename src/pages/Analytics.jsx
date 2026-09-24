import { useState } from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, ScatterChart, Scatter, ZAxis, Legend, ReferenceLine } from 'recharts';
import ChartCard from '../components/ChartCard.jsx';
import MetricCard from '../components/MetricCard.jsx';
import { Database, Layers, AlertTriangle, Filter, Orbit } from 'lucide-react';
import {
  RISK_DISTRIBUTION_DONUT,
  FUEL_DISTRIBUTION,
  AGE_DISTRIBUTION,
  ALTITUDE_RISK_DISTRIBUTION,
  HEALTH_VS_OPERATIONAL_RISK_SCATTER,
  CORRELATION_MATRIX,
} from '../data/mockAnalytics.js';
import { DATASET_METADATA } from '../data/defaultSatelliteData.js';

const SCATTER_COLORS = {
  Low: '#38BDF8',       // Ice Cyan
  Medium: '#60A5FA',    // Deep Space Blue
  High: '#FB923C',      // NASA Coral Orange
  Critical: '#EF4444'   // Alert Red
};

export default function Analytics() {
  const meta = DATASET_METADATA;
  const [selectedOrbit, setSelectedOrbit] = useState('ALL');

  return (
    <div className="space-y-6">
      {/* Top Header & Filter Bar */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl lg:text-3xl font-bold text-[#F8FAFC]">Orbital & Telemetry Analytics</h2>
          <p className="text-sm text-[#94A3B8] mt-1">Exploratory data analysis of conjunction mechanics and satellite subsystem distributions</p>
        </div>
        <div className="flex items-center gap-2 bg-[#111827] border border-sky-500/20 p-1.5 rounded-xl shadow-[0_0_20px_-5px_rgba(56,189,248,0.25)]">
          <Filter className="w-4 h-4 text-[#38BDF8] ml-2" />
          <span className="text-xs text-[#94A3B8]">Orbit Regime:</span>
          {['ALL', 'LEO', 'SSO', 'MEO', 'GEO'].map((orbit) => (
            <button
              key={orbit}
              onClick={() => setSelectedOrbit(orbit)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                selectedOrbit === orbit
                  ? 'bg-gradient-to-r from-[#38BDF8] to-[#2563EB] text-white font-bold shadow-md'
                  : 'text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#0B1220]'
              }`}
            >
              {orbit}
            </button>
          ))}
        </div>
      </div>

      {/* Dataset Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard title="Monitored Fleet" value={meta.activeSatellites.toLocaleString()} subtitle="Active LEO/MEO/GEO assets" icon={Database} color="#38BDF8" />
        <MetricCard title="LEO Constellations" value={meta.leoSatellites} subtitle="76.3% of total population" icon={Orbit} color="#60A5FA" />
        <MetricCard title="MEO / GEO Sats" value={meta.meoSatellites + meta.geoSatellites} subtitle="Navigation & Telecom" icon={Layers} color="#38BDF8" />
        <MetricCard title="Telemetry Anomalies" value={42} subtitle="NASA Telemanom flags detected" icon={AlertTriangle} color="#FB923C" />
      </div>

      {/* Grid of Analytical Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 1. Risk Distribution Profile (Donut) */}
        <ChartCard title="Risk Distribution Profile" subtitle="Categorical breakdown of conjunction severity across catalog">
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={RISK_DISTRIBUTION_DONUT}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={58}
                outerRadius={94}
                paddingAngle={4}
                stroke="#030712"
                strokeWidth={3}
                label={({ name, value }) => `${name} (${value}%)`}
              >
                {RISK_DISTRIBUTION_DONUT.map((e, i) => (
                  <Cell key={i} fill={e.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: '#0B1220', border: '1px solid rgba(56, 189, 248, 0.3)', borderRadius: '10px', color: '#F8FAFC', boxShadow: '0 8px 30px rgba(0,0,0,0.8)' }} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* 2. Fuel Remaining Distribution */}
        <ChartCard title="Fuel Remaining Distribution" subtitle="Propellant margin availability across all active satellites">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={FUEL_DISTRIBUTION}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" opacity={0.5} />
              <XAxis dataKey="range" tick={{ fill: '#94A3B8', fontSize: 10 }} />
              <YAxis tick={{ fill: '#94A3B8', fontSize: 11 }} />
              <Tooltip contentStyle={{ backgroundColor: '#0B1220', border: '1px solid rgba(56, 189, 248, 0.3)', borderRadius: '10px', color: '#F8FAFC' }} />
              <Bar dataKey="count" name="Satellites Count" fill="#38BDF8" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* 3. Satellite Age Distribution */}
        <ChartCard title="Satellite Age Distribution" subtitle="Spacecraft operational lifetime and wear profile">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={AGE_DISTRIBUTION}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" opacity={0.5} />
              <XAxis dataKey="ageBucket" tick={{ fill: '#94A3B8', fontSize: 10 }} />
              <YAxis tick={{ fill: '#94A3B8', fontSize: 11 }} />
              <Tooltip contentStyle={{ backgroundColor: '#0B1220', border: '1px solid rgba(96, 165, 250, 0.3)', borderRadius: '10px', color: '#F8FAFC' }} />
              <Bar dataKey="satellites" name="Active Satellites" fill="#60A5FA" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* 4. Altitude vs Risk Visualization */}
        <ChartCard title="Altitude vs Risk Band Analysis" subtitle="High-risk conjunction passes across orbital altitudes">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={ALTITUDE_RISK_DISTRIBUTION}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" opacity={0.5} />
              <XAxis dataKey="altitudeBand" tick={{ fill: '#94A3B8', fontSize: 9 }} angle={-10} textAnchor="end" height={60} />
              <YAxis tick={{ fill: '#94A3B8', fontSize: 11 }} />
              <Tooltip contentStyle={{ backgroundColor: '#0B1220', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '10px', color: '#F8FAFC' }} />
              <Legend />
              <Bar dataKey="highRiskCount" name="High Risk Conjunctions" fill="#EF4444" radius={[6, 6, 0, 0]} />
              <Bar dataKey="totalPasses" name="Total Monitored Passes" fill="#38BDF8" radius={[6, 6, 0, 0]} opacity={0.4} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* 5. Health Score vs Operational Risk Visualization (Scatter Chart) */}
      <ChartCard
        title="Health Score vs Operational Risk Visualization"
        subtitle="Illustration of inverse relationship: Low subsystem health turns moderate orbital close-passes into critical hazards"
      >
        <ResponsiveContainer width="100%" height={340}>
          <ScatterChart margin={{ top: 20, right: 30, bottom: 20, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" opacity={0.5} />
            <XAxis
              type="number"
              dataKey="healthScore"
              name="Health Score"
              domain={[0, 100]}
              tick={{ fill: '#94A3B8', fontSize: 11 }}
              label={{ value: 'Subsystem Health Score (0 - 100)', position: 'insideBottom', offset: -10, fill: '#94A3B8', fontSize: 11 }}
            />
            <YAxis
              type="number"
              dataKey="operationalRisk"
              name="Operational Risk"
              domain={[0, 100]}
              tick={{ fill: '#94A3B8', fontSize: 11 }}
              label={{ value: 'Operational Risk Index', angle: -90, position: 'insideLeft', fill: '#94A3B8', fontSize: 11 }}
            />
            <ZAxis type="number" dataKey="altitude" range={[80, 500]} name="Altitude (km)" />
            <Tooltip
              contentStyle={{ backgroundColor: '#0B1220', border: '1px solid rgba(56, 189, 248, 0.4)', borderRadius: '10px', color: '#F8FAFC', boxShadow: '0 8px 30px rgba(0,0,0,0.8)' }}
              formatter={(value, name) => [value, name]}
            />
            <ReferenceLine x={50} stroke="#334155" strokeDasharray="4 4" label={{ value: 'Median Health', fill: '#64748B', fontSize: 10 }} />
            <ReferenceLine y={50} stroke="#334155" strokeDasharray="4 4" label={{ value: 'Risk Threshold', fill: '#64748B', fontSize: 10 }} />
            <Scatter name="Monitored Satellites" data={HEALTH_VS_OPERATIONAL_RISK_SCATTER}>
              {HEALTH_VS_OPERATIONAL_RISK_SCATTER.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={SCATTER_COLORS[entry.category] || '#38BDF8'}
                  stroke="#FFFFFF"
                  strokeWidth={1.5}
                />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Feature Correlation Matrix Grid */}
      <ChartCard title="Feature Correlation Heatmap Matrix" subtitle="Correlation coefficients between orbital mechanics and spacecraft health indicators">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-[#1E293B]">
                <th className="p-3 text-left text-[#94A3B8]">Feature</th>
                {CORRELATION_MATRIX.features.map((f) => (
                  <th key={f} className="p-3 text-center text-[#94A3B8] font-semibold">{f}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {CORRELATION_MATRIX.features.map((f, ri) => (
                <tr key={f} className="border-b border-[#1E293B]/40">
                  <td className="p-3 text-[#F8FAFC] font-medium whitespace-nowrap">{f}</td>
                  {CORRELATION_MATRIX.matrix[ri].map((val, ci) => {
                    const abs = Math.abs(val);
                    const bg = val > 0
                      ? `rgba(56, 189, 248, ${abs * 0.75})`
                      : `rgba(239, 68, 68, ${abs * 0.75})`;
                    return (
                      <td key={ci} className="p-3 text-center text-[#F8FAFC] font-mono font-semibold" style={{ backgroundColor: bg }}>
                        {val > 0 ? `+${val.toFixed(2)}` : val.toFixed(2)}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ChartCard>
    </div>
  );
}
