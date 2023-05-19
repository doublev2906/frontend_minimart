import { deleteFromCart, updateCartItem } from "app/purchaseSlide";
import PropTypes from "prop-types";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

CartPageItem.propTypes = {
	item: PropTypes.object.isRequired,
	handleCheck: PropTypes.func.isRequired,
	checkList: PropTypes.array.isRequired,
};

function CartPageItem({ item, handleCheck, checkList }) {
	const dispatch = useDispatch();
	const { _id, title, price, discount, quantity, pictures } = item;
	const [itemQuantity, setItemQuantity] = useState(quantity);
	const finalPrice = price - (price * discount) / 100.0;

	const onDeleteFromCart = () => {
		dispatch(deleteFromCart(_id));
	};

	const onCartBlur = (e) => {
		const target = e.target;
		const value = +target.value;

		if (+value === 0) {
			const newQuantity = 1;
			dispatch(updateCartItem({ id: _id, newQuantity }));
		}

		if (value !== quantity)
			dispatch(updateCartItem({ id: _id, newQuantity: value }));
	};

	const onUpdateCartTyping = (e) => {
		const target = e.target;
		const value = +target.value;

		if (value === 0) {
			const newQuantity = 1;
			setItemQuantity(newQuantity);
		} else if (value && value < 999) {
			const newQuantity = value;
			setItemQuantity(newQuantity);
			e.target.value = newQuantity;
		}
	};

	return (
		<div className='cart-page__item'>
			<div className='cart-page__item__checkbox'>
				<input
					type='checkbox'
					name='checkbox'
					value={_id}
					onChange={handleCheck}
					checked={checkList.includes(_id)}
				/>
			</div>
			<div className='cart-page__item__product'>
				<Link to={`/products/${title.replaceAll(" ", "-")}?id=${_id}`}>
					<img src={pictures[0]} alt='anh' />
				</Link>
				<Link to={`/products/${title.replaceAll(" ", "-")}?id=${_id}`}>
					<p>{title}</p>
				</Link>
			</div>
			<div className='cart-page__item__price'>
				<p>
					{finalPrice.toLocaleString()}
					<sup>đ</sup>
				</p>
			</div>
			<div className='cart-page__item__quantity'>
				<div className='cart-page__item__quantity__calculate'>
					<input
						type='number'
						value={itemQuantity || 0}
						onBlur={onCartBlur}
						onChange={onUpdateCartTyping}
					/>
				</div>
			</div>
			<div className='cart-page__item__total'>
				<p>
					{(finalPrice * quantity).toLocaleString()}
					<sup>đ</sup>
				</p>
			</div>
			<div className='cart-page__item__action'>
				<p>
					<i className='fas fa-times' onClick={onDeleteFromCart}></i>
				</p>
			</div>
		</div>
	);
}

export default CartPageItem;
