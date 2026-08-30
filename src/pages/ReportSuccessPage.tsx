import React, { useEffect } from 'react';
import { useApp } from '../context/AppContext';
import confetti from 'canvas-confetti';
import { 
  CheckCircle2, 
  Award, 
  Clock, 
  QrCode, 
  Share2, 
  ArrowRight, 
  Home, 
  FileText,
  ShieldCheck,
  Phone
} from 'lucide-react';

export const ReportSuccessPage: React.FC = () => {
  const { 
    selectedIssueId, 
    recentlySubmittedIssue, 
    issues, 
    setCurrentView, 
    currentUser, 
    showNotification 
  } = useApp();

  const activeIssue = recentlySubmittedIssue || issues.find((i) => i.id === selectedIssueId) || issues[0];

  useEffect(() => {
    // Trigger celebratory confetti on mount
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      console.log('Confetti error', e);
    }
  }, []);

  const handleShareWhatsApp = () => {
    const text = `🚨 Village Grievance Registered: ${activeIssue.title} (${activeIssue.id}) at ${activeIssue.ward}, ${activeIssue.panchayat}. Track live resolution status on CiviFix: https://civifix.gov.in/track/${activeIssue.id}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
    showNotification('Shared to WhatsApp', 'Grievance link copied to village broadcast group.', 'success');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#eefdf4] via-[#f7f5ef] to-[#f7f5ef] py-12 px-4 sm:px-6 flex items-center justify-center">
      <div className="max-w-lg w-full bg-white rounded-3xl shadow-civic-float border border-[#ddece3] p-6 sm:p-8 text-center relative overflow-hidden">
        
        {/* Success Icon */}
        <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-primary to-[#3c6938] text-white flex items-center justify-center mx-auto mb-4 shadow-civic-lg animate-bounce">
          <CheckCircle2 className="w-8 h-8 text-[#95d4b1]" />
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#b1f0cd] text-[#002113] text-xs font-extrabold uppercase tracking-wider mb-2">
          <Award className="w-3.5 h-3.5 text-[#00452d]" />
          +50 Civic Points Credited
        </div>

        <h1 className="text-2xl font-extrabold text-primary">Grievance Registered!</h1>
        <p className="text-xs text-on-surface-variant mt-1">
          Your report has been auto-triaged and assigned to the Block Engineering Taskforce.
        </p>

        {/* Ticket Box */}
        <div className="bg-surface-container-low border border-[#ddece3] rounded-2xl p-5 my-6 text-left space-y-3">
          <div className="flex items-center justify-between border-b border-[#ddece3] pb-3">
            <div>
              <span className="text-[10px] text-outline font-bold uppercase tracking-wider block">Grievance Tracking ID</span>
              <span className="text-lg font-extrabold text-primary font-mono">{activeIssue.id}</span>
            </div>
            <div className="w-10 h-10 rounded-lg bg-white border border-[#ddece3] flex items-center justify-center">
              <QrCode className="w-6 h-6 text-primary" />
            </div>
          </div>

          <div className="space-y-1.5 text-xs">
            <div className="flex justify-between">
              <span className="text-on-surface-variant">Issue:</span>
              <span className="font-bold text-primary truncate max-w-[220px]">{activeIssue.title}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-on-surface-variant">Assigned Dept:</span>
              <span className="font-semibold text-primary">{activeIssue.aiDepartment}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-on-surface-variant">Estimated SLA:</span>
              <span className="font-extrabold text-emerald-800 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                48 Hours (2 Business Days)
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2.5">
          <button
            onClick={() => setCurrentView('track_issue', activeIssue.id)}
            className="w-full py-3.5 rounded-xl bg-primary text-white font-bold text-sm shadow-civic hover:bg-[#1f5d42] transition-colors flex items-center justify-center gap-2"
          >
            <span>Track Live Status & Timeline</span>
            <ArrowRight className="w-4 h-4 text-[#95d4b1]" />
          </button>

          <button
            onClick={handleShareWhatsApp}
            className="w-full py-3 rounded-xl border-2 border-[#3c6938] text-[#3c6938] font-bold text-xs hover:bg-[#e8f7ee] transition-colors flex items-center justify-center gap-2"
          >
            <Share2 className="w-4 h-4" />
            <span>Share to Gram Sabha WhatsApp Group</span>
          </button>

          <button
            onClick={() => setCurrentView('citizen_dashboard')}
            className="w-full py-2.5 text-xs text-on-surface-variant font-semibold hover:text-primary transition-colors flex items-center justify-center gap-1"
          >
            <Home className="w-4 h-4" />
            <span>Return to Dashboard</span>
          </button>
        </div>

      </div>
    </div>
  );
};
