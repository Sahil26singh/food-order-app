import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag, Check, AlertCircle } from 'lucide-react';
import { SAMPLE_PROMO_CODES } from '../data/mockData';

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  appliedPromo,
  setAppliedPromo
}) {
  const [promoCodeInput, setPromoCodeInput] = useState('');
  const [promoError, setPromoError] = useState('');

  if (!isOpen) return null;

  // Calculate pricing summary
  const subtotal = cartItems.reduce((sum, item) => sum + (item.unitPrice || item.price) * item.quantity, 0);
  
  let discountAmount = 0;
  if (appliedPromo && SAMPLE_PROMO_CODES[appliedPromo.code]) {
    const rate = SAMPLE_PROMO_CODES[appliedPromo.code];
    if (typeof rate === 'number') {
      discountAmount = subtotal * rate;
    }
  }

  const deliveryFee = subtotal > 30 || subtotal === 0 ? 0 : 3.99;
  const tax = (subtotal - discountAmount) * 0.08;
  const grandTotal = Math.max(0, subtotal - discountAmount + deliveryFee + tax);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    const cleanCode = promoCodeInput.trim().toUpperCase();
    if (SAMPLE_PROMO_CODES[cleanCode]) {
      setAppliedPromo({ code: cleanCode, rate: SAMPLE_PROMO_CODES[cleanCode] });
      setPromoError('');
      setPromoCodeInput('');
    } else {
      setPromoError('Invalid promo code. Try SPRING20');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-slate-900 border-l border-slate-800 shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/80">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="w-5 h-5 text-orange-400" />
              <h2 className="text-lg font-black text-white">Your Food Basket</h2>
              <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-bold">
                {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-20 h-20 rounded-3xl bg-slate-800/80 flex items-center justify-center text-slate-600 border border-slate-700">
                  <ShoppingBag className="w-10 h-10" />
                </div>
                <h3 className="text-base font-bold text-slate-200">Your Basket is Empty</h3>
                <p className="text-xs text-slate-400 max-w-xs">
                  Discover top rated gourmet dishes and add your favorites to get started!
                </p>
              </div>
            ) : (
              cartItems.map((item, index) => {
                const itemPrice = (item.unitPrice || item.price) * item.quantity;
                return (
                  <div key={index} className="p-4 rounded-2xl bg-slate-800/70 border border-slate-700/80 space-y-3">
                    <div className="flex items-center space-x-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-14 h-14 rounded-xl object-cover border border-slate-700"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-extrabold text-white truncate">{item.name}</h4>
                        {item.selectedSize && (
                          <p className="text-[11px] text-orange-400 font-semibold">{item.selectedSize}</p>
                        )}
                        <p className="text-xs font-black text-amber-300 mt-1">${itemPrice.toFixed(2)}</p>
                      </div>

                      <button
                        onClick={() => onRemoveItem(index)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Addons preview */}
                    {item.selectedAddons && item.selectedAddons.length > 0 && (
                      <div className="flex flex-wrap gap-1 text-[10px] text-slate-400 bg-slate-900/60 p-2 rounded-lg border border-slate-800">
                        {item.selectedAddons.map((addon, aIdx) => (
                          <span key={aIdx} className="bg-slate-800 px-1.5 py-0.5 rounded text-slate-300">
                            + {addon.name}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Quantity controls */}
                    <div className="flex items-center justify-between pt-1">
                      <span className="text-[11px] text-slate-400 font-medium">Quantity</span>
                      <div className="flex items-center space-x-2 bg-slate-900 border border-slate-700 px-2 py-1 rounded-xl">
                        <button
                          onClick={() => onUpdateQuantity(index, item.quantity - 1)}
                          className="w-5 h-5 rounded text-slate-300 hover:bg-slate-800 flex items-center justify-center"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold text-white px-2">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(index, item.quantity + 1)}
                          className="w-5 h-5 rounded text-slate-300 hover:bg-slate-800 flex items-center justify-center"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer & Checkout Summary */}
          {cartItems.length > 0 && (
            <div className="p-6 bg-slate-950 border-t border-slate-800 space-y-4">
              
              {/* Promo Code Input */}
              <form onSubmit={handleApplyPromo} className="space-y-1">
                <div className="flex items-center space-x-2">
                  <div className="relative flex-1">
                    <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Promo Code (SPRING20)"
                      value={promoCodeInput}
                      onChange={(e) => setPromoCodeInput(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white uppercase placeholder-slate-500 focus:outline-none focus:border-orange-500"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-3 py-2 rounded-xl bg-slate-800 text-orange-400 border border-slate-700 text-xs font-bold hover:bg-slate-700"
                  >
                    Apply
                  </button>
                </div>
                {promoError && (
                  <p className="text-[11px] text-red-400 flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3 h-3" /> {promoError}
                  </p>
                )}
                {appliedPromo && (
                  <div className="flex items-center justify-between text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-lg">
                    <span className="font-bold">Promo '{appliedPromo.code}' Applied!</span>
                    <button 
                      type="button" 
                      onClick={() => setAppliedPromo(null)}
                      className="text-[10px] text-slate-400 underline hover:text-white"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </form>

              {/* Price Calculations */}
              <div className="space-y-1.5 text-xs text-slate-300 border-t border-slate-900 pt-3">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-white">${subtotal.toFixed(2)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400 font-semibold">
                    <span>Discount</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span className="font-bold text-white">
                    {deliveryFee === 0 ? <span className="text-emerald-400">FREE</span> : `$${deliveryFee.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Tax (8%)</span>
                  <span className="font-bold text-white">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-base font-black text-white pt-2 border-t border-slate-800">
                  <span>Grand Total</span>
                  <span className="text-orange-400">${grandTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={onProceedToCheckout}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-slate-950 font-black text-sm shadow-xl shadow-orange-500/25 flex items-center justify-center space-x-2 transition-transform transform active:scale-95"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
