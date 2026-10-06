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
  ChevronRight,
  Sparkles,
  HelpCircle,
  PhoneCall
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

  const { signInWithEmail, signUpWithEmail, signInWithGoogle } = useAuth();
  const [mode, setMode] = useState<'signin' | 'signup'>(initialMode);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);
    setLoading(true);

    try {
      if (mode === 'signup') {
        if (!name.trim()) {
          throw new Error('Please enter your full name.');
        }
        if (!phone.trim()) {
          throw new Error('Please enter your phone number for appointment contact.');
        }
        if (password.length < 6) {
          throw new Error('Password must be at least 6 characters.');
        }

        const res = await signUpWithEmail(email.trim(), password, name.trim(), phone.trim());
        setLoading(false);
        setSuccessMessage(
          res.isCustomerSession
            ? `Welcome, ${name.trim()}! Your customer account has been created.`
            : `Account created successfully! Welcome to SM Graphics.`
        );

        setTimeout(() => {
          if (onSuccess) onSuccess();
          onClose();
        }, 800);
      } else {
        await signInWithEmail(email.trim(), password);
        setLoading(false);
        setSuccessMessage('Signed in successfully!');
        setTimeout(() => {
          if (onSuccess) onSuccess();
          onClose();
        }, 600);
      }
    } catch (err: any) {
      setLoading(false);
      const code = err?.code || '';
      if (code === 'auth/wrong-password' || code === 'auth/invalid-credential') {
        setError('Incorrect email or password. Please check and try again.');
      } else if (code === 'auth/user-not-found') {
        setError('No account found with this email. Please switch to the Sign Up tab.');
      } else if (code === 'auth/email-already-in-use') {
        setError('An account already exists with this email. Please sign in or continue with Google.');
      } else if (code === 'auth/weak-password') {
        setError('Password should be at least 6 characters.');
      } else if (code === 'auth/invalid-email') {
        setError('Please enter a valid email address.');
      } else {
        setError(err?.message || 'Authentication could not be completed. Please try again.');
      }
    }
  };

  const handleGoogleSignIn = async () => {
    setError(null);
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
      if (err?.code !== 'auth/popup-closed-by-user') {
        setError(err?.message || 'Google Sign-In could not be completed. Please try again.');
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      <div className="relative bg-slate-900 border border-slate-700 rounded-2xl max-w-md w-full p-6 sm:p-8 overflow-hidden shadow-2xl z-10 max-h-[92vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          aria-label="Close authentication modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Lockup */}
        <div className="text-center space-y-2 mb-5">
          <img
            src={smLogoImg}
            alt="SM Graphics Logo"
            className="w-14 h-14 mx-auto rounded-full object-cover border-2 border-amber-400/60 shadow-lg mb-2"
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
          <h3 className="text-xl font-bold font-heading text-white">
            {mode === 'signin' ? 'Sign In to Your Account' : 'Create Customer Account'}
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed max-w-xs mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Mode Switcher Tabs */}
        <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-950 rounded-xl border border-slate-800 mb-5">
          <button
            type="button"
            onClick={() => {
              setMode('signin');
              setError(null);
              setSuccessMessage(null);
            }}
            className={`py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              mode === 'signin'
                ? 'bg-blue-600 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>Sign In</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('signup');
              setError(null);
              setSuccessMessage(null);
            }}
            className={`py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              mode === 'signup'
                ? 'bg-blue-600 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Sign Up (New)</span>
          </button>
        </div>

        {/* Success Alert */}
        {successMessage && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-950/70 border border-emerald-600/70 text-xs text-emerald-200 flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="font-medium">{successMessage}</span>
          </div>
        )}

        {/* Error Alert */}
        {error && (
          <div className="mb-4 p-3 rounded-xl bg-pink-950/60 border border-pink-700/60 text-xs text-pink-300 flex items-start gap-2 animate-in fade-in">
            <AlertCircle className="w-4 h-4 text-pink-400 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Primary Recommended: Google 1-Click Sign-In / Sign-Up */}
        <div className="mb-5 space-y-2">
          <div className="flex items-center justify-between text-[11px] px-1">
            <span className="text-slate-400 font-semibold uppercase tracking-wider">
              {mode === 'signup' ? 'Instant Sign Up' : 'Instant Sign In'}
            </span>
            <span className="text-emerald-400 font-semibold flex items-center gap-1 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/80">
              <Sparkles className="w-3 h-3 text-emerald-400" />
              1-Click Verified
            </span>
          </div>

          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={googleLoading || loading}
            className="w-full py-3 px-4 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs sm:text-sm flex items-center justify-center gap-3 transition-all shadow-md active:scale-98 cursor-pointer disabled:opacity-50 ring-2 ring-blue-500/20 group"
          >
            {googleLoading ? (
              <div className="w-4 h-4 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
            ) : (
              <svg className="w-4 h-4 shrink-0 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
            )}
            <span>
              {mode === 'signup' ? 'Sign Up with Google (1-Click)' : 'Sign In with Google (1-Click)'}
            </span>
          </button>
        </div>

        {/* Divider */}
        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-800" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-slate-900 px-3 text-slate-500 font-mono text-[10px]">
              {mode === 'signup' ? 'Or register with contact info' : 'Or with email & password'}
            </span>
          </div>
        </div>

        {/* Email/Password / Customer Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          {mode === 'signup' && (
            <>
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
            </>
          )}

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
                placeholder="At least 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs sm:text-sm focus:border-cyan-400 focus:outline-none placeholder:text-slate-600"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || googleLoading}
            className="w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-bold text-white bg-blue-600 hover:bg-blue-500 transition-all flex items-center justify-center gap-2 shadow-lg active:scale-98 cursor-pointer disabled:opacity-50 mt-1"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : mode === 'signin' ? (
              <>
                <LogIn className="w-4 h-4" />
                <span>Sign In to Account</span>
              </>
            ) : (
              <>
                <UserPlus className="w-4 h-4" />
                <span>Create Customer Account</span>
              </>
            )}
          </button>
        </form>

        {/* Switcher Footer */}
        <div className="mt-4 pt-3 border-t border-slate-800/80 text-center flex items-center justify-between text-xs">
          <button
            type="button"
            onClick={() => {
              setMode(mode === 'signin' ? 'signup' : 'signin');
              setError(null);
              setSuccessMessage(null);
            }}
            className="text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer"
          >
            {mode === 'signin' ? (
              <span>Don't have an account? <strong className="text-cyan-400 underline ml-0.5">Sign Up</strong></span>
            ) : (
              <span>Already registered? <strong className="text-cyan-400 underline ml-0.5">Sign In</strong></span>
            )}
          </button>

          <a
            href="tel:9437390950"
            className="text-slate-400 hover:text-amber-400 inline-flex items-center gap-1 font-mono text-[11px]"
            title="Urgent Order Helpline"
          >
            <PhoneCall className="w-3 h-3 text-amber-400" />
            <span>9437390950</span>
          </a>
        </div>
      </div>
    </div>
  );
}
