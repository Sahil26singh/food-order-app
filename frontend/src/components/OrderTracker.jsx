import React, { useState, useEffect } from 'react';
import { Clock, CheckCircle2, Utensils, Bike, MapPin, Phone, ShieldCheck, AlertTriangle, ArrowRight } from 'lucide-react';

const ORDER_STEPS = [
  { status: 'PLACED', label: 'Order Placed', desc: 'Order received by restaurant', icon: CheckCircle2 },
  { status: 'CONFIRMED', label: 'Confirmed', desc: 'Kitchen accepted your order', icon: ShieldCheck },
  { status: 'PREPARING', label: 'In Kitchen', desc: 'Chef preparing fresh ingredients', icon: Utensils },
  { status: 'OUT_FOR_DELIVERY', label: 'Out for Delivery', desc: 'Driver en route to your location', icon: Bike },
  { status: 'DELIVERED', label: 'Delivered', desc: 'Enjoy your delicious meal!', icon: MapPin },
];

export default function OrderTracker({ activeOrder, onCancelOrder, onSimulateNextStep }) {
  const [minutesRemaining, setMinutesRemaining] = useState(activeOrder ? activeOrder.estimatedMinutes : 25);

  useEffect(() => {
    if (!activeOrder || activeOrder.status === 'DELIVERED') return;
    const timer = setInterval(() => {
      setMinutesRemaining((prev) => Math.max(1, prev - 1));
    }, 10000);
    return () => clearInterval(timer);
  }, [activeOrder]);

  if (!activeOrder) return null;

  const currentStepIndex = ORDER_STEPS.findIndex(s => s.status === activeOrder.status);

  return (
    <div className="glass-panel rounded-3xl p-6 sm:p-8 my-8 border border-orange-500/30 shadow-2xl relative overflow-hidden bg-slate-900/90">
      
      {/* Background Accent glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl -z-10" />

      {/* Order Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center space-x-3">
            <span className="px-3 py-1 rounded-full text-xs font-black bg-orange-500 text-slate-950 uppercase tracking-widest">
              Live Tracker
            </span>
            <span className="text-xs text-slate-400 font-mono">ID: {activeOrder.id}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
            {activeOrder.status === 'DELIVERED' ? 'Order Completed!' : 'Food is being prepared & delivered'}
          </h2>
        </div>

        {activeOrder.status !== 'DELIVERED' && (
          <div className="flex items-center space-x-3 bg-slate-950/80 px-4 py-2.5 rounded-2xl border border-slate-800">
            <Clock className="w-5 h-5 text-orange-400 animate-pulse" />
            <div>
              <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Estimated Arrival</p>
              <p className="text-base font-black text-amber-300">{minutesRemaining} Mins</p>
            </div>
          </div>
        )}
      </div>

      {/* Timeline Tracker */}
      <div className="my-8">
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 relative">
          {ORDER_STEPS.map((step, idx) => {
            const isCompleted = idx <= currentStepIndex;
            const isCurrent = idx === currentStepIndex;
            const IconComp = step.icon;

            return (
              <div
                key={step.status}
                className={`relative flex flex-col items-center text-center p-3 rounded-2xl border transition-all ${
                  isCurrent
                    ? 'bg-orange-500/20 border-orange-500 text-orange-300 shadow-lg shadow-orange-500/20 scale-105'
                    : isCompleted
                    ? 'bg-slate-800/80 border-slate-700 text-slate-200'
                    : 'bg-slate-900/40 border-slate-800 text-slate-600'
                }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-2 font-bold ${
                  isCurrent
                    ? 'bg-orange-500 text-slate-950'
                    : isCompleted
                    ? 'bg-slate-700 text-orange-400'
                    : 'bg-slate-800 text-slate-600'
                }`}>
                  <IconComp className="w-5 h-5" />
                </div>
                <p className="text-xs font-black">{step.label}</p>
                <p className="text-[10px] text-slate-400 mt-1 line-clamp-2">{step.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Driver & Delivery Information Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-slate-800 pt-6">
        
        {/* Driver Card */}
        <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-slate-950 font-black text-lg">
            AR
          </div>
          <div className="flex-1">
            <p className="text-xs text-slate-400 font-medium">Assigned Delivery Partner</p>
            <p className="text-sm font-extrabold text-white">{activeOrder.driverName}</p>
            <p className="text-xs text-orange-400 font-semibold">{activeOrder.driverVehicle}</p>
          </div>
          <a
            href={`tel:${activeOrder.driverPhone}`}
            className="p-3 rounded-xl bg-slate-800 text-orange-400 hover:bg-slate-700 border border-slate-700 transition-colors"
            title="Call Driver"
          >
            <Phone className="w-4 h-4" />
          </a>
        </div>

        {/* Address Card */}
        <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center text-orange-400 border border-slate-700">
            <MapPin className="w-6 h-6" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-slate-400 font-medium">Delivery Location</p>
            <p className="text-xs font-bold text-white truncate">{activeOrder.address.street}</p>
            <p className="text-[11px] text-slate-400">{activeOrder.address.city}</p>
          </div>
        </div>

      </div>

      {/* Simulator Control & Cancel Order Button */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-800/60">
        <div className="flex items-center space-x-2">
          <span className="text-[11px] text-slate-400 font-medium">Demo Simulator:</span>
          {activeOrder.status !== 'DELIVERED' && (
            <button
              onClick={() => onSimulateNextStep(activeOrder.id)}
              className="px-3 py-1.5 rounded-xl bg-purple-600/20 text-purple-300 border border-purple-500/40 text-xs font-bold hover:bg-purple-600/30 flex items-center space-x-1"
            >
              <span>Advance Status</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {(activeOrder.status === 'PLACED' || activeOrder.status === 'CONFIRMED') && (
          <button
            onClick={() => onCancelOrder(activeOrder.id)}
            className="px-3 py-1.5 rounded-xl bg-red-500/10 text-red-400 border border-red-500/30 text-xs font-bold hover:bg-red-500/20 flex items-center space-x-1"
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Cancel Order</span>
          </button>
        )}
      </div>

    </div>
  );
}
