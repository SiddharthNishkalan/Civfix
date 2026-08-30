import React, { useState } from 'react';
import { useApp } from './context/AppContext';
import { Navbar } from './components/common/Navbar';
import { Sidebar } from './components/common/Sidebar';
import { NotificationToast } from './components/common/NotificationToast';
import { VoiceAssistantModal } from './components/common/VoiceAssistantModal';

// Pages
import { WelcomePage } from './pages/WelcomePage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { CitizenDashboard } from './pages/CitizenDashboard';
import { ReportIssuePage } from './pages/ReportIssuePage';
import { ReportSuccessPage } from './pages/ReportSuccessPage';
import { TrackIssuePage } from './pages/TrackIssuePage';
import { CivicRewardsPage } from './pages/CivicRewardsPage';
import { OfficerDashboardPage } from './pages/OfficerDashboardPage';
import { AdminAnalyticsPage } from './pages/AdminAnalyticsPage';

export const App: React.FC = () => {
  const { currentView, setCurrentView } = useApp();
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const renderPage = () => {
    switch (currentView) {
      case 'welcome':
        return <WelcomePage onOpenVoice={() => setIsVoiceModalOpen(true)} />;
      case 'citizen_dashboard':
        return <CitizenDashboard onOpenVoice={() => setIsVoiceModalOpen(true)} />;
      case 'report_issue':
        return <ReportIssuePage />;
      case 'report_success':
        return <ReportSuccessPage />;
      case 'track_issue':
        return <TrackIssuePage />;
      case 'rewards':
        return <CivicRewardsPage />;
      case 'officer_dashboard':
        return <OfficerDashboardPage />;
      case 'admin_analytics':
        return <AdminAnalyticsPage />;
      case 'login':
        return <LoginPage />;
      case 'register':
        return <RegisterPage />;
      default:
        return <WelcomePage onOpenVoice={() => setIsVoiceModalOpen(true)} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f7f5ef] text-on-surface font-sans antialiased selection:bg-primary selection:text-white">
      
      {/* Top Navbar */}
      <Navbar 
        onOpenVoice={() => setIsVoiceModalOpen(true)}
        onToggleSidebar={() => setIsSidebarOpen(true)}
      />

      {/* Mobile Drawer */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Main View */}
      <main className="flex-1">
        {renderPage()}
      </main>

      {/* Footer */}
      <footer className="bg-[#111e19] text-[#cfded5] py-12 border-t border-[#26332d]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center">
                  <span className="material-symbols-outlined text-lg text-[#95d4b1]">gavel</span>
                </div>
                <span className="text-xl font-extrabold text-white">CiviFix</span>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">
                Rural Civic Infrastructure & Gram Panchayat Empowerment Platform. Bridging citizens, field officers, and administration with transparent AI triage.
              </p>
            </div>

            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Quick Portals</h4>
              <ul className="space-y-2 text-xs">
                <li><button onClick={() => setCurrentView('citizen_dashboard')} className="hover:text-white transition-colors">Citizen Dashboard</button></li>
                <li><button onClick={() => setCurrentView('report_issue')} className="hover:text-white transition-colors">Report Rural Issue</button></li>
                <li><button onClick={() => setCurrentView('track_issue')} className="hover:text-white transition-colors">Track Live Resolution</button></li>
                <li><button onClick={() => setCurrentView('rewards')} className="hover:text-white transition-colors">Civic Rewards & Impact</button></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Govt Portals</h4>
              <ul className="space-y-2 text-xs">
                <li><button onClick={() => setCurrentView('officer_dashboard')} className="hover:text-white transition-colors">Junior Engineer Task Queue</button></li>
                <li><button onClick={() => setCurrentView('admin_analytics')} className="hover:text-white transition-colors">District Collector Analytics</button></li>
                <li><button onClick={() => setCurrentView('welcome')} className="hover:text-white transition-colors">Jal Jeevan Mission Audit</button></li>
                <li><button onClick={() => setCurrentView('welcome')} className="hover:text-white transition-colors">PMGSY Rural Roads Monitor</button></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Rural Helplines</h4>
              <div className="text-xs space-y-1.5 text-gray-400">
                <p>📞 Panchayat Toll-Free: <b className="text-white">1800-180-1551</b></p>
                <p>🚨 Emergency SOS: <b className="text-red-400">112</b></p>
                <p>💧 Water Supply JJM: <b className="text-blue-400">1916</b></p>
                <p>⚡ Electricity Discom: <b className="text-amber-400">1912</b></p>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-[#26332d] flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
            <p>© 2026 CiviFix Rural Empowerment Platform. Built with Rural Civic Modern design system.</p>
            <div className="flex items-center gap-4">
              <span>Open Standard</span>
              <span>•</span>
              <span>Accessibility WCAG AAA</span>
              <span>•</span>
              <span>Offline-First PWA</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Global Voice Assistant Modal */}
      <VoiceAssistantModal
        isOpen={isVoiceModalOpen}
        onClose={() => setIsVoiceModalOpen(false)}
      />

      {/* Floating Notifications */}
      <NotificationToast />

    </div>
  );
};
