import { createSlice } from "@reduxjs/toolkit";

const savedAuth = JSON.parse(localStorage.getItem("auth"));

const authSlice = createSlice({
    name: "auth",
    initialState: savedAuth || {
        isAuthenticated: false,
        role: null,
        email: null,
    },
    reducers: {
        login: (state, action) => {
            state.isAuthenticated = true;
            state.role = action.payload.role;
            state.email = action.payload.email;

            localStorage.setItem(
                "auth",
                JSON.stringify({
                    isAuthenticated: true,
                    role: action.payload.role,
                    email: action.payload.email,
                }),
            );
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.role = null;
            state.email = null;

            localStorage.removeItem("auth");
        },
    },
});

export const { login, logout } = authSlice.actions;
export const authReducer = authSlice.reducer;
