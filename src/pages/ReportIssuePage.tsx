import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MapView } from '../components/common/MapView';
import { IssueCategory, IssuePriority } from '../types';
import { 
  Camera, 
  MapPin, 
  Mic, 
  MicOff, 
  Sparkles, 
  ArrowLeft, 
  ArrowRight, 
  Navigation,
  ShieldCheck
} from 'lucide-react';

export const ReportIssuePage: React.FC = () => {
  const { addIssue, setCurrentView, currentUser, showNotification, isOffline } = useApp();

  const [step, setStep] = useState<number>(1);

  // Form State
  const [category, setCategory] = useState<IssueCategory>('water');
  const [subCategory, setSubCategory] = useState<string>('Broken Handpump / Pipeline Breach');
  const [title, setTitle] = useState<string>('Main Village Drinking Water Line Damaged');
  const [description, setDescription] = useState<string>('Severe leakage from the main solar pump distribution pipe near West Street. Drinking water has stopped for 40+ households.');
  const [ward, setWard] = useState<string>('Ward 4 (West Street / Melur)');
  const [landmark, setLandmark] = useState<string>('Near Primary Health Sub-Center and Old Banyan Tree');
  const [coordinates, setCoordinates] = useState<[number, number]>([9.1726, 77.8681]);
  const [photoUrl, setPhotoUrl] = useState<string>('/images/handpump_before.jpg');
  const [voiceNote, setVoiceNote] = useState<string>('');
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [priority, setPriority] = useState<IssuePriority>('high');
  const [aiScore, setAiScore] = useState<number>(88);
  const [aiDepartment, setAiDepartment] = useState<string>('TWAD Board & Rural Development Mission');

  const categories: { id: IssueCategory; label: string; icon: string; defaultDept: string; subOptions: string[] }[] = [
    { 
      id: 'water', 
      label: 'Water Supply', 
      icon: 'water_drop', 
      defaultDept: 'TWAD Board (Tamil Nadu Water Supply & Drainage)',
      subOptions: ['Broken Handpump / Pipeline Breach', 'Water Contamination / Muddy Water', 'Overhead Tank Overflow / Motor Failure', 'Dry Borewell']
    },
    { 
      id: 'roads', 
      label: 'Roads & Bridges', 
      icon: 'traffic', 
      defaultDept: 'Highways & Rural Works Department (TN Rural Roads)',
      subOptions: ['Pothole & Monsoon Road Crater', 'Culvert / Bridge Crack', 'Mud Logging / Blocked Pathway', 'Broken Speed Breaker']
    },
    { 
      id: 'lighting', 
      label: 'Solar & Street Lighting', 
      icon: 'solar_power', 
      defaultDept: 'Tamil Nadu Energy Development Agency (TEDA)',
      subOptions: ['Solar Light Battery Dead', 'Broken LED Luminaire', 'Pole Damaged / Tilting', 'Dark Village Intersection']
    },
    { 
      id: 'waste', 
      label: 'Waste & Sanitation', 
      icon: 'delete', 
      defaultDept: 'Panchayat Clean Village & Sanitation Mission',
      subOptions: ['Canal / Drain Plastic Blockage', 'Community Garbage Dump Overflow', 'Public Sanitation Maintenance', 'Debris Clearance']
    },
    { 
      id: 'electricity', 
      label: 'Power & Transformer', 
      icon: 'bolt', 
      defaultDept: 'TANGEDCO (Electricity Distribution Corporation)',
      subOptions: ['Transformer Sparking / Overload', 'Hanging Low-Tension Electric Wire', 'Low Voltage / Phase Drop', 'Fallen Electricity Pole']
    },
    { 
      id: 'health', 
      label: 'Health & Anganwadi Infrastructure', 
      icon: 'medical_services', 
      defaultDept: 'National Health Mission - Tamil Nadu / Child Welfare',
      subOptions: ['Health Sub-Center Roof Leakage', 'Facility Water Shortage', 'Anganwadi Center Facility', 'Sanitation Hazard']
    }
  ];

  const handleCategorySelect = (cat: IssueCategory) => {
    setCategory(cat);
    const selected = categories.find((c) => c.id === cat);
    if (selected) {
      setSubCategory(selected.subOptions[0]);
      setAiDepartment(selected.defaultDept);
      if (cat === 'water' || cat === 'electricity') {
        setPriority('urgent');
        setAiScore(92);
      } else if (cat === 'roads') {
        setPriority('high');
        setAiScore(78);
      } else {
        setPriority('medium');
        setAiScore(65);
      }
    }
  };

  const handleAutoGPS = () => {
    const mockLat = 25.3176 + (Math.random() - 0.5) * 0.005;
    const mockLng = 82.9739 + (Math.random() - 0.5) * 0.005;
    setCoordinates([mockLat, mockLng]);
    showNotification('GPS Locked', `Accurate within 3.5 meters (${mockLat.toFixed(4)}, ${mockLng.toFixed(4)})`, 'success');
  };

  const handleRecordVoice = () => {
    if (!isRecording) {
      setIsRecording(true);
      setTimeout(() => {
        setIsRecording(false);
        setVoiceNote('The drinking water pipeline in Ward 4 has broken, please repair immediately.');
        showNotification('Voice Note Recorded', 'Audio transcribed & attached to ticket.', 'info');
      }, 2500);
    }
  };

  const samplePhotos = [
    { url: '/images/handpump_before.jpg', label: 'Reported Handpump Damage (Evidence)' },
    { url: '/images/handpump_after.jpg', label: 'Restored Handpump (After Repair)' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const created = addIssue({
      title,
      description,
      category,
      subCategory,
      priority,
      ward,
      landmark,
      coordinates,
      photoBefore: photoUrl,
      voiceTranscript: voiceNote,
      aiSeverityScore: aiScore,
      aiDepartment
    });

    setCurrentView('report_success', created.id);
  };

  return (
    <div className="min-h-screen bg-[#f7f5ef] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        
        {/* Top Stepper Bar */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-civic-float border border-[#ddece3] mb-6">
          
          <div className="flex items-center justify-between pb-4 border-b border-[#ddece3] mb-6">
            <button
              onClick={() => setCurrentView('citizen_dashboard')}
              className="text-xs font-bold text-on-surface-variant hover:text-primary flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Dashboard</span>
            </button>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-primary">Step {step} of 4</span>
              <span className="text-xs font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-[#b1f0cd] text-[#00452d]">
                {isOffline ? 'Offline Draft' : 'Live Report'}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between mb-8 relative">
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 bg-surface-container -z-0" />
            <div 
              className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-primary transition-all duration-300 -z-0"
              style={{ width: `${((step - 1) / 3) * 100}%` }}
            />

            {[1, 2, 3, 4].map((s) => (
              <button
                key={s}
                onClick={() => setStep(s)}
                className={`w-8 h-8 rounded-full font-bold text-xs flex items-center justify-center transition-all z-10 ${
                  step === s
                    ? 'bg-primary text-white ring-4 ring-[#b1f0cd]'
                    : step > s
                    ? 'bg-[#3c6938] text-white'
                    : 'bg-white text-outline border border-[#ddece3]'
                }`}
              >
                {step > s ? '✓' : s}
              </button>
            ))}
          </div>

          {/* Wizard Step 1: Category */}
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in">
              <div>
                <h2 className="text-xl font-extrabold text-primary">Step 1: Select Issue Category</h2>
                <p className="text-xs text-on-surface-variant mt-1">
                  Choose the domain of the rural problem to route directly to the designated department.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => handleCategorySelect(cat.id)}
                    className={`p-4 rounded-2xl text-left border-2 transition-all flex flex-col justify-between ${
                      category === cat.id
                        ? 'border-primary bg-[#e8f7ee] shadow-sm'
                        : 'border-[#ddece3] bg-white hover:bg-surface-container'
                    }`}
                  >
                    <span className="material-symbols-outlined text-2xl text-primary mb-2">
                      {cat.icon}
                    </span>
                    <div>
                      <div className="text-xs font-bold text-primary">{cat.label}</div>
                    </div>
                  </button>
                ))}
              </div>

              <div>
                <label className="block text-xs font-bold text-primary uppercase tracking-wider mb-2">
                  Specific Sub-Category Problem
                </label>
                <select
                  value={subCategory}
                  onChange={(e) => setSubCategory(e.target.value)}
                  className="w-full px-3.5 py-3 rounded-xl border border-[#ddece3] text-xs font-bold text-primary bg-white"
                >
                  {categories.find((c) => c.id === category)?.subOptions.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-6 py-3 rounded-xl bg-primary text-white font-bold text-xs shadow-civic hover:bg-[#1f5d42] flex items-center gap-2"
                >
                  <span>Next: Pin Location</span>
                  <ArrowRight className="w-4 h-4 text-[#95d4b1]" />
                </button>
              </div>
            </div>
          )}

          {/* Wizard Step 2: Location & GPS */}
          {step === 2 && (
            <div className="space-y-6 animate-in fade-in">
              <div>
                <h2 className="text-xl font-extrabold text-primary">Step 2: Pin Exact Village Location</h2>
                <p className="text-xs text-on-surface-variant mt-1">
                  Accurate GPS coordinates guide the Junior Engineer directly to the issue site.
                </p>
              </div>

              <div className="flex items-center justify-between bg-surface-container p-3 rounded-xl">
                <div className="flex items-center gap-2 text-xs">
                  <Navigation className="w-4 h-4 text-primary animate-spin" />
                  <span className="font-bold text-primary">
                    Coordinates: {coordinates[0].toFixed(4)}, {coordinates[1].toFixed(4)}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleAutoGPS}
                  className="px-3 py-1.5 rounded-lg bg-primary text-white text-xs font-bold shadow-sm hover:bg-[#1f5d42]"
                >
                  Auto-Detect My GPS
                </button>
              </div>

              <MapView
                issues={[]}
                interactivePinMode={true}
                pinCoordinates={coordinates}
                onPinChange={(coords) => setCoordinates(coords)}
                height="240px"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-primary uppercase tracking-wider mb-1">
                    Ward / Sector
                  </label>
                  <input
                    type="text"
                    value={ward}
                    onChange={(e) => setWard(e.target.value)}
                    placeholder="e.g. Ward 4, North Sector"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#ddece3] text-xs font-semibold bg-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-primary uppercase tracking-wider mb-1">
                    Nearby Landmark
                  </label>
                  <input
                    type="text"
                    value={landmark}
                    onChange={(e) => setLandmark(e.target.value)}
                    placeholder="e.g. Near Health Sub-Center, Banyan tree"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#ddece3] text-xs font-semibold bg-white"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2.5 rounded-xl border border-[#ddece3] text-xs font-bold hover:bg-surface-container"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-6 py-3 rounded-xl bg-primary text-white font-bold text-xs shadow-civic hover:bg-[#1f5d42] flex items-center gap-2"
                >
                  <span>Next: Add Evidence</span>
                  <ArrowRight className="w-4 h-4 text-[#95d4b1]" />
                </button>
              </div>
            </div>
          )}

          {/* Wizard Step 3: Evidence (Photo & Voice) */}
          {step === 3 && (
            <div className="space-y-6 animate-in fade-in">
              <div>
                <h2 className="text-xl font-extrabold text-primary">Step 3: Capture Photo & Voice Note</h2>
                <p className="text-xs text-on-surface-variant mt-1">
                  Clear visual evidence speeds up official work order approval by 3x.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-primary uppercase tracking-wider mb-2">
                  Select or Capture Evidence Photo:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-3">
                  {samplePhotos.map((p, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setPhotoUrl(p.url)}
                      className={`relative rounded-xl overflow-hidden h-24 border-2 transition-all ${
                        photoUrl === p.url ? 'border-primary ring-2 ring-[#b1f0cd]' : 'border-transparent opacity-75 hover:opacity-100'
                      }`}
                    >
                      <img src={p.url} alt={p.label} className="w-full h-full object-cover" />
                      <span className="absolute bottom-0 inset-x-0 bg-black/60 text-white text-[9px] font-bold p-1 truncate">
                        {p.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-surface-container-low border border-[#ddece3] rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#ffdf9e]/50 text-[#4d3800] flex items-center justify-center">
                    <Mic className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-primary block">Attach Voice Description (Voice Note)</span>
                    <span className="text-[11px] text-on-surface-variant">
                      {voiceNote ? `Transcribed: "${voiceNote}"` : 'Tap button to record voice description'}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleRecordVoice}
                  className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shrink-0 ${
                    isRecording 
                      ? 'bg-red-600 text-white animate-pulse' 
                      : 'bg-primary text-white shadow-sm'
                  }`}
                >
                  {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  {isRecording ? 'Recording...' : voiceNote ? 'Re-record Voice' : 'Record Audio'}
                </button>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-primary uppercase tracking-wider mb-1">
                    Grievance Title
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#ddece3] text-xs font-semibold bg-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-primary uppercase tracking-wider mb-1">
                    Detailed Notes
                  </label>
                  <textarea
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#ddece3] text-xs font-medium bg-white"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-4 py-2.5 rounded-xl border border-[#ddece3] text-xs font-bold hover:bg-surface-container"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(4)}
                  className="px-6 py-3 rounded-xl bg-primary text-white font-bold text-xs shadow-civic hover:bg-[#1f5d42] flex items-center gap-2"
                >
                  <span>Next: AI Triage & Review</span>
                  <ArrowRight className="w-4 h-4 text-[#95d4b1]" />
                </button>
              </div>
            </div>
          )}

          {/* Wizard Step 4: AI Triage & Submit */}
          {step === 4 && (
            <div className="space-y-6 animate-in fade-in">
              <div>
                <h2 className="text-xl font-extrabold text-primary flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#efc052]" />
                  Step 4: AI Triage & Confirmation
                </h2>
                <p className="text-xs text-on-surface-variant mt-1">
                  Automated routing and priority analysis by CiviFix AI Governance Engine.
                </p>
              </div>

              <div className="bg-gradient-to-br from-[#e8f7ee] to-white border-2 border-[#b1f0cd] rounded-2xl p-5 space-y-4 shadow-sm">
                <div className="flex items-center justify-between border-b border-[#b1f0cd] pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-emerald-500 animate-ping"></span>
                    <span className="text-xs font-extrabold uppercase text-primary tracking-wider">
                      Auto-Triaged Severity: {aiScore}/100
                    </span>
                  </div>
                  <span className="text-xs font-bold bg-[#ffdad6] text-[#ba1a1a] px-2.5 py-0.5 rounded-full uppercase">
                    Priority: {priority}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-white rounded-xl border border-[#ddece3]">
                    <span className="text-[10px] text-outline font-bold block uppercase">Assigned Authority</span>
                    <span className="font-bold text-primary">{aiDepartment}</span>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-[#ddece3]">
                    <span className="text-[10px] text-outline font-bold block uppercase">Estimated SLA Time</span>
                    <span className="font-bold text-emerald-800">48 Hours (2 Business Days)</span>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-[#ddece3]">
                    <span className="text-[10px] text-outline font-bold block uppercase">Citizen Points Reward</span>
                    <span className="font-bold text-[#00452d]">+50 Civic Points upon filing</span>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-[#ddece3]">
                    <span className="text-[10px] text-outline font-bold block uppercase">Gram Sabha Visibility</span>
                    <span className="font-bold text-primary">Public on Council Dashboard</span>
                  </div>
                </div>
              </div>

              <div className="bg-surface-container-low p-4 rounded-2xl border border-[#ddece3] space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Issue:</span>
                  <span className="font-bold text-primary">{title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Location:</span>
                  <span className="font-semibold text-primary">{ward}, {landmark}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Reporter:</span>
                  <span className="font-semibold text-primary">{currentUser.name} ({currentUser.phone})</span>
                </div>
              </div>

              <div className="flex justify-between items-center pt-2">
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-4 py-2.5 rounded-xl border border-[#ddece3] text-xs font-bold hover:bg-surface-container"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="px-8 py-3.5 rounded-xl bg-primary text-white font-extrabold text-sm shadow-civic-lg hover:bg-[#1f5d42] flex items-center gap-2"
                >
                  <ShieldCheck className="w-5 h-5 text-[#95d4b1]" />
                  <span>Submit Rural Grievance</span>
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
