import React, { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Lock, ArrowRight, ShieldCheck, GraduationCap } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  fallbackMessage?: string;
  onAuthenticateRedirect?: () => void;
}

/**
 * ProtectedRoute Component
 * Guards test simulator and sensitive exam views.
 * If user is not authenticated, prompts the login/signup flow with 6-digit OTP verification.
 */
export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  fallbackMessage = 'Please sign in or create an account to start this TCS iON mock test.',
  onAuthenticateRedirect
}) => {
  const { isSignedIn, openAuthModal } = useAuth();

  useEffect(() => {
    if (!isSignedIn && onAuthenticateRedirect) {
      onAuthenticateRedirect();
    }
  }, [isSignedIn, onAuthenticateRedirect]);

  if (!isSignedIn) {
    return (
      <div className="fixed inset-0 z-50 bg-slate-900 flex flex-col items-center justify-center p-6 text-center select-none font-sans">
        <div className="max-w-md w-full bg-slate-800 rounded-2xl p-8 border border-slate-700 shadow-2xl space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
            <Lock className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>Authentication Required</span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Sign In to Enter Exam Simulator
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              {fallbackMessage} An authenticated session is required to record your All India Rank (AIR), percentile, and sectional accuracy.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <button
              onClick={() => openAuthModal('signin')}
              className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg transition-colors shadow-md flex items-center justify-center gap-2"
            >
              <span>Sign In with Email</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => openAuthModal('signup')}
              className="w-full py-2.5 px-4 bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-semibold rounded-lg transition-colors border border-slate-600"
            >
              <span>New Aspirant? Register with 6-Digit Email OTP</span>
            </button>
          </div>

          <div className="text-[11px] text-slate-500 border-t border-slate-700/60 pt-4 flex items-center justify-center gap-2">
            <GraduationCap className="w-4 h-4 text-emerald-500" />
            <span>Protected by Clerk Security Infrastructure</span>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
