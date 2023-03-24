import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
    },
    reducers: {
        login: (state, action) => {
            state.user = action.payload;
        },
        signout: (state) => {
            state.user = null;
        }
    },
});

export const { login, signout } = userSlice.actions;
export default userSlice.reducer;