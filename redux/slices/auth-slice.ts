import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

interface AuthState {
  token: string | null;
}

const initialState: AuthState = {
  token: Cookies.get("token") || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      Cookies.set("token", action.payload);
    },
    logout: (state) => {
      state.token = null;
      Cookies.remove("token");
    },
  },
});

export const { setToken, logout } = authSlice.actions;
export default authSlice.reducer;
