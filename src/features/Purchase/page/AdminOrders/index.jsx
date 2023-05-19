import { changeOrderStatus, fetchOrders } from "app/purchaseSlide";
import cls from "classnames";
import { orderStatus } from "constant";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { toast } from "react-toastify";
import { Button } from "reactstrap";

function AdminOrders() {
	const dispatch = useDispatch();
	const [active, setActive] = useState({
		item: 0,
		style: {
			left: 0,
			width: 0,
		},
	});

	const [filter, setFilter] = useState({
		value: 1,
		label: "Nhập mã đơn hàng",
		content: "",
	});

	const orders = useSelector((state) => {
		if (filter.content) {
			if (filter.value === 1) {
				if (active.item === 0)
					return state.purchase.orders.filter(
						(order) => order._id === filter.content
					);

				if (active.item === 1)
					return state.purchase.orders.filter(
						(order) =>
							order.status === "Chờ xác nhận" &&
							order._id === filter.content
					);

				if (active.item === 2)
					return state.purchase.orders.filter(
						(order) =>
							order.status === "Chờ lấy hàng" &&
							order._id === filter.content
					);

				if (active.item === 3)
					return state.purchase.orders.filter(
						(order) =>
							order.status === "Đã thanh toán" &&
							order._id === filter.content
					);
			} else {
				if (active.item === 0)
					return state.purchase.orders.filter(
						(order) => order.name === filter.content
					);

				if (active.item === 1)
					return state.purchase.orders.filter(
						(order) =>
							order.status === "Chờ xác nhận" &&
							order.name === filter.content
					);

				if (active.item === 2)
					return state.purchase.orders.filter(
						(order) =>
							order.status === "Chờ lấy hàng" &&
							order.name === filter.content
					);

				if (active.item === 3)
					return state.purchase.orders.filter(
						(order) =>
							order.status === "Đã thanh toán" &&
							order.name === filter.content
					);
			}
		} else {
			if (active.item === 0) return state.purchase.orders;

			if (active.item === 1)
				return state.purchase.orders.filter(
					(order) => order.status === "Chờ xác nhận"
				);

			if (active.item === 2)
				return state.purchase.orders.filter(
					(order) => order.status === "Chờ lấy hàng"
				);

			if (active.item === 3)
				return state.purchase.orders.filter(
					(order) => order.status === "Đã thanh toán"
				);
		}
	});

	const firstItem = useRef(null);
	const inputSearch = useRef(null);

	const options = [
		{
			label: "Mã đơn hàng",
			value: 1,
		},
		{
			label: "Tên người mua",
			value: 2,
		},
	];

	useEffect(() => {
		dispatch(fetchOrders());
		setActive((prev) => ({
			...prev,
			item: 0,
			style: {
				left: 0,
				width: firstItem.current.offsetWidth,
			},
		}));
	}, [dispatch]);

	const handleActiveTab = (e, item) => {
		setActive((prev) => ({
			...prev,
			item,
			style: {
				left: e.target.offsetLeft,
				width: e.target.offsetWidth + "px",
			},
		}));
	};

	const onSearch = () => {
		if (inputSearch.current.value) {
			setFilter((prev) => ({
				...prev,
				content: inputSearch.current.value,
			}));
		} else {
			setFilter((prev) => ({
				...prev,
				content: "",
			}));
		}
	};

	const handleChangeStatus = (status, orderId) => {
		try {
			if (
				window.confirm(
					"Bạn có chắc chắn muốn thay đổi trạng thái đơn hàng này"
				)
			) {
				dispatch(changeOrderStatus({ status, orderId }));
				toast.success("Thay đổi trạng thái đơn hàng thành công!");
			}
		} catch (error) {
			throw error.data.message;
		}
	};

	const renderStatusList = (currStatus, orderId) => {
		if (currStatus === "Đã thanh toán") return null;

		if (currStatus === "Chờ lấy hàng")
			return (
				<div className='change-status__item'>
					<p
						className={"status " + orderStatus["Đã thanh toán"]}
						onClick={() =>
							handleChangeStatus("Đã thanh toán", orderId)
						}>
						Đã thanh toán
					</p>
				</div>
			);

		return Object.keys(orderStatus).map((status, index) => {
			return status !== currStatus ? (
				<div className='change-status__item' key={index}>
					<p
						className={"status " + orderStatus[status]}
						onClick={() => handleChangeStatus(status, orderId)}>
						{status}
					</p>
				</div>
			) : null;
		});
	};

	const renderListOrder = () => {
		return orders.map((order, index) => (
			<div className='orders__list__body__item' key={index}>
				<div className='orders__list__body__item__products'>
					{order.products?.map((product, index) => {
						return (
							<div key={index} className='order__product'>
								<div className='d-flex justify-content-between align-items-center flex-grow-1 px-4'>
									<p className='order__product__title'>
										{product.title}
									</p>
									<img
										src={product.pictures[0]}
										alt='anh'
										className='order__product__pic'
									/>
								</div>
								<div className='d-flex justify-content-between align-items-center px-5'>
									<i className='fas fa-times'></i>
									<p className='order__product__quantity'>
										{order.quantity[index]}
									</p>
								</div>
							</div>
						);
					})}

					<p className='orders__list__body__item__products__text'>
						Tổng đơn hàng: {order.sumMoney.toLocaleString()}
						<sup>đ</sup>
					</p>
				</div>
				<div className='orders__list__body__item__summary text-center'>
					<p>
						{order.sumMoney.toLocaleString()}
						<sup>đ</sup>
					</p>
				</div>
				<div className='orders__list__body__item__address'>
					<p>
						{order.address +
							", " +
							order.district +
							", " +
							order.city}
					</p>
				</div>
				<div className='orders__list__body__item__info'>
					<p>Họ tên: {order.name}</p>
					<p>Email: {order.email}</p>
				</div>
				<div className='orders__list__body__item__detail'>
					<p>
						Địa chỉ:{" "}
						{order.address +
							", " +
							order.district +
							", " +
							order.city}
					</p>
					<p>Họ tên: {order.name}</p>
					<p>Email: {order.email}</p>
				</div>
				<div className='orders__list__body__item__status text-center'>
					<p className={"status " + orderStatus[order.status]}>
						{order.status}
					</p>

					<div className='change-status shadow-lg'>
						<div className='change-status__heading'>
							Thay đổi trạng thái sản phẩm
						</div>
						{renderStatusList(order.status, order._id)}
					</div>
				</div>
			</div>
		));
	};

	return (
		<div className='orders shadow-sm'>
			<div className='orders__header'>
				<ul className='orders__tab'>
					<li
						ref={firstItem}
						onClick={(e) => handleActiveTab(e, 0)}
						className={cls({
							orders__tab__item: true,
							active: active.item === 0,
						})}>
						Tất cả
					</li>
					<li
						onClick={(e) => handleActiveTab(e, 1)}
						className={cls({
							orders__tab__item: true,
							active: active.item === 1,
						})}>
						Chờ xác nhận
					</li>
					<li
						onClick={(e) => handleActiveTab(e, 2)}
						className={cls({
							orders__tab__item: true,
							active: active.item === 2,
						})}>
						Chờ lấy hàng
					</li>
					<li
						onClick={(e) => handleActiveTab(e, 3)}
						className={cls({
							orders__tab__item: true,
							active: active.item === 3,
						})}>
						Đã thanh toán
					</li>
					<div
						className='orders__tab__line'
						style={active.style}></div>
				</ul>
			</div>

			<div className='orders__body'>
				<div className='orders__search'>
					<Select
						isSearchable={false}
						styles={{
							control: (style) => ({
								...style,
								borderRadius: 0,
								borderColor: "#ced4da",
								boxShadow: "none",
								cursor: "pointer",
								borderTopLeftRadius: "3px",
								borderBottomLeftRadius: "3px",
							}),
							option: (styles, { isFocused, isSelected }) => ({
								...styles,
								backgroundColor: isFocused ? "#eee" : "white",
								color: isSelected ? "#f86001" : "#252525",
								cursor: "pointer",
							}),
						}}
						className='orders__search__options'
						options={options}
						defaultValue={options[0]}
						onChange={(selectedOption) => {
							setFilter({
								value: selectedOption.value,
								label:
									"Nhập " +
									selectedOption.label.toLowerCase(),
							});
						}}
					/>
					<input
						className='orders__search__input'
						placeholder={filter.label}
						name='content'
						ref={inputSearch}
					/>

					<Button
						className='shadow-none orders__search__btn'
						onClick={onSearch}>
						Tìm kiếm
					</Button>
				</div>

				<div className='orders__list'>
					<div className='orders__list__header'>
						<h2>{orders.length} Đơn hàng</h2>
					</div>

					<div className='orders__list__body'>
						{orders.length <= 0 ? (
							<div className='orders__list__body--empty'>
								<i className='orders__list__empty'>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										viewBox='0 0 94 93'>
										<g
											fill='none'
											fillRule='evenodd'
											transform='translate(-2)'>
											<rect width='96' height='96'></rect>
											<ellipse
												cx='47'
												cy='87'
												fill='#F2F2F2'
												rx='45'
												ry='6'></ellipse>
											<path
												fill='#FFF'
												stroke='#D8D8D8'
												d='M79,55.5384191 L79,84.1647059 C79,85.1783108 78.1452709,86 77.0909091,86 L17.9090909,86 C16.8547291,86 16,85.1783108 16,84.1647059 L16,9.83529412 C16,8.82168917 16.8547291,8 17.9090909,8 L77.0909091,8 C78.1452709,8 79,8.82168917 79,9.83529412 L79,43.6504538 L79,55.5384191 Z'></path>
											<path
												fill='#FAFAFA'
												stroke='#D8D8D8'
												d='M64.32,4.0026087 L56.62,4.0026087 L56.62,3.5026087 C56.62,2.92262436 56.214985,2.5 55.68,2.5 L40.32,2.5 C39.785015,2.5 39.38,2.92262436 39.38,3.5026087 L39.38,4.0026087 L31.68,4.0026087 C31.433015,4.0026087 31.22,4.22488523 31.22,4.50434783 L31.22,12.5182609 C31.22,12.7977235 31.433015,13.02 31.68,13.02 L64.32,13.02 C64.566985,13.02 64.78,12.7977235 64.78,12.5182609 L64.78,4.50434783 C64.78,4.22488523 64.566985,4.0026087 64.32,4.0026087 Z'></path>
											<g
												fill='#D8D8D8'
												transform='translate(83)'>
												<circle
													cx='10'
													cy='13'
													r='3'
													opacity='.5'></circle>
												<circle
													cx='2'
													cy='9'
													r='2'
													opacity='.3'></circle>
												<path
													d='M8.5,1 C7.67157288,1 7,1.67157288 7,2.5 C7,3.32842712 7.67157288,4 8.5,4 C9.32842712,4 10,3.32842712 10,2.5 C10,1.67157288 9.32842712,1 8.5,1 Z M8.5,7.10542736e-15 C9.88071187,7.10542736e-15 11,1.11928813 11,2.5 C11,3.88071187 9.88071187,5 8.5,5 C7.11928813,5 6,3.88071187 6,2.5 C6,1.11928813 7.11928813,7.10542736e-15 8.5,7.10542736e-15 Z'
													opacity='.3'></path>
											</g>
											<path
												fill='#D8D8D8'
												d='M48.5,43 C48.7761424,43 49,43.2238576 49,43.5 C49,43.7761424 48.7761424,44 48.5,44 L26.5,44 C26.2238576,44 26,43.7761424 26,43.5 C26,43.2238576 26.2238576,43 26.5,43 L48.5,43 Z M68.5,34 C68.7761424,34 69,34.2238576 69,34.5 C69,34.7761424 68.7761424,35 68.5,35 L26.5,35 C26.2238576,35 26,34.7761424 26,34.5 C26,34.2238576 26.2238576,34 26.5,34 L68.5,34 Z M68.5,25 C68.7761424,25 69,25.2238576 69,25.5 C69,25.7761424 68.7761424,26 68.5,26 L26.5,26 C26.2238576,26 26,25.7761424 26,25.5 C26,25.2238576 26.2238576,25 26.5,25 L68.5,25 Z'></path>
										</g>
									</svg>
								</i>
								<p>Không tìm thấy đơn hàng</p>
							</div>
						) : (
							<div className='orders__list__body__arr'>
								<div className='orders__list__body__item orders__list__body__item--header'>
									<div className='orders__list__body__item__products'>
										<p>Sản phẩm</p>
									</div>
									<div className='orders__list__body__item__summary'>
										<p>Tổng hóa đơn</p>
									</div>
									<div className='orders__list__body__item__address'>
										<p>Địa chỉ giao hàng</p>
									</div>
									<div className='orders__list__body__item__info'>
										<p>Thông tin khách hàng</p>
									</div>
									<div className='orders__list__body__item__detail'>
										<p>Thông tin đặt hàng</p>
									</div>
									<div className='orders__list__body__item__status text-center'>
										<p>Trạng thái</p>
									</div>
								</div>
								{renderListOrder()}
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default AdminOrders;
