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

  selectedFilterOptions: { color: "", size: "" },
  setSelectedFilterOptions: (val) => set({ selectedFilterOptions: val }),
}));
