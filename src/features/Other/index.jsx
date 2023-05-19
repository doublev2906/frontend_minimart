import React from "react";
import { Switch } from "react-router-dom";
import RouteWithSubRoutes from "routes/components/RouteWithSubRoutes";

function CategoriesPosts({ routes }) {
	return (
		<Switch>
			{routes.map((route, i) => (
				<RouteWithSubRoutes key={i} {...route} />
			))}
		</Switch>
	);
}

export default CategoriesPosts;
