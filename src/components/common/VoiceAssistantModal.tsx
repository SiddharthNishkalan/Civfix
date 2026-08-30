import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Mic, MicOff, Sparkles, X, Check } from 'lucide-react';

interface VoiceAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VoiceAssistantModal: React.FC<VoiceAssistantModalProps> = ({ isOpen, onClose }) => {
  const { addIssue, setCurrentView } = useApp();
  const [isListening, setIsListening] = useState<boolean>(false);
  const [transcript, setTranscript] = useState<string>('');
  const [extractedData, setExtractedData] = useState<{
    category: string;
    location: string;
    severity: string;
    actionSummary: string;
  } | null>(null);

  const sampleVoicePrompts = [
    'The drinking water pipeline on West Street in Ward 4 is broken, please repair immediately.',
    'There is a huge dangerous pothole on the Bazaar school link road in Ward 2.',
    'Solid waste and plastic debris has blocked the irrigation canal bank in Ward 5.',
    'Solar street light has been dark for 4 nights outside the Primary Health Sub-Centre in Ward 1.'
  ];

  useEffect(() => {
    if (isOpen) {
      setTranscript('');
      setExtractedData(null);
      startSimulation();
    }
  }, [isOpen]);

  const startSimulation = () => {
    setIsListening(true);
    const selected = sampleVoicePrompts[Math.floor(Math.random() * sampleVoicePrompts.length)];
    let index = 0;
    const words = selected.split(' ');
    
    const interval = setInterval(() => {
      if (index < words.length) {
        setTranscript((prev) => (prev ? prev + ' ' + words[index] : words[index]));
        index++;
      } else {
        clearInterval(interval);
        setIsListening(false);
        parseTranscript(selected);
      }
    }, 300);
  };

  const parseTranscript = (text: string) => {
    let cat = 'water';
    let loc = 'Ward 4 (West Street / Melur)';
    let sev = 'Urgent (Severity 92/100)';
    let summary = 'Water pipeline breach requiring technician replacement';

    if (text.toLowerCase().includes('road') || text.toLowerCase().includes('pothole')) {
      cat = 'roads';
      loc = 'Bazaar Link Road, Ward 2';
      sev = 'High (Severity 78/100)';
      summary = 'Road crater impeding school traffic';
    } else if (text.toLowerCase().includes('solar') || text.toLowerCase().includes('light')) {
      cat = 'lighting';
      loc = 'School Street Anganwadi Centre, Ward 1';
      sev = 'Medium (Severity 64/100)';
      summary = 'Street light luminaire or solar battery failure';
    } else if (text.toLowerCase().includes('waste') || text.toLowerCase().includes('canal')) {
      cat = 'waste';
      loc = 'Canal Bank, Ward 5';
      sev = 'Medium (Severity 70/100)';
      summary = 'Solid waste and plastic blockage removal required';
    }

    setExtractedData({
      category: cat,
      location: loc,
      severity: sev,
      actionSummary: summary
    });
  };

  const handleQuickSubmit = () => {
    if (!extractedData) return;
    const created = addIssue({
      title: `Voice Report: ${extractedData.actionSummary}`,
      description: transcript,
      category: extractedData.category as any,
      subCategory: 'Voice AI Auto-triaged Issue',
      priority: 'high',
      ward: extractedData.location,
      voiceTranscript: transcript,
      aiSeverityScore: 88,
      aiDepartment: 'Designated Taskforce'
    });
    onClose();
    setCurrentView('report_success', created.id);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        onClick={onClose} 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
      />

      <div className="relative bg-white rounded-3xl shadow-civic-float border border-[#ddece3] max-w-lg w-full p-6 sm:p-8 z-50 overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-outline hover:bg-surface-container"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-[#1f5d42] text-white flex items-center justify-center shadow-civic">
            <Mic className="w-6 h-6 text-[#95d4b1]" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-primary flex items-center gap-2">
              CiviFix Voice Assistant
              <Sparkles className="w-4 h-4 text-[#efc052]" />
            </h3>
            <p className="text-xs text-on-surface-variant">
              Accessible voice-activated grievance reporting
            </p>
          </div>
        </div>

        <div className="bg-surface-container-low border border-[#ddece3] rounded-2xl p-6 text-center my-4">
          <div className="flex items-center justify-center gap-1.5 h-14 mb-4">
            {[40, 75, 95, 60, 85, 100, 70, 90, 50, 80, 65, 30].map((h, i) => (
              <span
                key={i}
                className={`w-1.5 rounded-full transition-all duration-300 ${
                  isListening ? 'bg-primary animate-pulse' : 'bg-[#95d4b1]'
                }`}
                style={{
                  height: isListening ? `${Math.max(15, Number((h * 0.8).toFixed(0)))}px` : '12px'
                }}
              />
            ))}
          </div>

          <div className="min-h-[60px] flex items-center justify-center">
            {transcript ? (
              <p className="text-sm font-semibold text-primary italic">
                "{transcript}"
              </p>
            ) : (
              <p className="text-xs text-on-surface-variant animate-pulse">
                Listening to your voice... Speak clearly into the microphone.
              </p>
            )}
          </div>

          <div className="mt-4 flex items-center justify-center gap-3">
            <button
              onClick={startSimulation}
              className={`px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2 transition-transform active:scale-95 ${
                isListening 
                  ? 'bg-red-600 text-white animate-bounce' 
                  : 'bg-primary text-white shadow-civic'
              }`}
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              {isListening ? 'Recording Live...' : 'Tap to Speak Again'}
            </button>
          </div>
        </div>

        {extractedData && (
          <div className="bg-white border-2 border-[#b1f0cd] rounded-2xl p-4 mb-6 shadow-civic-sm animate-in fade-in zoom-in-95">
            <div className="flex items-center gap-1.5 text-xs font-extrabold text-primary uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4 text-[#efc052]" />
              AI Voice Auto-Triage Result:
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2 bg-surface-container rounded-lg">
                <span className="text-[10px] text-outline block font-bold">Category</span>
                <span className="font-bold text-primary capitalize">{extractedData.category}</span>
              </div>
              <div className="p-2 bg-surface-container rounded-lg">
                <span className="text-[10px] text-outline block font-bold">Detected Location</span>
                <span className="font-bold text-primary truncate block">{extractedData.location}</span>
              </div>
              <div className="col-span-2 p-2 bg-[#e8f7ee] rounded-lg border border-[#b1f0cd]">
                <span className="text-[10px] text-[#00452d] block font-bold">Severity Score & Action</span>
                <span className="font-extrabold text-primary">{extractedData.severity} - {extractedData.actionSummary}</span>
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 px-4 rounded-xl border border-[#ddece3] text-on-surface-variant font-bold text-xs hover:bg-surface-container"
          >
            Cancel
          </button>
          <button
            onClick={handleQuickSubmit}
            disabled={!extractedData}
            className="flex-1 py-3 px-4 rounded-xl bg-primary text-white font-bold text-xs shadow-civic hover:bg-[#1f5d42] disabled:opacity-50 flex items-center justify-center gap-1.5"
          >
            <Check className="w-4 h-4 text-[#95d4b1]" />
            Quick Submit Ticket
          </button>
        </div>
      </div>
    </div>
  );
};
