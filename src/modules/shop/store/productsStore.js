import { create } from "zustand";
import { getAllProducts, getOneProduct, getAllSizes } from "..";

export const useAllProducts = create((set) => ({
  products: [],
  loading: false,
  error: null,

  fetchProducts: async () => {
    set({ loading: true, error: null });

    try {
      const result = await getAllProducts();
      set({ products: result, loading: false });
    } catch (err) {
      set({ error: err.message });
      console.error("Error fetching new arrivals:", err);
    }
  },
}));

export const useOneProduct = create((set, get) => ({
  product: null,
  loading: false,
  error: null,

  fetchOneProduct: async (productId) => {
    const currentProduct = get().product;
    if (currentProduct && currentProduct.id === productId) return;

    set({ loading: true, error: null });

    try {
      const product = await getOneProduct(productId);

      if (!product) {
        set({ error: "Product not found", loading: false });
        return;
      }

      set({ product, loading: false });
    } catch (err) {
      set({ error: err.message || "Failed to fetch product", loading: false });
      console.error(`Error fetching product (${productId}):`, err);
    }
  },
}));

export const useProductsByTag = create((set, get) => ({
  productsByTag: {},
  loading: false,
  error: null,

  fetchProductsByTag: async (tagName) => {
    set({ loading: true, error: null });
    const existingData = get().productsByTag[tagName];
    if (existingData && existingData.length > 0) return;

    try {
      const allProducts = await getAllProducts();
      if (!allProducts) return;

      const result = allProducts.filter((product) => product.tags.some((tagInfo) => tagInfo.name === tagName));
      if (result.length === 0) {
        set({ loading: true, error: "No products for this tag" });
      }

      set((state) => ({
        productsByTag: { ...state.productsByTag, [tagName]: result },
        loading: false,
      }));
    } catch (err) {
      set({ error: err.message, loading: false });
      console.error(`Error fetching Products With This Tag (${tagName}):`, err);
    }
  },
}));

export const useAllSizes = create((set) => ({
  sizes: [],
  loading: false,
  error: null,

  fetchSizes: async () => {
    try {
      const receivingSizes = await getAllSizes();
      if (!receivingSizes) return;

      set(() => ({
        sizes: receivingSizes,
        loading: false,
      }));
    } catch (err) {
      set({ error: "Not Found", loading: false });
      console.error(`Error in receiving measurements`, err);
    }
  },
}));
