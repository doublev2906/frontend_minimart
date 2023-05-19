import { fetchCurrentProduct, fetchSameProducts } from "app/productsSlice";
import AddToCartBtn from "components/AddToCartBtn";
import ImageSlider from "components/ImageSlider";
import Loading from "components/Loading";
import ProductSlider from "components/ProductSlider";
import parse from "html-react-parser";
import qs from "query-string";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import { findItemById } from "utils";

function ProductDetail() {
	const { search } = useLocation();
	const { id } = qs.parse(search);
	const dispatch = useDispatch();
	const categories = useSelector((state) => state.categories);
	const sameProducts = useSelector((state) => state.products.sameProduct);
	const product = useSelector((state) => state.products.currentProduct);
	const [quantity, setQuantity] = useState(1);
	const {
		title,
		price,
		discount,
		description,
		country,
		category,
		pictures,
		sellNumber,
	} = product ? product : {};

	const productCategory = category ? findItemById(category, categories) : "";

	const productCurrentPrice = product
		? (price - price * (discount / 100)).toLocaleString()
		: "";
	const productPrice = product.price ? price.toLocaleString() : "";
	const productDesc = product.description ? parse(description) : "";

	useEffect(() => {
		if (id) {
			dispatch(fetchCurrentProduct(id));
		}
	}, [id, dispatch]);

	useEffect(() => {
		if (category) {
			dispatch(fetchSameProducts(category));
		}
	}, [category, dispatch]);

	return (
		<Container className='product-detail px-md-5'>
			<Row>
				{Object.entries(product).length === 0 ? (
					<Loading />
				) : (
					<>
						<Col md='12'>
							<section className='bg-white product-detail__page'>
								<Row>
									{/* Product image slider */}
									<Col md='4'>
										<ImageSlider
											pictures={pictures}
											slidesToScroll={1}
											slidesToShow={4}
											withModal={true}
											arrows={true}
											dots={false}
										/>
									</Col>

									{/* Product detail content */}
									<Col md='8'>
										<div className='product-detail__page__info'>
											<h2>{title}</h2>

											{/* Product evaluate */}
											<div className='product-detail__page__info__evaluate'>
												<div className='product-detail__page__info__evaluate__item'>
													<p>
														5{" "}
														<i className='fas fa-star'></i>
														<i className='fas fa-star'></i>
														<i className='fas fa-star'></i>
														<i className='fas fa-star'></i>
														<i className='fas fa-star'></i>
													</p>{" "}
												</div>
												<div className='product-detail__page__info__evaluate__item'>
													<p>
														0 <span>đánh giá</span>
													</p>
												</div>
												<div className='product-detail__page__info__evaluate__item'>
													<p>
														{sellNumber}{" "}
														<span>đã bán</span>
													</p>
												</div>
											</div>

											{/* Product price */}
											<div className='product-detail__page__info__bg'>
												{product.discount !== 0 ? (
													<>
														<p className='product__price--old product__price--detail--old'>
															<sup>đ</sup>
															{productPrice}
														</p>{" "}
														<p className='product__price product__price--detail'>
															<sup>đ</sup>
															{
																productCurrentPrice
															}
														</p>
														<span className='product__price__discount'>
															{discount}% GIẢM
														</span>
													</>
												) : (
													<p className='product__price product__price--detail'>
														<sup>đ</sup>
														{productPrice}
													</p>
												)}
											</div>

											{/* Product category */}
											<div className='d-flex align-items-center mt-4'>
												<p className='product-detail__page__info__text'>
													Phân loại{" "}
												</p>
												<p className='product-detail__page__info__text--dark'>
													{productCategory
														? productCategory.name
														: ""}
												</p>
											</div>

											{/* Product original */}
											<div className='d-flex align-items-center mt-4'>
												<p className='product-detail__page__info__text'>
													Xuất sứ
												</p>
												<p className='product-detail__page__info__text--dark'>
													{country}
												</p>
											</div>

											{/* Product quantity */}
											<div className='product-detail__page__info__quantity'>
												<p className='product-detail__page__info__text'>
													Số lượng{" "}
												</p>
												<div className='product__quantity'>
													<p
														className='product__quantity__btn'
														onClick={() => {
															if (quantity > 1) {
																setQuantity(
																	(
																		quantity
																	) =>
																		+quantity -
																		1
																);
															}
														}}>
														<i className='fas fa-minus'></i>
													</p>
													<input
														onBlur={(e) => {
															if (
																+e.target
																	.value === 0
															) {
																setQuantity(1);
															}
														}}
														type='text'
														value={
															quantity
																? quantity
																: ""
														}
														name='value'
														className='product__quantity__value'
														onChange={(e) => {
															if (
																+e.target
																	.value === 0
															) {
																setQuantity("");
															} else if (
																+e.target
																	.value < 999
															) {
																setQuantity(
																	+e.target
																		.value
																);
															}
														}}
													/>
													<p
														className='product__quantity__btn'
														onClick={() => {
															setQuantity(
																(quantity) =>
																	+quantity +
																	1
															);
														}}>
														<i className='fas fa-plus'></i>
													</p>
												</div>
											</div>

											<AddToCartBtn product={product} />

											{/* Share social */}
											<div className='product-detail__page__info__share'>
												<h3 className='product-detail__page__info__share__title'>
													Chia sẻ
												</h3>

												<div className='product-detail__page__info__share__list'>
													<p className='product-detail__page__info__share__item'>
														<i className='fab fa-facebook-messenger'></i>
													</p>
													<p className='product-detail__page__info__share__item'>
														<i className='fab fa-twitter'></i>
													</p>
													<p className='product-detail__page__info__share__item'>
														<i className='fab fa-facebook-f'></i>
													</p>
													<p className='product-detail__page__info__share__item'>
														<i className='fab fa-pinterest'></i>
													</p>
												</div>
											</div>
										</div>
									</Col>
								</Row>
							</section>
						</Col>

						{/* Product description */}
						<Col md='12'>
							<section className='bg-white product-detail__page'>
								<div className='product-detail__page__info__bg'>
									<h2>Mô tả sản phẩm</h2>
								</div>
								<div className='description'>{productDesc}</div>
							</section>
						</Col>

						{/* Slider products */}
						<Col md='12'>
							<h2 className='slider__title'>
								Sản phẩm cùng loại
							</h2>
							<section className='bg-white product-detail__page'>
								{sameProducts.length > 0 ? (
									<>
										<div className='d-none d-sm-none d-md-block d-lg-none overflow-hidden'>
											<ProductSlider
												products={sameProducts}
												slidesToScroll={2}
												slidesToShow={3}
												dots={false}
												infinite={false}
											/>
										</div>
										<div className='d-sm-block d-md-none d-lg-none overflow-hidden'>
											<ProductSlider
												products={sameProducts}
												slidesToScroll={2}
												slidesToShow={2}
												dots={false}
												infinite={false}
											/>
										</div>
										<div className='d-none d-sm-none d-md-none d-lg-block overflow-hidden'>
											<ProductSlider
												products={sameProducts}
												slidesToScroll={1}
												slidesToShow={5}
												dots={false}
												infinite={false}
											/>
										</div>
									</>
								) : (
									<p>Không có sản phẩm nào cùng loại</p>
								)}
							</section>
						</Col>
					</>
				)}
			</Row>
		</Container>
	);
}

ProductDetail.propTypes = {};

export default ProductDetail;
