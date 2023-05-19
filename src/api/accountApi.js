import axiosClient from "./axiosClient";

const baseUrl = "admin/user/";

const accountApi = {
	getUsers: () => {
		return axiosClient.get(baseUrl);
	},
	deleteUserById: (id) => {
		return axiosClient.delete(baseUrl + "delete/" + id);
	},
	deleteMultiUser: () => {
		return axiosClient.delete(baseUrl + "delete");
	},
	activeUser: (id) => {
		return axiosClient.put(baseUrl + "activated/" + id);
	},
};

export default accountApi;
