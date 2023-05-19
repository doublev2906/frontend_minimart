import React, { useEffect, useState } from "react";

const ScrollTopBtn = () => {
	const [visible, setVisible] = useState(false);

	const toggleVisible = () => {
		const scrolled = document.documentElement.scrollTop;
		if (scrolled > 300) {
			setVisible(true);
		} else if (scrolled <= 300) {
			setVisible(false);
		}
	};

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	useEffect(() => {
		window.addEventListener("scroll", toggleVisible);

		return () => {
			window.removeEventListener("scroll", toggleVisible);
		};
	}, []);

	return (
		<div
			className='scroll-btn shadow-sm'
			onClick={scrollToTop}
			style={{ display: visible ? "flex" : "none" }}>
			<i className='fa-solid fa-chevron-up'></i>
		</div>
	);
};

export default ScrollTopBtn;
