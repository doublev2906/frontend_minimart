import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import postsApi from "api/postsApi";
import { hideLoading, showLoading } from "./uiSlice";

export const fetchPosts = createAsyncThunk(
	"posts/fetchPosts",
	async (_, { dispatch }) => {
		try {
			dispatch(showLoading());
			const response = await postsApi.getAllPost();
			dispatch(hideLoading());
			return response.data;
		} catch (error) {
			throw error;
		}
	}
);

export const fetchCurrentPost = createAsyncThunk(
	"posts/fetchCurrentPost",
	async (id, { dispatch }) => {
		try {
			dispatch(showLoading());
			const response = await postsApi.getPost(id);
			dispatch(hideLoading());
			return response.data;
		} catch (error) {
			throw error;
		}
	}
);

export const updatePost = createAsyncThunk(
	"posts/updatePost",
	async ({ editPostId, formData }) => {
		try {
			const response = await postsApi.updatePost(editPostId, formData);
			return response.data;
		} catch (error) {
			throw error;
		}
	}
);

export const createPost = createAsyncThunk("posts/createPost", async (data) => {
	try {
		const response = await postsApi.createPost(data);
		return response.data;
	} catch (error) {
		throw error;
	}
});

export const deletePost = createAsyncThunk("posts/deletePost", async (id) => {
	try {
		const response = await postsApi.deletePost(id);
		return response.data;
	} catch (error) {
		throw error;
	}
});

const postsSlice = createSlice({
	name: "posts",
	initialState: {
		listPosts: [],
		currentPost: {},
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchPosts.fulfilled, (state, action) => {
				state.listPosts = action.payload.posts;
			})
			.addCase(fetchCurrentPost.pending, (state) => {
				state.currentPost = {};
			})
			.addCase(fetchCurrentPost.fulfilled, (state, action) => {
				state.currentPost = action.payload.post;
			})
			.addCase(updatePost.fulfilled, (state, action) => {
				const { post } = action.payload;
				const index = state.listPosts.findIndex(
					(item) => item._id === post._id
				);
				state.listPosts[index] = post;
			})
			.addCase(createPost.fulfilled, (state, action) => {
				state.listPosts.unshift(action.payload.post);
			})
			.addCase(deletePost.fulfilled, (state, action) => {
				const index = state.listPosts.findIndex(
					(item) => item._id === action.meta.arg
				);
				if (index !== -1) {
					state.listPosts.splice(index, 1);
				}
			});
	},
});

export default postsSlice.reducer;
