import { unwrapResult } from "@reduxjs/toolkit";
import {
	createProduct,
	fetchCurrentProduct,
	updateProduct,
} from "app/productsSlice";
import AddEditForm from "components/AddEditForm";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { toast } from "react-toastify";
import { Col, Container, Row } from "reactstrap";
import * as yup from "yup";

function AddEditProduct() {
	const dispatch = useDispatch();
	const { editProductId } = useParams();
	const history = useHistory();
	const isEdit = !!editProductId;
	const editProduct = useSelector((state) => state.products.currentProduct);

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
				: yup.array().required(),
			price: yup
				.number()
				.typeError("Giá sản phầm phải là số")
				.min(0, "Giá phải là số dương")
				.required("Vui lòng nhập trường này"),
			discount: yup
				.number()
				.typeError("Giá sản phầm phải là số")
				.min(0, "Giá phải là số dương")
				.max(100, "Giảm giá chỉ từ 0 - 100%")
				.required("Vui lòng nhập trường này"),
			country: yup.string().required("Vui lòng nhập trường này"),
			unit: yup.string().required("Vui lòng nhập trường này"),
			category: yup.string().required("Vui lòng nhập trường này"),
		})
		.required();

	useEffect(() => {
		if (isEdit) {
			const fetchEditProduct = async () => {
				try {
					const action = fetchCurrentProduct(editProductId);
					dispatch(action);
				} catch (error) {}
			};

			fetchEditProduct();
		}
	}, [isEdit, editProductId, dispatch]);

	const defaultValues =
		isEdit && !!editProduct
			? {
					title: editProduct.title,
					price: editProduct.price,
					discount: editProduct.discount,
					country: editProduct.country,
					unit: editProduct.unit,
					category: editProduct.category,
					pictures: editProduct.pictures,
					newPictures: "",
					description: editProduct.description,
			  }
			: {
					title: "",
					price: "",
					discount: "",
					country: "",
					unit: "",
					category: "",
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

		const fetchAddEditProduct = async () => {
			let action = "";
			if (isEdit) {
				action = updateProduct({ editProductId, formData });
			} else {
				action = createProduct(formData);
			}
			try {
				const response = dispatch(action);
				unwrapResult(response);
				history.goBack();
			} catch (error) {
				throw error;
			}
		};

		toast.promise(fetchAddEditProduct, {
			pending: "Đang xử lý",
			success: isEdit
				? "Cập nhật thành công"
				: "Thêm sản phẩm thành công",
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
			if (Object.entries(editProduct).length !== 0) {
				return (
					<AddEditForm
						schema={schema}
						defaultValues={defaultValues}
						onSubmit={onSubmit}
						editItem={editProduct ? editProduct : undefined}
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
							{isEdit ? "Sửa sản phẩm" : "Thêm 1 sản phẩm mới"}
						</h1>
						<p className='add-edit__sub-heading'>
							Vui lòng điền thông tin sản phẩm
						</p>
					</div>
					{renderForm()}
				</Col>
			</Row>
		</Container>
	);
}

export default AddEditProduct;
