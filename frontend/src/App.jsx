import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroBanner from './components/HeroBanner';
import CategoryFilter from './components/CategoryFilter';
import FoodCard from './components/FoodCard';
import ItemModal from './components/ItemModal';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import OrderTracker from './components/OrderTracker';
import AdminDashboard from './components/AdminDashboard';
import AuthModal from './components/AuthModal';

import { CATEGORIES, INITIAL_FOOD_ITEMS } from './data/mockData';
import { apiService } from './services/api';
import { Utensils, Heart } from 'lucide-react';

export default function App() {
  const [foodItems, setFoodItems] = useState(INITIAL_FOOD_ITEMS);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Cart state
  const [cartItems, setCartItems] = useState([]);
  const [appliedPromo, setAppliedPromo] = useState(null);
  
  // Modals & Drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [selectedItemForModal, setSelectedItemForModal] = useState(null);

  // User & View State
  const [currentUser, setCurrentUser] = useState(null);
  const [isAdminView, setIsAdminView] = useState(false);
  
  // Orders State with real-time sync across browsers/tabs
  const [orders, setOrders] = useState([]);
  const [activeOrder, setActiveOrder] = useState(null);

  // 🔄 Real-Time Cross-Browser / Cross-Tab Order Synchronization
  const fetchAndSyncOrders = async () => {
    const fetchedOrders = await apiService.getOrders();
    if (fetchedOrders && Array.isArray(fetchedOrders)) {
      setOrders(fetchedOrders);
    }
  };

  useEffect(() => {
    // Initial fetch on mount
    fetchAndSyncOrders();

    // Poll every 2 seconds for real-time order syncing across browsers
    const intervalId = setInterval(fetchAndSyncOrders, 2000);

    // Listen for storage events (instant sync across tabs/windows)
    const handleStorageChange = () => {
      fetchAndSyncOrders();
    };
    window.addEventListener('storage', handleStorageChange);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Filtered Food Items logic
  const filteredItems = foodItems.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Calculate cart counts & subtotal
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cartItems.reduce((sum, item) => sum + (item.unitPrice || item.price) * item.quantity, 0);

  // Cart Handlers
  const handleQuickAdd = (item) => {
    const existingIndex = cartItems.findIndex(i => i.id === item.id && !i.selectedSize);
    if (existingIndex > -1) {
      const updated = [...cartItems];
      updated[existingIndex].quantity += 1;
      setCartItems(updated);
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1, unitPrice: item.price }]);
    }
  };

  const handleCustomAddToCart = (customizedItem) => {
    setCartItems([...cartItems, customizedItem]);
  };

  const handleUpdateQuantity = (index, newQty) => {
    if (newQty <= 0) {
      handleRemoveCartItem(index);
    } else {
      const updated = [...cartItems];
      updated[index].quantity = newQty;
      setCartItems(updated);
    }
  };

  const handleRemoveCartItem = (index) => {
    const updated = cartItems.filter((_, idx) => idx !== index);
    setCartItems(updated);
  };

  // Order Handlers
  const handleOrderSuccess = async (newOrder) => {
    await apiService.createOrder(newOrder);
    const updatedOrders = [newOrder, ...orders];
    setOrders(updatedOrders);
    setActiveOrder(newOrder);
    setCartItems([]);
    setAppliedPromo(null);
    setIsCheckoutOpen(false);
  };

  const handleSimulateNextStep = (orderId) => {
    const steps = ['PLACED', 'CONFIRMED', 'PREPARING', 'OUT_FOR_DELIVERY', 'DELIVERED'];
    const updatedOrders = orders.map(order => {
      if (order.id === orderId) {
        const currentIdx = steps.indexOf(order.status);
        const nextStatus = steps[Math.min(steps.length - 1, currentIdx + 1)];
        const updated = { ...order, status: nextStatus };
        if (activeOrder && activeOrder.id === orderId) {
          setActiveOrder(updated);
        }
        return updated;
      }
      return order;
    });

    setOrders(updatedOrders);
    try {
      localStorage.setItem('cravecraft_orders', JSON.stringify(updatedOrders));
      window.dispatchEvent(new Event('storage'));
    } catch (e) {}
  };

  const handleCancelOrder = (orderId) => {
    const updatedOrders = orders.filter(o => o.id !== orderId);
    setOrders(updatedOrders);
    if (activeOrder && activeOrder.id === orderId) {
      setActiveOrder(null);
    }
    try {
      localStorage.setItem('cravecraft_orders', JSON.stringify(updatedOrders));
      window.dispatchEvent(new Event('storage'));
    } catch (e) {}
  };

  // Admin Handlers
  const handleAddFoodItem = (newItem) => {
    setFoodItems([newItem, ...foodItems]);
  };

  const handleDeleteFoodItem = (itemId) => {
    setFoodItems(foodItems.filter(i => i.id !== itemId));
  };

  const handleUpdateOrderStatus = (orderId, newStatus) => {
    const updatedOrders = orders.map(o => {
      if (o.id === orderId) {
        const updated = { ...o, status: newStatus };
        if (activeOrder && activeOrder.id === orderId) setActiveOrder(updated);
        return updated;
      }
      return o;
    });

    setOrders(updatedOrders);
    try {
      localStorage.setItem('cravecraft_orders', JSON.stringify(updatedOrders));
      window.dispatchEvent(new Event('storage'));
    } catch (e) {}
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans">
      
      {/* Navigation Header */}
      <Navbar
        cartCount={cartCount}
        cartSubtotal={cartSubtotal}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        currentUser={currentUser}
        onLogout={() => setCurrentUser(null)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        isAdminView={isAdminView}
        setIsAdminView={setIsAdminView}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-4">
        
        {/* Active Live Order Tracker Banner */}
        {activeOrder && (
          <OrderTracker
            activeOrder={activeOrder}
            onCancelOrder={handleCancelOrder}
            onSimulateNextStep={handleSimulateNextStep}
          />
        )}

        {isAdminView ? (
          /* Admin Panel View */
          <AdminDashboard
            foodItems={foodItems}
            onAddItem={handleAddFoodItem}
            onDeleteItem={handleDeleteFoodItem}
            orders={orders}
            onUpdateOrderStatus={handleUpdateOrderStatus}
          />
        ) : (
          /* Customer Ordering View */
          <>
            <HeroBanner onSelectCategory={setSelectedCategory} />

            <CategoryFilter
              categories={CATEGORIES}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              foodItems={foodItems}
            />

            {/* Food Grid Section */}
            <div className="my-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                    {selectedCategory === 'all' ? 'Popular Gourmet Dishes' : CATEGORIES.find(c => c.id === selectedCategory)?.name}
                  </h2>
                  <p className="text-xs text-slate-400">Freshly prepared on demand with top ingredients</p>
                </div>
                <span className="text-xs font-bold text-slate-400 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl">
                  Showing {filteredItems.length} items
                </span>
              </div>

              {filteredItems.length === 0 ? (
                <div className="text-center py-16 bg-slate-900/50 rounded-3xl border border-slate-800 space-y-3">
                  <Utensils className="w-12 h-12 text-slate-600 mx-auto" />
                  <h3 className="text-lg font-bold text-slate-300">No dishes match your query</h3>
                  <p className="text-xs text-slate-500">Try searching for something else or switch category tabs.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredItems.map((item) => (
                    <FoodCard
                      key={item.id}
                      item={item}
                      onQuickAdd={handleQuickAdd}
                      onOpenDetails={(item) => setSelectedItemForModal(item)}
                    />
                  ))}
                </div>
              )}
            </div>
          </>
        )}

      </main>

      {/* Modals & Overlay Drawers */}
      <ItemModal
        item={selectedItemForModal}
        onClose={() => setSelectedItemForModal(null)}
        onAddToCart={handleCustomAddToCart}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveCartItem}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        appliedPromo={appliedPromo}
        setAppliedPromo={setAppliedPromo}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        grandTotal={
          Math.max(
            0,
            cartSubtotal - (appliedPromo?.rate ? cartSubtotal * appliedPromo.rate : 0) + (cartSubtotal > 30 ? 0 : 3.99) + (cartSubtotal * 0.08)
          )
        }
        onOrderSuccess={handleOrderSuccess}
        currentUser={currentUser}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onAuthSuccess={(user, token) => setCurrentUser(user)}
      />

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-900 py-10 mt-12 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center font-bold text-xs">
              CC
            </div>
            <div>
              <p className="font-extrabold text-slate-300">CraveCraft Food Express</p>
              <p className="text-[11px] text-slate-500">Full Stack Food Ordering App • Spring Boot & React Tech Stack</p>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <span className="hover:text-slate-400 transition-colors">Privacy Policy</span>
            <span className="hover:text-slate-400 transition-colors">Terms of Service</span>
            <span className="hover:text-slate-400 transition-colors">Spring Boot API Docs</span>
          </div>

          <div className="flex items-center space-x-1 text-slate-400">
            <span>Built with</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 mx-1" />
            <span>using Spring Boot, React & Tailwind CSS</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
