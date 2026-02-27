import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getCart, addToCart, updateCartItem, removeCartItem, clearCart } from '../services/api';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      const data = await getCart();
      setCart(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  const add = async (productId, quantity = 1) => {
    const updated = await addToCart(productId, quantity);
    setCart(updated);
  };

  const update = async (itemId, quantity) => {
    const updated = await updateCartItem(itemId, quantity);
    setCart(updated);
  };

  const remove = async (itemId) => {
    const updated = await removeCartItem(itemId);
    setCart(updated);
  };

  const clear = async () => {
    await clearCart();
    await refresh();
  };

  const itemCount = cart?.items?.reduce((sum, i) => sum + i.quantity, 0) || 0;
  const total = cart?.items?.reduce((sum, i) => sum + Number(i.product?.price || 0) * i.quantity, 0) || 0;

  return (
    <CartContext.Provider value={{ cart, loading, add, update, remove, clear, itemCount, total, refresh }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
