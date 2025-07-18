import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
  userToken: string | null;
  userId: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  userToken: null,
  userId: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthTokens: (state, action: PayloadAction<{ userToken: string; userId: string }>) => {
      state.isAuthenticated = true;
      state.userToken = action.payload.userToken;
      state.userId = action.payload.userId;
    },
    clearAuthTokens: (state) => {
      state.isAuthenticated = false;
      state.userToken = null;
      state.userId = null;
    },
  },
});

export const { setAuthTokens, clearAuthTokens } = authSlice.actions;
export default authSlice.reducer;
