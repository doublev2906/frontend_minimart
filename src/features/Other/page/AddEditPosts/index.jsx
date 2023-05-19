import { unwrapResult } from "@reduxjs/toolkit";
import { createPost, fetchCurrentPost, updatePost } from "app/postsSlice";
import AddEditForm from "components/AddEditForm";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { toast } from "react-toastify";
import { Col, Container, Row } from "reactstrap";
import * as yup from "yup";

function AddEditPosts() {
	const dispatch = useDispatch();
	const { editPostId } = useParams();
	const history = useHistory();
	const isEdit = !!editPostId;
	const editPost = useSelector((state) => state.posts.currentPost);

	const schema = yup
		.object({
			title: yup.string().required("Vui lòng nhập trường này"),
			description: yup.string().required("Vui lòng nhập trường này"),
			pictures: !isEdit
				? yup
						.mixed()
						.test("fileSize", "The file is too large", (value) => {
							if (!value.length) return true; // attachment is optional
							return value[0].size <= 2000000;
						})
						.required("CHọn ảnh cho sản phẩm")
				: yup.array().nullable(),
		})
		.required();

	useEffect(() => {
		if (isEdit) {
			const fetchEditPost = async () => {
				try {
					const action = fetchCurrentPost(editPostId);
					await dispatch(action);
				} catch (error) {}
			};

			fetchEditPost();
		}
	}, [isEdit, editPostId, dispatch]);

	const defaultValues =
		isEdit && !!editPost
			? {
					title: editPost.title,
					pictures: editPost.pictures ? editPost.pictures : "",
					newPictures: "",
					description: editPost.description
						? editPost.description
						: "",
			  }
			: {
					title: "",
					pictures: "",
					description: "",
			  };

	const onSubmit = (data) => {
		const formData = new FormData();
		if (isEdit) {
			for (let key in data) {
				if (key === "newPictures" && data[key] !== "") {
					for (let i = 0; i < data[key].length; i++) {
						formData.append(key, data[key][i]);
					}
				} else if (key === "pictures") {
					formData.append(key, JSON.stringify(data[key]));
				} else formData.append(key, data[key]);
			}
		} else {
			for (let key in data) {
				if (key === "pictures" && data[key] !== "") {
					for (let i = 0; i < data[key].length; i++) {
						formData.append(key, data[key][i]);
					}
				} else formData.append(key, data[key]);
			}
		}

		const fetchAddEditPosts = async () => {
			let action = "";
			if (isEdit) {
				action = updatePost({ editPostId, formData });
			} else {
				action = createPost(formData);
			}
			try {
				const response = await dispatch(action);
				unwrapResult(response);
				history.goBack();
			} catch (error) {
				throw error;
			}
		};

		toast.promise(fetchAddEditPosts, {
			pending: "Đang xử lý",
			success: isEdit
				? "Cập nhật thành công"
				: "Thêm bài viết thành công",
			error: {
				render({ data }) {
					return data.message;
				},
			},
		});
	};

	const renderForm = () => {
		if (!isEdit) {
			return (
				<AddEditForm
					schema={schema}
					defaultValues={defaultValues}
					onSubmit={onSubmit}
				/>
			);
		} else {
			if (Object.entries(editPost).length !== 0) {
				return (
					<AddEditForm
						schema={schema}
						defaultValues={defaultValues}
						onSubmit={onSubmit}
						editItem={editPost ? editPost : undefined}
					/>
				);
			} else return null;
		}
	};

	return (
		<Container>
			<Row>
				<Col className='bg-white shadow-sm p-5'>
					<div className='add-edit__header'>
						<h1 className='add-edit__heading'>
							{isEdit ? "Sửa bài viết" : "Thêm 1 bài viết mới"}
						</h1>
						<p className='add-edit__sub-heading'>
							Vui lòng điền thông tin bài viết
						</p>
					</div>
					{renderForm()}
				</Col>
			</Row>
		</Container>
	);
}

export default AddEditPosts;
