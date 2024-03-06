import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    accessToken: null,
    user: null,
    status: 'idle', // 'idle', 'loading', 'succeeded', 'failed'
  },
  reducers: {
    login: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
      state.status = 'succeeded';
    },
    logout: (state) => {
      state.accessToken = null;
      state.user = null;
      state.status = 'idle';
    },
  },
});


export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
