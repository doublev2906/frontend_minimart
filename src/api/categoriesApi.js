import axiosClient from "./axiosClient";

const baseUrl = "categories";

const categoriesApi = {
	createCategory: (data) => {
		return axiosClient.post(baseUrl, data);
	},
	getAllCategory: () => {
		return axiosClient.get(baseUrl);
	},
};

export default categoriesApi;
