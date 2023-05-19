import Pagination from "components/Pagination";
import { images, limitPerPage } from "constant";
import PropTypes from "prop-types";
import qs from "query-string";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, NavLink, useHistory } from "react-router-dom";
import Select from "react-select";
import { Button, Input } from "reactstrap";
import cls from "classnames";
import ListItem from "../ListItem";

ProductsList.propTypes = {
	productList: PropTypes.array,
	categoryList: PropTypes.array,
	postList: PropTypes.array,
	handleDeleteItem: PropTypes.func.isRequired,
	handleDeleteSelectedItem: PropTypes.func.isRequired,
	location: PropTypes.object.isRequired,
};

function ProductsList({
	handleDeleteItem,
	handleDeleteSelectedItem,
	location,
}) {
	const categories = useSelector((state) => state.categories);
	const products = useSelector((state) => state.products.listProduct);
	const { total } = useSelector((state) => state.products.pagination);
	const history = useHistory();
	const [checkList, setCheckList] = useState([]);
	const [view, setView] = useState(true);

	const { pathname, search } = location;
	const { limit, sort } = qs.parse(search);

	// handle replace sort on query params
	const replaceSort = (field) => {
		return sort
			? search.replace(`sort=${sort}`, `sort=${field}`)
			: search + `&sort=${field}`;
	};

	// handle replace limit on query params
	const replaceLimit = (number) => {
		return "?limit=" + number;
	};

	// Handle select item
	const handleCheck = (e) => {
		const target = e.target;
		const name = e.target.name;
		const value = e.target.value;
		if (target.checked && !checkList.includes(value)) {
			if (name === "checkAll") {
				if (value !== "") {
					const listValue = value.split(",");
					setCheckList([...checkList, ...listValue]);
				}
			} else {
				setCheckList([...checkList, value]);
			}
		} else {
			if (name === "checkAll") setCheckList([]);
			else {
				const index = checkList.findIndex(
					(item) => item === e.target.value
				);
				checkList.splice(index, 1);
				setCheckList([...checkList]);
			}
		}
	};

	const renderListProduct = () => {
		return products.length === 0 ? (
			<div className='list__body--empty'>
				<img src={images.LIST_EMPTY} alt='anh' />
				<p>Không tìm thấy sản phẩm</p>
			</div>
		) : (
			products.map((product) => (
				<ListItem
					product={product}
					key={product._id}
					categories={categories}
					pathname={pathname}
					handleDeleteItem={handleDeleteItem}
					handleCheck={handleCheck}
					checkList={checkList}
				/>
			))
		);
	};

	return (
		<div className='list-product shadow-sm'>
			<div className='list-product__header'>
				<h2>Tất cả sản phẩm</h2>
				<div className='limit'>
					<p>Số sản phẩm trên 1 trang</p>
					<Select
						placeholder='Số sản phẩm trên 1 trang'
						className='limit__select'
						onChange={(val) => {
							history.push(
								`${pathname}${replaceLimit(val.value)}`
							);
						}}
						defaultValue={
							limit
								? limitPerPage.find((item) => {
										return item.value === +limit;
								  })
								: limitPerPage[2]
						}
						options={limitPerPage}
					/>
				</div>
			</div>

			<div className='list-product__action'>
				<div className='list-product__action__header'>
					<h3>{total} sản phẩm</h3>
					<p
						className={cls({
							"list-product__action__header__selected": true,
							"list-product__action__header__selected--visible":
								checkList.length > 0,
						})}>
						{checkList.length} sản phẩm được chọn
					</p>
					<p
						onClick={() => handleDeleteSelectedItem(checkList)}
						className={cls({
							"list-product__action__header__delete": true,
							"list-product__action__header__delete--visible":
								checkList.length > 0,
						})}>
						Xóa các sản phẩm
					</p>
				</div>

				<div className='filter'>
					<Link to={pathname + "/add"}>
						<Button className='shadow-none list-product__action__add'>
							<i className='fas fa-plus'></i>
							Thêm 1 sản phẩm mới
						</Button>
					</Link>
					<div className='filter-task'>
						<i className='fas fa-filter'></i>

						<ul className='filter-task__list shadow-lg'>
							<li className='filter-task__item'>
								<NavLink
									to={{
										pathname: pathname,
										search: search
											? replaceSort("-price")
											: "?sort=-price",
									}}
									className='filter-task__link'
									activeClassName='filter-task__link--active'
									isActive={() => sort === "-price"}>
									Giá từ cao đến thấp
									<i className='fas fa-sort-amount-down'></i>
								</NavLink>
							</li>
							<li className='filter-task__item'>
								<NavLink
									to={{
										pathname: pathname,
										search: search
											? replaceSort("price")
											: "?sort=price",
									}}
									className='filter-task__link'
									activeClassName='filter-task__link--active'
									isActive={() => sort === "price"}>
									Giá từ thấp đến cao{" "}
									<i className='fas fa-sort-amount-up'></i>
								</NavLink>
							</li>
							<li className='filter-task__item'>
								<NavLink
									to={{
										pathname: pathname,
										search: search
											? replaceSort("title")
											: "?sort=title",
									}}
									className='filter-task__link'
									activeClassName='filter-task__link--active'
									isActive={() => sort === "title"}>
									Tên từ A - Z{" "}
									<i className='fas fa-sort-alpha-down'></i>
								</NavLink>
							</li>
							<li className='filter-task__item'>
								<NavLink
									to={{
										pathname: pathname,
										search: search
											? replaceSort("-title")
											: "?sort=-title",
									}}
									className='filter-task__link'
									activeClassName='filter-task__link--active'
									isActive={() => sort === "-title"}>
									Tên từ Z - S{" "}
									<i className='fas fa-sort-alpha-up'></i>
								</NavLink>
							</li>
						</ul>
					</div>

					<div className='view'>
						<div
							className={cls({
								"view__item ": true,
								active: view,
							})}
							onClick={() => setView(true)}>
							<i className='fas fa-list'></i>
						</div>
						<div
							className={cls({
								"view__item ": true,
								active: !view,
							})}
							onClick={() => setView(false)}>
							<i className='fas fa-th-large'></i>
						</div>
					</div>
				</div>
			</div>

			<div
				className={cls({
					list: true,
					"list--no-border": !view,
				})}>
				<div
					className={cls({
						list__header: true,
						"list__header--hidden": !view,
					})}>
					<div className='list__checkbox'>
						<Input
							type='checkbox'
							name='checkAll'
							value={
								products ? products.map((item) => item._id) : ""
							}
							onChange={handleCheck}
							checked={checkList.length === products.length}
							className='check-input shadow-none'
						/>
					</div>
					<div className='list__name'>
						<p>Tên sản phẩm</p>
					</div>
					<div className='list__pictures'>
						<p>Ảnh minh họa</p>
					</div>
					<div className='list__cate'>
						<p>Phân loại hàng</p>
					</div>
					<div className='list__price'>
						<p>Giá</p>
					</div>
					<div className='list__origin'>
						<p>Xuất sứ</p>
					</div>
					<div className='list__action'>
						<p>Hành động</p>
					</div>
				</div>
				<div className='list__body'>{renderListProduct()}</div>
			</div>

			<Pagination location={location} />
		</div>
	);
}

export default ProductsList;
