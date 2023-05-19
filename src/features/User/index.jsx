import React from "react";
import { Switch } from "react-router-dom";
import RouteWithSubRoutes from "routes/components/RouteWithSubRoutes";

function User({ routes }) {
	return (
		<Switch>
			{routes.map((route, i) => (
				<RouteWithSubRoutes key={i} {...route} />
			))}
		</Switch>
	);
}

export default User;
