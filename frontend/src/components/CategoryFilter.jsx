import React from 'react';
import { Utensils, Beef, Pizza, Salad, Soup, IceCream, Coffee } from 'lucide-react';

const ICON_MAP = {
  Utensils,
  Beef,
  Pizza,
  Salad,
  Soup,
  IceCream,
  Coffee
};

export default function CategoryFilter({ categories, selectedCategory, onSelectCategory, foodItems }) {
  return (
    <div className="my-6">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-extrabold text-slate-100 tracking-tight">Explore Categories</h2>
        <span className="text-xs text-slate-400 font-medium">Click to filter menu</span>
      </div>

      <div className="flex items-center space-x-3 overflow-x-auto pb-3 pt-1 no-scrollbar">
        {categories.map((cat) => {
          const IconComponent = ICON_MAP[cat.icon] || Utensils;
          const isSelected = selectedCategory === cat.id;
          
          // Calculate item count in category
          const count = cat.id === 'all' 
            ? foodItems.length 
            : foodItems.filter(item => item.category === cat.id).length;

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`flex items-center space-x-2.5 px-4 py-3 rounded-2xl whitespace-nowrap text-sm font-semibold transition-all border ${
                isSelected
                  ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 border-orange-400 shadow-lg shadow-orange-500/20 font-bold scale-105'
                  : 'bg-slate-800/90 text-slate-300 border-slate-700 hover:bg-slate-700 hover:border-slate-600'
              }`}
            >
              <IconComponent className={`w-4 h-4 ${isSelected ? 'text-slate-950' : 'text-orange-400'}`} />
              <span>{cat.name}</span>
              <span className={`text-[11px] px-2 py-0.5 rounded-full font-bold ${
                isSelected 
                  ? 'bg-slate-950/20 text-slate-950' 
                  : 'bg-slate-900 text-slate-400 border border-slate-700'
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
