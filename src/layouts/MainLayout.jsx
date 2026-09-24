import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar.jsx';
import Navbar from '../components/Navbar.jsx';

export default function MainLayout() {
  return (
    <div className="flex min-h-screen text-[#F8FAFC]">
      <Sidebar />
      <div className="flex flex-col flex-1 min-w-0 relative">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-4 lg:p-8 space-hud-grid">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
