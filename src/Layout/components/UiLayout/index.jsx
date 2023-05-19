import Footer from "components/Footer";
import Header from "components/Header";
import NavBar from "components/NavBar";
import React from "react";
import { useLocation } from "react-router-dom";

function UiLayout(props) {
	const { pathname } = useLocation();
	return (
		<div className='layout__content__background'>
			{pathname.includes("login") ||
			pathname.includes("register") ||
			pathname.includes("purchase") ? (
				<>{props.children}</>
			) : (
				<>
					<Header />
					<NavBar />
					{props.children}
					<Footer />
				</>
			)}
		</div>
	);
}

export default UiLayout;
