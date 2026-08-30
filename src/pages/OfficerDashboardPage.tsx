import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MapView } from '../components/common/MapView';
import { Issue, IssueStatus } from '../types';
import { 
  Briefcase, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  AlertTriangle, 
  Filter, 
  Upload, 
  Wrench, 
  Camera, 
  ArrowRight,
  Eye,
  CheckSquare,
  FileCheck
} from 'lucide-react';

export const OfficerDashboardPage: React.FC = () => {
  const { 
    issues, 
    currentUser, 
    updateIssueStatus, 
    setCurrentView, 
    showNotification,
    isOffline
  } = useApp();

  const [filter, setFilter] = useState<'all' | 'urgent' | 'in_progress' | 'pending' | 'resolved'>('all');
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  // Modal Form State
  const [newStatus, setNewStatus] = useState<IssueStatus>('resolved');
  const [notes, setNotes] = useState<string>('Repair successfully conducted on-site. Damaged riser casing replaced and fresh water flow certified.');
  const [photoAfterUrl, setPhotoAfterUrl] = useState<string>('/images/handpump_after.jpg');
  const [materialInput, setMaterialInput] = useState<string>('2.5in GI Pipe, Sluice Valve 65mm, Concrete pad');

  const filteredIssues = issues.filter((i) => {
    if (filter === 'urgent') return i.priority === 'urgent';
    if (filter === 'in_progress') return i.status === 'in_progress';
    if (filter === 'pending') return i.status === 'reported' || i.status === 'verified';
    if (filter === 'resolved') return i.status === 'resolved' || i.status === 'closed';
    return true;
  });

  const handleOpenAction = (issue: Issue) => {
    setSelectedIssue(issue);
    setNewStatus(issue.status === 'in_progress' ? 'resolved' : 'in_progress');
    setModalOpen(true);
  };

  const handleSaveResolution = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedIssue) return;

    const materials = materialInput.split(',').map((m) => m.trim()).filter(Boolean);

    updateIssueStatus(
      selectedIssue.id,
      newStatus,
      notes,
      photoAfterUrl,
      materials
    );

    setModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#f7f5ef] pb-20 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Officer Header Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-civic-float border border-[#ddece3] flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-primary shadow-sm"
            />
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-primary text-white">
                  Field Engineering Portal
                </span>
                <span className="text-xs text-on-surface-variant font-medium">
                  {currentUser.ward}
                </span>
              </div>
              <h1 className="text-2xl font-extrabold text-primary">{currentUser.name}</h1>
              <p className="text-xs text-on-surface-variant">{currentUser.level} • {currentUser.panchayat}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-surface-container p-3.5 rounded-2xl text-center min-w-[100px]">
              <span className="text-[10px] text-outline font-bold uppercase block">Active Tasks</span>
              <span className="text-xl font-extrabold text-primary">{issues.filter((i) => i.status !== 'resolved' && i.status !== 'closed').length}</span>
            </div>
            <div className="bg-[#ffdad6] p-3.5 rounded-2xl text-center min-w-[100px]">
              <span className="text-[10px] text-[#93000a] font-bold uppercase block">Urgent SLA</span>
              <span className="text-xl font-extrabold text-[#ba1a1a]">{issues.filter((i) => i.priority === 'urgent').length}</span>
            </div>
          </div>
        </div>

        {/* 2-Column Layout: Work Orders List + Interactive Route Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Work Queue (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Filter Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {[
                { id: 'all', label: 'All Tasks' },
                { id: 'urgent', label: '🚨 Urgent SLA' },
                { id: 'in_progress', label: 'In Progress' },
                { id: 'pending', label: 'Pending Dispatch' },
                { id: 'resolved', label: 'Completed' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setFilter(tab.id as any)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all ${
                    filter === tab.id
                      ? 'bg-primary text-white shadow-sm'
                      : 'bg-white text-on-surface border border-[#ddece3] hover:bg-surface-container'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* List */}
            <div className="space-y-3.5">
              {filteredIssues.map((issue) => (
                <div
                  key={issue.id}
                  className="bg-white rounded-2xl p-5 border border-[#ddece3] shadow-civic hover:shadow-civic-lg transition-all space-y-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono text-xs font-bold text-primary bg-surface-container px-2 py-0.5 rounded">
                          {issue.id}
                        </span>
                        <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase ${
                          issue.priority === 'urgent' ? 'bg-[#ffdad6] text-[#ba1a1a]' : 'bg-[#e8f7ee] text-primary'
                        }`}>
                          {issue.priority} Priority
                        </span>
                        <span className="text-[10px] font-bold text-outline uppercase">{issue.category}</span>
                      </div>
                      <h3 className="text-sm sm:text-base font-bold text-primary">{issue.title}</h3>
                    </div>

                    <span className="text-[11px] text-on-surface-variant font-medium shrink-0">
                      {issue.reportedAt}
                    </span>
                  </div>

                  <p className="text-xs text-on-surface-variant line-clamp-2">{issue.description}</p>

                  <div className="bg-surface-container-low p-2.5 rounded-xl flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 truncate">
                      <MapPin className="w-3.5 h-3.5 text-[#3c6938] shrink-0" />
                      <span className="font-semibold text-primary truncate">{issue.ward}, {issue.landmark}</span>
                    </div>
                    <span className="text-[11px] font-bold text-[#00452d] shrink-0">
                      Severity: {issue.aiSeverityScore}/100
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-2 border-t border-[#ddece3]">
                    <button
                      onClick={() => setCurrentView('track_issue', issue.id)}
                      className="text-xs font-bold text-on-surface-variant hover:text-primary flex items-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View Public Log</span>
                    </button>

                    <button
                      onClick={() => handleOpenAction(issue)}
                      className="px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold shadow-civic hover:bg-[#1f5d42] flex items-center gap-1.5"
                    >
                      <Wrench className="w-3.5 h-3.5 text-[#95d4b1]" />
                      <span>Update Status & Proof</span>
                    </button>
                  </div>

                </div>
              ))}
            </div>

          </div>

          {/* Interactive Route Map (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white rounded-3xl p-5 border border-[#ddece3] shadow-civic space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-primary flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#3c6938]" />
                  Field Route & Site Geotags
                </h3>
                <span className="text-[11px] font-bold text-[#3c6938]">GPS Active</span>
              </div>

              <MapView
                issues={issues}
                height="320px"
                onSelectIssue={(id) => setCurrentView('track_issue', id)}
              />

              <div className="p-3 bg-surface-container rounded-xl text-xs space-y-1">
                <div className="flex justify-between font-bold text-primary">
                  <span>Target Zone: Rampur Ward 2 & 4</span>
                  <span>Est Travel: 12 mins</span>
                </div>
                <p className="text-[11px] text-on-surface-variant">
                  Vehicle: Mobile Service Utility Van #UP-65-AX-4412
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Work Resolution Modal */}
      {modalOpen && selectedIssue && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div onClick={() => setModalOpen(false)} className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
          
          <div className="relative bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-civic-float border border-[#ddece3] z-50 space-y-5">
            <div className="flex justify-between items-start border-b border-[#ddece3] pb-3">
              <div>
                <span className="font-mono text-xs font-bold text-outline">{selectedIssue.id}</span>
                <h3 className="text-lg font-bold text-primary">Field Work Resolution Update</h3>
              </div>
              <button onClick={() => setModalOpen(false)} className="text-outline font-bold text-sm">✕</button>
            </div>

            <form onSubmit={handleSaveResolution} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-primary uppercase mb-1">New Workflow Status</label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value as any)}
                  className="w-full p-2.5 rounded-xl border border-[#ddece3] font-semibold bg-white"
                >
                  <option value="in_progress">Work In-Progress (Crew on Site)</option>
                  <option value="resolved">Repair Completed (Ready for Verification)</option>
                  <option value="closed">Final Handover Certified</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-primary uppercase mb-1">Upload Resolution Photo Evidence</label>
                <div className="grid grid-cols-2 gap-2 mb-2">
                  <button
                    type="button"
                    onClick={() => setPhotoAfterUrl('/images/handpump_after.jpg')}
                    className={`relative rounded-xl overflow-hidden h-24 border-2 bg-[#1a2e22] flex items-center justify-center p-1 ${
                      photoAfterUrl.includes('handpump_after') ? 'border-primary ring-2 ring-[#b1f0cd]' : 'border-transparent'
                    }`}
                  >
                    <img src="/images/handpump_after.jpg" alt="Resolved Handpump" className="w-full h-full object-contain" />
                    <span className="absolute bottom-0 inset-x-0 bg-black/70 text-white text-[9px] font-bold p-0.5 text-center">Restored Handpump</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPhotoAfterUrl('/images/handpump_before.jpg')}
                    className={`relative rounded-xl overflow-hidden h-24 border-2 bg-[#1a2e22] flex items-center justify-center p-1 ${
                      photoAfterUrl.includes('handpump_before') ? 'border-primary ring-2 ring-[#b1f0cd]' : 'border-transparent'
                    }`}
                  >
                    <img src="/images/handpump_before.jpg" alt="Reported Damage" className="w-full h-full object-contain" />
                    <span className="absolute bottom-0 inset-x-0 bg-black/70 text-white text-[9px] font-bold p-0.5 text-center">Reported Damage</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block font-bold text-primary uppercase mb-1">Materials Deployed (Comma separated)</label>
                <input
                  type="text"
                  value={materialInput}
                  onChange={(e) => setMaterialInput(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-[#ddece3] font-semibold bg-white"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-primary uppercase mb-1">Engineer Log & Inspection Notes</label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-[#ddece3] font-medium bg-white"
                  required
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-[#ddece3] font-bold hover:bg-surface-container"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-primary text-white font-bold shadow-civic hover:bg-[#1f5d42] flex items-center gap-1.5"
                >
                  <FileCheck className="w-4 h-4 text-[#95d4b1]" />
                  <span>Submit Proof & Update</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
