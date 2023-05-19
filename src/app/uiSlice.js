import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
	name: "purchase",
	initialState: {
		loading: false,
		navbar: true,
	},
	reducers: {
		showLoading(state) {
			state.loading = true;
		},
		hideLoading(state) {
			state.loading = false;
		},
		showNavbar(state) {
			state.navbar = false;
		},
		hideNavbar(state) {
			state.navbar = true;
		},
	},
});

export const { showLoading, hideLoading, showNavbar, hideNavbar } =
	uiSlice.actions;

export default uiSlice.reducer;
