import accountApi from "api/accountApi";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { hideLoading, showLoading } from "./uiSlice";

export const fetchAccounts = createAsyncThunk(
	"products/fetchAccounts",
	async (_, { dispatch }) => {
		try {
			dispatch(showLoading());
			const response = await accountApi.getUsers();
			dispatch(hideLoading());
			return response.data;
		} catch (error) {
			throw error.response.data.message;
		}
	}
);

export const disableAccount = createAsyncThunk(
	"products/disableAccount",
	async (id) => {
		try {
			const response = await accountApi.deleteUserById(id);
			return response.data;
		} catch (error) {
			throw error.response.data.message;
		}
	}
);

export const activeAccount = createAsyncThunk(
	"products/activeAccount",
	async (id) => {
		try {
			const response = await accountApi.activeUser(id);
			return response.data;
		} catch (error) {
			throw error.response.data.message;
		}
	}
);

const accountSlice = createSlice({
	name: "accounts",
	initialState: [],
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchAccounts.fulfilled, (_, action) => {
				return action.payload.users;
			})
			.addCase(disableAccount.fulfilled, (state, action) => {
				const index = state.findIndex(
					(account) => account._id === action.meta.arg
				);
				state[index].isActive = false;
			})
			.addCase(activeAccount.fulfilled, (state, action) => {
				const index = state.findIndex(
					(account) => account._id === action.meta.arg
				);
				state[index].isActive = true;
			});
	},
});

export default accountSlice.reducer;
