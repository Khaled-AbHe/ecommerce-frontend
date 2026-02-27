const BASE_URL = import.meta.env.VITE_API_URL || '';

function getSessionId() {
  let id = localStorage.getItem('sessionId');
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem('sessionId', id);
  }
  return id;
}

function getToken() {
  return localStorage.getItem('accessToken') || '';
}

async function request(path, options = {}) {
  const url = `${BASE_URL}/api${path}`;
  const token = getToken();
  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      'x-session-id': getSessionId(),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
    ...options,
  });

  if (res.status === 204) return null;

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'API Error');
  }
  return data;
}

// ── Auth ──────────────────────────────────────────────────────────────────────
export const signUp = (data) => request('/auth/sign-up', { method: 'POST', body: JSON.stringify(data) });
export const signIn = (data) => request('/auth/sign-in', { method: 'POST', body: JSON.stringify(data) });
export const getMe = () => request('/auth/me');

// ── Products ──────────────────────────────────────────────────────────────────
export const getProducts = (params = {}) => {
  const qs = new URLSearchParams(
    Object.fromEntries(Object.entries(params).filter(([, v]) => v !== undefined && v !== '')),
  ).toString();
  return request(`/products${qs ? `?${qs}` : ''}`);
};
export const getProduct = (id) => request(`/products/${id}`);
export const createProduct = (data) => request('/products', { method: 'POST', body: JSON.stringify(data) });
export const updateProduct = (id, data) => request(`/products/${id}`, { method: 'PUT', body: JSON.stringify(data) });
export const deleteProduct = (id) => request(`/products/${id}`, { method: 'DELETE' });

// ── Categories ────────────────────────────────────────────────────────────────
export const getCategories = () => request('/categories');
export const createCategory = (data) => request('/categories', { method: 'POST', body: JSON.stringify(data) });
export const updateCategory = (id, data) => request(`/categories/${id}`, { method: 'PUT', body: JSON.stringify(data) });
export const deleteCategory = (id) => request(`/categories/${id}`, { method: 'DELETE' });

// ── Cart ──────────────────────────────────────────────────────────────────────
export const getCart = () => request('/cart');
export const addToCart = (productId, quantity = 1) =>
  request('/cart/items', { method: 'POST', body: JSON.stringify({ productId, quantity }) });
export const updateCartItem = (itemId, quantity) =>
  request(`/cart/items/${itemId}`, { method: 'PUT', body: JSON.stringify({ quantity }) });
export const removeCartItem = (itemId) => request(`/cart/items/${itemId}`, { method: 'DELETE' });
export const clearCart = () => request('/cart', { method: 'DELETE' });

// ── Orders ────────────────────────────────────────────────────────────────────
export const getOrders = () => request('/orders');
export const getOrder = (id) => request(`/orders/${id}`);
export const createOrder = (data) => request('/orders', { method: 'POST', body: JSON.stringify(data) });
export const updateOrderStatus = (id, status) =>
  request(`/orders/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status }) });
