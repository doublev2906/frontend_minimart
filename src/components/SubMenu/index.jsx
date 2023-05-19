import qs from "query-string";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";

function SubMenu() {
	const categories = useSelector((state) => state.categories);
	const [isOpen, setIsOpen] = useState(false);

	const renderSubItem = () => {
		return categories.map((item, index) => {
			return (
				<li className='second-menu__item' key={index}>
					<NavLink
						className='sub-menu__link'
						to={`/category?id=${item._id}`}
						activeClassName='active'
						isActive={(match, location) => {
							const { id } = qs.parse(location.search);
							return id === item._id;
						}}>
						{item.name}
					</NavLink>
				</li>
			);
		});
	};

	return (
		<div className='sub-menu'>
			<ul className='sub-menu__list'>
				<li className='sub-menu__item'>
					<Link className='sub-menu__link' to='/'>
						Trang chủ
					</Link>
				</li>
				<li className='sub-menu__item'>
					<NavLink
						className='sub-menu__link'
						to='/about-us'
						activeClassName='active'>
						Giới thiệu
					</NavLink>
				</li>
				<li className='sub-menu__item'>
					<p
						className='sub-menu__link sub-menu__link--not'
						onClick={() => setIsOpen((prev) => !prev)}>
						Sản phẩm{" "}
						<i
							className={`fas fa-chevron-right sub-menu__icon ${
								isOpen ? "active" : ""
							}`}></i>
					</p>
					<ul className={`second-menu ${isOpen ? "active" : ""}`}>
						{renderSubItem()}
					</ul>
				</li>
				<li className='sub-menu__item'>
					<NavLink
						className='sub-menu__link'
						to='/posts'
						activeClassName='active'>
						Tin tức
					</NavLink>
				</li>
			</ul>
		</div>
	);
}

export default SubMenu;
