import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface ProductFilterState {
  searchText: string;
  currentPage: number;
  limit: number;
  categoryId: string | null;
}

const initialState: ProductFilterState = {
  searchText: "",
  currentPage: 1,
  limit: 5,
  categoryId: null,
};

const productFilterSlice = createSlice({
  name: "productFilter",
  initialState,
  reducers: {
    setSearchText: (state, action: PayloadAction<string>) => {
      state.searchText = action.payload;
      state.currentPage = 1;
      state.categoryId = null;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setCategory: (state, action: PayloadAction<string | null>) => {
      state.categoryId = action.payload;
      state.currentPage = 1;
      state.searchText = "";
    },
    resetFilters: () => initialState,
  },
});

export const { setSearchText, setCurrentPage, setCategory, resetFilters } =
  productFilterSlice.actions;

export default productFilterSlice.reducer;
