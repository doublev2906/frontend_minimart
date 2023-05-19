import userApi from "api/userApi";
import { images } from "constant";
import RegisterForm from "features/User/components/RegisterForm";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { Container } from "reactstrap";

function Register() {
	const history = useHistory();
	const onSubmit = (data) => {
		const register = async () => {
			try {
				await userApi.register(data);

				history.push("/user/login");
			} catch (error) {
				throw error;
			}
		};

		toast.promise(register, {
			pending: "Đang xử lý",
			success: "Đăng ký thành công",
			error: {
				render: ({ data }) => {
					const { message } = data.response.data;
					return `Đăng kí thất bại với lỗi: ${message}`;
				},
			},
		});
	};

	const defaultValues = {
		surname: "",
		name: "",
		phone: "",
		email: "",
		password: "",
		confirmPassword: "",
	};
	return (
		<div className='authen'>
			<div className='authen__header'>
				<Container>
					<div className='d-flex align-items-center justify-content-between authen__header--wrap'>
						<div className='d-flex align-items-center'>
							<Link to='/'>
								<img src={images.LOGO_B} alt='logo' />
							</Link>
							<h1 className='authen__header__title'>Đăng ký</h1>
						</div>
						<p className='authen__header__text'>
							Đăng ký tài khoản mới !
						</p>
					</div>
				</Container>
			</div>
			<div className='authen__content'>
				<Container>
					<RegisterForm
						onSubmit={onSubmit}
						defaultValues={defaultValues}
					/>
				</Container>
			</div>
		</div>
	);
}

export default Register;
