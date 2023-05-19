import BuyBtn from "components/BuyBtn";
import { images } from "constant/index";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartItem from "../CartItem";

function Cart() {
	const cart = useSelector((state) => state.purchase.cart);

	const totalPrice = cart
		.reduce((prev, curr) => {
			return prev + curr.price * curr.quantity;
		}, 0)
		.toLocaleString();

	const renderCartItem = () => {
		return cart.map((item, index) => {
			return <CartItem product={item} key={index} />;
		});
	};

	return (
		<div className='cart'>
			<div className='cart__group'>
				<Link
					to='/cart'
					className='cart__button'
					style={{ backgroundImage: `url(${images.BG_SEARCH})` }}>
					<i className='fas fa-shopping-bag'></i>
					<p>
						GIỎ HÀNG{" "}
						<span className='cart__quantity'>{`(${cart.length})`}</span>
					</p>
				</Link>

				<div className='cart__group__menu'>
					{cart.length === 0 ? (
						<div className='cart--empty'>
							<img src={images.EMPTYCART} alt='empty cart' />
							<p>Chưa có sản phẩm</p>
						</div>
					) : (
						<>
							<ul className='cart__list'>{renderCartItem()}</ul>
							<div className='cart__bottom'>
								<div className='cart__total-price'>
									<p>Tổng tiền</p>
									<span>
										{totalPrice}
										<small>đ</small>
									</span>
								</div>

								<BuyBtn
									content={"Tiến hành đặt hàng"}
									className={"w-100"}
								/>
							</div>
						</>
					)}
				</div>
			</div>
		</div>
	);
}

export default Cart;
