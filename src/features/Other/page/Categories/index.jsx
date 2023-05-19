import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { Button, Col, Container, Row } from "reactstrap";
import moment from "moment";
import { fetchCategories } from "app/categoriesSlice";

function Categories() {
	const dispatch = useDispatch();
	const location = useLocation();
	const categories = useSelector((state) => state.categories);

	useEffect(() => {
		dispatch(fetchCategories());
	}, [dispatch]);

	const renderList = () => {
		return categories.map((category, index) => (
			<div
				className='category-list__content__body__list__item'
				key={index}>
				<div className='category-list__content__body__list__item__index'>
					<p>{index + 1}</p>
				</div>
				<div className='category-list__content__body__list__item__id'>
					<p>{category._id}</p>
				</div>
				<div className='category-list__content__body__list__item__name'>
					<p>{category.name}</p>
				</div>
				<div className='category-list__content__body__list__item__create'>
					<p>{moment(category.createdAt).format("MMMM Do YYYY")}</p>
				</div>
				<div className='category-list__content__body__list__item__update'>
					<p>{moment(category.updatedAt).format("MMMM Do YYYY")}</p>
				</div>
			</div>
		));
	};

	return (
		<Container>
			<Row>
				<Col className='category-list shadow-sm'>
					<div className='category-list__content'>
						<div className='category-list__content__header'>
							<h2>Danh mục các sản phẩm</h2>
							<p>Thông tin các danh mục của bạn</p>
						</div>

						<div className='category-list__content__body'>
							<div className='category-list__content__body__header'>
								<h3>{categories.length} danh mục</h3>
								<Link to={location.pathname + "/add"}>
									<Button className='category-list__content__body__header__add'>
										<i className='fas fa-plus'></i> Thêm 1
										danh mục
									</Button>
								</Link>
							</div>

							<div className='category-list__content__body__list'>
								<div className='category-list__content__body__list__header'>
									<div className='category-list__content__body__list__item__index'>
										<p>Số thứ tự</p>
									</div>
									<div className='category-list__content__body__list__item__id'>
										<p>Mã danh mục</p>
									</div>
									<div className='category-list__content__body__list__item__name'>
										<p>Tên danh mục</p>
									</div>
									<div className='category-list__content__body__list__item__create'>
										<p>Ngày tạo</p>
									</div>
									<div className='category-list__content__body__list__item__update'>
										<p>Ngày cập nhật</p>
									</div>
								</div>
								{renderList()}
							</div>
						</div>
					</div>
				</Col>
			</Row>
		</Container>
	);
}

export default Categories;
