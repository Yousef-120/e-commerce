import { create } from "zustand";
 
export const cartStore = create((set, get) => ({
  cartLength: null,
  setCartLength: (val) => set({ cartLength: val }),
  cartVersion: 0,

  refreshCart: () =>
    set((state) => ({
      cartVersion: state.cartVersion + 1,
    })),
}));
