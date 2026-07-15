import { create } from "zustand";
import { getCart, addToCartApi } from "..";
import { useUserStore } from "./useUserStore";

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
  setSelectedFilterOptions: (val) => set({ selectedFilterOptions: val }),

  setCart: (newCart) => set({ cart: newCart }),
  /* ================= Filter Logic ================= */
  isFiltered: () => {
    const { selectedColor, selectedSize, selectedPriceRange } = get();

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
        (item) => item.productId === productId,
      );

      if (exists) {
        return {
          selectedProductOptions: state.selectedProductOptions.map((item) =>
            item.productId === productId ? { ...item, [key]: value } : item,
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

  /* ================= Cart (API) ================= */
  cart: [],
  cartLoading: false,
  cartError: null,

  fetchCartFromApi: async () => {
    set({ cartLoading: true, cartError: null });
    try {
      const { token, user } = useUserStore.getState();
      const items = await getCart({ token, userId: user?.id });
      console.log("items from getCart", items);
      if (!items) {
        set({ cartLoading: false });
        return;
      }
      const formattedCart = items.map((product) => {
        const { cart_items, ...rest } = product;

        return {
          ...rest,
          qty: cart_items?.[0]?.qty ?? 1,
          size: cart_items?.[0]?.size ?? null,
          color: cart_items?.[0]?.color ?? null,
        };
      });
      console.log("formattedCart", formattedCart);

      const currentCart = get().cart;

      const isSame =
        JSON.stringify(currentCart) === JSON.stringify(formattedCart);

      if (isSame) {
        set({ cartLoading: false });
        return;
      }
      set({
        cart: formattedCart,
        cartLoading: false,
      });
      console.log("after set", get().cart);
    } catch (err) {
      set({
        cartError: err?.message || "Failed to fetch cart",
        cartLoading: false,
      });
    }
  },

  addToCartWithApi: async ({ product, color, size, qty }) => {
    const exists = get().cart.some((p) => p.documentId === product.documentId);
    if (exists) return;

    const { token, user } = useUserStore.getState();

    await addToCartApi({
      token,
      userId: user?.id,
      productId: product.id,
      color,
      size,
      qty,
    });

    set((state) => ({
      cart: [
        ...state.cart,
        {
          ...product,
          qty,
          size,
          color,
        },
      ],
    }));
  },

  updateCartQty: (documentId, qty) =>
    set((state) => ({
      cart: state.cart.map((product) =>
        product.documentId === documentId
          ? {
              ...product,
              qty,
            }
          : product,
      ),
    })),
  isInCart: (id) => get().cart.some((product) => product.documentId === id),
}));
