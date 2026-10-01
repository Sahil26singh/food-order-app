import React, { useState } from 'react';
import { X, Plus, Minus, Check, Sparkles, Flame, Leaf, ShoppingBag } from 'lucide-react';

const SIZE_OPTIONS = [
  { id: 'regular', name: 'Regular Portion', priceExtra: 0 },
  { id: 'large', name: 'Large Deluxe (+25%)', priceExtra: 3.50 },
  { id: 'xl', name: 'Feast Portion (+50%)', priceExtra: 6.00 }
];

const EXTRA_ADDONS = [
  { id: 'cheese', name: 'Extra Aged Cheddar Cheese', price: 1.50 },
  { id: 'bacon', name: 'Crispy Smoked Bacon', price: 2.25 },
  { id: 'avocado', name: 'Fresh Hass Avocado Slices', price: 2.00 },
  { id: 'sauce', name: 'Extra Chef Signature Sauce', price: 0.99 },
  { id: 'truffle', name: 'Truffle Mayo Drizzle', price: 1.75 }
];

export default function ItemModal({ item, onClose, onAddToCart }) {
  const [selectedSize, setSelectedSize] = useState(SIZE_OPTIONS[0]);
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [instructions, setInstructions] = useState('');
  const [quantity, setQuantity] = useState(1);

  if (!item) return null;

  // Toggle addon selection
  const toggleAddon = (addon) => {
    if (selectedAddons.some(a => a.id === addon.id)) {
      setSelectedAddons(selectedAddons.filter(a => a.id !== addon.id));
    } else {
      setSelectedAddons([...selectedAddons, addon]);
    }
  };

  // Calculate unit price & total
  const addonsTotal = selectedAddons.reduce((sum, a) => sum + a.price, 0);
  const unitPrice = item.price + selectedSize.priceExtra + addonsTotal;
  const totalPrice = unitPrice * quantity;

  const handleAdd = () => {
    const customizedItem = {
      ...item,
      selectedSize: selectedSize.name,
      selectedAddons: selectedAddons,
      specialInstructions: instructions,
      unitPrice: unitPrice,
      quantity: quantity
    };
    onAddToCart(customizedItem);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-slate-950/70 text-slate-300 hover:text-white flex items-center justify-center border border-slate-700 backdrop-blur-md transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header Image */}
        <div className="relative h-56 w-full">
          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
          <div className="absolute bottom-4 left-6 right-6">
            <span className="px-2.5 py-1 rounded-md text-[10px] uppercase font-bold bg-orange-500 text-slate-950">
              {item.category}
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white mt-1 leading-snug">{item.name}</h2>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
          <p className="text-sm text-slate-300 leading-relaxed">{item.description}</p>

          {/* Size Options */}
          <div>
            <h4 className="text-xs uppercase font-extrabold tracking-wider text-slate-400 mb-3">Choose Portion Size</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {SIZE_OPTIONS.map((size) => {
                const isSelected = selectedSize.id === size.id;
                return (
                  <button
                    key={size.id}
                    onClick={() => setSelectedSize(size)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'bg-orange-500/15 border-orange-500 text-orange-300 font-bold'
                        : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <p className="text-xs font-bold">{size.name}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      {size.priceExtra > 0 ? `+$${size.priceExtra.toFixed(2)}` : 'Included'}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Add-ons */}
          <div>
            <h4 className="text-xs uppercase font-extrabold tracking-wider text-slate-400 mb-3">Extra Add-ons & Toppings</h4>
            <div className="space-y-2">
              {EXTRA_ADDONS.map((addon) => {
                const isChecked = selectedAddons.some(a => a.id === addon.id);
                return (
                  <div
                    key={addon.id}
                    onClick={() => toggleAddon(addon)}
                    className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                      isChecked
                        ? 'bg-amber-500/15 border-amber-500 text-amber-200'
                        : 'bg-slate-800/60 border-slate-700/80 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-5 h-5 rounded-md flex items-center justify-center border ${
                        isChecked ? 'bg-amber-500 border-amber-400 text-slate-950' : 'border-slate-600 bg-slate-900'
                      }`}>
                        {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                      <span className="text-xs font-semibold">{addon.name}</span>
                    </div>
                    <span className="text-xs font-bold text-slate-300">+${addon.price.toFixed(2)}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Special Instructions */}
          <div>
            <h4 className="text-xs uppercase font-extrabold tracking-wider text-slate-400 mb-2">Special Request / Allergies</h4>
            <textarea
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              placeholder="e.g. Extra sauce on the side, no onions, extra spicy..."
              rows={2}
              className="w-full p-3 rounded-xl bg-slate-950/80 border border-slate-700 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-orange-500"
            />
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-6 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
          {/* Quantity Selector */}
          <div className="flex items-center space-x-3 bg-slate-900 border border-slate-700 px-3 py-1.5 rounded-2xl">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center justify-center font-bold"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="text-sm font-extrabold text-white w-6 text-center">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center justify-center font-bold"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Add to Cart Submit */}
          <button
            onClick={handleAdd}
            className="flex-1 ml-4 py-3.5 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-slate-950 font-black text-sm shadow-xl shadow-orange-500/25 flex items-center justify-center space-x-2 transition-transform transform active:scale-95"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Add {quantity} to Order</span>
            <span className="bg-slate-950/20 px-2 py-0.5 rounded text-xs ml-2">
              ${totalPrice.toFixed(2)}
            </span>
          </button>
        </div>

      </div>
    </div>
  );
}
