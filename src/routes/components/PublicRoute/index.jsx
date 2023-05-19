import UiLayout from "Layout/components/UiLayout";
import React from "react";
import { Route } from "react-router-dom";

function PublicRoute(route) {
	return (
		<Route
			path={route.path}
			exact={route.exact}
			render={(props) => (
				<UiLayout {...props}>
					<route.component routes={route.routes} />
				</UiLayout>
			)}
		/>
	);
}

export default PublicRoute;
