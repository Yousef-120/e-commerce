import { create } from "zustand";

export const useStore = create((set, get) => ({
  
  menuActive: false,
  setMenuActive: (val) => set({menuActive: val}),

  filterActive: false,
  setFilterActive: (val) => set({ filterActive: val }),

  applyingFilters: false,
  setApplyingFilters: (val) => set({ applyingFilters: val }),

  selectedColor: "",
  setSelectedColor: (val) => set({ selectedColor: val }),

  selectedSize: "",
  setSelectedSize: (val) => set({ selectedSize: val }),

  selectedFilterOptions: { color: "", size: "" },
  setSelectedFilterOptions: (val) => set({ selectedFilterOptions: val }),

  selectedProductOptions: [],

  setSelectedProductOptions: (productId, key, value) =>
    set((state) => {
      // If product exists
      const exists = state.selectedProductOptions.find((item) => item.productId === productId);

      // If exists edit it
      if (exists) {
        return {
          selectedProductOptions: state.selectedProductOptions.map((item) => (item.productId === productId ? { ...item, [key]: value } : item)),
        };
      }
      // If not exists add new information
      return {
        selectedProductOptions: [
          ...state.selectedProductOptions,
          {
            productId,
            color: key === "color" ? value : "",
            size: key === "size" ? value : "",
            qty: key === "qty" ? value : 1,
          },
        ],
      };
    }),

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

  removeFromCart: (item) =>
    set((state) => {
      const index = state.cart.findIndex((product) => item.documentId === product.documentId);

      if (index !== -1) {
        return {
          ...state,
          cart: [...state.cart.slice(0, index), ...state.cart.slice(index + 1)],
          selectedProductOptions: state.selectedProductOptions.filter((product) => product.productId !== item.documentId),
        };
      }
      return state;
    }),

  isInCart: (id) => get().cart.some((product) => product.documentId === id),
}));
