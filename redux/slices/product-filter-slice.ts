import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface ProductFilterState {
  searchText: string;
  currentPage: number;
  limit: number;
}

const initialState: ProductFilterState = {
  searchText: "",
  currentPage: 1,
  limit: 5,
};

const productFilterSlice = createSlice({
  name: "productFilter",
  initialState,
  reducers: {
    setSearchText: (state, action: PayloadAction<string>) => {
      state.searchText = action.payload;
      state.currentPage = 1;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    resetFilters: () => initialState,
  },
});

export const { setSearchText, setCurrentPage, resetFilters } =
  productFilterSlice.actions;
export default productFilterSlice.reducer;
