import { yupResolver } from "@hookform/resolvers/yup";
import InputField from "components/Custom/InputField";
import PropTypes from "prop-types";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, Form } from "reactstrap";
import * as yup from "yup";

ResetPasswordForm.propTypes = {
	onSubmit: PropTypes.func.isRequired,
	defaultValues: PropTypes.object.isRequired,
	goBack: PropTypes.func.isRequired,
};

const schema = yup
	.object({
		resetCode: yup.string().required("Vui lòng nhập trường này"),
		resetPassword: yup.string().required("Vui lòng nhập trường này"),
		confirmResetPassword: yup
			.string()
			.oneOf(
				[yup.ref("resetPassword"), null],
				"Mật khẩu không chính xác"
			),
	})
	.required();

function ResetPasswordForm({ onSubmit, defaultValues, goBack }) {
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
			className='authen__form'
			onSubmit={handleSubmit((data) => {
				onSubmit(data);
			})}>
			<h2 className='authen__form__title'>Quên mật khẩu</h2>
			<Controller
				name='resetCode'
				control={control}
				render={({ field }) => (
					<InputField
						{...field}
						errors={errors}
						label='Mã xác thực'
						placeholder=''
						type='password'
						ref={null}
					/>
				)}
			/>
			<Controller
				name='resetPassword'
				control={control}
				render={({ field }) => (
					<InputField
						{...field}
						errors={errors}
						label='Mật khẩu mới'
						placeholder=''
						type='password'
						ref={null}
					/>
				)}
			/>
			<Controller
				name='confirmResetPassword'
				control={control}
				render={({ field }) => (
					<InputField
						{...field}
						errors={errors}
						label='Xác thực mật khẩu'
						placeholder=''
						type='password'
						ref={null}
					/>
				)}
			/>
			<Button type='submit' className='form__btn form__btn--success'>
				Gửi
			</Button>
			<Button className='form__btn form__btn--danger' onClick={goBack}>
				Hủy
			</Button>
		</Form>
	);
}

export default ResetPasswordForm;
