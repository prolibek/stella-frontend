import { createSlice } from "@reduxjs/toolkit";

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

interface IOrganisation {
    avatar: string,
    name: string,
    ceo: IUser,
    creator: IUser,
    description: string,
}

interface IOrganisationState {
    details: IOrganisation | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: IOrganisationState = {
    details: null,
    status: 'idle',
};  

export const organisationSlice = createSlice({
  name: 'organisation',
  initialState,
  reducers: {
    setOrganisationDetails: (state, action) => {
      state.details = action.payload;
      state.status = 'succeeded';
    },
    clearOrganisationDetails: (state) => {
      state.details = null;
      state.status = 'idle';
    },
  },
});

export const { setOrganisationDetails, clearOrganisationDetails } = organisationSlice.actions;

export default organisationSlice.reducer;