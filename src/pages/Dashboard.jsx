import { useNavigate } from 'react-router-dom';
import { Satellite, ShieldAlert, Target, TrendingUp, ArrowRight, Zap } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, LineChart, Line, XAxis, YAxis, CartesianGrid, BarChart, Bar, Legend, AreaChart, Area } from 'recharts';
import MetricCard from '../components/MetricCard.jsx';
import ChartCard from '../components/ChartCard.jsx';
import DataTable from '../components/DataTable.jsx';
import { DEFAULT_SATELLITES, DATASET_METADATA } from '../data/defaultSatelliteData.js';
import { RISK_DISTRIBUTION_DONUT, CONJUNCTION_EVENTS_TREND, CONSTELLATION_HEALTH_OVERVIEW } from '../data/mockAnalytics.js';

const recentColumns = [
  { Header: 'Satellite', accessor: 'name' },
  { Header: 'Risk Level', accessor: 'risk_level' },
  { Header: 'Collision Prob.', accessor: 'collision_probability' },
  { Header: 'Health Score', accessor: 'operational_health_score' },
  { Header: 'Status', accessor: 'status' },
  { Header: 'Timestamp', accessor: 'timestamp' },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const meta = DATASET_METADATA;

  return (
    <div className="space-y-6">
      {/* Top Banner / Heading */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-gradient-to-r from-[#0B1220] via-[#111827] to-[#0B1220] p-6 rounded-2xl border border-sky-500/20 shadow-[0_0_30px_-5px_rgba(56,189,248,0.15)]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#38BDF8] animate-pulse shadow-[0_0_10px_#38BDF8]"></span>
            <span className="text-xs font-mono text-[#38BDF8] tracking-wider uppercase font-semibold">NASA Mission Control Live Telemetry</span>
          </div>
          <h2 className="text-2xl lg:text-3xl font-bold text-[#F8FAFC]">Satellite Collision Risk Analytics</h2>
          <p className="text-sm text-[#94A3B8] mt-1 max-w-2xl">
            Predictive collision risk assessment fusing orbital mechanics (<span className="text-[#38BDF8] font-medium">juliensimon/satellite-conjunctions</span>) with NASA spacecraft operational health telemetry (<span className="text-[#60A5FA] font-medium">telemanom A-1/A-2/A-3</span>).
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/predict')}
            className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-[#38BDF8] to-[#2563EB] hover:from-[#0284c7] hover:to-[#1d4ed8] text-white font-semibold text-sm rounded-xl shadow-[0_0_25px_-5px_rgba(56,189,248,0.5)] transition-all"
          >
            <Zap className="w-4 h-4 fill-white" /> Quick Predict <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Satellites"
          value={meta.activeSatellites.toLocaleString()}
          subtitle="Cataloged in active fleet"
          icon={Satellite}
          color="#38BDF8"
        />
        <MetricCard
          title="Tracked Debris Objects"
          value={meta.totalObjectsTracked.toLocaleString()}
          subtitle="NORAD cataloged fragments"
          icon={Target}
          color="#60A5FA"
        />
        <MetricCard
          title="High Risk Events"
          value={meta.highRiskEventsCount}
          subtitle="Requires immediate screening"
          icon={ShieldAlert}
          color="#EF4444"
        />
        <MetricCard
          title="Model Accuracy"
          value={`${meta.modelAccuracyPct}%`}
          subtitle="Random Forest baseline"
          icon={TrendingUp}
          color="#38BDF8"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 1. Collision Risk Distribution Donut */}
        <ChartCard
          title="Collision Risk Distribution"
          subtitle="Proportion of monitored fleet by operational risk tier"
        >
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={RISK_DISTRIBUTION_DONUT}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={62}
                outerRadius={98}
                paddingAngle={4}
                stroke="#030712"
                strokeWidth={3}
                label={({ name, value }) => `${name} (${value}%)`}
              >
                {RISK_DISTRIBUTION_DONUT.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0B1220',
                  border: '1px solid rgba(56, 189, 248, 0.3)',
                  borderRadius: '10px',
                  color: '#F8FAFC',
                  boxShadow: '0 8px 30px rgba(0,0,0,0.8)'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* 2. Collision Events Trend Line/Area Chart */}
        <ChartCard
          title="Collision Events Trend"
          subtitle="30-day temporal conjunction event frequency"
        >
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={CONJUNCTION_EVENTS_TREND}>
              <defs>
                <linearGradient id="nasaSkyGlow" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#38BDF8" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#38BDF8" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="nasaCoralGlow" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#EF4444" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#EF4444" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" opacity={0.5} />
              <XAxis dataKey="date" tick={{ fill: '#94A3B8', fontSize: 11 }} />
              <YAxis tick={{ fill: '#94A3B8', fontSize: 11 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0B1220',
                  border: '1px solid rgba(56, 189, 248, 0.3)',
                  borderRadius: '10px',
                  color: '#F8FAFC',
                  boxShadow: '0 8px 30px rgba(0,0,0,0.8)'
                }}
              />
              <Legend />
              <Area type="monotone" dataKey="totalConjunctions" stroke="#38BDF8" strokeWidth={3} fillOpacity={1} fill="url(#nasaSkyGlow)" name="Total Conjunctions" />
              <Area type="monotone" dataKey="highRisk" stroke="#EF4444" strokeWidth={2.5} fillOpacity={1} fill="url(#nasaCoralGlow)" name="High / Critical" />
              <Line type="monotone" dataKey="mediumRisk" stroke="#FB923C" strokeWidth={2} dot={{ r: 3, fill: '#FB923C' }} name="Medium Risk" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* 3. Satellite Health Overview Bar Chart */}
      <ChartCard
        title="Satellite Health Overview"
        subtitle="Subsystem health, fuel reserves, and battery state across orbital constellations"
      >
        <ResponsiveContainer width="100%" height={290}>
          <BarChart data={CONSTELLATION_HEALTH_OVERVIEW}>
            <defs>
              <linearGradient id="barNasaFuel" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#7DD3FC" />
                <stop offset="100%" stopColor="#0284C7" />
              </linearGradient>
              <linearGradient id="barNasaBattery" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#60A5FA" />
                <stop offset="100%" stopColor="#1E40AF" />
              </linearGradient>
              <linearGradient id="barNasaHealth" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="100%" stopColor="#94A3B8" />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" opacity={0.5} />
            <XAxis dataKey="constellation" tick={{ fill: '#94A3B8', fontSize: 11 }} />
            <YAxis tick={{ fill: '#94A3B8', fontSize: 11 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#0B1220',
                border: '1px solid rgba(56, 189, 248, 0.3)',
                borderRadius: '10px',
                color: '#F8FAFC',
                boxShadow: '0 8px 30px rgba(0,0,0,0.8)'
              }}
            />
            <Legend />
            <Bar dataKey="avgFuel" name="Avg Fuel Remaining (%)" fill="url(#barNasaFuel)" radius={[6, 6, 0, 0]} />
            <Bar dataKey="avgBattery" name="Avg Battery Health (%)" fill="url(#barNasaBattery)" radius={[6, 6, 0, 0]} />
            <Bar dataKey="healthScore" name="Health Score Index" fill="url(#barNasaHealth)" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Recent Risk Assessments Table */}
      <ChartCard
        title="Recent Risk Assessments"
        subtitle="Real-time evaluation log combining orbital close approaches and spacecraft health telemetry"
      >
        <DataTable columns={recentColumns} data={DEFAULT_SATELLITES.slice(0, 6)} />
      </ChartCard>
    </div>
  );
}
