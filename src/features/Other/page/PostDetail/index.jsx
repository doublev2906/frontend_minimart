import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchCurrentPost } from "app/postsSlice";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { Col, Container, Row } from "reactstrap";
import SubMenu from "components/SubMenu";
import moment from "moment";
import parse from "html-react-parser";
import Loading from "components/Loading";

function PostDetail() {
	const dispatch = useDispatch();
	const { state } = useLocation();
	const post = useSelector((state) => state.posts.currentPost);

	useEffect(() => {
		dispatch(fetchCurrentPost(state.postId));
	}, [dispatch, state.postId]);

	const renderPostDetail = () => {
		return post ? (
			<div className='post__detail__content'>
				<h3 className='post__detail__content__title'>{post.title}</h3>
				<p className='post__detail__content__time'>
					{moment(post.createdAt).format("DD/MM/YYYY")}
				</p>
				<div className='post__detail__content__des'>
					{post.description ? parse(post.description) : ""}
				</div>

				<p className='post__detail__share'>Chia sẻ:</p>
				<div className='product-detail__page__info__share__list post__detail__share--wrap'>
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
		) : (
			<Loading />
		);
	};

	return (
		<Container className='px-md-5'>
			<Row className='post__detail'>
				<Col lg='2' className='d-md-none'>
					<h2 className='post__detail__title'>Danh mục tin tức</h2>
					<SubMenu />
				</Col>
				<Col>
					<h2 className='post__detail__title'>Chi tiết bài viết</h2>
					{renderPostDetail()}
				</Col>
			</Row>
		</Container>
	);
}

export default PostDetail;
