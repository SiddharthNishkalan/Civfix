import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  UserPlus, 
  MapPin, 
  CheckCircle2
} from 'lucide-react';

export const RegisterPage: React.FC = () => {
  const { setCurrentView, switchRole, showNotification } = useApp();

  const [formData, setFormData] = useState({
    name: 'Kavitha Sundaram',
    phone: '9840123456',
    state: 'Tamil Nadu',
    district: 'Thoothukudi',
    block: 'Kovilpatti Block',
    panchayat: 'Kovilpatti Village Panchayat',
    ward: 'Ward 4 (West Street / Melur)',
    language: 'en',
    agreeTerms: true
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      showNotification('Missing Information', 'Please complete all required fields.', 'error');
      return;
    }
    showNotification('Registration Successful 🎉', `Welcome ${formData.name}! Your citizen profile is active.`, 'success');
    switchRole('citizen');
    setCurrentView('citizen_dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#eefdf4] via-[#f7f5ef] to-[#f7f5ef] py-10 px-4 sm:px-6 flex items-center justify-center">
      <div className="max-w-xl w-full bg-white rounded-3xl shadow-civic-float border border-[#ddece3] p-6 sm:p-8">
        
        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center mx-auto mb-2 shadow-civic">
            <UserPlus className="w-6 h-6 text-[#95d4b1]" />
          </div>
          <h1 className="text-2xl font-extrabold text-primary">Join CiviFix Rural Network</h1>
          <p className="text-xs text-on-surface-variant mt-1">
            Empower your Gram Panchayat with instant reporting & community tracking
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-primary uppercase tracking-wider mb-1">
                Full Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter full name"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#ddece3] text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-primary uppercase tracking-wider mb-1">
                Mobile Number *
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-xs font-bold text-on-surface-variant">+91</span>
                <input
                  type="tel"
                  maxLength={10}
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '') })}
                  placeholder="10-digit mobile"
                  className="w-full pl-11 pr-3.5 py-2.5 rounded-xl border border-[#ddece3] text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
            </div>
          </div>

          {/* Panchayat Hierarchy Selection */}
          <div className="p-4 bg-surface-container-low rounded-2xl border border-[#ddece3] space-y-3">
            <span className="text-xs font-extrabold text-primary flex items-center gap-1.5 uppercase tracking-wider">
              <MapPin className="w-4 h-4 text-[#3c6938]" />
              Village & Panchayat Location
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-on-surface-variant uppercase mb-1">
                  State
                </label>
                <select
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#ddece3] text-xs font-semibold bg-white"
                >
                  <option value="Tamil Nadu">Tamil Nadu</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="Kerala">Kerala</option>
                  <option value="Andhra Pradesh">Andhra Pradesh</option>
                  <option value="Telangana">Telangana</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-on-surface-variant uppercase mb-1">
                  District
                </label>
                <select
                  value={formData.district}
                  onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#ddece3] text-xs font-semibold bg-white"
                >
                  <option value="Thoothukudi">Thoothukudi</option>
                  <option value="Tirunelveli">Tirunelveli</option>
                  <option value="Madurai">Madurai</option>
                  <option value="Coimbatore">Coimbatore</option>
                  <option value="Salem">Salem</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-on-surface-variant uppercase mb-1">
                  Block / Taluk
                </label>
                <select
                  value={formData.block}
                  onChange={(e) => setFormData({ ...formData, block: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#ddece3] text-xs font-semibold bg-white"
                >
                  <option value="Kovilpatti Block">Kovilpatti Block</option>
                  <option value="Kayathar Block">Kayathar Block</option>
                  <option value="Vilathikulam Block">Vilathikulam Block</option>
                  <option value="Ottapidaram Block">Ottapidaram Block</option>
                  <option value="Sattur Block">Sattur Block</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-on-surface-variant uppercase mb-1">
                  Village Panchayat
                </label>
                <select
                  value={formData.panchayat}
                  onChange={(e) => setFormData({ ...formData, panchayat: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#ddece3] text-xs font-semibold bg-white"
                >
                  <option value="Kovilpatti Village Panchayat">Kovilpatti Village Panchayat</option>
                  <option value="Inam Maniyachi Panchayat">Inam Maniyachi Panchayat</option>
                  <option value="Ilambuvanam Panchayat">Ilambuvanam Panchayat</option>
                  <option value="Kadalaiyur Gram Panchayat">Kadalaiyur Gram Panchayat</option>
                  <option value="Pandavarmangalam Panchayat">Pandavarmangalam Panchayat</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-on-surface-variant uppercase mb-1">
                Ward / Street / Landmark
              </label>
              <input
                type="text"
                value={formData.ward}
                onChange={(e) => setFormData({ ...formData, ward: e.target.value })}
                placeholder="e.g. Ward 4, West Street near Anganwadi Centre"
                className="w-full px-3 py-2 rounded-xl border border-[#ddece3] text-xs font-semibold bg-white"
                required
              />
            </div>
          </div>

          <div className="flex items-start gap-2 pt-1">
            <input
              type="checkbox"
              id="terms"
              checked={formData.agreeTerms}
              onChange={(e) => setFormData({ ...formData, agreeTerms: e.target.checked })}
              className="mt-1 rounded text-primary focus:ring-primary"
              required
            />
            <label htmlFor="terms" className="text-xs text-on-surface-variant leading-tight">
              I agree to receive SMS updates on reported grievances and adhere to Gram Sabha community guidelines.
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-primary text-white font-bold text-sm shadow-civic hover:bg-[#1f5d42] transition-colors flex items-center justify-center gap-2 mt-4"
          >
            <CheckCircle2 className="w-4 h-4 text-[#95d4b1]" />
            <span>Complete Registration & Join</span>
          </button>
        </form>

        <div className="mt-5 text-center text-xs text-on-surface-variant">
          Already registered?{' '}
          <button
            type="button"
            onClick={() => setCurrentView('login')}
            className="text-primary font-bold hover:underline"
          >
            Login with OTP
          </button>
        </div>

      </div>
    </div>
  );
};
