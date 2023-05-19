import React from "react";

import PropTypes from "prop-types";

NextPrevBtn.propTypes = {
	className: PropTypes.string,
	onClick: PropTypes.func,
	next: PropTypes.bool.isRequired,
};

function NextPrevBtn(props) {
	const { className, onClick, next } = props;
	return (
		<div className={className} onClick={onClick}>
			{next ? (
				<i className='fas fa-chevron-right'></i>
			) : (
				<i className='fas fa-chevron-left'></i>
			)}
		</div>
	);
}

export default NextPrevBtn;
