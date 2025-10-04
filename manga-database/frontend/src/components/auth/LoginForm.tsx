import React, { useState } from 'react';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface LoginFormProps {
  onSwitchToRegister: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSwitchToRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading, error } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
    } catch (err) {
      // Error is handled by the auth context
    }
  };

  return (
    <div className="w-full flex items-center justify-center py-16 px-6">
      <div className="relative w-full max-w-md">
        {/* Subtle gradient glow backdrop */}
        <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-b from-purple-500/20 to-orange-400/10 blur-2xl" />

        {/* Card */}
        <div className="relative bg-black/40 backdrop-blur-xl ring-1 ring-white/10 rounded-2xl shadow-2xl p-8">
          {/* Header */}
          <div className="mb-6 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-medium text-purple-300 bg-purple-400/10 ring-1 ring-purple-400/20 rounded-full mb-4">
              <span className="h-2 w-2 rounded-full bg-purple-400" />
              Welcome back
            </div>
            <h1 className="text-2xl font-semibold text-white tracking-tight">Sign in</h1>
            <p className="text-slate-300/80 text-sm">Access your MangaVerse dashboard</p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 text-red-200 px-3 py-2 text-sm">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div className="space-y-1.5">
              <label htmlFor="email" className="text-sm text-slate-300">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-3 py-2.5 rounded-lg bg-white/5 text-slate-100 placeholder-slate-400 ring-1 ring-white/10 focus:ring-2 focus:ring-purple-400/50 focus:outline-none disabled:opacity-50"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label htmlFor="password" className="text-sm text-slate-300">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-3 py-2.5 rounded-lg bg-white/5 text-slate-100 placeholder-slate-400 ring-1 ring-white/10 focus:ring-2 focus:ring-purple-400/50 focus:outline-none disabled:opacity-50"
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-purple-500 hover:bg-purple-400 text-white font-medium transition ring-1 ring-purple-400/40 shadow-lg disabled:opacity-50"
            >
              {loading ? (
                <span className="inline-flex items-center gap-2">
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Signing in...
                </span>
              ) : (
                <span className="inline-flex items-center gap-2">
                  Sign In
                  <ArrowRight className="h-4 w-4" />
                </span>
              )}
            </button>

            {/* Switch */}
            <button
              type="button"
              onClick={onSwitchToRegister}
              disabled={loading}
              className="w-full text-sm text-slate-300 hover:text-white transition"
            >
              Don't have an account? <span className="text-purple-300 hover:text-purple-200">Sign up</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
