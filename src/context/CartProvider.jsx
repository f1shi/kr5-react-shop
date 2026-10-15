import { useCallback, useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { getFinalPrice } from '../utils/priceUtils';
import { CartContext } from './cartContext';

const CART_STORAGE_KEY = 'kr5-react-shop-cart';

function CartProvider({ children }) {
  const [items, setItems] = useLocalStorage(CART_STORAGE_KEY, []);

  const addToCart = useCallback((product) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.product.id === product.id);

      if (existingItem) {
        return prevItems.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prevItems, { product, quantity: 1 }];
    });
  }, [setItems]);

  const changeQuantity = useCallback((productId, delta) => {
    setItems((prevItems) =>
      prevItems
        .map((item) =>
          item.product.id === productId
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }, [setItems]);

  const removeFromCart = useCallback((productId) => {
    setItems((prevItems) => prevItems.filter((item) => item.product.id !== productId));
  }, [setItems]);

  const clearCart = useCallback(() => {
    setItems([]);
  }, [setItems]);

  const value = useMemo(() => {
    const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = items.reduce(
      (sum, item) => sum + getFinalPrice(item.product) * item.quantity,
      0
    );

    return {
      items,
      totalCount,
      subtotal,
      addToCart,
      changeQuantity,
      removeFromCart,
      clearCart
    };
  }, [items, addToCart, changeQuantity, removeFromCart, clearCart]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export default CartProvider;
