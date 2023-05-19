import AdminLayout from "Layout/components/AdminLayout";
import UiLayout from "Layout/components/UiLayout";
import React from "react";
import { Route } from "react-router-dom";

function PrivateRoute(route) {
	return route.common ? (
		<Route
			path={route.path}
			exact={route.exact}
			render={(props) => (
				<UiLayout {...props}>
					<route.component routes={route.routes} />
				</UiLayout>
			)}
		/>
	) : (
		<Route
			path={route.path}
			exact={route.exact}
			render={(props) => (
				<AdminLayout {...props}>
					<route.component routes={route.routes} />
				</AdminLayout>
			)}
		/>
	);
}

export default PrivateRoute;
