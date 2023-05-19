import axiosClient from "./axiosClient";

const cartUrl = "cart/";
const ordersUrl = "orders/";

const purchaseApi = {
	getCart: () => {
		return axiosClient.get(cartUrl);
	},
	addToCart: (data) => {
		return axiosClient.put(cartUrl + "add", data);
	},
	updateCartById: (quantity, id) => {
		return axiosClient.put(cartUrl + "update-product/" + id, quantity);
	},
	deleteCartById: (id) => {
		return axiosClient.put(cartUrl + "delete-product/" + id);
	},
	deleteCartByIds: (productIds) => {
		return axiosClient.put(cartUrl + "delete-product", productIds);
	},
	getOrders: () => {
		return axiosClient.get(ordersUrl);
	},
	getOrderDetail: (id) => {
		return axiosClient.get(ordersUrl + id);
	},
	createOrder: (data) => {
		return axiosClient.post(ordersUrl, data);
	},
	changeOrderStatus: (data, id) => {
		return axiosClient.put(ordersUrl + "change-status/" + id, data);
	},
};

export default purchaseApi;
