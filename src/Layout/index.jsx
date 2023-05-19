import { fetchCategories } from "app/categoriesSlice";
import { fetchPosts } from "app/postsSlice";
import { fetchProducts } from "app/productsSlice";
import { fetchCart } from "app/purchaseSlide";
import { fetchUserInfo } from "app/userSlice";
import Loading from "components/Loading";
import ScrollTopBtn from "components/ScrollTopBtn";
import ScrollToTop from "components/ScrollToTop";
import ProductPreview from "features/Products/components/ProductPreview";
import React, { Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { adminRoutes, guestRoutes, userRoutes } from "routes";
import PrivateRoute from "routes/components/PrivateRoute";
import PublicRoute from "routes/components/PublicRoute";

function Layout() {
	const { user, isLogin, accessToken } = useSelector((state) => state.users);
	const { role } = user;
	const dispatch = useDispatch();

	useEffect(() => {
		const getNeededInfo = async () => {
			try {
				dispatch(fetchCategories());
				dispatch(fetchProducts({ limit: 10 }));
				dispatch(fetchPosts());
			} catch (error) {
				throw error;
			}
		};

		getNeededInfo();
	}, [dispatch]);

	useEffect(() => {
		if (isLogin || accessToken) {
			dispatch(fetchUserInfo());
			dispatch(fetchCart());
		}
	}, [dispatch, isLogin, accessToken]);

	const renderRoutes = () => {
		if (isLogin) {
			return role === "admin"
				? adminRoutes.map((route, i) => (
						<PrivateRoute key={i} {...route} />
				  ))
				: userRoutes.map((route, i) => (
						<PublicRoute key={i} {...route} />
				  ));
		}

		return guestRoutes.map((route, i) => (
			<PublicRoute key={i} {...route} />
		));
	};

	return (
		<Router>
			<Suspense fallback={<Loading />}>
				<ScrollToTop />
				<div className='Layout'>
					<Switch>{renderRoutes()}</Switch>
					<Loading />
					<ProductPreview />
					<ScrollTopBtn />
					<ToastContainer autoClose={2000} />
				</div>
			</Suspense>
		</Router>
	);
}

export default Layout;
