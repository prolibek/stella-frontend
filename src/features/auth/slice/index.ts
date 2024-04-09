import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IUser {
  id: number,
  first_name: string,
  last_name: string,
  middle_name: string | null,
  email: string,
  birth_date: string | null,
  role: number,
  avatar: string | null
}

interface IAuthState {
  accessToken: string | null,
  user: IUser | null,
  status: 'succeeded' | 'idle'
}

const initialState: IAuthState = {
  accessToken: null,
  user: null,
  status: 'idle'
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
