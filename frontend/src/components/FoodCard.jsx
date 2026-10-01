import React from 'react';
import { Star, Clock, Plus, Flame, Leaf, Eye } from 'lucide-react';

export default function FoodCard({ item, onQuickAdd, onOpenDetails }) {
  return (
    <div className="glass-card rounded-2xl overflow-hidden flex flex-col justify-between group border border-slate-800 hover:border-orange-500/40 transition-all duration-300">
      
      {/* Top Image Section */}
      <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-900 cursor-pointer" onClick={() => onOpenDetails(item)}>
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/30" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          {item.tags && item.tags.map((tag, idx) => (
            <span key={idx} className="px-2.5 py-1 rounded-lg text-[10px] uppercase tracking-wider font-extrabold bg-slate-950/80 text-orange-400 border border-orange-500/30 backdrop-blur-md">
              {tag}
            </span>
          ))}
          {item.isVegetarian && (
            <span className="px-2 py-1 rounded-lg text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1 backdrop-blur-md">
              <Leaf className="w-3 h-3" /> Veg
            </span>
          )}
          {item.isSpicy && (
            <span className="px-2 py-1 rounded-lg text-[10px] font-bold bg-red-500/20 text-red-300 border border-red-500/40 flex items-center gap-1 backdrop-blur-md">
              <Flame className="w-3 h-3" /> Spicy
            </span>
          )}
        </div>

        {/* Prep time badge */}
        <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg bg-slate-950/80 text-slate-300 text-xs font-semibold flex items-center space-x-1 backdrop-blur-md border border-slate-700">
          <Clock className="w-3.5 h-3.5 text-orange-400" />
          <span>{item.prepTime}</span>
        </div>
      </div>

      {/* Details Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Rating & Calories */}
          <div className="flex items-center justify-between text-xs mb-2">
            <div className="flex items-center space-x-1 bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span className="font-bold text-amber-300">{item.rating}</span>
              <span className="text-slate-400">({item.reviewsCount})</span>
            </div>
            {item.calories && (
              <span className="text-slate-400 text-[11px]">{item.calories} kcal</span>
            )}
          </div>

          {/* Title */}
          <h3 
            onClick={() => onOpenDetails(item)}
            className="text-base font-extrabold text-slate-100 group-hover:text-orange-400 transition-colors line-clamp-1 cursor-pointer"
          >
            {item.name}
          </h3>

          {/* Description */}
          <p className="text-xs text-slate-400 mt-1.5 line-clamp-2 leading-relaxed font-normal">
            {item.description}
          </p>
        </div>

        {/* Footer: Price & Add Button */}
        <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 font-medium block">Price</span>
            <span className="text-lg font-black text-white tracking-tight">
              ${item.price.toFixed(2)}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => onOpenDetails(item)}
              className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors border border-slate-700"
              title="Customize item"
            >
              <Eye className="w-4 h-4" />
            </button>
            <button
              onClick={() => onQuickAdd(item)}
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-slate-950 font-extrabold text-xs shadow-md shadow-orange-500/20 flex items-center space-x-1 transition-transform active:scale-95"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>Add</span>
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
