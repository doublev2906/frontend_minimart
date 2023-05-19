import ReadMore from "components/ReadMore";
import SubMenu from "components/SubMenu";
import parse from "html-react-parser";
import React from "react";
import { useSelector } from "react-redux";
import { Col, Container, Row } from "reactstrap";
import moment from "moment";
import { Link } from "react-router-dom";

function ListPost() {
	const posts = useSelector((state) => state.posts.listPosts);

	const renderPostList = () => {
		return posts.map((post, index) => (
			<Col md='6' key={index} className='post-list__item--wrap'>
				<div className='post-list__item'>
					<Link
						to={{
							pathname: `/posts/${post.title.replaceAll(
								" ",
								"-"
							)}`,
							state: {
								postId: post._id,
							},
						}}>
						<img src={post.pictures[0]} alt='anh' />
					</Link>
					<div className='post-list__item__content'>
						<Link
							to={{
								pathname: `/posts/${post.title.replaceAll(
									" ",
									"-"
								)}`,
								state: {
									postId: post._id,
								},
							}}
							className='post-list__item__title'>
							{post.title}
						</Link>
						<p className='post-list__item__time'>
							{moment(post.createdAt).format("DD/MM/YYYY")}
						</p>
						<ReadMore
							row={5}
							readMore={false}
							content={parse(post.description)}
						/>
					</div>
				</div>
			</Col>
		));
	};

	return (
		<Container className='px-md-5'>
			<Row className='post-list'>
				<Col lg='2'>
					<h2 className='post-list__title'>Danh mục tin tức</h2>
					<SubMenu />
				</Col>
				<Col>
					<h2 className='post-list__title'>Tin tức</h2>
					<Row>{renderPostList()}</Row>
				</Col>
			</Row>
		</Container>
	);
}

export default ListPost;
