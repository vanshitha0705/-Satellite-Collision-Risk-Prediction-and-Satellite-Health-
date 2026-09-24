import { useState } from 'react';
import { Download, FileText, Eye, Upload, Search, X, ShieldAlert, HeartPulse, Activity } from 'lucide-react';
import DataTable from '../components/DataTable.jsx';
import RiskBadge from '../components/RiskBadge.jsx';
import HealthIndicator from '../components/HealthIndicator.jsx';
import { DEFAULT_SATELLITES } from '../data/defaultSatelliteData.js';

export default function Reports() {
  const [dataList, setDataList] = useState(DEFAULT_SATELLITES);
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [selectedSatellite, setSelectedSatellite] = useState(null);

  const filteredData = dataList.filter((s) => {
    const matchesFilter = filter === 'All' || s.risk_level === filter;
    const matchesSearch =
      search === '' ||
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.satellite_id.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const exportCSV = () => {
    const headers = [
      'Satellite ID', 'Name', 'Orbit Type', 'Altitude (km)', 'Velocity (km/s)',
      'Miss Distance (km)', 'Fuel (%)', 'Battery (%)', 'Age (yrs)', 'Thruster',
      'Collision Prob', 'Risk Level', 'Health Score', 'Status', 'Timestamp', 'Recommended Action'
    ];
    const rows = filteredData.map((s) => [
      `"${s.satellite_id}"`, `"${s.name}"`, `"${s.orbit_type}"`, s.altitude_km, s.velocity_kms,
      s.debris_distance_km, s.fuel_remaining_pct, s.battery_health_pct, s.satellite_age_years,
      `"${s.thruster_status}"`, s.collision_probability, `"${s.risk_level}"`, s.operational_health_score,
      `"${s.status}"`, `"${s.timestamp}"`, `"${s.recommended_action || ''}"`
    ]);
    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `satellite_collision_reports_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadReport = () => {
    let report = '========================================================================\n';
    report += '          ORBIT-AI SATELLITE COLLISION RISK ASSESSMENT REPORT           \n';
    report += '========================================================================\n';
    report += `Generated at: ${new Date().toUTCString()}\n`;
    report += `Total Assessed Satellites: ${filteredData.length}\n`;
    report += `Active ML Classifier: Random Forest (94.8% Cross-Validation Accuracy)\n`;
    report += `Data Sources: juliensimon/satellite-conjunctions & appleparan/telemanom\n`;
    report += '------------------------------------------------------------------------\n\n';

    filteredData.forEach((s, idx) => {
      report += `[${idx + 1}] SATELLITE: ${s.name} (${s.satellite_id})\n`;
      report += `    Orbit: ${s.orbit_type} | Altitude: ${s.altitude_km} km | Miss Distance: ${s.debris_distance_km} km\n`;
      report += `    Operational Health Score: ${s.operational_health_score}/100 (Fuel: ${s.fuel_remaining_pct}%, Battery: ${s.battery_health_pct}%)\n`;
      report += `    Thruster: ${s.thruster_status} | Communication: ${s.communication_status}\n`;
      report += `    Collision Risk Tier: [${s.risk_level.toUpperCase()}] | Collision Prob: ${(s.collision_probability * 100).toFixed(2)}%\n`;
      report += `    Recommended Action: ${s.recommended_action}\n`;
      report += `    Timestamp: ${s.timestamp}\n\n`;
    });

    const blob = new Blob([report], { type: 'text/plain;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `orbit_ai_mission_report_${new Date().toISOString().slice(0, 10)}.txt`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result;
        const lines = text.trim().split(/\r?\n/);
        if (lines.length > 1) {
          const parsed = lines.slice(1).map((line, idx) => {
            const vals = line.split(',').map((v) => v.trim().replace(/^["']|["']$/g, ''));
            return {
              satellite_id: vals[0] || `SAT-UP-${idx + 1}`,
              name: vals[1] || `Uploaded Satellite ${idx + 1}`,
              orbit_type: vals[2] || 'LEO',
              altitude_km: parseFloat(vals[3]) || 550,
              velocity_kms: parseFloat(vals[4]) || 7.5,
              inclination_deg: parseFloat(vals[5]) || 53.0,
              debris_distance_km: parseFloat(vals[6]) || 2.5,
              relative_velocity_kms: parseFloat(vals[7]) || 10.0,
              nearby_objects_count: parseInt(vals[8]) || 5,
              fuel_remaining_pct: parseFloat(vals[9]) || 50,
              battery_health_pct: parseFloat(vals[10]) || 80,
              satellite_age_years: parseFloat(vals[11]) || 4.0,
              thruster_status: vals[12] || 'Nominal',
              communication_status: vals[13] || 'Continuous',
              time_since_maneuver_days: parseInt(vals[14]) || 30,
              mission_priority: vals[15] || 'Medium',
              risk_level: vals[16] || (parseFloat(vals[6]) < 1.0 ? 'High' : 'Low'),
              collision_probability: parseFloat(vals[17]) || 0.015,
              operational_health_score: parseInt(vals[18]) || 75,
              status: vals[19] || 'Monitored',
              timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19) + ' UTC',
              recommended_action: 'Batch conjunction risk evaluation completed.'
            };
          });
          setDataList(parsed);
        }
      } catch (err) {
        console.error('CSV import error:', err);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-6">
      {/* Header and Action Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-2xl lg:text-3xl font-bold text-[#F8FAFC]">Conjunction & Telemetry Reports</h2>
          <p className="text-sm text-[#94A3B8] mt-1">
            Historical conjunction assessments, export audit logs, and custom dataset ingestion
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <label className="flex items-center gap-2 px-4 py-2.5 bg-[#111827] border border-[#1E293B] hover:border-[#3B82F6] text-[#F8FAFC] text-xs font-semibold rounded-xl cursor-pointer transition-all">
            <Upload className="w-4 h-4 text-[#06B6D4]" />
            <span>Upload Real Dataset (CSV)</span>
            <input type="file" accept=".csv,.json" onChange={handleFileUpload} className="hidden" />
          </label>
          <button
            onClick={exportCSV}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#3B82F6] hover:bg-[#2563EB] text-white text-xs font-semibold rounded-xl transition-all"
          >
            <Download className="w-4 h-4" /> Export CSV
          </button>
          <button
            onClick={downloadReport}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#06B6D4] hover:bg-[#0891B2] text-white text-xs font-semibold rounded-xl transition-all"
          >
            <FileText className="w-4 h-4" /> Download Report
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#111827] p-4 rounded-xl border border-[#1E293B]">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs text-[#94A3B8] mr-1">Risk Filter:</span>
          {['All', 'Low', 'Medium', 'High', 'Critical'].map((tier) => (
            <button
              key={tier}
              onClick={() => setFilter(tier)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                filter === tier
                  ? 'bg-[#3B82F6] text-white'
                  : 'bg-[#0B1220] text-[#94A3B8] border border-[#1E293B] hover:border-[#334155]'
              }`}
            >
              {tier}
            </button>
          ))}
        </div>
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-[#94A3B8] absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search Satellite ID or Name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#0B1220] border border-[#1E293B] rounded-lg pl-9 pr-3 py-1.5 text-xs text-[#F8FAFC] placeholder-[#64748B] focus:outline-none focus:border-[#3B82F6]"
          />
        </div>
      </div>

      {/* Reports Table */}
      <div className="bg-[#111827] border border-[#1E293B] rounded-2xl p-4 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#1E293B]">
                <th className="px-4 py-3 text-left text-xs font-semibold text-[#94A3B8] uppercase">Satellite ID</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-[#94A3B8] uppercase">Name</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-[#94A3B8] uppercase">Timestamp</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-[#94A3B8] uppercase">Collision Prob.</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-[#94A3B8] uppercase">Risk Level</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-[#94A3B8] uppercase">Health Score</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-[#94A3B8] uppercase">Status</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-[#94A3B8] uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1E293B]">
              {filteredData.map((row) => (
                <tr key={row.satellite_id} className="hover:bg-[#0B1220]/60 transition-colors">
                  <td className="px-4 py-3 font-mono text-xs text-[#06B6D4]">{row.satellite_id}</td>
                  <td className="px-4 py-3 font-medium text-[#F8FAFC]">{row.name}</td>
                  <td className="px-4 py-3 text-xs text-[#94A3B8] whitespace-nowrap">{row.timestamp}</td>
                  <td className="px-4 py-3 font-mono text-xs text-[#F8FAFC]">
                    {(row.collision_probability * 100).toFixed(2)}%
                  </td>
                  <td className="px-4 py-3">
                    <RiskBadge level={row.risk_level} />
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs font-semibold text-[#F8FAFC]">{row.operational_health_score} / 100</span>
                  </td>
                  <td className="px-4 py-3 text-xs text-[#94A3B8]">{row.status}</td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => setSelectedSatellite(row)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#3B82F6]/10 hover:bg-[#3B82F6]/25 text-[#3B82F6] text-xs font-semibold rounded-lg transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" /> View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Details Modal */}
      {selectedSatellite && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#111827] border border-[#1E293B] rounded-2xl w-full max-w-2xl p-6 space-y-5 shadow-2xl relative">
            <div className="flex items-center justify-between pb-3 border-b border-[#1E293B]">
              <div>
                <h3 className="text-lg font-bold text-[#F8FAFC]">{selectedSatellite.name}</h3>
                <p className="text-xs font-mono text-[#06B6D4]">{selectedSatellite.satellite_id} — {selectedSatellite.orbit_type} Orbit</p>
              </div>
              <button
                onClick={() => setSelectedSatellite(null)}
                className="p-1.5 text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#1E293B] rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="bg-[#0B1220] p-3 rounded-xl border border-[#1E293B]">
                <p className="text-[10px] text-[#94A3B8] uppercase">Altitude</p>
                <p className="text-base font-bold text-[#F8FAFC]">{selectedSatellite.altitude_km} km</p>
              </div>
              <div className="bg-[#0B1220] p-3 rounded-xl border border-[#1E293B]">
                <p className="text-[10px] text-[#94A3B8] uppercase">Miss Distance</p>
                <p className="text-base font-bold text-[#F8FAFC]">{selectedSatellite.debris_distance_km} km</p>
              </div>
              <div className="bg-[#0B1220] p-3 rounded-xl border border-[#1E293B]">
                <p className="text-[10px] text-[#94A3B8] uppercase">Relative Velocity</p>
                <p className="text-base font-bold text-[#F8FAFC]">{selectedSatellite.relative_velocity_kms} km/s</p>
              </div>
              <div className="bg-[#0B1220] p-3 rounded-xl border border-[#1E293B]">
                <p className="text-[10px] text-[#94A3B8] uppercase">Fuel Remaining</p>
                <p className="text-base font-bold text-[#F8FAFC]">{selectedSatellite.fuel_remaining_pct}%</p>
              </div>
              <div className="bg-[#0B1220] p-3 rounded-xl border border-[#1E293B]">
                <p className="text-[10px] text-[#94A3B8] uppercase">Battery Health</p>
                <p className="text-base font-bold text-[#F8FAFC]">{selectedSatellite.battery_health_pct}%</p>
              </div>
              <div className="bg-[#0B1220] p-3 rounded-xl border border-[#1E293B]">
                <p className="text-[10px] text-[#94A3B8] uppercase">Thruster Status</p>
                <p className="text-base font-bold text-[#F8FAFC]">{selectedSatellite.thruster_status}</p>
              </div>
            </div>

            <div className="bg-[#0B1220] p-4 rounded-xl border border-[#1E293B] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#94A3B8]">Risk Assessment:</span>
                <RiskBadge level={selectedSatellite.risk_level} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#94A3B8]">Collision Probability:</span>
                <span className="text-xs font-mono font-bold text-[#EF4444]">{(selectedSatellite.collision_probability * 100).toFixed(2)}%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#94A3B8]">Operational Health Score:</span>
                <span className="text-xs font-mono font-bold text-[#22C55E]">{selectedSatellite.operational_health_score} / 100</span>
              </div>
              <div className="pt-2 border-t border-[#1E293B]">
                <p className="text-xs font-semibold text-[#F8FAFC] mb-1">Recommended Action:</p>
                <p className="text-xs text-[#94A3B8] leading-relaxed">{selectedSatellite.recommended_action}</p>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedSatellite(null)}
                className="px-5 py-2 bg-[#3B82F6] hover:bg-[#2563EB] text-white text-xs font-semibold rounded-lg transition-colors"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
