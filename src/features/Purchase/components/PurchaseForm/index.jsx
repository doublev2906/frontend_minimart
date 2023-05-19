import { yupResolver } from "@hookform/resolvers/yup";
import InputField from "components/Custom/InputField";
import SelectField from "components/Custom/SelectField";
import { formValidateData } from "constant";
import { dataVN } from "constant/dataVn";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, Col, Form, Row } from "reactstrap";
import * as yup from "yup";

PurchaseForm.propTypes = {
	address: PropTypes.array,
	cart: PropTypes.array,
	user: PropTypes.object,
};

const schema = yup
	.object({
		selectAddress: yup.string().required("Vui lòng chọn địa chỉ giao hàng"),
		phone: yup.string().matches(formValidateData.phoneRegex, {
			message: "Số điện thoại phải có nhiều hơn 9 chữ số",
		}),
		city: yup.string().required("Vui lòng chọn tỉnh/thành phố này"),
		district: yup.string().required("Vui lòng chọn quận/huyện này"),
		address: yup.string().required("Vui lòng chọn phường/xã này"),
	})
	.required();

function PurchaseForm({ cart, address, user, onSubmitPurchase }) {
	const [currAddress, setCurrAddress] = useState(null);
	const [options, setOptions] = useState({
		cityOptions: dataVN.map((item) => ({
			value: item.name,
			label: item.name,
		})),
		districtOptions: {
			districts: [],
			selectOptions: [],
		},
		villageOptions: [],
	});

	const addressOptions = [
		{
			label: "Nhập địa chỉ mới",
			value: "-1",
		},
		...address.map((item, index) => {
			return {
				label: `${item.village}, ${item.district}, ${item.city}`,
				value: `${index}`,
			};
		}),
	];

	const defaultValues = {
		name: user.name,
		email: user.email,
		selectAddress: "",
		address: "",
		note: "",
		phone: "",
		products: [],
		quantity: [],
		city: "",
		district: "",
		sumMoney: 0,
		status: "Chờ xác nhận",
	};

	const {
		control,
		setValue,
		handleSubmit,
		clearErrors,
		reset,
		formState: { errors },
	} = useForm({
		mode: "onBlur",
		resolver: yupResolver(schema),
		defaultValues,
	});

	useEffect(() => {
		const sumMoney = cart.reduce((pre, curr) => {
			const price = curr.price - (curr.price * curr.discount) / 100.0;
			return pre + price * curr.quantity;
		}, 0);
		setValue("products", JSON.stringify(cart.map((item) => item._id)));
		setValue("quantity", JSON.stringify(cart.map((item) => item.quantity)));
		setValue("sumMoney", sumMoney);
	}, [cart, setValue]);

	useEffect(() => {
		const setAddress = () => {
			setValue("city", currAddress.city);
			setValue("district", currAddress.district);
			setValue("address", currAddress.village);
			clearErrors("city");
			clearErrors("district");
			clearErrors("address");
		};

		if (currAddress) {
			setAddress();
		} else {
			setValue("city", "");
			setValue("district", "");
			setValue("address", "");
			setOptions((prev) => ({
				...prev,
				districtOptions: {
					districts: [],
					selectOptions: [],
				},
				villageOptions: [],
			}));
		}
	}, [currAddress, setValue, clearErrors]);

	const onCityChange = () => {
		setValue("district", "");
		setValue("address", "");
		setOptions((prev) => ({
			...prev,
			districtOptions: {
				districts: [],
				selectOptions: [],
			},
			villageOptions: [],
		}));
	};

	const setAddressOptions = (cityName, districtName) => {
		onCityChange();
		const districts = dataVN.filter((item) => item.name === cityName)[0]
			.districts;

		setOptions((prev) => ({
			...prev,
			districtOptions: {
				districts,
				selectOptions: districts.map((district) => ({
					value: district.name,
					label: district.name,
				})),
			},
		}));

		const villageOptions = districts
			.filter((district) => district.name === districtName)[0]
			.wards.map((ward) => ({
				value: ward.name,
				label: ward.name,
			}));

		setOptions((prev) => ({
			...prev,
			villageOptions,
		}));
	};

	const setDistrictOptions = (city) => {
		onCityChange();
		const districts = dataVN.filter((item) => item.name === city)[0]
			.districts;

		setOptions((prev) => ({
			...prev,
			districtOptions: {
				districts,
				selectOptions: districts.map((district) => ({
					value: district.name,
					label: district.name,
				})),
			},
		}));
	};

	const setVillageOptions = (districtName) => {
		const { districts } = options.districtOptions;
		const villageOptions = districts
			.filter((district) => district.name === districtName)[0]
			.wards.map((ward) => ({
				value: ward.name,
				label: ward.name,
			}));

		setOptions((prev) => ({
			...prev,
			villageOptions,
		}));
	};

	const resetForm = () => {
		if (!currAddress) {
			reset();
			setOptions((prev) => ({
				...prev,
				districtOptions: {
					districts: [],
					selectOptions: [],
				},
				villageOptions: [],
			}));
		}
	};

	return (
		<Form
			onSubmit={handleSubmit((data) => {
				onSubmitPurchase(data);
				resetForm();
			})}>
			<Row className='row'>
				<Col lg='12'>
					<Controller
						name='selectAddress'
						control={control}
						render={({ field }) => (
							<SelectField
								{...field}
								errors={errors}
								options={addressOptions}
								address={address}
								setCurrAddress={setCurrAddress}
								setAddress={setAddressOptions}
								ref={null}
								placeholder='Chọn địa chỉ giao hàng của bạn'
							/>
						)}
					/>
				</Col>
				<Col lg='6'>
					<Controller
						name='name'
						control={control}
						render={({ field }) => (
							<InputField
								{...field}
								errors={errors}
								label=''
								placeholder='Họ và tên'
								readOnly={true}
								ref={null}
							/>
						)}
					/>
				</Col>
				<Col lg='6'>
					<Controller
						name='email'
						control={control}
						render={({ field }) => (
							<InputField
								{...field}
								errors={errors}
								label=''
								placeholder='Email'
								readOnly={true}
								ref={null}
							/>
						)}
					/>
				</Col>
				<Col lg='6'>
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
							/>
						)}
					/>
				</Col>
				<Col lg='6'>
					<Controller
						name='city'
						control={control}
						render={({ field }) => (
							<SelectField
								{...field}
								errors={errors}
								options={options.cityOptions}
								setDistrict={setDistrictOptions}
								ref={null}
								placeholder='Thành phố'
								isDisabled={!!currAddress}
							/>
						)}
					/>
				</Col>
				<Col lg='6'>
					<Controller
						name='district'
						control={control}
						render={({ field }) => (
							<SelectField
								{...field}
								isDisabled={
									options.districtOptions.districts.length ===
										0 || !!currAddress
								}
								errors={errors}
								options={options.districtOptions.selectOptions}
								setVillage={setVillageOptions}
								ref={null}
								placeholder='Quận/ Huyện'
							/>
						)}
					/>
				</Col>
				<Col lg='6'>
					<Controller
						name='address'
						control={control}
						render={({ field }) => (
							<SelectField
								{...field}
								isDisabled={
									options.villageOptions.length === 0 ||
									!!currAddress
								}
								errors={errors}
								options={options.villageOptions}
								ref={null}
								placeholder='Xã/ Phường'
							/>
						)}
					/>
				</Col>
				<Col lg='12'>
					<Controller
						name='note'
						control={control}
						render={({ field }) => (
							<InputField
								{...field}
								errors={errors}
								label=''
								placeholder='Ghi chú khi giao hàng'
								ref={null}
								type='textarea'
							/>
						)}
					/>
				</Col>
				<Col lg='12'>
					<Button
						type='submit'
						className='buy-btn'
						disabled={cart.length === 0}>
						Đặt hàng
					</Button>
				</Col>
			</Row>
		</Form>
	);
}

export default PurchaseForm;
