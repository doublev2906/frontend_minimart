import ProductSlider from "components/ProductSlider";
import ReadMore from "components/ReadMore";
import { bannerImg, images } from "constant";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Col, Container, Row } from "reactstrap";
import parse from "html-react-parser";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchProductsHomePage } from "app/productsSlice";
import { hideLoading, showLoading } from "app/uiSlice";

function HomePage() {
	const dispatch = useDispatch();
	const products = useSelector((state) => state.products.homepageProduct);
	const categories = useSelector((state) => state.categories);
	const posts = useSelector((state) => state.posts.listPosts);

	useEffect(() => {
		if (categories.length > 0 && products.length === 0) {
			try {
				dispatch(showLoading());
				dispatch(fetchProductsHomePage(categories[5]._id));
				dispatch(fetchProductsHomePage(categories[4]._id));
				dispatch(fetchProductsHomePage(categories[1]._id));
				// dispatch(fetchProductsHomePage(categories[6]._id));
				dispatch(hideLoading());
			} catch (error) {}
		}
	}, [categories, products, dispatch]);

	const renderListPost = () => {
		return posts.map((post, index) => {
			return index < 3 ? (
				<Col md='12' lg='4' key={index}>
					<div className='home__post__item'>
						<Link
							className='home__post__item__img'
							to={{
								pathname: `/posts/${post.title.replaceAll(
									" ",
									"-"
								)}`,
								state: {
									postId: post._id,
								},
							}}>
							<img
								src={post.pictures[0]}
								alt='anh'
								title={post.title}
							/>
						</Link>
						<div className='home__post__item__content'>
							<Link
								className='home__post__item__link'
								to={{
									pathname: `/posts/${post.title.replaceAll(
										" ",
										"-"
									)}`,
									state: {
										postId: post._id,
									},
								}}
								title={post.title}>
								{post.title}
							</Link>
							<ReadMore
								row={4}
								readMore={false}
								content={parse(post.description)}
							/>
						</div>
					</div>
				</Col>
			) : null;
		});
	};

	const renderHomeProducts = () => {
		if (products.length > 0) {
			return products.map((item) => {
				const cate = categories.find(
					(cate) => cate._id === item[0].category
				);
				return (
					<Col md='12' className='home__slider' key={cate._id}>
						<div className='home__link--wrap'>
							<Link
								to={`/category?id=${cate._id}`}
								className='home__link'>
								{cate.name}
							</Link>
						</div>
						<div className='d-none d-sm-none d-md-block d-lg-none overflow-hidden'>
							<ProductSlider
								dots={false}
								slidesToShow={3}
								slidesToScroll={2}
								products={item}
							/>
						</div>
						<div className='d-sm-block d-md-none d-lg-none overflow-hidden'>
							<ProductSlider
								dots={false}
								slidesToShow={2}
								slidesToScroll={2}
								products={item}
							/>
						</div>
						<div className='d-none d-sm-none d-md-none d-lg-block overflow-hidden'>
							<ProductSlider
								dots={false}
								slidesToShow={5}
								slidesToScroll={5}
								products={item}
							/>
						</div>
					</Col>
				);
			});
		}
	};

	return (
		<>
			<div className='top-slider'>
				<img src={images.SLIDER_IMG} alt='slider' />
			</div>
			<Container className='home px-md-5'>
				<Row className='home__banner'>
					{bannerImg.map((item, index) => {
						return (
							<Col
								xs='12'
								sm='12'
								md='4'
								className='mb-3'
								key={index}>
								<div className='home__banner__item'>
									<img
										src={item}
										alt='banner'
										className='home__banner__img'
									/>
								</div>
							</Col>
						);
					})}
					{renderHomeProducts()}
					<Col md='12' className='home__post'>
						<div className='home__link--wrap'>
							<Link to='/posts' className='home__link'>
								Mẹo hay sử dụng
							</Link>
						</div>
						<div className='home__post__list'>
							<Row>{renderListPost()}</Row>
						</div>
					</Col>
				</Row>
			</Container>
		</>
	);
}

export default HomePage;
