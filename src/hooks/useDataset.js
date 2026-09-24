import { useState } from 'react';
import { DEFAULT_SATELLITES, DATASET_METADATA } from '../data/defaultSatelliteData.js';

export function useDataset() {
  const [data, setData] = useState(DEFAULT_SATELLITES);
  const [source, setSource] = useState('default');
  const [fileName, setFileName] = useState(null);

  const upload = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target.result;
        if (file.name.endsWith('.json')) {
          const parsed = JSON.parse(text);
          const formatted = Array.isArray(parsed) ? parsed : [parsed];
          setData(formatted);
        } else {
          // CSV Parser with header normalization
          const lines = text.trim().split(/\r?\n/);
          if (lines.length > 1) {
            const rawHeaders = lines[0].split(',').map((h) => h.trim().replace(/^["']|["']$/g, ''));
            const parsed = lines.slice(1).filter((l) => l.trim().length > 0).map((line, idx) => {
              const vals = line.split(',').map((v) => v.trim().replace(/^["']|["']$/g, ''));
              const row = {
                satellite_id: vals[0] || `SAT-UPLOAD-${idx + 1}`,
                name: vals[1] || `Satellite-${idx + 1}`,
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
                collision_probability: parseFloat(vals[17]) || (parseFloat(vals[6]) < 1.0 ? 0.042 : 0.001),
                operational_health_score: parseInt(vals[18]) || 75,
                status: vals[19] || 'Monitored',
                timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19) + ' UTC',
                recommended_action: 'Telemetry analyzed from uploaded dataset batch.'
              };
              return row;
            });
            setData(parsed);
          }
        }
        setSource('uploaded');
        setFileName(file.name);
      } catch (err) {
        console.error('Failed to parse uploaded dataset:', err);
      }
    };
    reader.readAsText(file);
  };

  const resetToDefault = () => {
    setData(DEFAULT_SATELLITES);
    setSource('default');
    setFileName(null);
  };

  return { data, source, fileName, metadata: DATASET_METADATA, upload, resetToDefault };
}
