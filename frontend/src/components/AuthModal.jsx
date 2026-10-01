import React, { useState } from 'react';
import { X, Lock, Mail, User, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';
import { apiService } from '../services/api';

export default function AuthModal({ isOpen, onClose, onAuthSuccess }) {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    let result;
    if (isRegister) {
      result = await apiService.register({ name, email, password });
    } else {
      result = await apiService.login({ email, password });
    }

    setLoading(false);
    if (result && result.user) {
      onAuthSuccess(result.user, result.token);
      onClose();
    }
  };

  const handleQuickDemoUser = async (role) => {
    setLoading(true);
    const demoEmail = role === 'admin' ? 'admin@cravecraft.com' : 'sahil@example.com';
    const result = await apiService.login({ email: demoEmail, password: 'password123' });
    setLoading(false);
    onAuthSuccess(result.user, result.token);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden p-6 space-y-6">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center space-y-1">
          <h2 className="text-2xl font-black text-white">
            {isRegister ? 'Create Your Account' : 'Welcome Back'}
          </h2>
          <p className="text-xs text-slate-400">
            {isRegister ? 'Join CraveCraft Express for fast gourmet food' : 'Sign in to access your saved orders & rewards'}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-orange-500"
                  placeholder="Sahil Singh"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-orange-500"
                placeholder="user@example.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-orange-500"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 font-black text-sm shadow-xl shadow-orange-500/25 flex items-center justify-center space-x-2"
          >
            <span>{isRegister ? 'Register Account' : 'Sign In'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Quick Demo Logins */}
        <div className="border-t border-slate-800 pt-4 space-y-2">
          <p className="text-[11px] text-center text-slate-400">Instant Demo Login</p>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handleQuickDemoUser('customer')}
              className="p-2 rounded-xl bg-slate-800 border border-slate-700 text-[11px] font-bold text-slate-300 hover:bg-slate-700"
            >
              Demo Customer
            </button>
            <button
              onClick={() => handleQuickDemoUser('admin')}
              className="p-2 rounded-xl bg-purple-600/20 border border-purple-500/40 text-[11px] font-bold text-purple-300 hover:bg-purple-600/30"
            >
              Demo Admin
            </button>
          </div>
        </div>

        {/* Toggle Mode */}
        <p className="text-xs text-center text-slate-400">
          {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            onClick={() => setIsRegister(!isRegister)}
            className="text-orange-400 font-bold hover:underline"
          >
            {isRegister ? 'Sign In' : 'Create One'}
          </button>
        </p>

      </div>
    </div>
  );
}
