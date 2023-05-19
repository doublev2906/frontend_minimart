import { unwrapResult } from "@reduxjs/toolkit";
import {
	addNewAddress,
	deleteUserAddress,
	fetchUserAddress,
	updateUserAddress,
} from "app/userSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Button } from "reactstrap";
import AddressAddEdit from "../AddressAddEdit";

function Address() {
	const dispatch = useDispatch();
	const [isShow, setIsShow] = useState(false);
	const address = useSelector((state) => state.users.address);
	const [currAddress, setCurrAddress] = useState(null);

	const onClickNewAdd = () => {
		setIsShow(true);
		setCurrAddress(null);
	};

	const showForm = () => {
		setIsShow(true);
	};

	const onClickEditBtn = (val) => {
		setCurrAddress(val);
		showForm();
	};

	const onSubmitForm = (data, resetForm) => {
		let action = null;
		if (currAddress) {
			action = updateUserAddress({ id: currAddress._id, data });
		} else {
			action = addNewAddress(data);
		}

		const fetchSubmit = async () => {
			try {
				const response = await dispatch(action);
				unwrapResult(response);
				resetForm();
			} catch (error) {
				throw error.response;
			}
		};

		toast.promise(fetchSubmit, {
			pending: "Đang xử lý",
			success: currAddress
				? "Cập nhật địa chỉ thành công"
				: "Thêm địa chỉ thành công",
			error: {
				render: () => {
					return <p>Hành động thất bại</p>;
				},
			},
		});
	};

	useEffect(() => {
		dispatch(fetchUserAddress());
	}, [dispatch]);

	const renderAddressItem = () => {
		if (address.length === 0)
			return <p className='address-empty'>Bạn chưa có địa chỉ</p>;

		return address.map((item, index) => {
			return (
				<li className='profile__address__item' key={index}>
					<div className='profile__address__item__info'>
						<div className='profile__user__field'>
							<p className='profile__user__label'>Họ và tên</p>
							<p className='profile__user__data'>{item.name}</p>
						</div>
						<div className='profile__user__field'>
							<p className='profile__user__label'>
								Số điện thoại
							</p>
							<p className='profile__user__data'>{item.phone}</p>
						</div>
						{item.company ? (
							<div className='profile__user__field'>
								<p className='profile__user__label'>Công ty</p>
								<p className='profile__user__data'>
									{item.company}
								</p>
							</div>
						) : (
							""
						)}
						<div className='profile__user__field'>
							<p className='profile__user__label'>Địa chỉ</p>
							<p className='profile__user__data'>
								{item.city +
									", " +
									item.district +
									", " +
									item.village}
							</p>
						</div>
					</div>
					<div className='profile__address__item__action'>
						<p onClick={() => onClickEditBtn(item)}>Sửa</p>
						<p
							onClick={() => {
								if (
									window.confirm(
										"Bạn có chắc muốn xóa địa chỉ này"
									)
								)
									dispatch(deleteUserAddress(item._id));
							}}>
							Xóa
						</p>
					</div>
				</li>
			);
		});
	};

	return (
		<div className='profile'>
			<div className='profile__header profile__header--flex'>
				<h2 className='profile__heading'>Địa chỉ của tôi</h2>
				<Button className='btn-normal' onClick={onClickNewAdd}>
					<i className='fas fa-plus'></i> Thêm địa chỉ mới
				</Button>
			</div>
			<ul className='profile__address__list'>{renderAddressItem()}</ul>
			<AddressAddEdit
				isShow={isShow}
				setIsShow={setIsShow}
				onSubmit={onSubmitForm}
				currAddress={currAddress}
			/>
		</div>
	);
}

export default Address;
