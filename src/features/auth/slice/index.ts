import { createSlice } from '@reduxjs/toolkit';

interface IAuthState {
  accessToken: any | null,
  user: any,
  status: string
}

const token = localStorage.getItem('access_token')
const initialState = {
  accessToken: token ? token : null,
  user: null,
  status: token ? 'succeeded' : 'idle'
}

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
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
  }
});


export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
