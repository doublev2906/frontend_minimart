import axiosClient from "./axiosClient";

const baseUrl = "posts";

const postsApi = {
	createPost: (data) => {
		return axiosClient.post(baseUrl, data);
	},
	getAllPost: () => {
		return axiosClient.get(baseUrl);
	},
	getPost: (id) => {
		const url = `${baseUrl}/${id}`;
		return axiosClient.get(url);
	},
	updatePost: (id, data) => {
		const url = `${baseUrl}/${id}`;
		return axiosClient.put(url, data);
	},
	deletePost: (id) => {
		const url = `${baseUrl}/${id}`;
		return axiosClient.delete(url);
	},
};

export default postsApi;
