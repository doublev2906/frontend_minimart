import ImageSliderModal from "components/ImageSliderModal";
import NextPrevBtn from "components/NextPrevBtn";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";

ImageSlider.propTypes = {
	dots: PropTypes.bool,
	infinite: PropTypes.bool,
	draggable: PropTypes.bool,
	arrows: PropTypes.bool,
	slidesToShow: PropTypes.number,
	slidesToScroll: PropTypes.number,
	pictures: PropTypes.array.isRequired,
	withModal: PropTypes.bool,
};

ImageSlider.defaultProps = {
	dots: true,
	infinite: false,
	draggable: false,
	slidesToShow: 1,
	slidesToScroll: 1,
	arrows: false,
	pictures: [],
	withModal: false,
};

function ImageSlider({
	dots,
	infinite,
	slidesToShow,
	slidesToScroll,
	pictures,
	withModal,
	draggable,
	arrows,
	...props
}) {
	const [imgActive, setImgActive] = useState(pictures[0] ? pictures[0] : "");
	const [openModal, SetOpenModal] = useState(false);
	const settings = {
		dots: dots,
		infinite: infinite,
		speed: 500,
		slidesToShow: slidesToShow || pictures.length,
		slidesToScroll: slidesToScroll,
		nextArrow: <NextPrevBtn next={true} />,
		prevArrow: <NextPrevBtn next={false} />,
		draggable: draggable,
		arrows: arrows,
	};

	const toggleModal = () => {
		SetOpenModal(!openModal);
	};

	useEffect(() => {
		setImgActive(pictures[0]);
	}, [pictures]);

	const renderPictures = () => {
		return pictures.map((picture, index) => {
			return (
				<div
					key={index}
					className={`image-slider__item ${
						imgActive === picture
							? "image-slider__item--active"
							: ""
					}`}
					onMouseMove={() => {
						setImgActive(picture);
					}}>
					<img src={picture} alt='anh' />
				</div>
			);
		});
	};

	return (
		<div className='image-slider'>
			<div
				className={`image-active ${withModal ? "image-has-modal" : ""}`}
				onClick={toggleModal}>
				<img src={imgActive} alt='anh' />
				<i className='fas fa-search-plus image-active__icon'></i>
			</div>
			<div className='image-slider__list'>
				<Slider {...settings}>{renderPictures()}</Slider>
			</div>
			{withModal && openModal ? (
				<ImageSliderModal
					pictures={pictures}
					toggle={toggleModal}
					index={pictures.indexOf(imgActive)}
				/>
			) : (
				""
			)}
		</div>
	);
}

export default ImageSlider;
