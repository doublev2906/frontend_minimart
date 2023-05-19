import { unwrapResult } from "@reduxjs/toolkit";
import { createOrder, deleteMultiFromCart } from "app/purchaseSlide";
import { fetchUserAddress } from "app/userSlice";
import { images } from "constant";
import PurchaseForm from "features/Purchase/components/PurchaseForm";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { Col, Container, Row } from "reactstrap";

function UserPurchase() {
	const dispatch = useDispatch();
	const address = useSelector((state) => state.users.address);
	const user = useSelector((state) => state.users.user);
	const cart = useSelector((state) => state.purchase.cart);
	const history = useHistory();

	useEffect(() => {
		dispatch(fetchUserAddress());
	}, [dispatch]);

	const sumMoney = cart.reduce((pre, curr) => {
		const price = curr.price - (curr.price * curr.discount) / 100.0;
		return pre + price * curr.quantity;
	}, 0);

	const renderCartItems = () => {
		return cart?.map((item) => {
			const totalPrice =
				(item.price - (item.price * item.discount) / 100.0) *
				item.quantity;
			return (
				<div key={item._id} className='product-cart__item'>
					<div className='product-cart__item__img'>
						<img src={item.pictures[0]} alt='anh' />
						<span>{item.quantity}</span>
					</div>
					<p className='product-cart__item__title'>{item.title}</p>
					<p className='product-cart__item__total'>
						{totalPrice.toLocaleString()} <sup>đ</sup>
					</p>
				</div>
			);
		});
	};

	const onSubmitPurchase = (data) => {
		const productIds = cart.map((item) => item._id);
		const fetchCreateOrder = async () => {
			try {
				const response = dispatch(createOrder(data));
				unwrapResult(response);
				dispatch(deleteMultiFromCart(productIds));
				history.push("/user/orders");
			} catch (error) {
				throw error;
			}
		};

		toast.promise(fetchCreateOrder, {
			pending: "Đang xử lý",
			success: "Đặt hàng thành công!",
			error: {
				render({ error }) {
					return `${error.message}`;
				},
			},
		});
	};

	return (
		<div className='layout'>
			<div className='authen__header'>
				<Container>
					<div className='d-flex align-items-center justify-content-between authen__header--wrap'>
						<div className='d-flex align-items-center'>
							<Link to='/'>
								<img src={images.LOGO_B} alt='logo' />
							</Link>
							<h1 className='authen__header__title'>Đặt hàng</h1>
						</div>
						<p className='authen__header__text'>
							Thông tin mua hàng của bạn!
						</p>
					</div>
				</Container>
			</div>
			<div className='layout__content__background'>
				<Container>
					<Row>
						<Col md='12' className='bg-white shadow-sm p-5 my-5'>
							<div className='add-edit__header'>
								<h1 className='add-edit__heading'>Đặt hàng</h1>
								<p className='add-edit__sub-heading'>
									Vui lòng điền thông tin người nhận
								</p>
							</div>
							<Row className='user__purchase--wrap'>
								<Col md='6'>
									<PurchaseForm
										address={address}
										cart={cart}
										user={user}
										onSubmitPurchase={onSubmitPurchase}
									/>
								</Col>
								<Col md='6'>
									<div className='product-cart__list'>
										<h2 className='product-cart__heading'>
											Đơn hàng ({cart.length} sản phẩm)
										</h2>
										<div className='product-cart__item--wrap'>
											{renderCartItems()}
										</div>
										<div className='product-cart__sum'>
											<p>Tổng cộng</p>
											<p className='product-cart__sum__price'>
												{sumMoney.toLocaleString()}{" "}
												<sup>đ</sup>
											</p>
										</div>
										<p className='product-cart__error'></p>
										<input
											type='hidden'
											className='d-none'
											name='total_money'
											value='<?=$sum?>'
										/>
										<div className='product-cart__action'>
											<Link to='cart'>
												<i className='fa-solid fa-chevron-left'></i>{" "}
												Quay về giỏ hàng
											</Link>
										</div>
									</div>
								</Col>
							</Row>
						</Col>
					</Row>
				</Container>
			</div>
		</div>
	);
}

export default UserPurchase;
