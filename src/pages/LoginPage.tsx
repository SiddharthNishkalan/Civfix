import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { UserRole } from '../types';
import { 
  Phone, 
  Lock, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles, 
  User as UserIcon,
  Compass,
  CheckCircle2,
  KeyRound,
  Shield,
  Fingerprint
} from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { switchRole, setCurrentView, showNotification } = useApp();

  const [authMethod, setAuthMethod] = useState<'otp' | 'password'>('otp');
  const [phoneNumber, setPhoneNumber] = useState('9876543210');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [selectedRole, setSelectedRole] = useState<UserRole>('citizen');

  const demoPersonas: { role: UserRole; name: string; title: string; avatar: string; desc: string }[] = [
    { 
      role: 'citizen', 
      name: 'Selvi Murugan', 
      title: 'Citizen', 
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
      desc: 'Ward 4 (West Street)'
    },
    { 
      role: 'officer', 
      name: 'Er. Senthil Kumar', 
      title: 'Assistant Engineer', 
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      desc: 'TWAD & Rural Works'
    },
    { 
      role: 'admin', 
      name: 'District Collector', 
      title: 'District Admin', 
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
      desc: 'Thoothukudi Command HQ'
    },
    { 
      role: 'sarpanch', 
      name: 'Thiru Arumugam', 
      title: 'Council President', 
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
      desc: 'Panchayat Thalaivar'
    },
  ];

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber || phoneNumber.length < 10) {
      showNotification('Invalid Number', 'Please enter a valid 10-digit mobile number.', 'error');
      return;
    }
    setOtpSent(true);
    setOtp('5842');
    showNotification('OTP Sent', 'Demo verification code: 5842 sent to +91 ' + phoneNumber, 'info');
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (authMethod === 'otp' && otp.length !== 4) {
      showNotification('Enter Code', 'Please enter the 4-digit code (e.g. 5842).', 'error');
      return;
    }
    
    switchRole(selectedRole);
    if (selectedRole === 'officer') {
      setCurrentView('officer_dashboard');
    } else if (selectedRole === 'admin') {
      setCurrentView('admin_analytics');
    } else {
      setCurrentView('citizen_dashboard');
    }
  };

  const handleInstantPersonaLogin = (role: UserRole) => {
    setSelectedRole(role);
    switchRole(role);
    if (role === 'officer') {
      setCurrentView('officer_dashboard');
    } else if (role === 'admin') {
      setCurrentView('admin_analytics');
    } else {
      setCurrentView('citizen_dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#eefdf4] via-[#f7f5ef] to-[#f7f5ef] flex items-center justify-center p-4 sm:p-6 md:p-10 font-sans">
      <main className="w-full max-w-lg mx-auto space-y-6">
        
        {/* Brand Header matching citizen_login_civifix */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#1f5d42] text-white mb-2 shadow-civic hover:scale-105 transition-transform">
            <span className="material-symbols-outlined text-3xl text-[#95d4b1]">domain</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-primary tracking-tight">
            Welcome to CiviFix
          </h1>
          <p className="text-sm text-on-surface-variant max-w-sm mx-auto">
            Rural Civic Infrastructure & Village Action Portal
          </p>
        </div>

        {/* 1-Click Fast Role Sign-In Tray */}
        <div className="bg-white rounded-2xl p-4 border border-[#ddece3] shadow-civic space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-extrabold text-primary uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#efc052]" />
              Quick 1-Click Persona Sign-In:
            </span>
            <span className="text-[10px] text-outline font-semibold">Demo Sandbox</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {demoPersonas.map((p) => (
              <button
                key={p.role}
                type="button"
                onClick={() => handleInstantPersonaLogin(p.role)}
                className={`p-2.5 rounded-xl text-center border-2 transition-all flex flex-col items-center justify-between hover:scale-[1.02] ${
                  selectedRole === p.role 
                    ? 'border-primary bg-[#e8f7ee] shadow-sm' 
                    : 'border-[#ddece3] bg-surface-container-low hover:bg-surface-container'
                }`}
              >
                <img
                  src={p.avatar}
                  alt={p.name}
                  className="w-9 h-9 rounded-full object-cover border border-[#95d4b1] mb-1.5"
                />
                <div className="w-full">
                  <div className="text-xs font-bold text-primary truncate">{p.name.split(' ')[0]}</div>
                  <div className="text-[10px] text-on-surface-variant font-semibold truncate">{p.title}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-3xl border border-[#ddece3] p-6 sm:p-8 shadow-civic-float relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-primary" />

          {/* Auth Tab Switcher */}
          <div className="flex rounded-xl bg-surface-container p-1 mb-6">
            <button
              type="button"
              onClick={() => { setAuthMethod('otp'); setOtpSent(false); }}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                authMethod === 'otp' ? 'bg-white text-primary shadow-sm' : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              Mobile OTP Code
            </button>
            <button
              type="button"
              onClick={() => setAuthMethod('password')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                authMethod === 'password' ? 'bg-white text-primary shadow-sm' : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              Password Login
            </button>
          </div>

          {/* OTP Mode Form */}
          {authMethod === 'otp' && (
            <form onSubmit={otpSent ? handleLoginSubmit : handleSendOtp} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-primary uppercase tracking-wider mb-1.5">
                  Mobile Number
                </label>
                <div className="relative flex border border-[#ddece3] rounded-xl focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 overflow-hidden bg-white">
                  <div className="flex items-center px-3.5 bg-surface-container-low border-r border-[#ddece3] text-on-surface-variant text-xs font-bold select-none">
                    +91
                  </div>
                  <input
                    type="tel"
                    maxLength={10}
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                    placeholder="Enter your 10-digit number"
                    className="flex-1 w-full border-none focus:ring-0 px-3.5 py-3 text-xs font-semibold text-on-surface placeholder-on-surface-variant/40"
                    required
                  />
                  <Phone className="absolute right-3.5 top-3.5 w-4 h-4 text-outline pointer-events-none" />
                </div>
              </div>

              {otpSent && (
                <div className="animate-in fade-in space-y-1.5">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold text-primary uppercase tracking-wider">
                      Enter 4-Digit Verification Code
                    </label>
                    <button
                      type="button"
                      onClick={() => setOtpSent(false)}
                      className="text-xs text-secondary font-bold hover:underline"
                    >
                      Edit Number
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      maxLength={4}
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="• • • •"
                      className="w-full px-4 py-3 text-center tracking-[0.5em] text-lg font-extrabold rounded-xl border border-[#ddece3] focus:outline-none focus:ring-2 focus:ring-primary bg-surface-container-low"
                      required
                    />
                    <KeyRound className="absolute right-3.5 top-3.5 w-4 h-4 text-outline pointer-events-none" />
                  </div>
                  <p className="text-[11px] text-center text-on-surface-variant">
                    Code sent to +91 {phoneNumber} (Demo Code: <b className="text-primary">5842</b>)
                  </p>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-primary hover:bg-[#1f5d42] text-white text-xs font-extrabold py-3.5 px-6 rounded-xl transition-all shadow-civic active:scale-[0.99] flex items-center justify-center gap-2"
              >
                <span>{otpSent ? 'Verify Code & Sign In' : 'Request Login OTP Code'}</span>
                <ArrowRight className="w-4 h-4 text-[#95d4b1]" />
              </button>
            </form>
          )}

          {/* Password Mode Form */}
          {authMethod === 'password' && (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-primary uppercase tracking-wider mb-1.5">
                  Mobile Number
                </label>
                <div className="relative flex border border-[#ddece3] rounded-xl focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 overflow-hidden bg-white">
                  <div className="flex items-center px-3.5 bg-surface-container-low border-r border-[#ddece3] text-on-surface-variant text-xs font-bold select-none">
                    +91
                  </div>
                  <input
                    type="tel"
                    maxLength={10}
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                    placeholder="Enter 10-digit number"
                    className="flex-1 w-full border-none focus:ring-0 px-3.5 py-3 text-xs font-semibold text-on-surface"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-primary uppercase tracking-wider mb-1.5">
                  Password
                </label>
                <div className="relative border border-[#ddece3] rounded-xl focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 bg-white">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter account password"
                    className="w-full border-none focus:ring-0 px-3.5 py-3 text-xs font-semibold pr-10 rounded-xl"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3.5 text-outline hover:text-primary"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded text-primary focus:ring-primary"
                  />
                  <span className="text-on-surface-variant font-medium">Remember me</span>
                </label>
                <button type="button" className="text-primary font-bold hover:underline">
                  Forgot Password?
                </button>
              </div>

              <button
                type="submit"
                className="w-full bg-primary hover:bg-[#1f5d42] text-white text-xs font-extrabold py-3.5 px-6 rounded-xl transition-all shadow-civic active:scale-[0.99] flex items-center justify-center gap-2"
              >
                <span>Sign In to Dashboard</span>
                <ArrowRight className="w-4 h-4 text-[#95d4b1]" />
              </button>
            </form>
          )}

          {/* Divider */}
          <div className="relative flex items-center py-4">
            <div className="flex-grow border-t border-[#ddece3]"></div>
            <span className="flex-shrink-0 mx-3 text-on-surface-variant text-[11px] font-bold uppercase tracking-wider">
              Or Explore Freely
            </span>
            <div className="flex-grow border-t border-[#ddece3]"></div>
          </div>

          {/* Guest & Register Actions */}
          <div className="space-y-2.5">
            <button
              type="button"
              onClick={() => setCurrentView('welcome')}
              className="w-full bg-transparent border-2 border-[#3c6938] text-[#00452d] hover:bg-surface-container text-xs font-extrabold py-3 px-6 rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <Compass className="w-4 h-4 text-[#3c6938]" />
              <span>Explore Public Portal (Guest Citizen)</span>
            </button>

            <button
              type="button"
              onClick={() => setCurrentView('register')}
              className="w-full bg-surface-container text-primary hover:bg-[#ddece3] text-xs font-extrabold py-3 px-6 rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <UserIcon className="w-4 h-4" />
              <span>Create New Citizen Account</span>
            </button>
          </div>

        </div>

        {/* Security and Trust Footer */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-1.5 text-on-surface-variant text-xs font-medium">
            <ShieldCheck className="w-4 h-4 text-[#3c6938]" />
            <span>Government of India • Gram Panchayat Open Infrastructure Standard</span>
          </div>
          <p className="text-[11px] text-outline">
            256-bit encrypted • SMS alerts enabled • High accessibility compliance
          </p>
        </div>

      </main>
    </div>
  );
};
