"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Product } from "@/constants/data";

/* -------------------------------------------------------------------------- */
/* 購物車項目型別                                                              */
/* -------------------------------------------------------------------------- */

export type CartItem = {
  id: string;
  name: string;
  /** 單價（港幣） */
  price: number;
  image: string;
  quantity: number;
};

type CartContextValue = {
  items: CartItem[];
  /** 加入購物車（已存在則數量 +1） */
  addToCart: (product: Product) => void;
  /** 依商品 id 完全移出購物車 */
  removeFromCart: (productId: string) => void;
  /** 設定數量（小於 1 則移除） */
  updateQuantity: (productId: string, quantity: number) => void;
  /** 清空購物車 */
  clearCart: () => void;
  /** 購物車內商品總件數（加總 quantity） */
  totalQuantity: number;
  /** 總金額（港幣數字） */
  totalAmount: number;
};

const CartContext = createContext<CartContextValue | null>(null);

/* -------------------------------------------------------------------------- */
/* Provider                                                                    */
/* -------------------------------------------------------------------------- */

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = useCallback((product: Product) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: 1,
        },
      ];
    });
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setItems((prev) => prev.filter((item) => item.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    setItems((prev) => {
      if (quantity < 1) {
        return prev.filter((item) => item.id !== productId);
      }
      return prev.map((item) =>
        item.id === productId ? { ...item, quantity } : item,
      );
    });
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const totalQuantity = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items],
  );

  const totalAmount = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items],
  );

  const value = useMemo(
    () => ({
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      totalQuantity,
      totalAmount,
    }),
    [
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      totalQuantity,
      totalAmount,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

/* -------------------------------------------------------------------------- */
/* Hook                                                                        */
/* -------------------------------------------------------------------------- */

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart 必須在 CartProvider 內使用");
  }
  return context;
}
