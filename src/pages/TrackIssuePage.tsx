import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BeforeAfterSlider } from '../components/common/BeforeAfterSlider';
import { IssueStatus } from '../types';
import { 
  Search, 
  MapPin, 
  Phone, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldAlert, 
  Star, 
  Send, 
  FileText, 
  ArrowLeft,
  Share2,
  DollarSign,
  Layers,
  Wrench,
  ThumbsUp,
  UserCheck
} from 'lucide-react';

export const TrackIssuePage: React.FC = () => {
  const { 
    issues, 
    selectedIssueId, 
    setCurrentView, 
    updateIssueStatus, 
    addComment, 
    upvoteIssue,
    currentUser, 
    showNotification 
  } = useApp();

  const [searchId, setSearchId] = useState<string>(selectedIssueId || 'CVX-2026-8941');
  const [commentText, setCommentText] = useState<string>('');
  const [rating, setRating] = useState<number>(5);
  const [isEscalateModalOpen, setIsEscalateModalOpen] = useState<boolean>(false);
  const [escalationReason, setEscalationReason] = useState<string>('');

  const currentIssue = issues.find((i) => i.id.toLowerCase() === searchId.toLowerCase()) || issues[0];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const found = issues.find((i) => i.id.toLowerCase().includes(searchId.toLowerCase()));
    if (found) {
      setSearchId(found.id);
    } else {
      showNotification('Not Found', `No grievance matching "${searchId}"`, 'error');
    }
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    addComment(currentIssue.id, commentText);
    setCommentText('');
  };

  const handleCitizenVerifyClose = () => {
    updateIssueStatus(
      currentIssue.id, 
      'closed', 
      `Citizen ${currentUser.name} verified resolution on ground and rated ${rating} Stars.`
    );
    showNotification('Grievance Closed', 'Thank you for verifying the completed work!', 'success');
  };

  const handleEscalateToDM = () => {
    if (!escalationReason.trim()) {
      showNotification('Reason Required', 'Please explain the reason for escalation.', 'error');
      return;
    }
    updateIssueStatus(
      currentIssue.id,
      'in_progress',
      `ESCALATED TO DISTRICT COLLECTOR (DM): "${escalationReason}" by ${currentUser.name}.`
    );
    setIsEscalateModalOpen(false);
    showNotification('Escalated to DM', 'Grievance flagged directly on District Magistrate Command Center.', 'warning');
  };

  const steps: { key: IssueStatus; label: string; icon: string }[] = [
    { key: 'reported', label: 'Reported', icon: 'check' },
    { key: 'verified', label: 'AI Verified', icon: 'memory' },
    { key: 'assigned', label: 'Assigned', icon: 'person_add' },
    { key: 'in_progress', label: 'In Progress', icon: 'build' },
    { key: 'resolved', label: 'Resolution', icon: 'task_alt' },
  ];

  const getStepIndex = (status: IssueStatus) => {
    switch (status) {
      case 'reported': return 0;
      case 'verified': return 1;
      case 'assigned': return 2;
      case 'in_progress': return 3;
      case 'resolved': return 4;
      case 'closed': return 4;
      default: return 0;
    }
  };

  const currentStepIdx = getStepIndex(currentIssue.status);

  return (
    <div className="min-h-screen bg-[#f7f5ef] pb-20 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* Search & Header Bar */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-civic-float border border-[#ddece3] flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <button
              onClick={() => setCurrentView('citizen_dashboard')}
              className="text-xs font-bold text-on-surface-variant hover:text-primary flex items-center gap-1 mb-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Dashboard</span>
            </button>
            <h1 className="text-xl sm:text-2xl font-extrabold text-primary">
              Track Grievance Resolution
            </h1>
            <p className="text-xs text-on-surface-variant mt-0.5">
              Live updates, assigned officer contact, and transparent verification
            </p>
          </div>

          {/* Quick Search ID Form */}
          <form onSubmit={handleSearch} className="flex items-center gap-2 max-w-sm w-full">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-outline absolute left-3 top-2.5 pointer-events-none" />
              <input
                type="text"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                placeholder="Enter Ticket ID (e.g. CVX-2026-8941)"
                className="w-full pl-9 pr-3.5 py-2 text-xs font-bold font-mono rounded-xl border border-[#ddece3] focus:outline-none focus:ring-2 focus:ring-primary bg-surface-container-low"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-white text-xs font-bold rounded-xl shadow-sm hover:bg-[#1f5d42]"
            >
              Lookup
            </button>
          </form>
        </div>

        {/* Grievance Summary Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-civic border border-[#ddece3] space-y-6">
          
          {/* Header Info */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#ddece3]">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-mono text-sm font-extrabold text-primary bg-[#b1f0cd] px-2.5 py-0.5 rounded-lg">
                  {currentIssue.id}
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-outline">
                  {currentIssue.category} • {currentIssue.subCategory}
                </span>
                <span className="text-xs font-extrabold text-[#ba1a1a] bg-[#ffdad6] px-2.5 py-0.5 rounded-full uppercase">
                  {currentIssue.priority}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-primary">
                {currentIssue.title}
              </h2>
            </div>

            <button
              onClick={() => upvoteIssue(currentIssue.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors flex items-center gap-2 self-start ${
                currentIssue.upvotedBy.includes(currentUser.id)
                  ? 'bg-[#b1f0cd] text-[#002113]'
                  : 'bg-surface-container text-on-surface hover:bg-[#ddece3]'
              }`}
            >
              <ThumbsUp className="w-4 h-4 text-[#3c6938]" />
              <span>{currentIssue.upvotes} Village Endorsements</span>
            </button>
          </div>

          {/* Interactive Stepper */}
          <div className="py-4">
            <div className="relative flex items-center justify-between">
              <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1.5 bg-surface-container z-0" />
              <div
                className="absolute left-0 top-1/2 -translate-y-1/2 h-1.5 bg-primary transition-all duration-500 z-0"
                style={{ width: `${Math.min(100, (currentStepIdx / 4) * 100)}%` }}
              />

              {steps.map((s, idx) => {
                const isPassed = currentStepIdx > idx;
                const isCurrent = currentStepIdx === idx;
                return (
                  <div key={s.key} className="flex flex-col items-center z-10 gap-1.5">
                    <div
                      className={`w-10 h-10 rounded-full font-bold text-xs flex items-center justify-center transition-all ${
                        isCurrent
                          ? 'bg-[#6a4e00] text-[#efc052] ring-4 ring-[#efc052]/40 shadow-lg scale-110'
                          : isPassed
                          ? 'bg-primary text-white shadow-md'
                          : 'bg-surface-container text-outline border-2 border-white'
                      }`}
                    >
                      <span className="material-symbols-outlined text-lg">{s.icon}</span>
                    </div>
                    <span className={`text-[11px] font-bold ${isCurrent ? 'text-[#00452d]' : isPassed ? 'text-primary' : 'text-on-surface-variant'}`}>
                      {s.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Before & After Interactive Photo Slider */}
          {currentIssue.photoAfter ? (
            <div className="pt-2">
              <h3 className="text-sm font-bold text-primary mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Completed Work Verification: Before vs After
              </h3>
              <BeforeAfterSlider
                beforeImage={currentIssue.photoBefore}
                afterImage={currentIssue.photoAfter}
              />
            </div>
          ) : (
            <div className="relative rounded-2xl overflow-hidden h-72 sm:h-80 border border-[#ddece3] shadow-sm bg-[#1a2e22] flex items-center justify-center p-2">
              <img
                src={currentIssue.photoBefore}
                alt={currentIssue.title}
                className="w-full h-full object-contain"
              />
              <div className="absolute top-4 left-4 bg-[#6a4e00]/90 backdrop-blur text-[#efc052] text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
                Reported Site Photo (Repair In-Progress)
              </div>
            </div>
          )}

          {/* SLA Countdown & Impact Assessment Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="bg-[#ffdad6]/30 border-2 border-[#ffdad6] rounded-2xl p-5 shadow-civic relative overflow-hidden">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#ba1a1a] block mb-1">
                Resolution SLA Countdown
              </span>
              <div className="flex items-baseline gap-1 text-[#ba1a1a] font-extrabold">
                <span className="text-3xl sm:text-4xl font-mono">1</span>
                <span className="text-sm">d</span>
                <span className="text-3xl sm:text-4xl font-mono ml-2">8</span>
                <span className="text-sm">h</span>
                <span className="text-xs font-semibold text-on-surface-variant ml-2">Remaining until target deadline</span>
              </div>
            </div>

            <div className="bg-surface-container rounded-2xl p-5 border border-[#ddece3] shadow-civic flex flex-col justify-between">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-primary uppercase text-[10px] tracking-wider">Impact Assessment</span>
                <span className="font-extrabold text-red-700 bg-red-100 px-2 py-0.5 rounded-md">
                  Severity {currentIssue.aiSeverityScore}/100
                </span>
              </div>
              <div className="text-xs font-semibold text-primary mt-2">
                👥 180 Families Affected in {currentIssue.ward}
              </div>
              <p className="text-[11px] text-on-surface-variant italic mt-1 leading-tight">
                AI Analysis: Immediate repair required to restore primary drinking water source.
              </p>
            </div>
          </div>

          {/* 2-Column Info: Officer Card + Budget/Materials */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            
            {/* Assigned Officer Contact Card */}
            <div className="bg-surface-container-low rounded-2xl p-5 border border-[#ddece3] space-y-3">
              <span className="text-[10px] text-outline font-bold uppercase tracking-wider block">
                Designated Field In-Charge
              </span>
              
              <div className="flex items-center gap-3.5">
                <img
                  src={currentIssue.assignedOfficer?.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'}
                  alt="Officer"
                  className="w-12 h-12 rounded-xl object-cover border border-[#95d4b1]"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold text-primary truncate">
                    {currentIssue.assignedOfficer?.name || 'Er. Ramesh Kumar'}
                  </h4>
                  <p className="text-xs text-on-surface-variant">
                    {currentIssue.assignedOfficer?.role || 'Junior Engineer (Rural Works)'}
                  </p>
                  <p className="text-[11px] text-[#3c6938] font-semibold">
                    {currentIssue.aiDepartment}
                  </p>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <a
                  href={`tel:${currentIssue.assignedOfficer?.phone || '+919811234567'}`}
                  className="px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold flex items-center gap-1.5 shadow-sm hover:bg-[#1f5d42]"
                >
                  <Phone className="w-3.5 h-3.5 text-[#95d4b1]" />
                  <span>Call Officer ({currentIssue.assignedOfficer?.phone || '+91 98112 34567'})</span>
                </a>
                <span className="text-xs text-on-surface-variant font-medium">
                  ETA: <b>{currentIssue.assignedOfficer?.etaHours || 4} Hrs</b>
                </span>
              </div>
            </div>

            {/* Expenditure & Material Breakdown */}
            <div className="bg-surface-container-low rounded-2xl p-5 border border-[#ddece3] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-outline font-bold uppercase tracking-wider">
                  Approved Scheme & Expenditure
                </span>
                <span className="text-xs font-extrabold text-[#00452d] bg-[#b1f0cd] px-2 py-0.5 rounded-md">
                  {currentIssue.costEstimate || '₹4,850'} Budget
                </span>
              </div>

              <div className="text-xs space-y-1.5">
                <div className="text-on-surface-variant">
                  Scheme: <b>Jal Jeevan Mission (Gram Vikas Sanrakshan)</b>
                </div>
                <div className="text-on-surface-variant">
                  Materials Deployed:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {(currentIssue.materialUsed || ['2.5in GI Pipe', 'Gate Sluice Valve', 'Concrete Base']).map((mat, idx) => (
                    <span key={idx} className="bg-white border border-[#ddece3] text-primary px-2 py-0.5 rounded-md text-[11px] font-semibold">
                      • {mat}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-1 flex items-center gap-2">
                <button
                  onClick={() => setIsEscalateModalOpen(true)}
                  className="text-xs font-bold text-red-700 hover:text-red-900 flex items-center gap-1"
                >
                  <ShieldAlert className="w-4 h-4" />
                  <span>Escalate to District Collector (DM)</span>
                </button>
              </div>
            </div>

          </div>

          {/* Citizen Final Verification / Rating if Resolved */}
          {currentIssue.status === 'resolved' && (
            <div className="bg-[#e8f7ee] border-2 border-[#b1f0cd] rounded-2xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <UserCheck className="w-5 h-5 text-[#00452d]" />
                  <h4 className="text-sm font-bold text-[#00452d]">Citizen Satisfaction Verification</h4>
                </div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setRating(star)}
                      className="text-amber-500 hover:scale-110 transition-transform"
                    >
                      <Star className={`w-5 h-5 ${star <= rating ? 'fill-amber-400 text-amber-500' : 'text-gray-300'}`} />
                    </button>
                  ))}
                </div>
              </div>
              <p className="text-xs text-[#0f5137]">
                Are you satisfied with the quality of repair conducted by the field team? Verify to close ticket.
              </p>
              <button
                onClick={handleCitizenVerifyClose}
                className="px-5 py-2.5 rounded-xl bg-primary text-white text-xs font-bold shadow-civic hover:bg-[#1f5d42]"
              >
                Confirm Quality & Close Grievance ✓
              </button>
            </div>
          )}

          {/* Timeline of Events */}
          <div className="pt-4 border-t border-[#ddece3] space-y-3">
            <h3 className="text-sm font-bold text-primary">Activity Timeline</h3>
            <div className="space-y-3">
              {currentIssue.timeline.map((event, idx) => (
                <div key={idx} className="flex items-start gap-3 text-xs">
                  <div className="w-2.5 h-2.5 rounded-full bg-primary mt-1.5 shrink-0" />
                  <div className="flex-1 bg-surface-container-low p-3 rounded-xl border border-[#ddece3]">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-bold text-primary">{event.title}</span>
                      <span className="text-[10px] text-on-surface-variant">{event.timestamp}</span>
                    </div>
                    <p className="text-on-surface-variant text-[11px] leading-relaxed">{event.description}</p>
                    <span className="text-[10px] text-outline font-semibold mt-1 block">By: {event.by}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Public Discussion / Comments */}
          <div className="pt-4 border-t border-[#ddece3] space-y-4">
            <h3 className="text-sm font-bold text-primary">Gram Sabha Comments & Public Updates</h3>
            
            {/* Input Form */}
            <form onSubmit={handleAddComment} className="flex gap-2">
              <input
                type="text"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Write a comment or ground update..."
                className="flex-1 px-3.5 py-2 rounded-xl border border-[#ddece3] text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-primary bg-white"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold flex items-center gap-1.5 shadow-sm hover:bg-[#1f5d42]"
              >
                <Send className="w-3.5 h-3.5 text-[#95d4b1]" />
                <span>Post</span>
              </button>
            </form>

            <div className="space-y-2">
              {currentIssue.comments.map((comm) => (
                <div key={comm.id} className="p-3 bg-white rounded-xl border border-[#ddece3] text-xs">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-primary">{comm.author} ({comm.role})</span>
                    <span className="text-[10px] text-on-surface-variant">{comm.timestamp}</span>
                  </div>
                  <p className="text-on-surface-variant">{comm.text}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Escalation Modal */}
      {isEscalateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            onClick={() => setIsEscalateModalOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />
          <div className="relative bg-white rounded-3xl max-w-md w-full p-6 shadow-civic-float border border-[#ddece3] z-50 space-y-4">
            <div className="flex items-center gap-2 text-red-700 font-extrabold text-base">
              <ShieldAlert className="w-5 h-5" />
              <span>Escalate to District Magistrate</span>
            </div>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              If work has stalled beyond SLA or quality is substandard, this report will directly ping the District Administrative Headquarters.
            </p>
            <textarea
              rows={3}
              value={escalationReason}
              onChange={(e) => setEscalationReason(e.target.value)}
              placeholder="State reason for escalation (e.g. No repair crew arrived after 48 hrs)..."
              className="w-full p-3 rounded-xl border border-[#ddece3] text-xs font-medium focus:outline-none focus:ring-2 focus:ring-red-600"
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsEscalateModalOpen(false)}
                className="px-4 py-2 rounded-xl border border-[#ddece3] text-xs font-bold hover:bg-surface-container"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleEscalateToDM}
                className="px-4 py-2 rounded-xl bg-red-700 text-white text-xs font-bold hover:bg-red-800"
              >
                Confirm Escalation
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
