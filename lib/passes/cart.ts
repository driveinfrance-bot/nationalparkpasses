"use client";

export type CartItem = {
  productId: string;
  title: string;
  jurisdiction: string;
  parkId?: string;
  activityType: string;
  quantity: number;
  officialFeeAud: number;
  serviceFeeAud: number;
};

export const CART_STORAGE_KEY = "npp_cart_v1";

export function getCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(CART_STORAGE_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as CartItem[];
  } catch {
    return [];
  }
}

export function saveCart(items: CartItem[]) {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event("cart-updated"));
}

export function addToCart(item: CartItem) {
  const current = getCart();
  const existing = current.find(
    (entry) =>
      entry.productId === item.productId &&
      entry.jurisdiction === item.jurisdiction &&
      entry.activityType === item.activityType &&
      entry.parkId === item.parkId
  );

  if (existing) {
    existing.quantity += item.quantity;
    saveCart([...current]);
    return;
  }

  saveCart([...current, item]);
}

export function cartCount(items: CartItem[]) {
  return items.reduce((sum, item) => sum + item.quantity, 0);
}

export function cartTotal(items: CartItem[]) {
  return items.reduce(
    (sum, item) => sum + (item.officialFeeAud + item.serviceFeeAud) * item.quantity,
    0
  );
}
