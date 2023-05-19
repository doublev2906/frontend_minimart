import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteFromCart } from "app/purchaseSlide";

CartItem.propTypes = {
	product: PropTypes.object.isRequired,
};

function CartItem({ product }) {
	const { _id, title, pictures, price, quantity } = product;
	const dispatch = useDispatch();

	const onDeleteFromCart = () => {
		dispatch(deleteFromCart(_id));
	};

	return (
		<li className='cart__item'>
			<Link
				to={`/products/${title.replaceAll(" ", "-")}?id=${_id}`}
				className='cart__item__img'>
				<img src={pictures[0]} alt='anh' />
			</Link>
			<div className='cart__item__info'>
				<div className='cart__item__info--wrap'>
					<h3 className='cart__item__name'>
						<Link
							to={`/products/${title.replaceAll(
								" ",
								"-"
							)}?id=${_id}`}>
							{title}
						</Link>
					</h3>
					<p className='cart__item__price'>
						{price.toLocaleString()} <small>đ/kg</small>
					</p>
					<p className='cart__item__quantity'>Số lượng: {quantity}</p>
				</div>
				<div className='cart__item__action' onClick={onDeleteFromCart}>
					<i className='fas fa-trash-alt'></i>
				</div>
			</div>
		</li>
	);
}

export default CartItem;
