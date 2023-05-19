import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import categoriesApi from "api/categoriesApi";

export const fetchCategories = createAsyncThunk(
	"categories/fetchCategories",
	async () => {
		try {
			const response = await categoriesApi.getAllCategory();
			return response.data;
		} catch (error) {
			throw error;
		}
	}
);

export const createCate = createAsyncThunk(
	"categories/createCate",
	async (data) => {
		try {
			const response = await categoriesApi.createCategory(data);
			return response.data;
		} catch (error) {
			throw error;
		}
	}
);

const categoriesSlice = createSlice({
	name: "categories",
	initialState: [],
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchCategories.fulfilled, (state, action) => {
			const list = action.payload.categories.filter((item, index) => {
				return ![0, 6].includes(index);
			});
			console.log(list);
			// return state.concat(action.payload.categories);
			return [...list];
		});
	},
});

export default categoriesSlice.reducer;
