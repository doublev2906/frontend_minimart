import React from "react";
import PropTypes from "prop-types";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";

BuyBtn.propTypes = {
	content: PropTypes.string.isRequired,
	className: PropTypes.string,
};

function BuyBtn({ content, className }) {
	return (
		<Link to='/purchase' className='flex-grow-1'>
			<Button className={`buy-btn shadow-none  ${className}`}>
				{content}
			</Button>
		</Link>
	);
}

export default BuyBtn;
