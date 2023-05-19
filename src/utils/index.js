export const findItemById = (id, list) => {
	return list.find((item) => item._id === id);
};
