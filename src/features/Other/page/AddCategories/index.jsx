import AddEditForm from "components/AddEditForm";
import React from "react";
import * as yup from "yup";
import { Col, Container, Row } from "reactstrap";
import { useDispatch } from "react-redux";
import { createCate } from "app/categoriesSlice";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { unwrapResult } from "@reduxjs/toolkit";

const schema = yup.object({
	name: yup.string().required("Vui lòng nhập tên danh mục"),
});

function AddCategories() {
	const dispatch = useDispatch();
	const history = useHistory();
	const defaultValues = {
		name: "",
	};

	const onSubmit = (data) => {
		const createCategory = async () => {
			try {
				const response = dispatch(createCate(data));
				unwrapResult(response);
				history.push("/admin/categories");
			} catch (error) {
				throw error.data;
			}
		};

		toast.promise(createCategory, {
			pending: "Đang xử lý",
			success: "Thêm danh mục thành công",
			error: {
				render({ data }) {
					return `${data.message}`;
				},
			},
		});
	};

	return (
		<Container>
			<Row>
				<Col className='bg-white shadow-sm p-5'>
					<div className='add-edit__header'>
						<h1 className='add-edit__heading'>
							Thêm 1 danh mục mới
						</h1>
						<p className='add-edit__sub-heading'>
							Vui lòng điền thông tin danh mục
						</p>
					</div>
					<AddEditForm
						schema={schema}
						defaultValues={defaultValues}
						onSubmit={onSubmit}
					/>
				</Col>
			</Row>
		</Container>
	);
}

export default AddCategories;
