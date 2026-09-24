import { useState } from 'react';
import { motion } from 'framer-motion';
import { Rocket, Activity, Radar } from 'lucide-react';

const initialValues = {
  altitude: '', velocity: '', inclination: '', relativeVelocity: '',
  debrisDistance: '', nearbyObjects: '',
  fuel: '', battery: '', age: '', thrusterStatus: 'Nominal',
  commStatus: 'Continuous', daysSinceManeuver: '', missionPriority: 'Medium',
};

const presets = [
  { name: 'Starlink LEO Conjunction', values: { altitude: '550', velocity: '7.59', inclination: '53', relativeVelocity: '11.4', debrisDistance: '0.38', nearbyObjects: '14', fuel: '18', battery: '82', age: '3.8', thrusterStatus: 'Degraded', commStatus: 'Continuous', daysSinceManeuver: '42', missionPriority: 'Medium' }},
  { name: 'High-Risk Debris Encounter', values: { altitude: '768', velocity: '7.47', inclination: '98.5', relativeVelocity: '13.9', debrisDistance: '0.22', nearbyObjects: '34', fuel: '0', battery: '12', age: '15', thrusterStatus: 'Inoperative', commStatus: 'Blackout', daysSinceManeuver: '900', missionPriority: 'Low' }},
  { name: 'Nominal Orbit', values: { altitude: '705', velocity: '7.50', inclination: '98.2', relativeVelocity: '11.2', debrisDistance: '5.1', nearbyObjects: '7', fuel: '71', battery: '89', age: '13', thrusterStatus: 'Nominal', commStatus: 'Continuous', daysSinceManeuver: '22', missionPriority: 'Critical' }},
];

const InputField = ({ label, name, value, onChange, unit }) => (
  <div>
    <label className="block text-xs text-[#94A3B8] mb-1">{label}{unit && ` (${unit})`}</label>
    <input
      type="number" name={name} value={value} onChange={onChange} step="any"
      className="w-full bg-[#0B1220] border border-[#1E293B] rounded-lg px-3 py-2 text-sm text-[#F8FAFC] placeholder-[#64748B] focus:outline-none focus:border-[#3B82F6] transition-colors"
      placeholder={label}
    />
  </div>
);

const SelectField = ({ label, name, value, onChange, options }) => (
  <div>
    <label className="block text-xs text-[#94A3B8] mb-1">{label}</label>
    <select name={name} value={value} onChange={onChange}
      className="w-full bg-[#0B1220] border border-[#1E293B] rounded-lg px-3 py-2 text-sm text-[#F8FAFC] focus:outline-none focus:border-[#3B82F6] transition-colors">
      {options.map((o) => <option key={o} value={o}>{o}</option>)}
    </select>
  </div>
);

export default function PredictionForm({ onPredict, isLoading }) {
  const [values, setValues] = useState(initialValues);

  const handleChange = (e) => setValues({ ...values, [e.target.name]: e.target.value });
  const handleSubmit = (e) => { e.preventDefault(); onPredict(values); };
  const applyPreset = (preset) => setValues(preset.values);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
      <div className="flex flex-wrap gap-2 mb-6">
        {presets.map((p) => (
          <button key={p.name} type="button" onClick={() => applyPreset(p)}
            className="px-3 py-1.5 text-xs bg-[#0B1220] border border-[#1E293B] rounded-lg text-[#94A3B8] hover:border-[#3B82F6] hover:text-[#3B82F6] transition-colors">
            {p.name}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Rocket className="w-4 h-4 text-[#06B6D4]" />
            <h3 className="text-sm font-semibold text-[#F8FAFC] uppercase tracking-wider">Orbital Parameters</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <InputField label="Altitude" unit="km" name="altitude" value={values.altitude} onChange={handleChange} />
            <InputField label="Velocity" unit="km/s" name="velocity" value={values.velocity} onChange={handleChange} />
            <InputField label="Inclination" unit="deg" name="inclination" value={values.inclination} onChange={handleChange} />
            <InputField label="Relative Velocity" unit="km/s" name="relativeVelocity" value={values.relativeVelocity} onChange={handleChange} />
            <InputField label="Debris Distance" unit="km" name="debrisDistance" value={values.debrisDistance} onChange={handleChange} />
            <InputField label="Nearby Objects" name="nearbyObjects" value={values.nearbyObjects} onChange={handleChange} />
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-4">
            <Activity className="w-4 h-4 text-[#3B82F6]" />
            <h3 className="text-sm font-semibold text-[#F8FAFC] uppercase tracking-wider">Satellite Health</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <InputField label="Fuel Remaining" unit="%" name="fuel" value={values.fuel} onChange={handleChange} />
            <InputField label="Battery Health" unit="%" name="battery" value={values.battery} onChange={handleChange} />
            <InputField label="Satellite Age" unit="years" name="age" value={values.age} onChange={handleChange} />
            <SelectField label="Thruster Status" name="thrusterStatus" value={values.thrusterStatus} onChange={handleChange} options={['Nominal', 'Degraded', 'Inoperative']} />
            <SelectField label="Communication Status" name="commStatus" value={values.commStatus} onChange={handleChange} options={['Continuous', 'Intermittent', 'Blackout']} />
            <InputField label="Days Since Last Maneuver" name="daysSinceManeuver" value={values.daysSinceManeuver} onChange={handleChange} />
            <SelectField label="Mission Priority" name="missionPriority" value={values.missionPriority} onChange={handleChange} options={['Low', 'Medium', 'High', 'Critical']} />
          </div>
        </div>

        <button type="submit" disabled={isLoading}
          className="w-full md:w-auto px-8 py-3 bg-[#3B82F6] hover:bg-[#2563EB] disabled:opacity-50 text-[#F8FAFC] font-semibold rounded-lg transition-colors flex items-center justify-center gap-2">
          {isLoading ? (
            <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Analyzing...</>
          ) : (
            <><Radar className="w-4 h-4" /> Analyze Collision Risk</>
          )}
        </button>
      </form>
    </motion.div>
  );
}
