import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";

function MainPage(props) {
	const { user } = useSelector((state) => state.users);
	const { pathname } = useLocation();
	const [isOpen, setIsOpen] = useState(true);

	useEffect(() => {
		if (pathname.includes("purchase")) {
			setIsOpen(false);
		}
	}, [pathname]);

	return (
		<Container className='user px-md-5'>
			<Row>
				<Col className='d-none d-lg-block' lg='2'>
					<div className='user__nav'>
						<div className='user__nav__header'>
							<div className='user__nav__img'>
								<i className='fas fa-user'></i>
							</div>
							<div className='user__nav__basic-info'>
								<p className='user__nav__text'>{user.name}</p>
								<Link
									to='/user/profile'
									className='user__nav__sub-text'>
									<i className='fas fa-pen'></i> Sửa hồ sơ
								</Link>
							</div>
						</div>

						<ul className='user__nav__list'>
							<li className='user__nav__item'>
								<i className='fas fa-user'></i>
								<Link
									to='/user/profile'
									className='user__nav__link'>
									Tài khoản của tôi
								</Link>
								<ul
									className={classNames({
										"user__nav__sub-nav": true,
										open: isOpen,
									})}>
									<li className='user__nav__item sub-item'>
										<NavLink
											to='/user/profile'
											className='user__nav__link'
											activeClassName='active'>
											Hồ sơ
										</NavLink>
									</li>
									<li className='user__nav__item sub-item'>
										<NavLink
											to='/user/address'
											className='user__nav__link'
											activeClassName='active'>
											Địa chỉ
										</NavLink>
									</li>
									<li className='user__nav__item sub-item'>
										<NavLink
											to='/user/password'
											className='user__nav__link'
											activeClassName='active'>
											Đổi mật khẩu
										</NavLink>
									</li>
								</ul>
							</li>

							<li className='user__nav__item'>
								<i className='fas fa-clipboard'></i>
								<NavLink
									exact
									to='/user/orders'
									className='user__nav__link'>
									Đơn hàng
								</NavLink>
							</li>
						</ul>
					</div>
				</Col>
				<Col>
					<div className='user__content'>
						{React.Children.map(props.children, (child) => {
							return React.cloneElement(child);
						})}
					</div>
				</Col>
			</Row>

			<div className='user__setting__btn d-block d-lg-none'>
				<i className='fa-solid fa-gear'></i>
				<div className='user__nav shadow'>
					<ul className='user__nav__list'>
						<li className='user__nav__item'>
							<i className='fas fa-user'></i>
							<Link
								to='/user/profile'
								className='user__nav__link'>
								Tài khoản của tôi
							</Link>
							<ul className='user__nav__sub-nav open'>
								<li className='user__nav__item sub-item'>
									<NavLink
										to='/user/profile'
										className='user__nav__link'
										activeClassName='active'>
										Hồ sơ
									</NavLink>
								</li>
								<li className='user__nav__item sub-item'>
									<NavLink
										to='/user/address'
										className='user__nav__link'
										activeClassName='active'>
										Địa chỉ
									</NavLink>
								</li>
								<li className='user__nav__item sub-item'>
									<NavLink
										to='/user/password'
										className='user__nav__link'
										activeClassName='active'>
										Đổi mật khẩu
									</NavLink>
								</li>
							</ul>
						</li>

						<li className='user__nav__item'>
							<i className='fas fa-clipboard'></i>
							<NavLink
								exact
								to='/user/orders'
								className='user__nav__link'>
								Đơn hàng
							</NavLink>
						</li>
					</ul>
				</div>
			</div>
		</Container>
	);
}

export default MainPage;
