import { clearCart } from "app/purchaseSlide";
import { userLogout } from "app/userSlice";
import BreadCrumb from "components/BreadCrumb";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import {
	Col,
	Collapse,
	Container,
	DropdownItem,
	DropdownMenu,
	Nav,
	Navbar,
	NavbarToggler,
	Row,
	UncontrolledDropdown,
} from "reactstrap";

function NavBar() {
	const dispatch = useDispatch();
	const history = useHistory();
	const { isLogin } = useSelector((state) => state.users);
	const categories = useSelector((state) => state.categories);

	const logout = () => {
		dispatch(clearCart());
		dispatch(userLogout());
		history.push("/");
	};

	return (
		<div className='navbar--wrap'>
			<Container className='p-md-0'>
				<Row className='align-items-center g-md-0'>
					<Col md='12' lg='3' className='navabr--wrap'>
						<Navbar expand className='py-0'>
							<NavbarToggler />
							<Collapse navbar>
								<Nav navbar className='w-100'>
									<UncontrolledDropdown inNavbar nav>
										<Link
											to='/products'
											className='nav-link'>
											<i className='fas fa-bars nav__icon'></i>
											Danh mục
										</Link>
										<DropdownMenu end>
											{categories.map((item, index) => {
												if (![0, 6].includes(index))
													return (
														<DropdownItem
															key={index}>
															<Link
																className='d-block'
																to={`/category?id=${item._id}`}>
																{item.name}
															</Link>
														</DropdownItem>
													);
											})}
										</DropdownMenu>
									</UncontrolledDropdown>
								</Nav>
								<div className='navbar__user d-lg-none d-block'>
									<i className='fa-solid fa-user'></i>

									<ul className='navbar__user__nav shadow'>
										{isLogin ? (
											<>
												<li className='navbar__user__item'>
													<Link
														to='/user'
														className='navbar__user__link'>
														Tài khoản của tôi
													</Link>
												</li>
												<li className='navbar__user__item'>
													<Link
														to='/user/orders'
														className='navbar__user__link'>
														Đơn mua
													</Link>
												</li>
												<li
													className='navbar__user__link'
													onClick={logout}>
													Đăng xuất
												</li>
											</>
										) : (
											<>
												<li className='navbar__user__item'>
													<Link
														to='/user/register'
														className='navbar__user__link'>
														Đăng ký
													</Link>
												</li>
												<li className='navbar__user__item'>
													<Link
														to='/user/login'
														className='navbar__user__link'>
														Đăng nhập
													</Link>
												</li>
											</>
										)}
									</ul>
								</div>
							</Collapse>
						</Navbar>
					</Col>
					<Col md='12' lg='9'>
						<BreadCrumb />
					</Col>
				</Row>
			</Container>
		</div>
	);
}

export default NavBar;
