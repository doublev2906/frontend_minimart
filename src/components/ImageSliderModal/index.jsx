import NextPrevBtn from "components/NextPrevBtn";
import PropTypes from "prop-types";
import React, { useRef } from "react";
import { useEffect } from "react";
import Slider from "react-slick";

ImageSliderModal.propTypes = {
	pictures: PropTypes.array.isRequired,
	toggle: PropTypes.func.isRequired,
	index: PropTypes.number.isRequired,
};

ImageSliderModal.defaultProps = {
	pictures: [],
};

function ImageSliderModal({ pictures, toggle, index }) {
	const modal = useRef();
	const sliderRef = useRef();
	const settings = {
		autoplay: false,
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		fade: true,
		customPaging: function (i) {
			return <img src={pictures[i]} alt='anh' />;
		},
		dotsClass: "slick-dots slick-thumb",
		className: "slider-modal",
		nextArrow: <NextPrevBtn next={true} />,
		prevArrow: <NextPrevBtn next={false} />,
	};

	const handleClick = (index) => {
		sliderRef.current.slickGoTo(index);
	};

	useEffect(() => {
		handleClick(index);
	}, [index]);

	const renderPictures = () => {
		return pictures.map((picture, index) => {
			return (
				<div key={index} className='image-slider--modal__pictures'>
					<img src={picture} alt='anh' />
				</div>
			);
		});
	};

	return (
		<div
			className='image-slider--modal'
			ref={modal}
			onClick={(e) => {
				if (modal.current === e.target) toggle();
			}}>
			<div className='image-slider--modal__content'>
				<Slider {...settings} ref={sliderRef}>
					{renderPictures()}
				</Slider>
			</div>
		</div>
	);
}

export default ImageSliderModal;
