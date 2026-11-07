import React from 'react';
import { Home, Calendar, LayoutDashboard, BookOpen, Info } from 'lucide-react';
import { Role } from '../types';

interface MobileBottomNavProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
  currentDay: number;
  userRole: Role;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeTab,
  onSelectTab,
  currentDay,
  userRole
}) => {
  const getDashboardTab = () => {
    if (userRole === 'pembimbing') return 'dashboard_pembimbing';
    if (userRole === 'super_admin' || userRole === 'admin_akademik') return 'dashboard_admin';
    return 'dashboard_peserta';
  };

  const dashboardTab = getDashboardTab();
  const isDashboardActive =
    activeTab === 'dashboard_peserta' ||
    activeTab === 'dashboard_pembimbing' ||
    activeTab === 'dashboard_admin';

  const navItems = [
    { tab: 'home', label: 'Beranda', icon: Home, isActive: activeTab === 'home' },
    {
      tab: 'curriculum',
      label: 'Jadwal 90H',
      icon: Calendar,
      badge: `H-${currentDay}`,
      isActive: activeTab === 'curriculum' || activeTab === 'lesson'
    },
    {
      tab: dashboardTab,
      label: userRole === 'peserta' ? 'Dashboard' : 'Portal',
      icon: LayoutDashboard,
      isActive: isDashboardActive,
      isSpecial: true
    },
    { tab: 'library', label: 'Pustaka', icon: BookOpen, isActive: activeTab === 'library' },
    { tab: 'about', label: 'Tentang', icon: Info, isActive: activeTab === 'about' }
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0A192F]/95 backdrop-blur-md border-t border-[#1E3A5F] py-2 px-2 shadow-museum-lg print:hidden">
      <div className="flex items-center justify-around gap-1 font-sans-body">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.tab}
              onClick={() => onSelectTab(item.tab)}
              className={`flex flex-col items-center justify-center py-1.5 px-2.5 rounded-lg transition-all relative cursor-pointer ${
                item.isActive
                  ? 'bg-[#132A4A] text-[#F5E2A8] font-semibold'
                  : 'text-[#A8A29E] hover:text-white font-medium'
              }`}
            >
              <div className="relative">
                <Icon
                  className={`w-5 h-5 ${
                    item.isActive ? 'stroke-[2.2] text-[#B4863A]' : 'stroke-[1.6] text-[#A8A29E]'
                  }`}
                />
                {item.badge && (
                  <span className="absolute -top-1.5 -right-3 text-[9px] font-mono font-bold bg-[#B4863A] text-[#0A192F] px-1 py-0.1 rounded-full leading-none">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className={`text-[10px] mt-1 tracking-tight ${item.isActive ? 'text-[#F5E2A8]' : 'text-[#A8A29E]'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
