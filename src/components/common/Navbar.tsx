import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import { 
  Menu, 
  Globe, 
  Wifi, 
  WifiOff, 
  Award, 
  PlusCircle, 
  Compass, 
  Briefcase, 
  BarChart3,
  Mic
} from 'lucide-react';

interface NavbarProps {
  onOpenVoice: () => void;
  onToggleSidebar: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenVoice, onToggleSidebar }) => {
  const { 
    currentUser, 
    currentRole, 
    currentView, 
    language, 
    isOffline, 
    switchRole, 
    setCurrentView, 
    setLanguage, 
    toggleOffline,
    t 
  } = useApp();

  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);

  const roles: { key: UserRole; label: string; desc: string; icon: string }[] = [
    { key: 'citizen', label: 'Selvi Murugan', desc: 'Citizen (Ward 4 - West Street)', icon: 'person' },
    { key: 'officer', label: 'Er. Senthil Kumar', desc: 'Assistant Engineer (TWAD & Roads)', icon: 'engineering' },
    { key: 'admin', label: 'District Collector', desc: 'Thoothukudi Command Center', icon: 'admin_panel_settings' },
    { key: 'sarpanch', label: 'Thiru Arumugam', desc: 'Panchayat Council President', icon: 'verified' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-[#ddece3] shadow-civic-sm">
      {isOffline && (
        <div className="bg-[#6a4e00] text-[#efc052] px-4 py-1.5 text-xs font-semibold flex items-center justify-between">
          <div className="flex items-center gap-2 max-w-7xl mx-auto w-full">
            <WifiOff className="w-4 h-4 animate-pulse" />
            <span>{t('offlineAlert')}</span>
          </div>
          <button 
            onClick={toggleOffline}
            className="underline hover:text-white text-xs font-bold shrink-0 ml-2"
          >
            Reconnect
          </button>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          <div className="flex items-center gap-3 sm:gap-6">
            <button
              onClick={onToggleSidebar}
              className="p-2 rounded-lg text-primary hover:bg-surface-container lg:hidden"
              aria-label="Toggle menu"
            >
              <Menu className="w-6 h-6" />
            </button>

            <button 
              onClick={() => setCurrentView('welcome')} 
              className="flex items-center gap-2.5 text-left group"
            >
              <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center shadow-civic-sm group-hover:scale-105 transition-transform">
                <span className="material-symbols-outlined text-2xl text-[#95d4b1]">gavel</span>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xl sm:text-2xl font-extrabold text-primary tracking-tight">CiviFix</span>
                  <span className="text-[10px] uppercase font-bold tracking-widest bg-[#b1f0cd] text-[#00452d] px-1.5 py-0.5 rounded-full">
                    Rural
                  </span>
                </div>
                <p className="text-[10px] sm:text-xs text-on-surface-variant font-medium hidden sm:block">
                  {currentUser.panchayat}
                </p>
              </div>
            </button>
          </div>

          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            <button
              onClick={() => setCurrentView('citizen_dashboard')}
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1.5 ${
                currentView === 'citizen_dashboard'
                  ? 'bg-primary text-white shadow-civic-sm'
                  : 'text-on-surface-variant hover:text-primary hover:bg-surface-container'
              }`}
            >
              <Compass className="w-4 h-4" />
              {t('dashboard')}
            </button>

            <button
              onClick={() => setCurrentView('report_issue')}
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1.5 ${
                currentView === 'report_issue'
                  ? 'bg-primary text-white shadow-civic-sm'
                  : 'text-on-surface-variant hover:text-primary hover:bg-surface-container'
              }`}
            >
              <PlusCircle className="w-4 h-4 text-[#3c6938]" />
              {t('reportIssue')}
            </button>

            <button
              onClick={() => setCurrentView('track_issue')}
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1.5 ${
                currentView === 'track_issue'
                  ? 'bg-primary text-white shadow-civic-sm'
                  : 'text-on-surface-variant hover:text-primary hover:bg-surface-container'
              }`}
            >
              <span className="material-symbols-outlined text-lg">timeline</span>
              {t('trackIssue')}
            </button>

            <button
              onClick={() => setCurrentView('rewards')}
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1.5 ${
                currentView === 'rewards'
                  ? 'bg-primary text-white shadow-civic-sm'
                  : 'text-on-surface-variant hover:text-primary hover:bg-surface-container'
              }`}
            >
              <Award className="w-4 h-4 text-[#efc052]" />
              {t('rewards')}
            </button>

            {(currentRole === 'officer' || currentRole === 'admin') && (
              <button
                onClick={() => setCurrentView(currentRole === 'officer' ? 'officer_dashboard' : 'admin_analytics')}
                className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1.5 ${
                  currentView === 'officer_dashboard' || currentView === 'admin_analytics'
                    ? 'bg-primary text-white shadow-civic-sm'
                    : 'text-primary bg-[#b1f0cd]/40 hover:bg-[#b1f0cd]'
                }`}
              >
                {currentRole === 'officer' ? <Briefcase className="w-4 h-4" /> : <BarChart3 className="w-4 h-4" />}
                {currentRole === 'officer' ? t('officerPortal') : t('adminIntelligence')}
              </button>
            )}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={onOpenVoice}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#00452d] to-[#1f5d42] text-white shadow-civic hover:shadow-civic-lg transition-all hover:scale-105 active:scale-95"
              title="Voice Assistant"
            >
              <div className="w-2.5 h-2.5 rounded-full bg-[#efc052] animate-ping" />
              <Mic className="w-4 h-4 text-[#95d4b1]" />
              <span className="text-xs font-bold hidden sm:inline">Voice Assistant</span>
            </button>

            <button
              onClick={toggleOffline}
              className={`p-2 rounded-lg border text-xs font-bold flex items-center gap-1 transition-colors ${
                isOffline 
                  ? 'bg-amber-100 border-amber-300 text-amber-800' 
                  : 'border-[#ddece3] text-on-surface-variant hover:bg-surface-container'
              }`}
              title={isOffline ? 'Offline Mode (Click to connect)' : 'Online (Click to simulate offline)'}
            >
              {isOffline ? <WifiOff className="w-4 h-4 text-amber-600" /> : <Wifi className="w-4 h-4 text-emerald-600" />}
            </button>

            <div className="relative">
              <button
                onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
                className="flex items-center gap-2 p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl border border-[#ddece3] hover:border-primary transition-colors bg-[#f7f5ef]"
              >
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-8 h-8 rounded-lg object-cover border border-[#95d4b1]"
                />
                <div className="text-left hidden md:block">
                  <div className="text-xs font-bold text-primary truncate max-w-[110px]">
                    {currentUser.name}
                  </div>
                  <div className="text-[10px] text-on-surface-variant uppercase font-semibold">
                    {currentRole}
                  </div>
                </div>
                <span className="material-symbols-outlined text-sm text-outline hidden sm:block">
                  expand_more
                </span>
              </button>

              {isRoleDropdownOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-civic-float border border-[#ddece3] p-2 z-50 animate-in fade-in zoom-in-95 duration-100">
                  <div className="p-3 bg-surface-container rounded-xl mb-2">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-primary">{currentUser.name}</span>
                      <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-primary text-white">
                        {currentRole}
                      </span>
                    </div>
                    <p className="text-[11px] text-on-surface-variant">{currentUser.panchayat}</p>
                    
                    {currentRole === 'citizen' && (
                      <div className="mt-2.5 pt-2 border-t border-[#ddece3] flex items-center justify-between text-xs">
                        <span className="text-on-surface-variant font-medium">Civic Balance:</span>
                        <span className="font-extrabold text-[#00452d] flex items-center gap-1">
                          <Award className="w-3.5 h-3.5 text-[#efc052]" />
                          {currentUser.civicPoints} Pts
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="px-2 py-1 text-[11px] font-bold text-outline uppercase tracking-wider">
                    Switch Role (Demo Personas)
                  </div>

                  <div className="space-y-1">
                    {roles.map((r) => (
                      <button
                        key={r.key}
                        onClick={() => {
                          switchRole(r.key);
                          setIsRoleDropdownOpen(false);
                        }}
                        className={`w-full text-left p-2.5 rounded-xl transition-colors flex items-center gap-3 ${
                          currentRole === r.key 
                            ? 'bg-[#b1f0cd]/50 text-primary font-bold' 
                            : 'hover:bg-surface-container text-on-surface'
                        }`}
                      >
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm ${
                          currentRole === r.key ? 'bg-primary text-white' : 'bg-surface-container-high text-primary'
                        }`}>
                          <span className="material-symbols-outlined text-lg">{r.icon}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-bold truncate">{r.label}</div>
                          <div className="text-[10px] text-on-surface-variant truncate">{r.desc}</div>
                        </div>
                        {currentRole === r.key && <span className="text-primary font-bold text-xs">Active</span>}
                      </button>
                    ))}
                  </div>

                  <div className="mt-2 pt-2 border-t border-[#ddece3] px-2 flex justify-between">
                    <button
                      onClick={() => {
                        setCurrentView('login');
                        setIsRoleDropdownOpen(false);
                      }}
                      className="text-xs text-primary hover:underline font-semibold"
                    >
                      Login with OTP
                    </button>
                    <button
                      onClick={() => {
                        setCurrentView('register');
                        setIsRoleDropdownOpen(false);
                      }}
                      className="text-xs text-secondary hover:underline font-semibold"
                    >
                      New Citizen Signup
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>

        </div>
      </div>
    </header>
  );
};
