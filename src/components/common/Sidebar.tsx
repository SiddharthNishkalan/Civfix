import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  Compass, 
  PlusCircle, 
  Clock, 
  Award, 
  Briefcase, 
  BarChart3, 
  LogIn, 
  UserPlus, 
  Home, 
  ShieldAlert
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { currentView, currentUser, setCurrentView, t } = useApp();

  if (!isOpen) return null;

  const handleNav = (view: any) => {
    setCurrentView(view);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex lg:hidden">
      <div 
        onClick={onClose} 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity" 
      />

      <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white border-r border-[#ddece3] shadow-2xl z-50 p-6">
        <div className="flex items-center justify-between pb-4 border-b border-[#ddece3]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center shadow-civic-sm">
              <span className="material-symbols-outlined text-lg text-[#95d4b1]">gavel</span>
            </div>
            <span className="text-xl font-extrabold text-primary">CiviFix</span>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-outline hover:bg-surface-container"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-4 p-3 bg-surface-container rounded-xl flex items-center gap-3">
          <img 
            src={currentUser.avatar} 
            alt={currentUser.name}
            className="w-10 h-10 rounded-lg object-cover border border-[#95d4b1]" 
          />
          <div className="flex-1 min-w-0">
            <div className="text-xs font-bold text-primary truncate">{currentUser.name}</div>
            <div className="text-[10px] text-on-surface-variant capitalize">{currentUser.role} • {currentUser.panchayat}</div>
            <div className="text-[10px] font-extrabold text-[#3c6938] mt-0.5">{currentUser.civicPoints} Civic Points</div>
          </div>
        </div>

        <div className="mt-6 space-y-1.5 flex-1 overflow-y-auto">
          <button
            onClick={() => handleNav('welcome')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
              currentView === 'welcome' ? 'bg-primary text-white' : 'text-on-surface hover:bg-surface-container'
            }`}
          >
            <Home className="w-4 h-4" />
            Home / Welcome
          </button>

          <button
            onClick={() => handleNav('citizen_dashboard')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
              currentView === 'citizen_dashboard' ? 'bg-primary text-white' : 'text-on-surface hover:bg-surface-container'
            }`}
          >
            <Compass className="w-4 h-4" />
            {t('dashboard')}
          </button>

          <button
            onClick={() => handleNav('report_issue')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
              currentView === 'report_issue' ? 'bg-primary text-white' : 'text-on-surface hover:bg-surface-container'
            }`}
          >
            <PlusCircle className="w-4 h-4 text-emerald-600" />
            {t('reportIssue')}
          </button>

          <button
            onClick={() => handleNav('track_issue')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
              currentView === 'track_issue' ? 'bg-primary text-white' : 'text-on-surface hover:bg-surface-container'
            }`}
          >
            <Clock className="w-4 h-4" />
            {t('trackIssue')}
          </button>

          <button
            onClick={() => handleNav('rewards')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
              currentView === 'rewards' ? 'bg-primary text-white' : 'text-on-surface hover:bg-surface-container'
            }`}
          >
            <Award className="w-4 h-4 text-amber-500" />
            {t('rewards')}
          </button>

          <div className="pt-4 pb-2">
            <span className="text-[11px] font-bold text-outline uppercase tracking-wider px-3">
              Administrative Portals
            </span>
          </div>

          <button
            onClick={() => handleNav('officer_dashboard')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
              currentView === 'officer_dashboard' ? 'bg-primary text-white' : 'text-on-surface hover:bg-surface-container'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            {t('officerPortal')}
          </button>

          <button
            onClick={() => handleNav('admin_analytics')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
              currentView === 'admin_analytics' ? 'bg-primary text-white' : 'text-on-surface hover:bg-surface-container'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            {t('adminIntelligence')}
          </button>

          <div className="pt-4 pb-2">
            <span className="text-[11px] font-bold text-outline uppercase tracking-wider px-3">
              Account
            </span>
          </div>

          <button
            onClick={() => handleNav('login')}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold text-on-surface hover:bg-surface-container"
          >
            <LogIn className="w-4 h-4" />
            Citizen Login (OTP)
          </button>

          <button
            onClick={() => handleNav('register')}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold text-on-surface hover:bg-surface-container"
          >
            <UserPlus className="w-4 h-4" />
            New Registration
          </button>
        </div>

        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-xl">
          <div className="flex items-center gap-2 text-red-800 font-bold text-xs">
            <ShieldAlert className="w-4 h-4 text-red-600" />
            <span>Panchayat Emergency SOS</span>
          </div>
          <p className="text-[10px] text-red-700 mt-1">
            Dial 112 (Police) or 108 (Ambulance) for life hazards.
          </p>
        </div>

      </div>
    </div>
  );
};
