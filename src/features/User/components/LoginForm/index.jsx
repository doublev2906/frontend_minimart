import { yupResolver } from "@hookform/resolvers/yup";
import InputField from "components/Custom/InputField";
import { formValidateData } from "constant";
import PropTypes from "prop-types";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { Button, Form } from "reactstrap";
import * as yup from "yup";

LoginForm.propTypes = {
	onSubmit: PropTypes.func.isRequired,
	defaultValues: PropTypes.object.isRequired,
};

const schema = yup
	.object({
		email: yup
			.string()
			.email("Nhập sai định dạng email")
			.required("Vui lòng nhập trường này"),
		password: yup
			.string()
			.min(
				formValidateData.minPassword,
				`Mật khẩu cần tối thiểu ${formValidateData.minPassword}`
			)
			.required("Vui lòng nhập trường này"),
	})
	.required();

function LoginForm({ onSubmit, defaultValues, forgetClick }) {
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
			<h2 className='authen__form__title'>Đăng nhập</h2>
			<p className='authen__form__sub-title'>
				Vui lòng xác thực tài khoản trước khi đăng nhập
			</p>
			<Controller
				name='email'
				control={control}
				render={({ field }) => (
					<InputField
						{...field}
						errors={errors}
						label='Email'
						placeholder='Email'
						ref={null}
					/>
				)}
			/>
			<Controller
				name='password'
				control={control}
				render={({ field }) => (
					<InputField
						{...field}
						errors={errors}
						label='Mật khẩu'
						placeholder='Mật khẩu'
						type='password'
						ref={null}
					/>
				)}
			/>
			<div className='my-4'>
				<Button type='submit' className='btn authen__btn shadow-none'>
					đăng nhập
				</Button>
			</div>

			<p className='authen__text'>
				Bạn mới biết đến MiniMart?{" "}
				<Link to='/user/register' className='authen__link'>
					Đăng ký
				</Link>
			</p>

			<p className='authen__text' onClick={forgetClick}>
				<span className='authen__link'>Quên mật khẩu?</span>
			</p>
		</Form>
	);
}

export default LoginForm;
