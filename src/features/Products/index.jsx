import { fetchProducts } from "app/productsSlice";
import qs from "query-string";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Switch, useLocation } from "react-router-dom";
import RouteWithSubRoutes from "routes/components/RouteWithSubRoutes";

function Products({ routes }) {
	const dispatch = useDispatch();
	const location = useLocation();

	const { page, sort, limit } = qs.parse(location.search);

	const [filter, setFilter] = useState({
		page: page,
		sort: sort,
		limit: limit || 20,
	});

	useEffect(() => {
		const search = qs.parse(location.search);
		if (
			search["price[lt]"] ||
			search["price[lte]"] ||
			search["price[gt]"] ||
			search["price[gte]"]
		) {
			setFilter((prev) => ({
				...prev,
				page: page,
				sort: sort,
				limit: limit || 20,
				"price[lt]": search["price[lt]"],
				"price[lte]": search["price[lte]"],
				"price[gt]": search["price[gt]"],
				"price[gte]": search["price[gte]"],
			}));
		} else {
			setFilter((prev) => ({
				...prev,
				page: page,
				sort: sort,
				limit: limit || 20,
			}));
		}
	}, [page, sort, limit, location.search]);

	useEffect(() => {
		const fetchProductWithFilter = async () => {
			try {
				dispatch(fetchProducts(filter));
			} catch (error) {
				throw error;
			}
		};

		fetchProductWithFilter();
	}, [dispatch, filter]);

	useEffect(() => {
		if (location.pathname === "/products" && !location.search) {
			dispatch(
				fetchProducts({
					limit: 20,
				})
			);
		}
	});

	return (
		<Switch>
			{routes.map((route, i) => (
				<RouteWithSubRoutes key={i} {...route} />
			))}
		</Switch>
	);
}

export default Products;
