import { Bell, User, Activity } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const pageTitles = {
  '/dashboard': 'Mission Control Dashboard',
  '/predict': 'Collision Risk Prediction',
  '/analytics': 'Orbital Analytics',
  '/model-insights': 'Model Insights',
  '/reports': 'Reports & Export',
  '/about': 'About OrbitAI',
};

export default function Navbar() {
  const location = useLocation();
  const title = pageTitles[location.pathname] || 'Satellite Collision Risk Analytics';

  return (
    <header className="flex items-center justify-between bg-[#0B1220] border-b border-[#1E293B] px-6 py-3">
      <h1 className="text-lg font-semibold text-[#F8FAFC]">{title}</h1>
      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2 bg-[#22C55E]/10 px-3 py-1.5 rounded-full">
          <Activity className="w-3.5 h-3.5 text-[#22C55E]" />
          <span className="text-xs font-medium text-[#22C55E]">System Online</span>
        </div>
        <button className="relative p-2 text-[#94A3B8] hover:text-[#F8FAFC] transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-[#EF4444] rounded-full" />
        </button>
        <div className="w-8 h-8 rounded-full bg-[#3B82F6]/20 flex items-center justify-center">
          <User className="w-4 h-4 text-[#3B82F6]" />
        </div>
      </div>
    </header>
  );
}
