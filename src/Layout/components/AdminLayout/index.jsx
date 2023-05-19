import cls from "classnames";
import HeaderAdmin from "components/HeaderAdmin";
import NavBarAdmin from "components/NavBarAdmin";
import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";

function AdminLayout(props) {
	const navbar = useSelector((state) => state.ui.navbar);
	const [isOpenMenu, setIsOpenMenu] = useState(false);
	const menuRef = useRef(null);
	const location = useLocation();

	useEffect(() => {
		setIsOpenMenu(false);
	}, [location]);

	return (
		<Container fluid className='admin'>
			<Row>
				<HeaderAdmin />
			</Row>
			<Row className='admin__content'>
				<Col
					md='2'
					className={cls({
						admin__side: true,
						"d-none": navbar,
					})}>
					<NavBarAdmin />
				</Col>
				<Col
					className={cls({
						"admin__has-side": true,
						"mx-0": navbar,
					})}>
					<Row>
						<Col className='admin__component'>
							{props.children}

							<div
								className='admin__menu__btn'
								onClick={() => setIsOpenMenu(!isOpenMenu)}>
								<i className='fa-solid fa-bars-progress'></i>
							</div>

							<div
								className={cls({
									"admin__menu--wrap": true,
									hidden: !isOpenMenu,
								})}
								ref={menuRef}
								onClick={(e) => {
									if (e.target === menuRef.current)
										setIsOpenMenu(false);
								}}>
								<NavBarAdmin
									haveHeading={true}
									isOpenMenu={isOpenMenu}
								/>
							</div>
						</Col>
					</Row>
				</Col>
			</Row>
		</Container>
	);
}

export default AdminLayout;
