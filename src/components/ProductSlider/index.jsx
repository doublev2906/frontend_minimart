import NextPrevBtn from "components/NextPrevBtn";
import ProductCard from "features/Products/components/ProductCard";
import PropTypes from "prop-types";
import React from "react";
import Slider from "react-slick";

ProductSlider.propTypes = {
	dots: PropTypes.bool,
	draggable: PropTypes.bool,
	infinite: PropTypes.bool,
	slidesToShow: PropTypes.number,
	slidesToScroll: PropTypes.number,
	products: PropTypes.array.isRequired,
};

ProductSlider.defaultProps = {
	dots: true,
	infinite: false,
	slidesToShow: 4,
	slidesToScroll: 1,
	draggable: true,
};

function ProductSlider({
	dots,
	infinite,
	slidesToShow,
	slidesToScroll,
	draggable,
	products,
}) {
	const settings = {
		dots: dots,
		infinite: infinite,
		speed: 500,
		slidesToShow: slidesToShow,
		slidesToScroll: slidesToScroll,
		nextArrow: <NextPrevBtn next={true} />,
		prevArrow: <NextPrevBtn next={false} />,
		draggable: draggable,
	};

	const renderProducts = () => {
		return products.map((product, index) => {
			return <ProductCard product={product} key={index} />;
		});
	};

	return (
		<div className='product-slider'>
			<div className='product-slider__list'>
				<Slider {...settings}>{renderProducts()}</Slider>
			</div>
		</div>
	);
}

export default ProductSlider;
