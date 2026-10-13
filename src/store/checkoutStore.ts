import { create } from 'zustand';

type OrderSummary = { orderNumber: string; itemCount: number; total: number };
type CheckoutState = {
  completedOrder: OrderSummary | null;
  completeCheckout: (order: OrderSummary) => void;
  resetCheckout: () => void;
};

export const useCheckoutStore = create<CheckoutState>((set) => ({
  completedOrder: null,
  completeCheckout: (completedOrder) => set({ completedOrder }),
  resetCheckout: () => set({ completedOrder: null }),
}));
