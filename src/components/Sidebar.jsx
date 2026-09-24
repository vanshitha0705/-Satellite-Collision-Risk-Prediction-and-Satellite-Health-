import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Radar, BarChart3, BrainCircuit, FileText, Info, Satellite } from 'lucide-react';

const links = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/predict', label: 'Predict Risk', icon: Radar },
  { to: '/analytics', label: 'Analytics', icon: BarChart3 },
  { to: '/model-insights', label: 'Model Insights', icon: BrainCircuit },
  { to: '/reports', label: 'Reports', icon: FileText },
  { to: '/about', label: 'About', icon: Info },
];

export default function Sidebar() {
  return (
    <aside className="hidden md:flex md:flex-col w-64 bg-[#0B1220] border-r border-[#1E293B] p-4">
      <div className="flex items-center gap-3 mb-8 px-2">
        <Satellite className="w-8 h-8 text-[#06B6D4]" />
        <div>
          <h1 className="text-lg font-bold text-[#F8FAFC] tracking-wide">OrbitAI</h1>
          <p className="text-[10px] text-[#94A3B8] uppercase tracking-widest">Collision Analytics</p>
        </div>
      </div>
      <nav className="flex-1 space-y-1">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-[#3B82F6]/10 text-[#3B82F6] border-l-2 border-[#3B82F6]'
                  : 'text-[#94A3B8] hover:bg-[#111827] hover:text-[#F8FAFC]'
              }`
            }
          >
            <Icon className="w-5 h-5" />
            {label}
          </NavLink>
        ))}
      </nav>
      <div className="mt-auto pt-4 border-t border-[#1E293B]">
        <div className="flex items-center gap-2 px-3 py-2">
          <div className="w-2 h-2 bg-[#22C55E] rounded-full animate-pulse" />
          <span className="text-xs text-[#94A3B8]">NORAD Tracking Active</span>
        </div>
      </div>
    </aside>
  );
}
