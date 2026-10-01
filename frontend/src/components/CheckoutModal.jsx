import React, { useState } from 'react';
import { X, MapPin, CreditCard, ShieldCheck, CheckCircle2, Lock, ArrowLeft, ArrowRight, Smartphone, Banknote } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CheckoutModal({
  isOpen,
  onClose,
  cartItems,
  grandTotal,
  onOrderSuccess,
  currentUser
}) {
  const [step, setStep] = useState(1);
  const [address, setAddress] = useState({
    fullName: currentUser ? currentUser.name : '',
    street: '124 Market Street, Suite 400',
    city: 'San Francisco, CA 94105',
    phone: '+1 (555) 987-6543',
    instructions: 'Leave at front door / ring doorbell'
  });
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardDetails, setCardDetails] = useState({
    number: '4242 •••• •••• 4242',
    expiry: '12/28',
    cvv: '888',
    name: currentUser ? currentUser.name : 'Valued Customer'
  });
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const handlePlaceOrder = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      triggerConfetti();

      const newOrder = {
        id: 'ORD-' + Math.floor(100000 + Math.random() * 900000),
        items: cartItems,
        totalAmount: grandTotal,
        address: address,
        paymentMethod: paymentMethod,
        status: 'PLACED',
        createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        estimatedMinutes: 25,
        driverName: 'Alex Rivers',
        driverPhone: '+1 (555) 234-5678',
        driverVehicle: 'Electric Scooter (Plate: SF-892)'
      };

      onOrderSuccess(newOrder);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-8">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-800 bg-slate-950/80 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-orange-500/20 text-orange-400 border border-orange-500/30 flex items-center justify-center font-bold">
              {step}
            </div>
            <div>
              <h2 className="text-lg font-black text-white">Express Checkout</h2>
              <p className="text-xs text-slate-400">Step {step} of 2: {step === 1 ? 'Delivery Location' : 'Secure Payment'}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-6 max-h-[65vh] overflow-y-auto">
          
          {step === 1 ? (
            /* Step 1: Address Details */
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-xs font-bold text-orange-400 uppercase tracking-wider mb-2">
                <MapPin className="w-4 h-4" />
                <span>Delivery Address & Recipient</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={address.fullName}
                    onChange={(e) => setAddress({...address, fullName: e.target.value})}
                    className="w-full p-3 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:border-orange-500 focus:outline-none"
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Phone Number</label>
                  <input
                    type="text"
                    value={address.phone}
                    onChange={(e) => setAddress({...address, phone: e.target.value})}
                    className="w-full p-3 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:border-orange-500 focus:outline-none"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Street Address</label>
                <input
                  type="text"
                  value={address.street}
                  onChange={(e) => setAddress({...address, street: e.target.value})}
                  className="w-full p-3 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:border-orange-500 focus:outline-none"
                  placeholder="Apt, Suite, Street name"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">City & Postal Code</label>
                <input
                  type="text"
                  value={address.city}
                  onChange={(e) => setAddress({...address, city: e.target.value})}
                  className="w-full p-3 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:border-orange-500 focus:outline-none"
                  placeholder="City, State Zip"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Delivery Instructions for Rider</label>
                <textarea
                  value={address.instructions}
                  onChange={(e) => setAddress({...address, instructions: e.target.value})}
                  className="w-full p-3 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:border-orange-500 focus:outline-none"
                  rows={2}
                  placeholder="e.g. Gate code #4012, leave at front porch"
                />
              </div>
            </div>
          ) : (
            /* Step 2: Payment Method */
            <div className="space-y-6">
              <div className="flex items-center space-x-2 text-xs font-bold text-orange-400 uppercase tracking-wider mb-2">
                <CreditCard className="w-4 h-4" />
                <span>Select Payment Method</span>
              </div>

              {/* Payment Type Selection */}
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-4 rounded-2xl border text-center flex flex-col items-center justify-center space-y-2 transition-all ${
                    paymentMethod === 'card'
                      ? 'bg-orange-500/15 border-orange-500 text-orange-300 font-bold'
                      : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <CreditCard className="w-5 h-5" />
                  <span className="text-xs">Credit Card</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-4 rounded-2xl border text-center flex flex-col items-center justify-center space-y-2 transition-all ${
                    paymentMethod === 'upi'
                      ? 'bg-orange-500/15 border-orange-500 text-orange-300 font-bold'
                      : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <Smartphone className="w-5 h-5" />
                  <span className="text-xs">UPI / QR</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-4 rounded-2xl border text-center flex flex-col items-center justify-center space-y-2 transition-all ${
                    paymentMethod === 'cod'
                      ? 'bg-orange-500/15 border-orange-500 text-orange-300 font-bold'
                      : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <Banknote className="w-5 h-5" />
                  <span className="text-xs">Cash on Delivery</span>
                </button>
              </div>

              {/* Payment Details Form */}
              {paymentMethod === 'card' && (
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Card Number</label>
                    <input
                      type="text"
                      value={cardDetails.number}
                      onChange={(e) => setCardDetails({...cardDetails, number: e.target.value})}
                      className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">Expiry Date</label>
                      <input
                        type="text"
                        value={cardDetails.expiry}
                        onChange={(e) => setCardDetails({...cardDetails, expiry: e.target.value})}
                        className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">CVV Security Code</label>
                      <input
                        type="password"
                        value={cardDetails.cvv}
                        onChange={(e) => setCardDetails({...cardDetails, cvv: e.target.value})}
                        className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'upi' && (
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-3">
                  <p className="text-xs text-slate-300">Scan QR Code or enter VPA address</p>
                  <div className="w-32 h-32 mx-auto bg-white p-2 rounded-xl flex items-center justify-center">
                    <div className="w-full h-full bg-slate-950 text-orange-400 flex items-center justify-center font-black text-xs rounded">
                      [ CRAVECRAFT QR ]
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-400">cravefood@express.upi</p>
                </div>
              )}

              {paymentMethod === 'cod' && (
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-slate-300 text-xs leading-relaxed flex items-center space-x-3">
                  <Banknote className="w-6 h-6 text-emerald-400 flex-shrink-0" />
                  <span>You can pay cash or scan rider's card reader upon food delivery.</span>
                </div>
              )}

              {/* Order Items Brief Summary */}
              <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-center justify-between text-xs">
                <div>
                  <span className="text-slate-400 block">Total Amount to Pay</span>
                  <span className="text-lg font-black text-orange-400">${grandTotal.toFixed(2)}</span>
                </div>
                <div className="flex items-center space-x-1 text-[11px] text-emerald-400 font-semibold bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
                  <Lock className="w-3 h-3" />
                  <span>256-bit SSL Encrypted</span>
                </div>
              </div>

            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-6 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
          {step === 2 ? (
            <button
              onClick={() => setStep(1)}
              className="px-4 py-3 rounded-2xl bg-slate-800 text-slate-300 font-bold text-xs hover:bg-slate-700 flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          ) : (
            <div />
          )}

          {step === 1 ? (
            <button
              onClick={() => setStep(2)}
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-slate-950 font-black text-xs shadow-xl shadow-orange-500/25 flex items-center space-x-2"
            >
              <span>Continue to Payment</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handlePlaceOrder}
              disabled={isProcessing}
              className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-400 hover:from-orange-600 hover:to-amber-600 text-slate-950 font-black text-sm shadow-xl shadow-orange-500/30 flex items-center space-x-2 disabled:opacity-50"
            >
              {isProcessing ? (
                <span>Authorizing Payment...</span>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Place Order (${grandTotal.toFixed(2)})</span>
                </>
              )}
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
