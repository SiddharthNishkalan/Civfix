import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  ArrowRight, 
  Mic, 
  ShieldCheck, 
  Clock, 
  Users, 
  Award, 
  CheckCircle2, 
  Sparkles,
  ChevronRight,
  Hammer
} from 'lucide-react';

interface WelcomePageProps {
  onOpenVoice: () => void;
}

export const WelcomePage: React.FC<WelcomePageProps> = ({ onOpenVoice }) => {
  const { setCurrentView, switchRole, t } = useApp();

  const liveStats = [
    { label: 'Grievances Resolved', value: '1,420+', icon: CheckCircle2, change: '+18% this month' },
    { label: 'Avg Resolution SLA', value: '38.4 Hrs', icon: Clock, change: 'Fastest in State' },
    { label: 'Active Panchayats', value: '48 Grams', icon: Users, change: '100% Onboarded' },
    { label: 'Civic Rewards Issued', value: '₹2.4 Lakhs', icon: Award, change: 'Community Fund' },
  ];

  const workflowSteps = [
    {
      step: '01',
      title: 'Voice or Photo Report',
      desc: 'Citizen speaks or snaps a picture. GPS automatically marks the precise location.',
      icon: Mic,
      bg: 'bg-[#e8f7ee]',
      color: 'text-primary'
    },
    {
      step: '02',
      title: 'AI Triage & Verification',
      desc: 'AI assigns severity (0-100), estimates material needs, and dispatches the ticket to the local council and Field JE.',
      icon: Sparkles,
      bg: 'bg-[#ffdf9e]/30',
      color: 'text-[#4d3800]'
    },
    {
      step: '03',
      title: 'Field Officer Dispatch',
      desc: 'Junior Engineer receives work order with budget requisition and travels to the exact GPS site.',
      icon: Hammer,
      bg: 'bg-[#ddece3]',
      color: 'text-[#1f5d42]'
    },
    {
      step: '04',
      title: 'Before/After Verification',
      desc: 'Repairs are certified with transparent photo proof, public audit, and +50 points to reporting citizens.',
      icon: ShieldCheck,
      bg: 'bg-[#bcf0b2]/40',
      color: 'text-[#3c6938]'
    }
  ];

  return (
    <div className="min-h-screen bg-[#f7f5ef] pb-16">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#eefdf4] via-[#f7f5ef] to-[#f7f5ef] pt-8 pb-16 sm:pt-14 sm:pb-24 border-b border-[#ddece3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 text-left space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#b1f0cd] text-[#002113] text-xs font-bold tracking-wide shadow-sm">
                <span className="w-2 h-2 rounded-full bg-[#00452d] animate-pulse" />
                Empowering 250,000+ Rural Citizens Across Tamil Nadu
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-primary tracking-tight leading-[1.15]">
                Direct Rural Governance &{' '}
                <span className="text-[#3c6938] underline decoration-[#efc052] decoration-wavy decoration-2">
                  Village Action
                </span>
              </h1>

              <p className="text-base sm:text-lg text-on-surface-variant max-w-2xl leading-relaxed">
                {t('welcomeHeroSubtitle')}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <button
                  onClick={() => setCurrentView('report_issue')}
                  className="px-6 py-3.5 rounded-xl bg-primary text-white font-bold text-sm sm:text-base shadow-civic hover:shadow-civic-lg hover:bg-[#1f5d42] transition-all flex items-center gap-2"
                >
                  <span>{t('reportIssue')}</span>
                  <ArrowRight className="w-4 h-4 text-[#95d4b1]" />
                </button>

                <button
                  onClick={onOpenVoice}
                  className="px-5 py-3.5 rounded-xl border-2 border-primary bg-white text-primary font-bold text-sm sm:text-base hover:bg-surface-container transition-all flex items-center gap-2 shadow-sm"
                >
                  <Mic className="w-4 h-4 text-[#efc052]" />
                  <span>Voice AI Assistant</span>
                </button>

                <button
                  onClick={() => setCurrentView('citizen_dashboard')}
                  className="px-5 py-3.5 rounded-xl bg-surface-container text-on-surface font-semibold text-sm hover:bg-[#ddece3] transition-colors"
                >
                  Explore Dashboard
                </button>
              </div>

              {/* Quick Persona Launchers */}
              <div className="pt-4 border-t border-[#ddece3]">
                <span className="text-xs font-bold text-outline uppercase tracking-wider block mb-2.5">
                  Demo Experience Portals:
                </span>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => switchRole('citizen')}
                    className="px-3 py-1.5 rounded-lg bg-white border border-[#ddece3] text-xs font-bold text-primary hover:border-primary flex items-center gap-1.5 shadow-sm"
                  >
                    <span className="material-symbols-outlined text-sm text-[#3c6938]">person</span>
                    Citizen (Selvi)
                  </button>
                  <button
                    onClick={() => switchRole('officer')}
                    className="px-3 py-1.5 rounded-lg bg-white border border-[#ddece3] text-xs font-bold text-primary hover:border-primary flex items-center gap-1.5 shadow-sm"
                  >
                    <span className="material-symbols-outlined text-sm text-amber-700">engineering</span>
                    Field Officer (Senthil)
                  </button>
                  <button
                    onClick={() => switchRole('admin')}
                    className="px-3 py-1.5 rounded-lg bg-white border border-[#ddece3] text-xs font-bold text-primary hover:border-primary flex items-center gap-1.5 shadow-sm"
                  >
                    <span className="material-symbols-outlined text-sm text-blue-700">admin_panel_settings</span>
                    District Collector Command
                  </button>
                  <button
                    onClick={() => switchRole('sarpanch')}
                    className="px-3 py-1.5 rounded-lg bg-white border border-[#ddece3] text-xs font-bold text-primary hover:border-primary flex items-center gap-1.5 shadow-sm"
                  >
                    <span className="material-symbols-outlined text-sm text-emerald-700">verified</span>
                    Council President (Arumugam)
                  </button>
                </div>
              </div>

            </div>

            {/* Right Card / Interactive Visual */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#ddece3] shadow-civic-float relative">
                
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#ddece3]">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
                    <span className="text-xs font-extrabold uppercase tracking-wider text-primary">Live Resolution Ticker</span>
                  </div>
                  <span className="text-xs font-semibold text-on-surface-variant">Kovilpatti Block</span>
                </div>

                <div className="space-y-4">
                  <div className="relative rounded-2xl overflow-hidden shadow-sm h-48 border border-[#ddece3]">
                    <img
                      src="/images/handpump_before.jpg"
                      alt="Water pipeline fix"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-[#6a4e00]/90 text-[#efc052] text-[11px] font-bold px-2.5 py-1 rounded-full backdrop-blur">
                      Urgent SLA: 4 Hours Left
                    </div>
                    <div className="absolute bottom-3 left-3 right-3 bg-black/60 backdrop-blur-md text-white p-2.5 rounded-xl">
                      <div className="text-xs font-bold">Ticket #CVX-2026-8941</div>
                      <div className="text-[11px] text-gray-200 truncate">Main Village Well Pump & Pipeline Fractured</div>
                    </div>
                  </div>

                  <div className="bg-surface-container p-3 rounded-xl space-y-2">
                    <div className="flex justify-between text-xs font-bold text-primary">
                      <span>Status: In Progress</span>
                      <span>75% Resolved</span>
                    </div>
                    <div className="w-full bg-[#cfded5] h-2 rounded-full overflow-hidden">
                      <div className="bg-[#00452d] h-full rounded-full w-3/4 animate-pulse" />
                    </div>
                    <div className="text-[11px] text-on-surface-variant flex items-center justify-between pt-1">
                      <span>Officer: Er. Senthil Kumar</span>
                      <span className="font-semibold text-emerald-800">Materials On-Site</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setCurrentView('track_issue', 'CVX-2026-8941')}
                    className="w-full py-2.5 rounded-xl bg-primary text-white font-bold text-xs hover:bg-[#1f5d42] transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>Inspect Live Resolution Timeline</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Live Impact Statistics */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {liveStats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div 
                key={idx} 
                className="bg-white rounded-2xl p-5 border border-[#ddece3] shadow-civic hover:shadow-civic-lg transition-all"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="w-9 h-9 rounded-xl bg-[#e8f7ee] text-primary flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-[10px] font-bold text-emerald-700 bg-[#bcf0b2] px-2 py-0.5 rounded-full">
                    {stat.change}
                  </span>
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-primary tracking-tight">
                  {stat.value}
                </div>
                <div className="text-xs text-on-surface-variant font-medium mt-1">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4-Step Transparent Workflow */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#3c6938] bg-[#bcf0b2] px-3 py-1 rounded-full">
            How CiviFix Works
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-primary tracking-tight mt-3">
            From Grievance to Resolution in 4 Transparent Steps
          </h2>
          <p className="text-sm sm:text-base text-on-surface-variant mt-2">
            Bridging village citizens, field engineers, and district administrators on one single AI platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {workflowSteps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-[#ddece3] shadow-civic hover:shadow-civic-lg transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-2xl ${s.bg} flex items-center justify-center`}>
                      <Icon className={`w-6 h-6 ${s.color}`} />
                    </div>
                    <span className="text-2xl font-extrabold text-[#cfded5]">{s.step}</span>
                  </div>
                  <h3 className="text-base font-bold text-primary mb-2">{s.title}</h3>
                  <p className="text-xs text-on-surface-variant leading-relaxed">{s.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Community Call to Action */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="bg-gradient-to-r from-primary via-[#1f5d42] to-primary rounded-3xl p-8 sm:p-12 text-white shadow-civic-float relative overflow-hidden">
          <div className="relative z-10 max-w-2xl space-y-4">
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Ready to improve your village today?
            </h2>
            <p className="text-sm sm:text-base text-[#e5f4eb]">
              Join over 250,000 rural citizens making Gram Panchayats accountable, clean, and well-equipped.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={() => setCurrentView('report_issue')}
                className="px-6 py-3 rounded-xl bg-white text-primary font-bold text-sm shadow-md hover:bg-gray-100 transition-colors"
              >
                Report an Issue Now
              </button>
              <button
                onClick={() => setCurrentView('rewards')}
                className="px-6 py-3 rounded-xl bg-[#6a4e00] text-[#efc052] font-bold text-sm border border-[#efc052] hover:bg-[#4d3800] transition-colors flex items-center gap-1.5"
              >
                <Award className="w-4 h-4" />
                View Civic Rewards
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
