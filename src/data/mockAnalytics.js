/**
 * Analytical distributions, time-series data, and correlation matrices
 * NASA Mission Control Theme (Deep Space Blues, Ice Cyan, Pure White, Alert Coral)
 */

export const RISK_DISTRIBUTION_DONUT = [
  { name: "Low Risk", value: 68, color: "#38BDF8" },       // Ice Cyan
  { name: "Medium Risk", value: 18, color: "#60A5FA" },     // Deep Space Blue
  { name: "High Risk", value: 10, color: "#FB923C" },       // NASA Coral Orange
  { name: "Critical Risk", value: 4, color: "#EF4444" }     // Alert Coral Red
];

export const CONJUNCTION_EVENTS_TREND = [
  { date: "Day -29", totalConjunctions: 18, highRisk: 2, mediumRisk: 5, lowRisk: 11 },
  { date: "Day -25", totalConjunctions: 24, highRisk: 3, mediumRisk: 7, lowRisk: 14 },
  { date: "Day -21", totalConjunctions: 31, highRisk: 5, mediumRisk: 9, lowRisk: 17 },
  { date: "Day -17", totalConjunctions: 22, highRisk: 2, mediumRisk: 6, lowRisk: 14 },
  { date: "Day -13", totalConjunctions: 29, highRisk: 4, mediumRisk: 8, lowRisk: 17 },
  { date: "Day -9",  totalConjunctions: 35, highRisk: 6, mediumRisk: 11, lowRisk: 18 },
  { date: "Day -5",  totalConjunctions: 28, highRisk: 3, mediumRisk: 9, lowRisk: 16 },
  { date: "Day -1",  totalConjunctions: 38, highRisk: 7, mediumRisk: 12, lowRisk: 19 },
  { date: "Today",   totalConjunctions: 42, highRisk: 8, mediumRisk: 14, lowRisk: 20 }
];

export const CONSTELLATION_HEALTH_OVERVIEW = [
  { constellation: "Starlink LEO", avgFuel: 42, avgBattery: 84, healthScore: 68, activeUnits: 620 },
  { constellation: "OneWeb LEO", avgFuel: 58, avgBattery: 79, healthScore: 72, activeUnits: 280 },
  { constellation: "Copernicus SSO", avgFuel: 66, avgBattery: 92, healthScore: 86, activeUnits: 140 },
  { constellation: "Galileo MEO", avgFuel: 81, avgBattery: 95, healthScore: 92, activeUnits: 96 },
  { constellation: "Weather / Earth Obs", avgFuel: 38, avgBattery: 76, healthScore: 59, activeUnits: 110 },
  { constellation: "Legacy / Decommissioned", avgFuel: 6, avgBattery: 22, healthScore: 18, activeUnits: 174 }
];

export const FUEL_DISTRIBUTION = [
  { range: "0 - 15% (Critical)", count: 184, label: "0-15%" },
  { range: "16 - 35% (Constrained)", count: 292, label: "16-35%" },
  { range: "36 - 60% (Moderate)", count: 440, label: "36-60%" },
  { range: "61 - 85% (Optimal)", count: 368, label: "61-85%" },
  { range: "86 - 100% (Nominal)", count: 136, label: "86-100%" }
];

export const AGE_DISTRIBUTION = [
  { ageBucket: "0 - 2 Yrs (Fresh)", satellites: 380 },
  { ageBucket: "3 - 5 Yrs (Mid-Life)", satellites: 520 },
  { ageBucket: "6 - 9 Yrs (Mature)", satellites: 310 },
  { ageBucket: "10 - 14 Yrs (Degrading)", satellites: 140 },
  { ageBucket: "15+ Yrs (Zombie/Legacy)", satellites: 70 }
];

export const ALTITUDE_RISK_DISTRIBUTION = [
  { altitudeBand: "300-450 km (VLEO)", avgDebrisDistance: 3.4, highRiskCount: 3, totalPasses: 85 },
  { altitudeBand: "451-600 km (Megaconstellations)", avgDebrisDistance: 1.2, highRiskCount: 19, totalPasses: 420 },
  { altitudeBand: "601-850 km (SSO Sun-Sync)", avgDebrisDistance: 0.9, highRiskCount: 24, totalPasses: 310 },
  { altitudeBand: "851-1200 km (Polar LEO)", avgDebrisDistance: 1.8, highRiskCount: 11, totalPasses: 160 },
  { altitudeBand: "1200-2000 km (Upper LEO)", avgDebrisDistance: 4.6, highRiskCount: 4, totalPasses: 92 },
  { altitudeBand: "20,000+ km (MEO / GEO)", avgDebrisDistance: 14.8, highRiskCount: 1, totalPasses: 45 }
];

export const HEALTH_VS_OPERATIONAL_RISK_SCATTER = [
  { name: "Envisat Platform", healthScore: 8, operationalRisk: 94, category: "Critical", altitude: 768 },
  { name: "Starlink-1042", healthScore: 48, operationalRisk: 78, category: "Critical", altitude: 550 },
  { name: "Spire Lemur-2", healthScore: 34, operationalRisk: 82, category: "Critical", altitude: 512 },
  { name: "Starlink-1402", healthScore: 42, operationalRisk: 68, category: "High", altitude: 548 },
  { name: "Hubble Telescope", healthScore: 52, operationalRisk: 55, category: "Medium", altitude: 535 },
  { name: "NOAA-18 Weather", healthScore: 65, operationalRisk: 48, category: "Medium", altitude: 854 },
  { name: "OneWeb-0012", healthScore: 68, operationalRisk: 62, category: "High", altitude: 1200 },
  { name: "Suomi NPP", healthScore: 82, operationalRisk: 24, category: "Medium", altitude: 824 },
  { name: "Sentinel-1A", healthScore: 84, operationalRisk: 38, category: "High", altitude: 693 },
  { name: "Aqua EOS PM-1", healthScore: 87, operationalRisk: 14, category: "Low", altitude: 705 },
  { name: "ISS Alpha", healthScore: 95, operationalRisk: 8, category: "Low", altitude: 418 },
  { name: "Galileo-FOC 24", healthScore: 96, operationalRisk: 4, category: "Low", altitude: 23222 }
];

export const CORRELATION_MATRIX = {
  features: ["Miss Dist", "Rel Vel", "Fuel %", "Battery", "Age", "Risk Score"],
  matrix: [
    [ 1.00,  0.12,  0.08,  0.04, -0.05, -0.74 ], // Miss Dist
    [ 0.12,  1.00, -0.02, -0.06,  0.14,  0.58 ], // Rel Vel
    [ 0.08, -0.02,  1.00,  0.64, -0.71, -0.66 ], // Fuel %
    [ 0.04, -0.06,  0.64,  1.00, -0.58, -0.49 ], // Battery
    [-0.05,  0.14, -0.71, -0.58,  1.00,  0.52 ], // Age
    [-0.74,  0.58, -0.66, -0.49,  0.52,  1.00 ]  // Risk Score
  ]
};
