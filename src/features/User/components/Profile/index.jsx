import { yupResolver } from "@hookform/resolvers/yup";
import { unwrapResult } from "@reduxjs/toolkit";
import { updateUser } from "app/userSlice";
import InputField from "components/Custom/InputField";
import { formValidateData } from "constant";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Button, Form } from "reactstrap";
import * as yup from "yup";

const schema = yup
	.object({
		surname: yup
			.string()
			.min(
				formValidateData.minName,
				`Cần tối thiếu ${formValidateData.minName} kí tự`
			)
			.required("Vui lòng nhập trường này"),
		name: yup
			.string()
			.min(
				formValidateData.minName,
				`Cần tối thiếu ${formValidateData.minName} kí tự`
			)
			.required("Vui lòng nhập trường này"),
		phone: yup.string().matches(formValidateData.phoneRegex, {
			message: "Số điện thoại phải có nhiều hơn 9 chữ số",
			excludeEmptyString: true,
		}),
		email: yup
			.string()
			.email("Nhập sai định dạng email")
			.required("Vui lòng nhập trường này"),
	})
	.required();

function Profile() {
	const user = useSelector((state) => state.users.user);
	const dispatch = useDispatch();
	const defaultValues = {
		name: user.name,
		surname: user.surname,
		email: user.email,
		phone: user.phone,
	};

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		mode: "onBlur",
		resolver: yupResolver(schema),
		defaultValues: defaultValues,
	});

	const onUserChangeInfo = (data) => {
		const updateUserInfo = async () => {
			const action = updateUser(data);
			try {
				const response = await dispatch(action);
				unwrapResult(response);
			} catch (error) {
				throw error;
			}
		};

		toast.promise(updateUserInfo, {
			pending: "Đang xử lý",
			success: "Cập nhật thành công",
			error: {
				render({ data }) {
					return data.message;
				},
			},
		});
	};

	return (
		<div className='profile'>
			<div className='profile__header'>
				<h2 className='profile__heading'>Hồ sơ của tôi</h2>
				<p className='profile__sub-heading'>
					Quản lý thông tin hồ sơ để bảo mật tài khoản
				</p>
			</div>
			<Form
				className='profile__user'
				id='profile-form'
				onSubmit={handleSubmit(onUserChangeInfo)}>
				<div className='profile__user__field'>
					<p className='profile__user__label'>Tên đăng nhập</p>
					<p className='profile__user__data'>..</p>
				</div>
				<div className='profile__user__field'>
					<p className='profile__user__label'>Họ</p>
					<Controller
						name='surname'
						control={control}
						render={({ field }) => (
							<InputField
								{...field}
								errors={errors}
								label=''
								placeholder='Họ'
								ref={null}
								className='profile__user__input'
							/>
						)}
					/>
				</div>
				<div className='profile__user__field'>
					<p className='profile__user__label'>Tên</p>
					<Controller
						name='name'
						control={control}
						render={({ field }) => (
							<InputField
								{...field}
								errors={errors}
								label=''
								placeholder='Tên'
								ref={null}
								className='profile__user__input'
							/>
						)}
					/>
				</div>
				<div className='profile__user__field'>
					<p className='profile__user__label'>Số điện thoại</p>
					<Controller
						name='phone'
						control={control}
						render={({ field }) => (
							<InputField
								{...field}
								errors={errors}
								label=''
								placeholder='Số điện thoại'
								ref={null}
								className='profile__user__input'
							/>
						)}
					/>
				</div>
				<div className='profile__user__field'>
					<p className='profile__user__label'>Email</p>
					<Controller
						name='email'
						control={control}
						render={({ field }) => (
							<InputField
								{...field}
								errors={errors}
								label=''
								placeholder='Email'
								ref={null}
								className='profile__user__input'
							/>
						)}
					/>
				</div>
				<Button className='profile__user__action' type='submit'>
					Lưu
				</Button>
			</Form>
		</div>
	);
}

export default Profile;
