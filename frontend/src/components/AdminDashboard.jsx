import React, { useState } from 'react';
import { Plus, Trash2, DollarSign, ShoppingBag, Utensils, TrendingUp, CheckCircle, ShieldCheck, Flame, Leaf } from 'lucide-react';

export default function AdminDashboard({
  foodItems,
  onAddItem,
  onDeleteItem,
  orders,
  onUpdateOrderStatus
}) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newItem, setNewItem] = useState({
    name: '',
    description: '',
    price: '',
    category: 'burgers',
    prepTime: '15-20 min',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    tags: ['New Arrival'],
    isSpicy: false,
    isVegetarian: false,
    rating: 5.0,
    reviewsCount: 1,
    calories: 600
  });

  const totalRevenue = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
  const activeOrdersCount = orders.filter(o => o.status !== 'DELIVERED').length;

  const handleSubmitNewItem = (e) => {
    e.preventDefault();
    if (!newItem.name || !newItem.price) return;
    
    onAddItem({
      ...newItem,
      id: Date.now(),
      price: parseFloat(newItem.price),
      tags: [newItem.tags[0] || 'Chef Special']
    });
    
    setShowAddModal(false);
    setNewItem({
      name: '',
      description: '',
      price: '',
      category: 'burgers',
      prepTime: '15-20 min',
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
      tags: ['New Arrival'],
      isSpicy: false,
      isVegetarian: false,
      rating: 5.0,
      reviewsCount: 1,
      calories: 600
    });
  };

  return (
    <div className="space-y-8 my-8">
      {/* Stat Cards Header */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-semibold">Total Revenue</p>
            <p className="text-xl font-black text-white">${totalRevenue.toFixed(2)}</p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-orange-500/10 text-orange-400 border border-orange-500/20 flex items-center justify-center">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-semibold">Active Orders</p>
            <p className="text-xl font-black text-white">{activeOrdersCount}</p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-400 border border-purple-500/20 flex items-center justify-center">
            <Utensils className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-semibold">Menu Offerings</p>
            <p className="text-xl font-black text-white">{foodItems.length} Dishes</p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-semibold">Customer Satisfaction</p>
            <p className="text-xl font-black text-white">99.4%</p>
          </div>
        </div>
      </div>

      {/* Menu Management Section */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-black text-white">Menu Item Management</h2>
            <p className="text-xs text-slate-400">Add, edit or disable food items from live customer view</p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 font-extrabold text-xs flex items-center space-x-2 shadow-lg shadow-orange-500/20"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Dish</span>
          </button>
        </div>

        {/* Table of items */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-xs text-slate-400 uppercase font-bold">
                <th className="py-3 px-4">Dish</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Price</th>
                <th className="py-3 px-4">Rating</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-xs text-slate-200">
              {foodItems.map((item) => (
                <tr key={item.id} className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 flex items-center space-x-3">
                    <img src={item.image} alt={item.name} className="w-10 h-10 rounded-xl object-cover border border-slate-700" />
                    <div>
                      <p className="font-bold text-white">{item.name}</p>
                      <p className="text-[10px] text-slate-400 line-clamp-1">{item.description}</p>
                    </div>
                  </td>
                  <td className="py-3 px-4 font-semibold text-orange-400 capitalize">{item.category}</td>
                  <td className="py-3 px-4 font-extrabold text-white">${item.price.toFixed(2)}</td>
                  <td className="py-3 px-4 font-bold text-amber-400">★ {item.rating}</td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => onDeleteItem(item.id)}
                      className="p-2 rounded-xl text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                      title="Delete dish"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Customer Orders Table */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
        <div>
          <h2 className="text-xl font-black text-white">Live Orders Stream</h2>
          <p className="text-xs text-slate-400">Update status as chefs prepare and dispatch items</p>
        </div>

        {orders.length === 0 ? (
          <p className="text-xs text-slate-500 py-4">No customer orders placed yet.</p>
        ) : (
          <div className="space-y-3">
            {orders.map((order) => (
              <div key={order.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-mono font-bold text-orange-400">{order.id}</span>
                    <span className="text-xs text-slate-400">• {order.createdAt}</span>
                  </div>
                  <p className="text-xs font-bold text-white mt-1">
                    {order.items.map(i => `${i.quantity}x ${i.name}`).join(', ')}
                  </p>
                  <p className="text-[11px] text-slate-400">{order.address.street}, {order.address.city}</p>
                </div>

                <div className="flex items-center space-x-3">
                  <span className="text-sm font-black text-amber-300">${order.totalAmount ? order.totalAmount.toFixed(2) : '0.00'}</span>
                  <select
                    value={order.status}
                    onChange={(e) => onUpdateOrderStatus(order.id, e.target.value)}
                    className="p-2 rounded-xl bg-slate-900 border border-slate-700 text-xs font-bold text-slate-200 focus:outline-none focus:border-orange-500"
                  >
                    <option value="PLACED">Placed</option>
                    <option value="CONFIRMED">Confirmed</option>
                    <option value="PREPARING">Preparing in Kitchen</option>
                    <option value="OUT_FOR_DELIVERY">Out for Delivery</option>
                    <option value="DELIVERED">Delivered</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Item Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
          <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
            <h3 className="text-lg font-black text-white">Create New Culinary Offering</h3>
            <form onSubmit={handleSubmitNewItem} className="space-y-3">
              <div>
                <label className="block text-xs text-slate-400 mb-1">Dish Name</label>
                <input
                  type="text"
                  required
                  value={newItem.name}
                  onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
                  placeholder="e.g. Artisanal Truffle Pizza"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Price ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={newItem.price}
                    onChange={(e) => setNewItem({...newItem, price: e.target.value})}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
                    placeholder="14.99"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Category</label>
                  <select
                    value={newItem.category}
                    onChange={(e) => setNewItem({...newItem, category: e.target.value})}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
                  >
                    <option value="burgers">Burgers</option>
                    <option value="pizza">Artisan Pizza</option>
                    <option value="bowls">Healthy Bowls</option>
                    <option value="asian">Asian Fusion</option>
                    <option value="desserts">Desserts</option>
                    <option value="drinks">Beverages</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">Description</label>
                <textarea
                  value={newItem.description}
                  onChange={(e) => setNewItem({...newItem, description: e.target.value})}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
                  rows={2}
                  placeholder="Ingredients and culinary style..."
                />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">Image URL</label>
                <input
                  type="text"
                  value={newItem.image}
                  onChange={(e) => setNewItem({...newItem, image: e.target.value})}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
                />
              </div>
              <div className="flex items-center space-x-4 pt-2">
                <label className="flex items-center space-x-2 text-xs text-slate-300">
                  <input
                    type="checkbox"
                    checked={newItem.isVegetarian}
                    onChange={(e) => setNewItem({...newItem, isVegetarian: e.target.checked})}
                    className="rounded text-orange-500"
                  />
                  <span>Vegetarian</span>
                </label>
                <label className="flex items-center space-x-2 text-xs text-slate-300">
                  <input
                    type="checkbox"
                    checked={newItem.isSpicy}
                    onChange={(e) => setNewItem({...newItem, isSpicy: e.target.checked})}
                    className="rounded text-orange-500"
                  />
                  <span>Spicy</span>
                </label>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-orange-500 text-slate-950 text-xs font-extrabold"
                >
                  Save Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
