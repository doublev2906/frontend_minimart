import { clearCart } from "app/purchaseSlide";
import { userLogout } from "app/userSlice";
import { images } from "constant";
import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";

function HeaderAdmin() {
	const { name } = useSelector((state) => state.users.user);
	const dispatch = useDispatch();
	const history = useHistory();

	const logOut = () => {
		dispatch(userLogout());
		dispatch(clearCart());
		history.push("/");
	};

	return (
		<div className='header--admin'>
			<div className='header--admin__side'>
				<Link to='/admin'>
					<img
						src={images.LOGO_B}
						alt='anh'
						className='header--admin__logo'
					/>
				</Link>
				<h1 className='header--admin__heading'>Trang quản trị</h1>
			</div>
			<div className='header--admin__side'>
				<div className='header--admin__user'>
					<i className=' fas fa-user-circle'></i>
					<p>{name}</p>
				</div>
				<div className='header--admin__task'>
					<div className='header--admin__task__list'>
						<i className='fas fa-bars'></i>

						<div className='header--admin__task__menu'>
							<div className='header--admin__task__menu__item'>
								<Link
									to='/admin/products'
									className='header--admin__task__menu__icon blue'>
									<i className='fas fa-gift'></i>
								</Link>
								<p className='header--admin__task__menu__title'>
									Sản phẩm
								</p>
							</div>
							<div className='header--admin__task__menu__item'>
								<Link
									to='/admin/categories'
									className='header--admin__task__menu__icon green'>
									<i className='fas fa-list-ul'></i>
								</Link>
								<p className='header--admin__task__menu__title'>
									Danh mục
								</p>
							</div>
							<div className='header--admin__task__menu__item'>
								<Link
									to='/admin/orders'
									className='header--admin__task__menu__icon orange'>
									<i className='fas fa-box'></i>
								</Link>

								<p className='header--admin__task__menu__title'>
									Đơn hàng
								</p>
							</div>
							<div className='header--admin__task__menu__item'>
								<Link
									to='/admin/posts'
									className='header--admin__task__menu__icon sky'>
									<i className='fab fa-megaport'></i>
								</Link>

								<p className='header--admin__task__menu__title'>
									Bài viết
								</p>
							</div>
							<div className='header--admin__task__menu__item'>
								<Link
									to='/admin/info'
									className='header--admin__task__menu__icon grey'>
									<i className='fas fa-cog'></i>
								</Link>

								<p className='header--admin__task__menu__title'>
									Tài khoản
								</p>
							</div>
							<div className='header--admin__task__menu__item'>
								<Link
									to='/'
									className='header--admin__task__menu__icon yellow'>
									<i className='fas fa-sign-out-alt'></i>
								</Link>

								<p className='header--admin__task__menu__title'>
									Trang chủ
								</p>
							</div>
						</div>
					</div>
					<p className='header--admin__task__notification'>
						<i className='far fa-bell'></i>
					</p>
					<p className='header--admin__task__button' onClick={logOut}>
						Đăng xuất
					</p>
				</div>
			</div>
		</div>
	);
}

export default HeaderAdmin;
