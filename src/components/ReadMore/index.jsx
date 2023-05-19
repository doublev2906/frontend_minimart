import React, { useState } from "react";
import PropTypes from "prop-types";

ReadMore.propTypes = {
	row: PropTypes.number.isRequired,
	readMore: PropTypes.bool,
	className: PropTypes.string,
};

ReadMore.defaultProps = {
	readMore: true,
};

function ReadMore({ content, row, readMore, className }) {
	const [isReadMore, setIsReadMore] = useState(true);

	const style = {
		WebkitLineClamp: row,
		display: isReadMore ? "-webkit-box" : "block",
	};

	const toggleReadMore = () => {
		setIsReadMore(!isReadMore);
	};

	return (
		<>
			<div
				className={className ? className + " read-more" : "read-more"}
				style={style}>
				{content}
			</div>
			{readMore ? (
				<span
					onClick={() => toggleReadMore()}
					className='read-more__btn'>
					{isReadMore ? "Xem thêm" : "Ẩn"}
				</span>
			) : (
				""
			)}
		</>
	);
}

export default ReadMore;
