import { create } from "zustand";

// helper function لمقارنة arrays
const isArrayEqual = (a = [], b = []) =>
  a.length === b.length && a.every((v, i) => v === b[i]);

export const useStore = create((set, get) => ({

  /* ================= UI ================= */
  menuActive: false,
  setMenuActive: (val) => set({ menuActive: val }),

  filterActive: false,
  setFilterActive: (val) => set({ filterActive: val }),

  applyingFilters: false,
  setApplyingFilters: (val) => set({ applyingFilters: val }),

  /* ================= Filters ================= */
  selectedColor: "",
  setSelectedColor: (val) => set({ selectedColor: val }),

  selectedSize: "",
  setSelectedSize: (val) => set({ selectedSize: val }),

  selectedPriceRange: [],
  setSelectedPriceRange: (val) => set({ selectedPriceRange: val }),

  selectedPriceRangeChanged: false,
  setSelectedPriceRangeChanged: (val) =>
    set({ selectedPriceRangeChanged: val }),

  selectedFilterOptions: { color: "", size: "" },
  setSelectedFilterOptions: (val) =>
    set({ selectedFilterOptions: val }),

  /* ================= Filter Logic ================= */
  isFiltered: () => {
    const {
      selectedColor,
      selectedSize,
      selectedPriceRange,
    } = get();

    const colorNotChanged = selectedColor === "";
    const sizeNotChanged = selectedSize === "";
    const priceNotChanged = isArrayEqual(selectedPriceRange, []);

    return colorNotChanged && sizeNotChanged && priceNotChanged;
  },

  /* ================= Product Options ================= */
  selectedProductOptions: [],

  setSelectedProductOptions: (productId, key, value) =>
    set((state) => {
      const exists = state.selectedProductOptions.find(
        (item) => item.productId === productId
      );

      if (exists) {
        return {
          selectedProductOptions: state.selectedProductOptions.map((item) =>
            item.productId === productId
              ? { ...item, [key]: value }
              : item
          ),
        };
      }

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

  /* ================= Cart ================= */
  cart: [],

  addToCart: (item) =>
    set((state) => {
      const exists = state.cart.some(
        (product) => item.documentId === product.documentId
      );

      if (exists) return state;

      return {
        cart: [...state.cart, item],
      };
    }),

  removeFromCart: (item) =>
    set((state) => {
      const index = state.cart.findIndex(
        (product) => item.documentId === product.documentId
      );

      if (index !== -1) {
        return {
          ...state,
          cart: [
            ...state.cart.slice(0, index),
            ...state.cart.slice(index + 1),
          ],
          selectedProductOptions: state.selectedProductOptions.filter(
            (product) => product.productId !== item.documentId
          ),
        };
      }

      return state;
    }),

  isInCart: (id) =>
    get().cart.some((product) => product.documentId === id),
}));
