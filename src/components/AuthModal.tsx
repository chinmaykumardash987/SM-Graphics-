import React, { useState } from 'react';
import {
  X,
  Lock,
  Mail,
  User,
  Phone,
  LogIn,
  UserPlus,
  AlertCircle,
  CheckCircle2,
  Sparkles,
  HelpCircle,
  PhoneCall,
  ShieldCheck,
  Globe
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import smLogoImg from '../assets/images/sm_graphics_logo_1790931105985.jpg';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  initialMode?: 'signin' | 'signup';
  subtitle?: string;
}

export function AuthModal({
  isOpen,
  onClose,
  onSuccess,
  initialMode = 'signin',
  subtitle = 'Sign in or create an account to book printing appointments and manage your orders.'
}: AuthModalProps) {
  if (!isOpen) return null;

  const { signInWithEmail, signUpWithEmail, signInWithDirectGmail, signInWithGoogle } = useAuth();

  // Active Method: 'direct_gmail' (Method 2) OR 'create' (Method 1) OR 'signin_pass'
  const [activeTab, setActiveTab] = useState<'direct_gmail' | 'create' | 'signin_pass'>(
    initialMode === 'signup' ? 'create' : 'direct_gmail'
  );

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const [error, setError] = useState<string | null>(null);
  const [domainWarning, setDomainWarning] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [showDomainHelp, setShowDomainHelp] = useState(false);

  // Method 1: Create Account
  const handleCreateAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setDomainWarning(null);
    setSuccessMessage(null);
    setLoading(true);

    try {
      if (!name.trim()) {
        throw new Error('Please enter your full name.');
      }
      if (!phone.trim()) {
        throw new Error('Please enter your phone number for appointment confirmation.');
      }
      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters.');
      }

      await signUpWithEmail(email.trim(), password, name.trim(), phone.trim());
      setLoading(false);
      setSuccessMessage(`Account created successfully! Welcome to SM Graphics, ${name.trim()}.`);

      setTimeout(() => {
        if (onSuccess) onSuccess();
        onClose();
      }, 700);
    } catch (err: any) {
      setLoading(false);
      setError(err?.message || 'Could not create account. Please check your details and try again.');
    }
  };

  // Method 2: Direct Sign In / Sign Up through Gmail
  const handleDirectGmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setDomainWarning(null);
    setSuccessMessage(null);

    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail || !cleanEmail.includes('@')) {
      setError('Please enter a valid Gmail address (e.g. yourname@gmail.com).');
      return;
    }

    setLoading(true);
    try {
      await signInWithDirectGmail(cleanEmail, name.trim() || undefined, phone.trim() || undefined);
      setLoading(false);
      setSuccessMessage(`Signed in directly as ${cleanEmail}! Welcome.`);

      setTimeout(() => {
        if (onSuccess) onSuccess();
        onClose();
      }, 700);
    } catch (err: any) {
      setLoading(false);
      setError(err?.message || 'Direct Gmail sign-in failed. Please try again.');
    }
  };

  // Email & Password Sign In
  const handlePasswordSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setDomainWarning(null);
    setSuccessMessage(null);
    setLoading(true);

    try {
      await signInWithEmail(email.trim(), password);
      setLoading(false);
      setSuccessMessage('Signed in successfully!');
      setTimeout(() => {
        if (onSuccess) onSuccess();
        onClose();
      }, 600);
    } catch (err: any) {
      setLoading(false);
      const code = err?.code || '';
      if (code === 'auth/wrong-password' || code === 'auth/invalid-credential') {
        setError('Incorrect password. Please verify and try again.');
      } else if (code === 'auth/user-not-found') {
        setError('No account found with this email. Switch to "Create Account" to register.');
      } else {
        setError(err?.message || 'Sign in could not be completed. Please try again.');
      }
    }
  };

  // Google OAuth Popup (Works on Authorized Domains including smgraphics.shop)
  const handleGoogleOAuthPopup = async () => {
    setError(null);
    setDomainWarning(null);
    setSuccessMessage(null);
    setGoogleLoading(true);

    try {
      await signInWithGoogle({
        phone: phone.trim() || undefined,
        name: name.trim() || undefined,
      });
      setGoogleLoading(false);
      setSuccessMessage('Signed in with Google successfully!');
      setTimeout(() => {
        if (onSuccess) onSuccess();
        onClose();
      }, 600);
    } catch (err: any) {
      setGoogleLoading(false);
      const code = err?.code || '';
      if (code === 'auth/unauthorized-domain') {
        setDomainWarning(
          `Domain Note: Firebase Authorized Domains can take 1-2 minutes to propagate. You can also use "Direct Gmail Sign-In" below right now!`
        );
        setActiveTab('direct_gmail');
      } else if (code !== 'auth/popup-closed-by-user') {
        setError(err?.message || 'Google sign-in could not be completed. Please use Direct Gmail Sign-In below.');
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      <div className="relative bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-5 sm:p-7 overflow-hidden shadow-2xl z-10 max-h-[92vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          aria-label="Close authentication modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Lockup */}
        <div className="text-center space-y-1.5 mb-5">
          <img
            src={smLogoImg}
            alt="SM Graphics Logo"
            className="w-13 h-13 mx-auto rounded-full object-cover border-2 border-amber-400/60 shadow-lg mb-1"
          />
          <div className="flex items-center justify-center gap-1.5">
            <span className="text-2xl font-black font-heading text-white">
              SM<span className="text-cyan-400">GRAPHICS</span>
            </span>
            <div className="flex items-center gap-1 ml-1">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              <span className="w-2 h-2 rounded-full bg-pink-500" />
              <span className="w-2 h-2 rounded-full bg-yellow-400" />
            </div>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed max-w-sm mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Primary 1-Click Google Sign-In */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-[11px] px-1 mb-1.5">
            <span className="text-slate-400 font-semibold uppercase tracking-wider">
              1-Click Instant Login
            </span>
            <span className="text-emerald-400 font-semibold flex items-center gap-1 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/80">
              <Sparkles className="w-3 h-3 text-emerald-400" />
              Authorized for smgraphics.shop
            </span>
          </div>

          <button
            type="button"
            onClick={handleGoogleOAuthPopup}
            disabled={googleLoading}
            className="w-full py-3 px-4 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs sm:text-sm flex items-center justify-center gap-3 transition-all shadow-md active:scale-98 cursor-pointer disabled:opacity-50 ring-2 ring-blue-500/20 group"
          >
            {googleLoading ? (
              <div className="w-4 h-4 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
            ) : (
              <svg className="w-4 h-4 shrink-0 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
            )}
            <span>Sign In with Google (1-Click)</span>
          </button>
        </div>

        {/* Divider */}
        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-800" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-slate-900 px-3 text-slate-500 font-mono text-[10px]">
              Or choose direct method
            </span>
          </div>
        </div>

        {/* 2 Methods Selector Tabs */}
        <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-950 rounded-xl border border-slate-800 mb-4">
          <button
            type="button"
            onClick={() => {
              setActiveTab('direct_gmail');
              setError(null);
              setSuccessMessage(null);
            }}
            className={`py-2 px-2 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'direct_gmail'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
            <span>Direct Gmail</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab('create');
              setError(null);
              setSuccessMessage(null);
            }}
            className={`py-2 px-2 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'create'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Create Account</span>
          </button>
        </div>

        {/* Success Alert */}
        {successMessage && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-950/80 border border-emerald-500/80 text-xs text-emerald-200 flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="font-semibold">{successMessage}</span>
          </div>
        )}

        {/* Domain Warning for Unauthorized Domain on smgraphics.shop */}
        {domainWarning && (
          <div className="mb-4 p-3 rounded-xl bg-amber-950/70 border border-amber-600/70 text-xs text-amber-200 space-y-2 animate-in fade-in">
            <div className="flex items-start gap-2">
              <Globe className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>{domainWarning}</span>
            </div>
            <button
              type="button"
              onClick={() => setShowDomainHelp(!showDomainHelp)}
              className="text-[11px] text-cyan-300 hover:underline flex items-center gap-1"
            >
              <HelpCircle className="w-3 h-3" />
              <span>Domain setup instructions</span>
            </button>
            {showDomainHelp && (
              <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800 text-[11px] text-slate-300 space-y-1">
                <p className="font-bold text-white">Authorized Domains Checklist:</p>
                <ol className="list-decimal pl-4 space-y-1 text-slate-300">
                  <li>In Firebase Console, go to <strong>Authentication</strong> → <strong>Settings</strong> → <strong>Authorized domains</strong>.</li>
                  <li>Ensure <code className="text-amber-300 bg-slate-900 px-1 py-0.5 rounded">smgraphics.shop</code> is listed.</li>
                  <li>Changes usually take about 1 minute to sync across Google servers.</li>
                </ol>
              </div>
            )}
          </div>
        )}

        {/* Error Alert */}
        {error && (
          <div className="mb-4 p-3 rounded-xl bg-pink-950/70 border border-pink-700/70 text-xs text-pink-300 flex items-start gap-2 animate-in fade-in">
            <AlertCircle className="w-4 h-4 text-pink-400 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* ======================================================== */}
        {/* METHOD 2: DIRECT SIGN UP / SIGN IN THROUGH GMAIL         */}
        {/* ======================================================== */}
        {activeTab === 'direct_gmail' && (
          <div className="space-y-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-blue-950/40 via-slate-900 to-cyan-950/30 border border-cyan-500/30 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-cyan-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  Direct Gmail Sign-In / Sign-Up
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 border border-emerald-700 text-emerald-300 font-semibold">
                  No popup needed
                </span>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                Enter your Gmail address to sign in or create an account directly. Works seamlessly on any domain.
              </p>
            </div>

            <form onSubmit={handleDirectGmail} className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Gmail Address <span className="text-pink-400">*</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    placeholder="e.g. chinmaykumardash987@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs sm:text-sm focus:border-cyan-400 focus:outline-none placeholder:text-slate-600"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Your Full Name <span className="text-slate-500 font-normal">(Optional)</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="text"
                    placeholder="e.g. Chinmay Dash"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs sm:text-sm focus:border-cyan-400 focus:outline-none placeholder:text-slate-600"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Phone Number <span className="text-slate-500 font-normal">(Optional for bookings)</span>
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="tel"
                    placeholder="e.g. 9437390950"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs sm:text-sm focus:border-cyan-400 focus:outline-none font-mono placeholder:text-slate-600"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-bold text-white bg-blue-600 hover:bg-blue-500 transition-all flex items-center justify-center gap-2 shadow-lg active:scale-98 cursor-pointer disabled:opacity-50 mt-1"
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-cyan-300" />
                    <span>Direct Sign In with Gmail</span>
                  </>
                )}
              </button>
            </form>
          </div>
        )}

        {/* ======================================================== */}
        {/* METHOD 1: CREATE ACCOUNT ("Create")                      */}
        {/* ======================================================== */}
        {activeTab === 'create' && (
          <div className="space-y-4">
            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300">
              <span className="font-semibold text-white">Create New Customer Account</span>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Register with your contact details. Your profile will be saved to Firestore.
              </p>
            </div>

            <form onSubmit={handleCreateAccount} className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Full Name <span className="text-pink-400">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Chinmay Dash"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs sm:text-sm focus:border-cyan-400 focus:outline-none placeholder:text-slate-600"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Phone Number <span className="text-pink-400">*</span>
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 9437390950"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs sm:text-sm focus:border-cyan-400 focus:outline-none font-mono placeholder:text-slate-600"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Email / Gmail Address <span className="text-pink-400">*</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    placeholder="yourname@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs sm:text-sm focus:border-cyan-400 focus:outline-none placeholder:text-slate-600"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Password <span className="text-pink-400">*</span>
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="password"
                    required
                    placeholder="At least 6 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs sm:text-sm focus:border-cyan-400 focus:outline-none placeholder:text-slate-600"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-bold text-white bg-blue-600 hover:bg-blue-500 transition-all flex items-center justify-center gap-2 shadow-lg active:scale-98 cursor-pointer disabled:opacity-50 mt-1"
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <UserPlus className="w-4 h-4" />
                    <span>Create Customer Account</span>
                  </>
                )}
              </button>
            </form>

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => setActiveTab('signin_pass')}
                className="text-xs text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer"
              >
                Already have a password? <span className="text-white underline">Sign in here</span>
              </button>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* OPTIONAL: PASSWORD SIGN IN                               */}
        {/* ======================================================== */}
        {activeTab === 'signin_pass' && (
          <form onSubmit={handlePasswordSignIn} className="space-y-3">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Email Address <span className="text-pink-400">*</span>
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  placeholder="yourname@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs sm:text-sm focus:border-cyan-400 focus:outline-none placeholder:text-slate-600"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Password <span className="text-pink-400">*</span>
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  placeholder="Your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs sm:text-sm focus:border-cyan-400 focus:outline-none placeholder:text-slate-600"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-bold text-white bg-blue-600 hover:bg-blue-500 transition-all flex items-center justify-center gap-2 shadow-lg active:scale-98 cursor-pointer disabled:opacity-50 mt-1"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  <span>Sign In with Password</span>
                </>
              )}
            </button>

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => setActiveTab('direct_gmail')}
                className="text-xs text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer"
              >
                Prefer 1-click? <span className="text-cyan-400 underline">Switch to Direct Gmail Sign-In</span>
              </button>
            </div>
          </form>
        )}

        {/* Footer info */}
        <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
          <span className="flex items-center gap-1.5 text-[11px]">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
            <span>CDA Sector-9, Cuttack</span>
          </span>

          <a
            href="tel:9437390950"
            className="text-slate-300 hover:text-amber-400 inline-flex items-center gap-1 font-mono text-[11px]"
            title="Helpline"
          >
            <PhoneCall className="w-3 h-3 text-amber-400" />
            <span>9437390950</span>
          </a>
        </div>
      </div>
    </div>
  );
}
