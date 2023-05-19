import { unwrapResult } from "@reduxjs/toolkit";
import userApi from "api/userApi";
import { userLogin } from "app/userSlice";
import { images } from "constant";
import ForgetPasswordForm from "features/User/components/ForgetPasswordForm";
import LoginForm from "features/User/components/LoginForm";
import ResetPasswordForm from "features/User/components/ResetPasswordForm";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { Container } from "reactstrap";

function Login() {
	const [isForgetPassword, setIsForgetPassword] = useState(false);
	const [isResetPassword, setIsResetPassword] = useState(false);
	const [resetCode, setResetCode] = useState(null);
	const dispatch = useDispatch();
	const history = useHistory();

	const onLoginSubmit = (data) => {
		const login = async () => {
			try {
				const result = await dispatch(userLogin(data));
				unwrapResult(result);
				history.push("/");
			} catch (error) {
				throw error;
			}
		};

		toast.promise(login, {
			pending: "Đang xử lý",
			success: "Đăng nhập thành công",
			error: {
				render({ data }) {
					return `Đăng nhập thất bại ${data.message}`;
				},
			},
		});
	};

	const onForgetPasswordSubmit = (data) => {
		const forgetPassword = async () => {
			try {
				const response = await userApi.forgetPassword(data);
				setIsResetPassword(true);
				setResetCode(response.data.resetCode);
			} catch (error) {
				throw error.response.data;
			}
		};

		toast.promise(forgetPassword, {
			pending: "Đang xử lý",
			success: "Nhâp mật khẩu mới",
			error: {
				render({ data }) {
					return `${data.message}`;
				},
			},
		});
	};

	const onResetPasswordSubmit = (data) => {
		const resetPassword = async () => {
			try {
				await userApi.resetPassword({
					...data,
					resetCode,
				});
				setIsForgetPassword(false);
			} catch (error) {
				throw error.response.data;
			}
		};

		toast.promise(resetPassword, {
			pending: "Đang xử lý",
			success: "Đổi mật khẩu thành công",
			error: {
				render({ data }) {
					return `${data.message}`;
				},
			},
		});
	};

	const defaultLoginValues = {
		email: "",
		password: "",
	};

	const defaultForgetPasswordValues = {
		email: "",
	};

	const defaultResetPasswordValues = {
		resetCode: "",
		resetPassword: "",
		confirmResetPassword: "",
	};

	const openFormForget = () => {
		setIsForgetPassword(true);
	};

	const goBack = () => {
		setIsForgetPassword(false);
		setIsResetPassword(false);
	};

	return (
		<div className='authen'>
			<div className='authen__header'>
				<Container>
					<div className='d-flex align-items-md-center justify-content-md-between authen__header--wrap'>
						<div className='d-flex align-items-center'>
							<Link to='/'>
								<img src={images.LOGO_B} alt='logo' />
							</Link>
							<h1 className='authen__header__title'>Đăng nhập</h1>
						</div>
						<p className='authen__header__text'>
							Đăng nhập tài khoản của bạn !
						</p>
					</div>
				</Container>
			</div>
			<div className='authen__content'>
				<Container>
					{!isForgetPassword ? (
						<LoginForm
							onSubmit={onLoginSubmit}
							defaultValues={defaultLoginValues}
							forgetClick={openFormForget}
						/>
					) : (
						<>
							{isResetPassword ? (
								<ResetPasswordForm
									onSubmit={onResetPasswordSubmit}
									defaultValues={defaultResetPasswordValues}
									goBack={goBack}
								/>
							) : (
								<ForgetPasswordForm
									onSubmit={onForgetPasswordSubmit}
									defaultValues={defaultForgetPasswordValues}
									goBack={goBack}
								/>
							)}
						</>
					)}
				</Container>
			</div>
		</div>
	);
}

export default Login;
