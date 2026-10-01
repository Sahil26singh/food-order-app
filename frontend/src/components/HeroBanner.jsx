import React from 'react';
import { Clock, Star, Flame, Truck, Award, Sparkles } from 'lucide-react';

export default function HeroBanner({ onSelectCategory }) {
  return (
    <div className="relative rounded-3xl overflow-hidden my-6 border border-slate-800 shadow-2xl bg-slate-900">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-40 scale-105 transition-transform duration-1000"
        style={{ backgroundImage: `url('/images/hero.jpg')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-950/40" />

      {/* Content */}
      <div className="relative z-10 p-8 sm:p-12 lg:p-14 max-w-3xl">
        {/* Badges */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold bg-orange-500/20 text-orange-400 border border-orange-500/30">
            <Flame className="w-3.5 h-3.5" />
            <span>20% OFF WITH CODE: SPRING20</span>
          </span>
          <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            <Clock className="w-3.5 h-3.5" />
            <span>Avg Delivery: 22 Mins</span>
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight mb-4">
          Artisanal Culinary Craving, <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-amber-300 to-yellow-400">
            Delivered Right to Your Door.
          </span>
        </h1>

        <p className="text-sm sm:text-base text-slate-300 mb-8 max-w-xl font-normal leading-relaxed">
          Crafted by top chefs with fresh organic ingredients. Order gourmet burgers, wood-fired pizzas, healthy poke bowls & artisan desserts.
        </p>

        {/* Feature Pills */}
        <div className="grid grid-cols-3 gap-4 border-t border-slate-800/80 pt-6 max-w-lg">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-400 border border-orange-500/20">
              <Star className="w-4 h-4 fill-orange-400 text-orange-400" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">4.9 / 5.0</p>
              <p className="text-[11px] text-slate-400">5k+ Reviews</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400 border border-amber-500/20">
              <Truck className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">Free Express</p>
              <p className="text-[11px] text-slate-400">Orders over $30</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400 border border-purple-500/20">
              <Award className="w-4 h-4 text-purple-400" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">Master Chefs</p>
              <p className="text-[11px] text-slate-400">Fresh Daily</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
