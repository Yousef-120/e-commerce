import { create } from "zustand";

export const useStore = create((set) => ({
  filterActive: false,
  setFilterActive: (val) => set({ filterActive: val }),

  applyingFilters: false,
  setApplyingFilters: (val) => set({ applyingFilters: val }),

  selectedColor: "",
  setSelectedColor: (val) => set({ selectedColor: val }),

  selectedSize: "",
  setSelectedSize: (val) => set({ selectedSize: val }),

  selectedQty: 1,
  setSelectedQty: (val) => set({ selectedQty: val }),

  selectedFilterOptions: { color: "", size: "" },
  setSelectedFilterOptions: (val) => set({ selectedFilterOptions: val }),

  cart: [],
  addToCart: (item) =>
    set((state) => {
      const exists = state.cart.some((product) => item.documentId === product.documentId);

      if (exists) {
        return state;
      }
      return {
        cart: [...state.cart, item],
      };
    }),
}));
