import { deletePost } from "app/postsSlice";
import ReadMore from "components/ReadMore";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { Button } from "reactstrap";
import parse from "html-react-parser";

function Posts() {
	const posts = useSelector((state) => state.posts.listPosts);
	const dispatch = useDispatch();
	const { pathname } = useLocation();

	const handleDeleteItem = (id) => {
		if (window.confirm("Bạn có chắn chắn muốn xóa bài viết này")) {
			const fetchDeletePost = async () => {
				try {
					await dispatch(deletePost(id));
				} catch (error) {
					throw error;
				}
			};

			toast.promise(fetchDeletePost, {
				pending: "Đang xử lý",
				success: "Xóa bài viết thành công",
				error: {
					render({ data }) {
						return data.message;
					},
				},
			});
		}
	};

	const renderListPost = () => {
		return posts.length === 0 ? (
			<div className='list__body--empty'>
				<p>Không tìm thấy bài viết nào</p>
			</div>
		) : (
			posts.map((post, index) => (
				<div className='list__item' key={index}>
					<div className='list__title list__title--post'>
						<p className='list__title__text'>{post.title}</p>
					</div>
					<div className='list__pictures list__pictures--body'>
						{post.pictures && post.pictures.length > 1
							? post.pictures.map((img, i) => (
									<img
										src={img}
										key={i}
										alt='anh'
										className='img'
									/>
							  ))
							: post.pictures.map((img, i) => (
									<img
										src={img}
										key={i}
										alt='anh'
										className='img--w-100'
									/>
							  ))}
					</div>
					<div className='list__desc'>
						<ReadMore
							row={4}
							content={parse(post.description)}
							readMore={false}
						/>
					</div>

					<div className='list__action list__action--body'>
						<Link to={pathname + `/edit/${post._id}`}>
							<Button className='list__action__btn shadow-none'>
								Sửa
							</Button>
						</Link>
						<Button
							className='list__action__btn shadow-none'
							onClick={() => handleDeleteItem(post._id)}>
							Xóa
						</Button>
					</div>
				</div>
			))
		);
	};

	return (
		<div className='list-product shadow-sm'>
			<div className='list-product__header'>
				<h2>Tất cả bài viết</h2>
			</div>

			<div className='list-product__action list-product__action--post'>
				<div className='list-product__action__header'>
					<h3>{posts.length} bài viết</h3>
				</div>

				<Link className='ms-auto' to={pathname + "/add"}>
					<Button className='shadow-none list-product__action__add'>
						<i className='fas fa-plus'></i>
						Thêm 1 bài viết mới
					</Button>
				</Link>
			</div>

			<div className='list'>
				<div className='list__header'>
					<div className='list__title list__title--post'>
						<p>Tiêu đề bài viết</p>
					</div>
					<div className='list__pictures'>
						<p>Ảnh minh họa</p>
					</div>
					<div className='list__desc text-center'>
						<p>Nội dung</p>
					</div>

					<div className='list__action'>
						<p>Hành động</p>
					</div>
				</div>
				<div className='list__body'>{renderListPost()}</div>
			</div>
		</div>
	);
}

export default Posts;
