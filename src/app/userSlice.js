import userApi from "api/userApi";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const loginStatus = JSON.parse(localStorage.getItem("isLogin"));
const userInfo = JSON.parse(localStorage.getItem("user"));
const accessToken = JSON.parse(localStorage.getItem("token"));

export const userLogin = createAsyncThunk("user/userLogin", async (data) => {
	try {
		const response = await userApi.login(data);
		return response.data;
	} catch (error) {
		throw error.response.data.message;
	}
});

export const fetchUserInfo = createAsyncThunk(
	"users/fetchUserInfo",
	async (_, thunkApi) => {
		try {
			const response = await userApi.getUser();
			return response.data;
		} catch (error) {
			thunkApi.dispatch(
				getNewAccessToken(JSON.parse(localStorage.getItem("refresh")))
			);
			throw thunkApi.rejectWithValue();
		}
	}
);

export const getNewAccessToken = createAsyncThunk(
	"users/getNewAccessToken",
	async () => {
		try {
			const refreshToken = JSON.parse(localStorage.getItem("refresh"));
			const response = await userApi.getAccessToken(refreshToken);
			return response.data;
		} catch (error) {
			throw error.response;
		}
	}
);

export const updateUser = createAsyncThunk("users/updateUser", async (data) => {
	try {
		const response = await userApi.updateUser(data);
		return response.data;
	} catch (error) {
		throw error.response.data.message;
	}
});

export const fetchUserAddress = createAsyncThunk(
	"users/fetchUserAddress",
	async () => {
		try {
			const response = await userApi.getUserAddress();
			return response.data;
		} catch (error) {
			throw error.response.data.message;
		}
	}
);

export const addNewAddress = createAsyncThunk(
	"users/addNewAddress",
	async (data) => {
		try {
			const response = await userApi.createAddress(data);
			return response.data;
		} catch (error) {
			throw error.response.data.message;
		}
	}
);

export const updateUserAddress = createAsyncThunk(
	"users/updateUserAddress",
	async ({ id, data }) => {
		try {
			const response = await userApi.updateAddress(id, data);
			return response.data;
		} catch (error) {
			throw error.response.data.message;
		}
	}
);

export const deleteUserAddress = createAsyncThunk(
	"users/deleteUserAddress",
	async (id) => {
		try {
			await userApi.deleteAddress(id);
		} catch (error) {
			throw error.response.data.message;
		}
	}
);

const userSlice = createSlice({
	name: "users",
	initialState: {
		isLogin: loginStatus ? loginStatus : false,
		user: userInfo ? userInfo.user : {},
		accessToken: accessToken ? accessToken : "",
		address: [],
	},
	reducers: {
		userLogout: (state) => {
			state.isLogin = false;
			state.user = {};
			localStorage.clear();
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(userLogin.fulfilled, (state, action) => {
				state.isLogin = true;
				localStorage.setItem(
					"token",
					JSON.stringify(action.payload.accessToken)
				);
				localStorage.setItem(
					"refresh",
					JSON.stringify(action.payload.refreshToken)
				);
				localStorage.setItem("isLogin", JSON.stringify(state.isLogin));
			})
			.addCase(fetchUserInfo.fulfilled, (state, action) => {
				state.user = action.payload.user;
				localStorage.setItem("user", JSON.stringify(action.payload));
			})
			.addCase(updateUser.fulfilled, (state, action) => {
				state.user = action.payload.user;
				localStorage.setItem("user", JSON.stringify(action.payload));
			})
			.addCase(getNewAccessToken.fulfilled, (state, action) => {
				state.accessToken = action.payload.accessToken;
				localStorage.setItem(
					"token",
					JSON.stringify(state.accessToken)
				);
			})
			.addCase(fetchUserAddress.fulfilled, (state, action) => {
				state.address = action.payload.address;
			})
			.addCase(addNewAddress.fulfilled, (state, action) => {
				state.address.push({ ...action.payload.address });
			})
			.addCase(updateUserAddress.fulfilled, (state, { payload }) => {
				const { address } = payload;
				const index = state.address.findIndex(
					(item) => item._id === address._id
				);
				state.address[index] = address;
			})
			.addCase(deleteUserAddress.fulfilled, (state, { meta }) => {
				const index = state.address.findIndex(
					(item) => item._id === meta.arg
				);
				if (index !== -1) {
					state.address.splice(index, 1);
				}
			});
	},
});

export const { userLogout } = userSlice.actions;

export default userSlice.reducer;
