import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    token: "",
    user: "",
}
export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        userRegistration: (state, action) => {
            state.token = action.payload.token;

        },
        userLoggineIn: (state, action) => {
            state.token = action.payload.accessToken;
            state.user = action.payload.user;
        },
        userLoogedOut: (state) => {
            state.token = "";
            state.user = "";
        }
    },
});

export const { userRegistration, userLoggineIn, userLoogedOut } = authSlice.actions;
export default authSlice.reducer;