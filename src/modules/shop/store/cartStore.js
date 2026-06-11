import { create } from "zustand";
 
export const cartStore = create((set, get) => ({
  cartLength: null,
  setCartLength: (val) => set({ cartLength: val }),
}));
