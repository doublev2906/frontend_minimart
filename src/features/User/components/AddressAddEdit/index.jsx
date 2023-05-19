import { yupResolver } from "@hookform/resolvers/yup";
import InputField from "components/Custom/InputField";
import SelectField from "components/Custom/SelectField";
import { addressField, formValidateData } from "constant";
import { dataVN } from "constant/dataVn";
import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, Col, Form, Row } from "reactstrap";
import cls from "classnames";
import * as yup from "yup";

AddressAddEdit.propTypes = {
	currAddress: PropTypes.object,
	isShow: PropTypes.bool,
	setIsShow: PropTypes.func,
	onSubmit: PropTypes.func.isRequired,
};

const schema = yup
	.object({
		name: yup.string().required("Vui lòng nhập họ tên "),
		phone: yup
			.string()
			.matches(formValidateData.phoneRegex, {
				message: "Số điện thoại phải có nhiều hơn 9 chữ số",
			})
			.required("Vui lòng nhập số điện thoại"),
		company: yup.string().required("Vui lòng nhập trường này"),
		city: yup.string().required("Vui lòng chọn tỉnh/thành phố này"),
		district: yup.string().required("Vui lòng chọn quận/huyện này"),
		village: yup.string().required("Vui lòng chọn phường/xã này"),
	})
	.required();

function AddressAddEdit({ currAddress, isShow, setIsShow, onSubmit }) {
	const overlay = useRef();
	const defaultValues = {
		name: "",
		phone: "",
		company: "",
		city: "",
		district: "",
		village: "",
	};

	const {
		control,
		setValue,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		mode: "onBlur",
		resolver: yupResolver(schema),
		defaultValues,
	});

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

	useEffect(() => {
		const setDistrictState = () => {
			const districts = dataVN.filter(
				(city) => city.name === currAddress.city
			)[0].districts;

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

		const setVillageState = () => {
			const villageOptions = dataVN
				.filter((city) => city.name === currAddress.city)[0]
				.districts.filter(
					(district) => district.name === currAddress.district
				)[0]
				.wards.map((ward) => ({
					value: ward.name,
					label: ward.name,
				}));

			setOptions((prev) => ({
				...prev,
				villageOptions,
			}));
		};

		if (currAddress) {
			Object.keys(addressField).forEach((item) => {
				setValue(item, currAddress[item]);
			});
			setDistrictState();
			setVillageState();
		} else {
			Object.keys(addressField).forEach((item) => {
				setValue(item, "");
			});
			setOptions((prev) => ({
				...prev,
				districtOptions: {
					districts: [],
					selectOptions: [],
				},
				villageOptions: [],
			}));
		}
	}, [currAddress, setValue]);

	const onCityChange = () => {
		setValue("district", "");
		setValue("village", "");
		setOptions((prev) => ({
			...prev,
			districtOptions: {
				districts: [],
				selectOptions: [],
			},
			villageOptions: [],
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
		setIsShow(false);
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

	const renderController = () => {
		return Object.keys(addressField).map((item, index) => {
			if (item === "city")
				return (
					<Col md='12' key={index}>
						<Controller
							name={item}
							control={control}
							render={({ field }) => (
								<SelectField
									{...field}
									errors={errors}
									options={options.cityOptions}
									setDistrict={setDistrictOptions}
									ref={null}
									placeholder={addressField[item]}
								/>
							)}
						/>
					</Col>
				);
			if (item === "district")
				return (
					<Col md='12' key={index}>
						<Controller
							name={item}
							control={control}
							render={({ field }) => (
								<SelectField
									{...field}
									isDisabled={
										!currAddress &&
										options.districtOptions.districts
											.length === 0
									}
									errors={errors}
									options={
										options.districtOptions.selectOptions
									}
									setVillage={setVillageOptions}
									ref={null}
									placeholder={addressField[item]}
								/>
							)}
						/>
					</Col>
				);
			if (item === "village")
				return (
					<Col md='12' key={index}>
						<Controller
							name={item}
							control={control}
							render={({ field }) => (
								<SelectField
									{...field}
									isDisabled={
										!currAddress &&
										options.villageOptions.length === 0
									}
									errors={errors}
									options={options.villageOptions}
									ref={null}
									placeholder={addressField[item]}
								/>
							)}
						/>
					</Col>
				);
			return item === "company" ? (
				<Col md='12' key={index}>
					<Controller
						name={item}
						control={control}
						render={({ field }) => (
							<InputField
								{...field}
								errors={errors}
								ref={null}
								placeholder={addressField[item]}
							/>
						)}
					/>
				</Col>
			) : (
				<Col md='6' key={index}>
					<Controller
						name={item}
						control={control}
						render={({ field }) => (
							<InputField
								{...field}
								errors={errors}
								ref={null}
								placeholder={addressField[item]}
							/>
						)}
					/>
				</Col>
			);
		});
	};

	return (
		<div
			className={cls({
				profile__address: true,
				active: isShow,
			})}
			ref={overlay}
			onClick={(e) => {
				if (e.target === overlay.current) {
					resetForm(e);
				}
			}}>
			<Form
				className='profile__address__form'
				onSubmit={handleSubmit((data) => {
					onSubmit(data, resetForm);
				})}>
				<Row>
					<h2>Địa chỉ mới</h2>

					{renderController()}

					<Col md='12' className='profile__address__form__action'>
						<Button
							className='btn-no-border'
							type='reset'
							onClick={resetForm}>
							Trở lại
						</Button>
						<Button className='btn-normal' type='submit'>
							Hoàn thành
						</Button>
					</Col>
				</Row>
			</Form>
		</div>
	);
}

export default AddressAddEdit;
