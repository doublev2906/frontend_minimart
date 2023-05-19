import { yupResolver } from "@hookform/resolvers/yup";
import InputField from "components/Custom/InputField";
import PropTypes from "prop-types";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, Col, Form, Row } from "reactstrap";
import * as yup from "yup";
import { formValidateData } from "constant";
import { Link } from "react-router-dom";

RegisterForm.propTypes = {
	onSubmit: PropTypes.func.isRequired,
	defaultValues: PropTypes.object.isRequired,
};

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
		password: yup
			.string()
			.min(
				formValidateData.minPassword,
				`Cần tối thiếu ${formValidateData.minPassword} kí tự`
			)
			.required("Vui lòng nhập trường này"),
		confirmPassword: yup
			.string()
			.oneOf([yup.ref("password"), null], "Mật khẩu không chính xác"),
	})
	.required();

function RegisterForm({ onSubmit, defaultValues }) {
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		mode: "onBlur",
		resolver: yupResolver(schema),
		defaultValues: defaultValues,
	});

	return (
		<Form
			className='authen__form authen__form--register'
			onSubmit={handleSubmit((data) => {
				onSubmit(data);
			})}>
			<h2 className='authen__form__title'>Đăng ký</h2>
			<Row>
				<Col md='6'>
					<Controller
						name='surname'
						control={control}
						render={({ field }) => (
							<InputField
								{...field}
								errors={errors}
								label='Họ'
								ref={null}
							/>
						)}
					/>
				</Col>
				<Col md='6'>
					<Controller
						name='name'
						control={control}
						render={({ field }) => (
							<InputField
								{...field}
								errors={errors}
								label='Tên'
								ref={null}
							/>
						)}
					/>
				</Col>
				<Col md='6'>
					<Controller
						name='email'
						control={control}
						render={({ field }) => (
							<InputField
								{...field}
								errors={errors}
								label='Email'
								ref={null}
							/>
						)}
					/>
				</Col>
				<Col md='6'>
					<Controller
						name='phone'
						control={control}
						render={({ field }) => (
							<InputField
								{...field}
								errors={errors}
								label='Số điện thoại'
								ref={null}
							/>
						)}
					/>
				</Col>
				<Col md='6'>
					<Controller
						name='password'
						control={control}
						render={({ field }) => (
							<InputField
								{...field}
								errors={errors}
								label='Mật khẩu'
								type='password'
								ref={null}
							/>
						)}
					/>
				</Col>
				<Col md='6'>
					<Controller
						name='confirmPassword'
						control={control}
						render={({ field }) => (
							<InputField
								{...field}
								errors={errors}
								label='Xác thực mật khẩu'
								type='password'
								ref={null}
							/>
						)}
					/>
				</Col>
				<Col md='12' className='d-flex justify-content-center'>
					<Button
						type='submit'
						className='authen__btn authen__btn--short shadow-none'>
						đăng ký
					</Button>
				</Col>
			</Row>
			<p className='authen__text'>
				Bạn đã có tài khoản?{" "}
				<Link to='/user/login' className='authen__link'>
					Đăng nhập
				</Link>
			</p>
		</Form>
	);
}

export default RegisterForm;
