import { hideNavbar, showNavbar } from "app/uiSlice";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, useLocation } from "react-router-dom";
import RouteWithSubRoutes from "routes/components/RouteWithSubRoutes";

function Admin({ routes }) {
	const { pathname } = useLocation();
	const dispatch = useDispatch();

	useEffect(() => {
		if (
			(!pathname.includes("address") && pathname.includes("add")) ||
			pathname.includes("edit")
		) {
			dispatch(hideNavbar());
		} else dispatch(showNavbar());
	}, [dispatch, pathname]);
	return (
		<Switch>
			{routes.map((route, i) => (
				<RouteWithSubRoutes key={i} {...route} />
			))}
		</Switch>
	);
}

export default Admin;
