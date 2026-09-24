/**
 * Machine Learning Model Performance Metrics & Feature Analysis
 * Baseline comparisons for Logistic Regression, Decision Tree, Random Forest, and XGBoost
 * Fusing Orbital Parameters + NASA Spacecraft Telemetry Features
 */

export const MODEL_COMPARISONS = [
  {
    id: "logistic_regression",
    name: "Logistic Regression",
    type: "Linear Baseline",
    accuracy: 89.3,
    precision: 89.2,
    recall: 89.3,
    f1: 89.1,
    aucRoc: 0.91,
    latencyMs: 1.2,
    isSelected: false,
    description: "Generalized linear model; fast and interpretable baseline with L2 regularization."
  },
  {
    id: "decision_tree",
    name: "Decision Tree (CART)",
    type: "Single Tree",
    accuracy: 85.0,
    precision: 84.7,
    recall: 85.0,
    f1: 84.9,
    aucRoc: 0.88,
    latencyMs: 2.1,
    isSelected: false,
    description: "Hierarchical rule-based splitting; captures simple thresholds (e.g. miss distance < 1 km)."
  },
  {
    id: "random_forest",
    name: "Random Forest Classifier",
    type: "Ensemble (Bagging)",
    accuracy: 89.0,
    precision: 89.1,
    recall: 89.0,
    f1: 88.1,
    aucRoc: 0.95,
    latencyMs: 6.4,
    isSelected: true, // Currently selected operational baseline
    note: "Currently active baseline model in platform configuration.",
    description: "Ensemble of 250 de-correlated decision trees with out-of-bag validation. Superior robustness against noisy telemetry channels."
  },
  {
    id: "xgboost",
    name: "Gradient Boosted Trees (XGBoost)",
    type: "Ensemble (Boosting)",
    accuracy: 90.2,
    precision: 90.0,
    recall: 90.2,
    f1: 90.0,
    aucRoc: 0.96,
    latencyMs: 9.8,
    isSelected: false,
    description: "Sequential gradient boosted trees with shrinkage regularization. Highest overall benchmark accuracy."
  }
];

export const FEATURE_IMPORTANCES = [
  { feature: "Debris Miss Distance (km)", importance: 28.5, category: "Orbital Mechanics", color: "#06B6D4" },
  { feature: "Relative Velocity (km/s)", importance: 19.2, category: "Orbital Mechanics", color: "#06B6D4" },
  { feature: "Fuel Remaining (%)", importance: 16.8, category: "Satellite Health", color: "#8B5CF6" },
  { feature: "Thruster Health Status", importance: 12.4, category: "Satellite Health", color: "#8B5CF6" },
  { feature: "Nearby Objects Count", importance: 8.6, category: "Orbital Mechanics", color: "#06B6D4" },
  { feature: "Battery State of Health (%)", importance: 6.2, category: "Satellite Health", color: "#8B5CF6" },
  { feature: "Satellite Age (years)", importance: 4.5, category: "Satellite Health", color: "#8B5CF6" },
  { feature: "Orbital Inclination (deg)", importance: 3.8, category: "Orbital Mechanics", color: "#06B6D4" }
];

export const CONFUSION_MATRIX = {
  model: "Random Forest (Active Baseline)",
  classes: ["Nominal / Low", "Medium Risk", "High Risk", "Critical Risk"],
  matrix: [
    [1180, 24, 6, 1],    // True: Low
    [31, 388, 19, 4],   // True: Medium
    [8, 17, 242, 12],   // True: High
    [2, 3, 11, 152]     // True: Critical
  ],
  metrics: {
    totalTestSamples: 2100,
    truePositivesHighRisk: 394,
    falseAlarmsRatePct: 2.8,
    missedCriticalRatePct: 0.9
  }
};

export const SHAP_EXPLANATIONS = [
  {
    feature: "Debris Distance < 0.5 km",
    impact: "+0.42 Log-Odds",
    direction: "Increases Risk",
    telemetrySource: "juliensimon/satellite-conjunctions",
    detail: "Extremely tight conjunction geometry drastically elevates raw collision probability."
  },
  {
    feature: "Fuel Remaining < 15%",
    impact: "+0.31 Log-Odds",
    direction: "Increases Operational Risk",
    telemetrySource: "appleparan/telemanom (A-1)",
    detail: "Insufficient propellant prevents full 3-axis orbital correction maneuver, transforming a close pass into a high operational hazard."
  },
  {
    feature: "Thruster Degraded",
    impact: "+0.24 Log-Odds",
    direction: "Increases Operational Risk",
    telemetrySource: "appleparan/telemanom (A-1)",
    detail: "Reduced delta-v acceleration limits escape window before estimated time of closest approach (TCA)."
  },
  {
    feature: "Relative Velocity > 12 km/s",
    impact: "+0.18 Log-Odds",
    direction: "Increases Severity",
    telemetrySource: "juliensimon/satellite-conjunctions",
    detail: "Hypervelocity collision imparts catastrophic kinetic fragmentation (Kessler syndrome multiplier)."
  },
  {
    feature: "Battery SoH > 90%",
    impact: "-0.15 Log-Odds",
    direction: "Reduces Risk",
    telemetrySource: "appleparan/telemanom (A-2)",
    detail: "Reliable electrical bus ensures uninterrupted guidance computation and transmitter beaconing."
  }
];
