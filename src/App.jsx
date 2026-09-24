import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout.jsx';
import Dashboard from './pages/Dashboard.jsx';
import PredictRisk from './pages/PredictRisk.jsx';
import Analytics from './pages/Analytics.jsx';
import ModelInsights from './pages/ModelInsights.jsx';
import Reports from './pages/Reports.jsx';
import About from './pages/About.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="predict" element={<PredictRisk />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="model-insights" element={<ModelInsights />} />
        <Route path="reports" element={<Reports />} />
        <Route path="about" element={<About />} />
      </Route>
    </Routes>
  );
}
