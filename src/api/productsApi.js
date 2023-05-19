import axiosClient from "./axiosClient";

const baseUrl = "products";
const productsApi = {
	createProduct: (data) => {
		return axiosClient.post(baseUrl, data);
	},
	updateProduct: (id, newData) => {
		const url = `${baseUrl}/${id}`;
		return axiosClient.put(url, newData);
	},
	getAllProduct: (params) => {
		return axiosClient.get(baseUrl, { params });
	},
	getProductById: (id) => {
		const url = `${baseUrl}/${id}`;
		return axiosClient.get(url);
	},
	getProductByCate: (id) => {
		const url = `${baseUrl}/category/${id}`;
		return axiosClient.get(url);
	},
	deleteProduct: (id) => {
		const url = `${baseUrl}/${id}`;
		return axiosClient.delete(url);
	},
	deleteMultiProduct: (data) => {
		return axiosClient.delete(baseUrl, { data });
	},
};

export default productsApi;
