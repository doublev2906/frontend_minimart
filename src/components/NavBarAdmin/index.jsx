import cls from "classnames";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

NavBarAdmin.propTypes = {
	haveHeading: PropTypes.bool,
	isOpenMenu: PropTypes.bool,
};

NavBarAdmin.defaultProp = {
	haveHeading: false,
	isOpenMenu: false,
};

function NavBarAdmin({ haveHeading, isOpenMenu }) {
	const [active, setActive] = useState({
		orders: false,
		products: false,
		categories: false,
		posts: false,
		account: false,
	});

	const toggleActiveTask = (name) => {
		setActive((prev) => ({
			...prev,
			[name]: !active[name],
		}));
	};

	return (
		<div
			className={cls({
				"navbar--admin": true,
				active: isOpenMenu,
			})}>
			<p
				className={cls({
					"navbar--admin__heading": true,
					"d-none": !haveHeading,
				})}>
				MENU QUẢN TRỊ
			</p>
			<ul className='navbar--admin__list'>
				<li className='navbar--admin__item'>
					<div
						className='navbar--admin__item--wrap'
						onClick={() => toggleActiveTask("orders")}>
						<p className='navbar--admin__item__title'>
							<i className='fas fa-clipboard'></i> Quản lý đơn
							hàng
						</p>
						<i
							className={cls({
								"fas fa-chevron-down navbar--admin__item__icon": true,
								active: active.orders,
							})}></i>
					</div>

					<ul
						className={cls({
							"navbar--admin__subnav": true,
							active: active.orders,
						})}>
						<li className='navbar--admin__subitem'>
							<NavLink
								to='/admin/orders'
								isActive={(_, location) => {
									if (
										location.pathname + location.search ===
										"/admin/orders"
									)
										return true;
								}}
								className='navbar--admin__sublink'>
								Tất cả đơn hàng
							</NavLink>
						</li>
					</ul>
				</li>
				<li className='navbar--admin__item'>
					<div
						className='navbar--admin__item--wrap'
						onClick={() => toggleActiveTask("products")}>
						<p className='navbar--admin__item__title'>
							<i className='fas fa-box'></i> Quản lý sản phẩm
						</p>
						<i
							className={cls({
								"fas fa-chevron-down navbar--admin__item__icon": true,
								active: active.products,
							})}></i>
					</div>

					<ul
						className={cls({
							"navbar--admin__subnav": true,
							active: active.products,
						})}>
						<li className='navbar--admin__subitem'>
							<NavLink
								to='/admin/products'
								exact
								className='navbar--admin__sublink'>
								Tất cả sản phẩm
							</NavLink>
						</li>
						<li className='navbar--admin__subitem'>
							<NavLink
								to='/admin/products/add'
								exact
								className='navbar--admin__sublink'>
								Thêm sản phẩm
							</NavLink>
						</li>
					</ul>
				</li>
				<li className='navbar--admin__item'>
					<div
						className='navbar--admin__item--wrap'
						onClick={() => toggleActiveTask("posts")}>
						<p className='navbar--admin__item__title'>
							<i className='fab fa-megaport'></i> Quản lý bài viết
						</p>
						<i
							className={cls({
								"fas fa-chevron-down navbar--admin__item__icon": true,
								active: active.posts,
							})}></i>
					</div>

					<ul
						className={cls({
							"navbar--admin__subnav": true,
							active: active.posts,
						})}>
						<li className='navbar--admin__subitem'>
							<NavLink
								to='/admin/posts'
								exact
								className='navbar--admin__sublink'>
								Tất cả bài viết
							</NavLink>
						</li>
						<li className='navbar--admin__subitem'>
							<NavLink
								to='/admin/posts/add'
								exact
								className='navbar--admin__sublink'>
								Thêm bài viết
							</NavLink>
						</li>
					</ul>
				</li>
				<li className='navbar--admin__item'>
					<div
						className='navbar--admin__item--wrap'
						onClick={() => toggleActiveTask("categories")}>
						<p className='navbar--admin__item__title'>
							<i className='fas fa-thumbtack'></i> Quản lý danh
							mục
						</p>
						<i
							className={cls({
								"fas fa-chevron-down navbar--admin__item__icon": true,
								active: active.categories,
							})}></i>
					</div>

					<ul
						className={cls({
							"navbar--admin__subnav": true,
							active: active.categories,
						})}>
						<li className='navbar--admin__subitem'>
							<NavLink
								to='/admin/categories'
								exact
								className='navbar--admin__sublink'>
								Tất cả danh mục
							</NavLink>
						</li>
						<li className='navbar--admin__subitem'>
							<NavLink
								to='/admin/categories/add'
								exact
								className='navbar--admin__sublink'>
								Thêm danh mục
							</NavLink>
						</li>
					</ul>
				</li>
				<li className='navbar--admin__item'>
					<div
						className='navbar--admin__item--wrap'
						onClick={() => toggleActiveTask("account")}>
						<p className='navbar--admin__item__title'>
							<i className='fas fa-user-cog'></i> Quản lý tài
							khoản
						</p>
						<i
							className={cls({
								"fas fa-chevron-down navbar--admin__item__icon": true,
								active: active.account,
							})}></i>
					</div>

					<ul
						className={cls({
							"navbar--admin__subnav": true,
							active: active.account,
						})}>
						<li className='navbar--admin__subitem'>
							<NavLink
								to='/admin/info'
								exact
								className='navbar--admin__sublink'>
								Tài khoản
							</NavLink>
						</li>
						<li className='navbar--admin__subitem'>
							<NavLink
								to='/admin/password'
								exact
								className='navbar--admin__sublink'>
								Mật khẩu
							</NavLink>
						</li>
						<li className='navbar--admin__subitem'>
							<NavLink
								to='/admin/accounts'
								exact
								className='navbar--admin__sublink'>
								Tài khoản người dùng
							</NavLink>
						</li>
					</ul>
				</li>
			</ul>
		</div>
	);
}

export default NavBarAdmin;
