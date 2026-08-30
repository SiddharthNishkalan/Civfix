import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MapView } from '../components/common/MapView';
import { IssueStatus } from '../types';
import { 
  PlusCircle, 
  Mic, 
  Award, 
  Clock, 
  ThumbsUp, 
  MapPin, 
  CheckCircle2, 
  ChevronRight, 
  Search,
  Droplets,
  Zap,
  Hammer,
  Eye
} from 'lucide-react';

interface CitizenDashboardProps {
  onOpenVoice: () => void;
}

export const CitizenDashboard: React.FC<CitizenDashboardProps> = ({ onOpenVoice }) => {
  const { 
    currentUser, 
    issues, 
    setCurrentView, 
    upvoteIssue, 
    t 
  } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const myIssues = issues.filter((i) => i.reportedBy === currentUser.name || i.reportedByPhone === currentUser.phone);
  
  const filteredNearbyIssues = issues.filter((i) => {
    const matchesCat = selectedCategory === 'all' || i.category === selectedCategory;
    const matchesSearch = 
      i.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      i.ward.toLowerCase().includes(searchQuery.toLowerCase()) ||
      i.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const categoryFilters: { id: string; label: string; icon: string }[] = [
    { id: 'all', label: 'All Issues', icon: 'apps' },
    { id: 'water', label: 'Water Supply', icon: 'water_drop' },
    { id: 'roads', label: 'Roads & Bridges', icon: 'traffic' },
    { id: 'lighting', label: 'Solar & Lighting', icon: 'solar_power' },
    { id: 'waste', label: 'Waste Management', icon: 'delete' },
    { id: 'electricity', label: 'Power & Grid', icon: 'bolt' },
  ];

  const statusBadge = (status: IssueStatus) => {
    switch (status) {
      case 'reported':
        return <span className="bg-blue-100 text-blue-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full">Reported</span>;
      case 'verified':
        return <span className="bg-purple-100 text-purple-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full">Verified</span>;
      case 'assigned':
        return <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full">Assigned</span>;
      case 'in_progress':
        return <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full animate-pulse">In Progress</span>;
      case 'resolved':
        return <span className="bg-teal-100 text-teal-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full">Resolved ✓</span>;
      default:
        return <span className="bg-gray-100 text-gray-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full">Closed</span>;
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f5ef] pb-20">
      
      {/* Top Banner / Greeting Header */}
      <section className="bg-gradient-to-r from-[#00452d] via-[#1f5d42] to-[#00452d] text-white pt-6 pb-12 px-4 sm:px-6 lg:px-8 border-b border-[#0f5137] shadow-civic">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="bg-[#b1f0cd] text-[#002113] text-xs font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  {currentUser.ward}
                </span>
                <span className="text-xs text-[#95d4b1] font-medium">
                  {currentUser.panchayat}, {currentUser.block}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Welcome, {currentUser.name}!
              </h1>
              <p className="text-xs sm:text-sm text-[#e5f4eb] mt-1 max-w-xl">
                Track your active rural grievances, vote on village priorities, and earn civic rewards for community action.
              </p>
            </div>

            {/* Points & Level Card */}
            <div 
              onClick={() => setCurrentView('rewards')}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 flex items-center gap-4 cursor-pointer hover:bg-white/15 transition-all shadow-sm shrink-0"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#6a4e00] to-[#efc052] flex items-center justify-center text-white shadow-md">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-xs text-[#efc052] font-extrabold uppercase tracking-wider">
                  {currentUser.level}
                </div>
                <div className="text-2xl font-extrabold text-white">
                  {currentUser.civicPoints} <span className="text-xs font-semibold text-gray-200">Points</span>
                </div>
                <div className="text-[10px] text-[#95d4b1] flex items-center gap-1 font-medium mt-0.5">
                  <span>Redeem gift vouchers</span>
                  <ChevronRight className="w-3 h-3" />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        
        {/* Quick Action Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 mb-8">
          <button
            onClick={() => setCurrentView('report_issue')}
            className="bg-white p-4 rounded-2xl border border-[#ddece3] shadow-civic hover:shadow-civic-lg hover:border-primary transition-all text-left flex flex-col justify-between group"
          >
            <div className="w-10 h-10 rounded-xl bg-[#e8f7ee] text-primary flex items-center justify-center group-hover:scale-110 transition-transform mb-3">
              <PlusCircle className="w-5 h-5 text-primary" />
            </div>
            <div>
              <span className="text-xs font-bold text-primary block">{t('reportIssue')}</span>
              <span className="text-[10px] text-on-surface-variant">Camera + GPS location</span>
            </div>
          </button>

          <button
            onClick={onOpenVoice}
            className="bg-white p-4 rounded-2xl border border-[#ddece3] shadow-civic hover:shadow-civic-lg hover:border-[#6a4e00] transition-all text-left flex flex-col justify-between group"
          >
            <div className="w-10 h-10 rounded-xl bg-[#ffdf9e]/40 text-[#4d3800] flex items-center justify-center group-hover:scale-110 transition-transform mb-3">
              <Mic className="w-5 h-5 text-[#6a4e00]" />
            </div>
            <div>
              <span className="text-xs font-bold text-primary block">Voice AI Assistant</span>
              <span className="text-[10px] text-on-surface-variant">Speak in your language</span>
            </div>
          </button>

          <button
            onClick={() => setCurrentView('track_issue')}
            className="bg-white p-4 rounded-2xl border border-[#ddece3] shadow-civic hover:shadow-civic-lg hover:border-primary transition-all text-left flex flex-col justify-between group"
          >
            <div className="w-10 h-10 rounded-xl bg-[#ddece3] text-[#1f5d42] flex items-center justify-center group-hover:scale-110 transition-transform mb-3">
              <Clock className="w-5 h-5 text-[#1f5d42]" />
            </div>
            <div>
              <span className="text-xs font-bold text-primary block">{t('trackIssue')}</span>
              <span className="text-[10px] text-on-surface-variant">Live progress & before/after</span>
            </div>
          </button>

          <button
            onClick={() => setCurrentView('rewards')}
            className="bg-white p-4 rounded-2xl border border-[#ddece3] shadow-civic hover:shadow-civic-lg hover:border-amber-500 transition-all text-left flex flex-col justify-between group"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center group-hover:scale-110 transition-transform mb-3">
              <Award className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <span className="text-xs font-bold text-primary block">Rewards & Badges</span>
              <span className="text-[10px] text-on-surface-variant">{currentUser.badges.length} Badges Earned</span>
            </div>
          </button>
        </div>

        {/* 2-Column Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
          
          {/* Left: My Reported Grievances (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-primary">My Active Grievances ({myIssues.length})</h2>
                <p className="text-xs text-on-surface-variant">Your filed complaints and real-time field progress</p>
              </div>
              <button
                onClick={() => setCurrentView('report_issue')}
                className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
              >
                <span>+ New Grievance</span>
              </button>
            </div>

            {myIssues.length === 0 ? (
              <div className="bg-white rounded-2xl p-8 border border-[#ddece3] text-center">
                <div className="w-12 h-12 rounded-2xl bg-surface-container text-primary flex items-center justify-center mx-auto mb-3">
                  <CheckCircle2 className="w-6 h-6 text-[#3c6938]" />
                </div>
                <h4 className="text-sm font-bold text-primary">No active complaints</h4>
                <p className="text-xs text-on-surface-variant mt-1 mb-4">
                  Notice an issue with drinking water, road damage, or broken lights? Report it now.
                </p>
                <button
                  onClick={() => setCurrentView('report_issue')}
                  className="px-4 py-2 bg-primary text-white text-xs font-bold rounded-xl shadow-sm hover:bg-[#1f5d42]"
                >
                  Report First Issue
                </button>
              </div>
            ) : (
              <div className="space-y-3.5">
                {myIssues.map((issue) => (
                  <div
                    key={issue.id}
                    className="bg-white rounded-2xl p-5 border border-[#ddece3] shadow-civic hover:shadow-civic-lg transition-all"
                  >
                    <div className="flex items-start justify-between gap-3 mb-2.5">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-extrabold uppercase tracking-wider text-outline bg-surface-container px-2 py-0.5 rounded-md">
                          {issue.id}
                        </span>
                        {statusBadge(issue.status)}
                      </div>
                      <span className="text-[11px] text-on-surface-variant font-medium">
                        {issue.reportedAt}
                      </span>
                    </div>

                    <h3 className="text-sm sm:text-base font-bold text-primary mb-1">
                      {issue.title}
                    </h3>
                    <p className="text-xs text-on-surface-variant line-clamp-2 mb-3">
                      {issue.description}
                    </p>

                    <div className="bg-surface-container p-3 rounded-xl mb-3 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-[#3c6938] shrink-0" />
                        <span className="text-on-surface font-semibold truncate max-w-[200px]">
                          {issue.ward}, {issue.landmark}
                        </span>
                      </div>
                      <span className="text-[11px] font-bold text-[#00452d]">
                        AI Severity: {issue.aiSeverityScore}/100
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-[#ddece3]">
                      <div className="text-xs text-on-surface-variant">
                        Officer: <b className="text-primary">{issue.assignedOfficer?.name || 'Assigned to Field Team'}</b>
                      </div>
                      <button
                        onClick={() => setCurrentView('track_issue', issue.id)}
                        className="px-3.5 py-1.5 rounded-lg bg-primary text-white text-xs font-bold hover:bg-[#1f5d42] transition-colors flex items-center gap-1"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Track Status</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right: Village GIS Overview & Progress Indicators (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* GIS Map Card */}
            <div className="bg-white rounded-2xl p-5 border border-[#ddece3] shadow-civic space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-primary flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-[#3c6938]" />
                    Panchayat Issue Heatmap
                  </h3>
                  <p className="text-[11px] text-on-surface-variant">Live civic pins across Kovilpatti Block</p>
                </div>
                <span className="text-xs font-bold text-[#3c6938] bg-[#bcf0b2] px-2 py-0.5 rounded-full">
                  {issues.length} Active
                </span>
              </div>

              <MapView
                issues={issues}
                height="220px"
                onSelectIssue={(id) => setCurrentView('track_issue', id)}
              />
            </div>

            {/* Village Infrastructure Health Meters */}
            <div className="bg-white rounded-2xl p-5 border border-[#ddece3] shadow-civic space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-primary">Gram Panchayat Progress</h3>
                <span className="text-[10px] font-bold text-emerald-800 bg-[#bcf0b2] px-2 py-0.5 rounded-full">
                  Rank #1 in Block
                </span>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <div className="flex justify-between font-semibold mb-1">
                    <span className="flex items-center gap-1 text-primary">
                      <Droplets className="w-3.5 h-3.5 text-blue-600" />
                      Drinking Water Pipeline Coverage
                    </span>
                    <span className="font-bold text-primary">94%</span>
                  </div>
                  <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
                    <div className="bg-blue-600 h-full rounded-full w-[94%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-semibold mb-1">
                    <span className="flex items-center gap-1 text-primary">
                      <Zap className="w-3.5 h-3.5 text-amber-600" />
                      Solar High-Mast Street Lighting
                    </span>
                    <span className="font-bold text-primary">88%</span>
                  </div>
                  <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
                    <div className="bg-amber-500 h-full rounded-full w-[88%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-semibold mb-1">
                    <span className="flex items-center gap-1 text-primary">
                      <Hammer className="w-3.5 h-3.5 text-emerald-700" />
                      Paved Asphalt Village Roads
                    </span>
                    <span className="font-bold text-primary">79%</span>
                  </div>
                  <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
                    <div className="bg-[#00452d] h-full rounded-full w-[79%]" />
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Nearby Community Issues & Endorsement Feed */}
        <section className="mt-8 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-primary">Community Issues & Council Forum</h2>
              <p className="text-xs text-on-surface-variant">
                Endorse or upvote neighbor grievances to escalate priority to the District Collector
              </p>
            </div>

            {/* Search Input */}
            <div className="relative max-w-xs w-full">
              <Search className="w-4 h-4 text-outline absolute left-3 top-2.5 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by keyword, ward, ticket..."
                className="w-full pl-9 pr-4 py-2 rounded-xl border border-[#ddece3] text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-primary bg-white"
              />
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categoryFilters.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold shrink-0 transition-all flex items-center gap-1.5 ${
                  selectedCategory === cat.id
                    ? 'bg-primary text-white shadow-civic-sm'
                    : 'bg-white text-on-surface border border-[#ddece3] hover:bg-surface-container'
                }`}
              >
                <span className="material-symbols-outlined text-sm">{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>

          {/* Issue Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredNearbyIssues.map((issue) => (
              <div
                key={issue.id}
                className="bg-white rounded-2xl overflow-hidden border border-[#ddece3] shadow-civic hover:shadow-civic-lg transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-44 w-full bg-[#1a2e22] overflow-hidden flex items-center justify-center p-2">
                    <img
                      src={issue.photoBefore}
                      alt={issue.title}
                      className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3 flex gap-1.5">
                      {statusBadge(issue.status)}
                      <span className="bg-black/60 backdrop-blur text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                        {issue.ward}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 space-y-2">
                    <div className="flex items-center justify-between text-[11px] text-outline font-bold uppercase">
                      <span>{issue.id}</span>
                      <span className="text-[#3c6938]">{issue.category.toUpperCase()}</span>
                    </div>

                    <h3 className="text-sm font-bold text-primary line-clamp-1">
                      {issue.title}
                    </h3>
                    <p className="text-xs text-on-surface-variant line-clamp-2 leading-relaxed">
                      {issue.description}
                    </p>
                  </div>
                </div>

                <div className="p-4 pt-0 flex items-center justify-between border-t border-[#ddece3] mt-2">
                  <button
                    onClick={() => upvoteIssue(issue.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                      issue.upvotedBy.includes(currentUser.id)
                        ? 'bg-[#b1f0cd] text-[#002113]'
                        : 'bg-surface-container text-on-surface hover:bg-[#ddece3]'
                    }`}
                  >
                    <ThumbsUp className="w-3.5 h-3.5 text-[#3c6938]" />
                    <span>{issue.upvotes} Endorse</span>
                  </button>

                  <button
                    onClick={() => setCurrentView('track_issue', issue.id)}
                    className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
                  >
                    <span>Inspect</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            ))}
          </div>

        </section>

      </div>
    </div>
  );
};
