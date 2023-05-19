import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productsApi from "api/productsApi";
import { hideLoading, showLoading } from "./uiSlice";

export const fetchProducts = createAsyncThunk(
	"products/fetchProducts",
	async (params, { dispatch }) => {
		try {
			dispatch(showLoading());
			const response = await productsApi.getAllProduct(params);
			dispatch(hideLoading());
			return response.data;
		} catch (error) {
			throw error.response.data.message;
		}
	}
);

export const fetchProductsHomePage = createAsyncThunk(
	"products/fetchProductsHomePage",
	async (id) => {
		try {
			const response = await productsApi.getProductByCate(id);
			return response.data;
		} catch (error) {
			throw error.response.data.message;
		}
	}
);

export const fetchSameProducts = createAsyncThunk(
	"products/fetchSameProducts",
	async (id) => {
		try {
			const response = await productsApi.getProductByCate(id);
			return response.data;
		} catch (error) {
			throw error.response.data.message;
		}
	}
);

export const fetchProductsSearch = createAsyncThunk(
	"products/fetchProductsSearch",
	async (params, { dispatch }) => {
		try {
			dispatch(showLoading());
			const response = await productsApi.getAllProduct(params);
			dispatch(hideLoading());
			return response.data;
		} catch (error) {
			throw error.response.data.message;
		}
	}
);

export const fetchCurrentProduct = createAsyncThunk(
	"products/fetchCurrentProduct",
	async (id, { dispatch }) => {
		try {
			dispatch(showLoading());
			const response = await productsApi.getProductById(id);
			dispatch(hideLoading());
			return response.data;
		} catch (error) {
			throw error.response.data.message;
		}
	}
);

export const fetchProductsByCate = createAsyncThunk(
	"products/fetchProductsByCate",
	async (id, { dispatch }) => {
		try {
			dispatch(showLoading());
			const response = await productsApi.getProductByCate(id);
			dispatch(hideLoading());
			return response.data;
		} catch (error) {
			throw error.response.data.message;
		}
	}
);

export const createProduct = createAsyncThunk(
	"products/createProduct",
	async (data) => {
		try {
			const response = await productsApi.createProduct(data);
			return response.data;
		} catch (error) {
			throw error.response.data.message;
		}
	}
);

export const updateProduct = createAsyncThunk(
	"products/updateProduct",
	async ({ editProductId, formData }) => {
		try {
			const response = await productsApi.updateProduct(
				editProductId,
				formData
			);
			return response.data;
		} catch (error) {
			throw error.response.data.message;
		}
	}
);

export const deleteProduct = createAsyncThunk(
	"products/deleteProduct",
	async (id) => {
		try {
			await productsApi.deleteProduct(id);
		} catch (error) {
			throw error.response.data.message;
		}
	}
);

export const deleteMultiProduct = createAsyncThunk(
	"products/deleteMultiProduct",
	async (data) => {
		try {
			await productsApi.deleteMultiProduct(data);
		} catch (error) {
			throw error.response.data.message;
		}
	}
);

const productsSlice = createSlice({
	name: "products",
	initialState: {
		listProduct: [],
		homepageProduct: [],
		sameProduct: [],
		currentProduct: {},
		previewProduct: {
			product: {},
			isShow: false,
		},
		productsSearch: [],
		pagination: {},
	},
	reducers: {
		addPreview(state, action) {
			state.previewProduct.product = action.payload;
			state.previewProduct.isShow = true;
		},
		removePreview(state) {
			state.previewProduct = {
				product: {},
				isShow: false,
			};
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchProducts.fulfilled, (state, action) => {
				state.listProduct = action.payload.products;
				state.pagination = action.payload.pagination;
			})
			.addCase(fetchProductsHomePage.fulfilled, (state, action) => {
				state.homepageProduct.push(action.payload.products);
			})
			.addCase(fetchProductsByCate.fulfilled, (state, action) => {
				state.listProduct = action.payload.products;
			})
			.addCase(fetchSameProducts.pending, (state) => {
				state.sameProduct = [];
			})
			.addCase(fetchSameProducts.fulfilled, (state, action) => {
				state.sameProduct = action.payload.products;
			})
			.addCase(fetchCurrentProduct.pending, (state) => {
				state.currentProduct = {};
			})
			.addCase(fetchCurrentProduct.fulfilled, (state, action) => {
				state.currentProduct = action.payload.product;
			})
			.addCase(createProduct.fulfilled, (state, action) => {
				state.listProduct.unshift(action.payload.product);
				state.pagination.total += 1;
			})
			.addCase(updateProduct.fulfilled, (state, { payload }) => {
				const { product } = payload;
				const index = state.listProduct.findIndex(
					(item) => item._id === product._id
				);
				state.listProduct[index] = product;
			})
			.addCase(deleteProduct.fulfilled, (state, action) => {
				const index = state.listProduct.findIndex(
					(item) => item._id === action.meta.arg
				);
				if (index !== -1) {
					state.listProduct.splice(index, 1);
				}
			})
			.addCase(deleteMultiProduct.fulfilled, (state, { meta }) => {
				const { productIds } = meta.arg;
				productIds.forEach((item) => {
					state.listProduct.splice(
						state.listProduct.findIndex(
							(product) => product._id === item
						),
						1
					);
				});
			})
			.addCase(fetchProductsSearch.fulfilled, (state, action) => {
				state.productsSearch = action.payload.products;
				state.pagination = action.payload.pagination;
			});
	},
});

export const { addPreview, removePreview } = productsSlice.actions;

export default productsSlice.reducer;
