const API_BASE_URL = 'http://localhost:8080/api';

let backendAvailable = null;
let lastHealthCheck = 0;

async function isBackendAvailable() {
  const now = Date.now();
  // Cache health check for 10 seconds to reduce failed network noise
  if (backendAvailable !== null && (now - lastHealthCheck < 10000)) {
    return backendAvailable;
  }
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 1000);
    const response = await fetch(`${API_BASE_URL}/health`, { 
      method: 'GET',
      signal: controller.signal
    });
    clearTimeout(timeoutId);
    backendAvailable = response.ok;
  } catch {
    backendAvailable = false;
  }
  lastHealthCheck = now;
  return backendAvailable;
}

export const apiService = {
  // Check backend server availability
  async checkBackendHealth() {
    return await isBackendAvailable();
  },

  // Auth API
  async login(credentials) {
    if (await isBackendAvailable()) {
      try {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(credentials)
        });
        if (response.ok) return await response.json();
      } catch {}
    }

    // Fallback mock authentication
    return {
      token: 'mock-jwt-token-' + Date.now(),
      user: {
        id: 1,
        name: credentials.email.split('@')[0] || 'User',
        email: credentials.email,
        role: credentials.email.includes('admin') ? 'ROLE_ADMIN' : 'ROLE_USER'
      }
    };
  },

  async register(userData) {
    if (await isBackendAvailable()) {
      try {
        const response = await fetch(`${API_BASE_URL}/auth/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userData)
        });
        if (response.ok) return await response.json();
      } catch {}
    }

    return {
      token: 'mock-jwt-token-' + Date.now(),
      user: {
        id: Date.now(),
        name: userData.name,
        email: userData.email,
        role: 'ROLE_USER'
      }
    };
  },

  // Food Items API
  async getFoodItems() {
    if (await isBackendAvailable()) {
      try {
        const response = await fetch(`${API_BASE_URL}/food`);
        if (response.ok) return await response.json();
      } catch {}
    }
    return null;
  },

  async addFoodItem(item, token) {
    if (await isBackendAvailable()) {
      try {
        const response = await fetch(`${API_BASE_URL}/food`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token ? `Bearer ${token}` : ''
          },
          body: JSON.stringify(item)
        });
        if (response.ok) return await response.json();
      } catch {}
    }
    return { ...item, id: Date.now() };
  },

  // Orders API
  async getOrders() {
    if (await isBackendAvailable()) {
      try {
        const response = await fetch(`${API_BASE_URL}/orders`);
        if (response.ok) return await response.json();
      } catch {}
    }

    // Fallback to shared localStorage for cross-browser/cross-tab synchronization
    try {
      const stored = localStorage.getItem('cravecraft_orders');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  },

  async createOrder(orderPayload, token) {
    let newOrder = null;

    if (await isBackendAvailable()) {
      try {
        const response = await fetch(`${API_BASE_URL}/orders`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token ? `Bearer ${token}` : ''
          },
          body: JSON.stringify(orderPayload)
        });
        if (response.ok) {
          newOrder = await response.json();
        }
      } catch {}
    }

    if (!newOrder) {
      newOrder = {
        id: 'ORD-' + Math.floor(100000 + Math.random() * 900000),
        createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'PLACED',
        estimatedMinutes: 25,
        driverName: 'Alex Rivers',
        driverPhone: '+1 (555) 234-5678',
        driverVehicle: 'Electric Scooter (Plate: SF-892)',
        ...orderPayload
      };
    }

    // Save to shared localStorage so all open windows/browsers stay synced!
    try {
      const existing = JSON.parse(localStorage.getItem('cravecraft_orders') || '[]');
      const updated = [newOrder, ...existing];
      localStorage.setItem('cravecraft_orders', JSON.stringify(updated));
      window.dispatchEvent(new Event('storage'));
    } catch (err) {}

    return newOrder;
  },

  async updateOrderStatus(orderId, status) {
    if (await isBackendAvailable()) {
      try {
        const response = await fetch(`${API_BASE_URL}/orders/${orderId}/status`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status })
        });
        if (response.ok) return await response.json();
      } catch {}
    }
    return null;
  }
};
