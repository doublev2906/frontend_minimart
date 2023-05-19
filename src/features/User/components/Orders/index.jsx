import { fetchOrders } from "app/purchaseSlide";
import cls from "classnames";
import { images } from "constant";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function Orders() {
	const dispatch = useDispatch();
	const [active, setActive] = useState({
		item: 0,
		style: {
			left: 0,
			width: 0,
		},
	});
	const orders = useSelector((state) => {
		if (active.item === 0) return state.purchase.orders;

		if (active.item === 1)
			return state.purchase.orders.filter(
				(order) => order.status === "Chờ xác nhận"
			);

		if (active.item === 2)
			return state.purchase.orders.filter(
				(order) => order.status === "Chờ lấy hàng"
			);

		if (active.item === 3)
			return state.purchase.orders.filter(
				(order) => order.status === "Đã thanh toán"
			);
	});

	const firstItem = useRef();

	useEffect(() => {
		dispatch(fetchOrders());
		setActive((prev) => ({
			...prev,
			item: 0,
			style: {
				left: 0,
				width: firstItem.current.offsetWidth,
			},
		}));
	}, [dispatch]);

	const handleActiveTab = (e, item) => {
		setActive((prev) => ({
			...prev,
			item,
			style: {
				left: e.target.offsetLeft,
				width: e.target.offsetWidth,
			},
		}));
	};

	const renderOrderItem = () => {
		console.log(orders);
		let cOrders = [...orders].reverse();
		console.log(cOrders);
		return cOrders.length > 0 ? (
			cOrders.map((order, index) => {
				let total = 0;
				return (
					<div className='user__purchase__item' key={index}>
						<p
							className={cls({
								user__purchase__item__status: true,
								_0: order.status === "Chờ xác nhận",
								_1: order.status === "Chờ lấy hàng",
								_2: order.status === "Đã thanh toán",
							})}>
							{order.status}
						</p>
						<div className='user__purchase__product'>
							{order.products.map((product, ind) => {
								const productPrice =
									(product.price -
										(product.price * product.discount) /
											100.0) *
									order.quantity[ind];
								total += productPrice;
								return (
									<div
										className='user__purchase__product__item'
										key={ind}>
										<img
											src={product.pictures[0]}
											alt='anh'
											className='user__purchase__product__item__thumbnail'
										/>
										<div className='user__purchase__product__item__info'>
											<p className='user__purchase__product__item__name'>
												{product.title}
											</p>
											<p className='user__purchase__product__item__quantity'>
												x{order.quantity[ind]}
											</p>
										</div>
										<p className='user__purchase__product__item__total'>
											{productPrice.toLocaleString()}
											<sup>đ</sup>
										</p>
									</div>
								);
							})}
						</div>
						<div className='user__purchase__item__action'>
							<p className='user__purchase__item__sum'>
								Tổng số tiền:
								<span>
									{total.toLocaleString()}
									<sup>đ</sup>
								</span>
							</p>
						</div>
					</div>
				);
			})
		) : (
			<div className='user__purchase--empty'>
				<img src={images.LIST_EMPTY} alt='anh' />
				<p>Không có đơn hàng nào </p>
			</div>
		);
	};

	return (
		<div className='user__purchase'>
			<div className='user__purchase__header'>
				<ul className='user__purchase__header__tab'>
					<li
						className='user__purchase__header__item'
						ref={firstItem}
						onClick={(e) => handleActiveTab(e, 0)}>
						<p
							className={cls({
								user__purchase__header__link: true,
								active: active.item === 0,
							})}>
							Tất cả
						</p>
					</li>
					<li
						className='user__purchase__header__item'
						onClick={(e) => handleActiveTab(e, 1)}>
						<p
							className={cls({
								user__purchase__header__link: true,
								active: active.item === 1,
							})}>
							Chờ xác nhận
						</p>
					</li>
					<li
						className='user__purchase__header__item'
						onClick={(e) => handleActiveTab(e, 2)}>
						<p
							className={cls({
								user__purchase__header__link: true,
								active: active.item === 2,
							})}>
							Chờ lấy hàng
						</p>
					</li>
					<li
						className='user__purchase__header__item'
						onClick={(e) => handleActiveTab(e, 3)}>
						<p
							className={cls({
								user__purchase__header__link: true,
								active: active.item === 3,
							})}>
							Đã thanh toán
						</p>
					</li>

					<div
						className='user__purchase__header__line'
						style={active.style}></div>
				</ul>
			</div>

			<div className='user__purchase__list'>{renderOrderItem()}</div>
		</div>
	);
}

export default Orders;
