import { fetchAccounts } from "app/accountSlice";
import { fetchOrders } from "app/purchaseSlide";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

function AdminHomePage() {
	const dispatch = useDispatch();
	const { pagination } = useSelector((state) => state.products);
	const categories = useSelector((state) => state.categories);
	const posts = useSelector((state) => state.posts.listPosts);
	const accounts = useSelector((state) => state.accounts);
	const orders = useSelector((state) => state.purchase.orders);

	useEffect(() => {
		dispatch(fetchOrders());
		dispatch(fetchAccounts());
	}, [dispatch]);

	return (
		<div className='admin__home'>
			<h2 className='admin__home__heading'>Thông số về website</h2>
			<p className='admin__home__sub-heading'>
				Số liệu về trang web của bạn
			</p>

			<div className='admin__home__info'>
				<Link to='/admin/orders' className='admin__home__item'>
					<p className='admin__home__item__number'>
						{
							orders.filter(
								(order) => order.status === "Chờ xác nhận"
							).length
						}
					</p>
					<p className='admin__home__item__text'>Chờ xác nhận</p>
				</Link>
				<Link to='/admin/orders' className='admin__home__item'>
					<p className='admin__home__item__number'>
						{
							orders.filter(
								(order) => order.status === "Chờ lấy hàng"
							).length
						}
					</p>
					<p className='admin__home__item__text'>Chờ lấy hàng</p>
				</Link>
				<Link to='/admin/orders' className='admin__home__item'>
					<p className='admin__home__item__number'>
						{
							orders.filter(
								(order) => order.status === "Đã thanh toán"
							).length
						}
					</p>
					<p className='admin__home__item__text'>Đã thanh toán</p>
				</Link>
				<Link to='/admin/orders' className='admin__home__item'>
					<p className='admin__home__item__number'>
						{orders
							.reduce((pre, curr) => {
								return curr.status === "Đã thanh toán"
									? pre + curr.sumMoney
									: pre;
							}, 0)
							.toLocaleString()}
					</p>
					<p className='admin__home__item__text'>Doang thu</p>
				</Link>
				<Link to='/admin/products' className='admin__home__item'>
					<p className='admin__home__item__number'>
						{pagination.total}
					</p>
					<p className='admin__home__item__text'>Sản phẩm</p>
				</Link>
				<Link to='/admin/categories' className='admin__home__item'>
					<p className='admin__home__item__number'>
						{categories.length}
					</p>
					<p className='admin__home__item__text'>Danh mục</p>
				</Link>
				<Link to='/admin/posts' className='admin__home__item'>
					<p className='admin__home__item__number'>{posts.length}</p>
					<p className='admin__home__item__text'>Bài viết</p>
				</Link>
				<Link to='/admin/accounts' className='admin__home__item'>
					<p className='admin__home__item__number'>
						{accounts.length}
					</p>
					<p className='admin__home__item__text'>Tài khoản</p>
				</Link>
			</div>
		</div>
	);
}

export default AdminHomePage;
