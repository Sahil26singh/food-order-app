import React from 'react';
import { ShoppingBag, Search, ShieldCheck, User, Sparkles, UtensilsCrossed, Clock } from 'lucide-react';

export default function Navbar({ 
  cartCount, 
  cartSubtotal, 
  onOpenCart, 
  onOpenAuth, 
  currentUser, 
  onLogout,
  searchQuery, 
  setSearchQuery,
  isAdminView,
  setIsAdminView,
  activeOrderCount
}) {
  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-800 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setIsAdminView(false)}>
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-orange-500 via-amber-500 to-yellow-400 flex items-center justify-center shadow-lg shadow-orange-500/30 transform hover:scale-105 transition-transform">
              <UtensilsCrossed className="w-6 h-6 text-slate-950 font-bold" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-amber-300 to-yellow-200 tracking-tight">
                  CraveCraft
                </span>
                <span className="px-2 py-0.5 text-[10px] uppercase tracking-widest font-semibold bg-orange-500/20 text-orange-400 border border-orange-500/30 rounded-full">
                  Express
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium hidden sm:block">Gourmet Food Delivered Fast</p>
            </div>
          </div>

          {/* Search Bar */}
          {!isAdminView && (
            <div className="flex-1 max-w-md mx-4 hidden md:block">
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search burgers, wood-fired pizza, ramen..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700/80 text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all shadow-inner"
                />
              </div>
            </div>
          )}

          {/* Actions & Buttons */}
          <div className="flex items-center space-x-3">
            {/* Admin Toggle */}
            <button
              onClick={() => setIsAdminView(!isAdminView)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-all border ${
                isAdminView 
                  ? 'bg-purple-600/20 text-purple-300 border-purple-500/50 shadow-lg shadow-purple-900/30' 
                  : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span className="hidden sm:inline">{isAdminView ? 'Admin View' : 'Admin Panel'}</span>
            </button>

            {/* User Account / Auth */}
            {currentUser ? (
              <div className="flex items-center space-x-2 bg-slate-800/80 border border-slate-700 px-3 py-1.5 rounded-xl">
                <div className="w-7 h-7 rounded-full bg-orange-500/20 border border-orange-500/40 flex items-center justify-center text-xs font-bold text-orange-400">
                  {currentUser.name[0].toUpperCase()}
                </div>
                <div className="text-left hidden lg:block">
                  <p className="text-xs font-semibold text-slate-200 leading-tight">{currentUser.name}</p>
                  <p className="text-[10px] text-slate-400 leading-tight">{currentUser.role === 'ROLE_ADMIN' ? 'Administrator' : 'Customer'}</p>
                </div>
                <button 
                  onClick={onLogout}
                  className="text-[10px] text-slate-400 hover:text-orange-400 ml-1 underline"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="px-3 py-2 rounded-xl text-xs font-semibold text-slate-200 bg-slate-800 border border-slate-700 hover:bg-slate-700 transition-colors flex items-center space-x-1.5"
              >
                <User className="w-4 h-4 text-orange-400" />
                <span>Sign In</span>
              </button>
            )}

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative px-4 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-slate-950 font-bold text-sm shadow-lg shadow-orange-500/25 flex items-center space-x-2 transition-transform transform active:scale-95"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Cart</span>
              {cartSubtotal > 0 && (
                <span className="hidden sm:inline text-xs font-black bg-slate-950/30 px-1.5 py-0.5 rounded">
                  ${cartSubtotal.toFixed(2)}
                </span>
              )}
              
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white rounded-full text-[11px] font-extrabold flex items-center justify-center border-2 border-slate-900 shadow-md animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
