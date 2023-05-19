import { activeAccount, disableAccount, fetchAccounts } from "app/accountSlice";
import { fetchOrders } from "app/purchaseSlide";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Button } from "reactstrap";

function Accounts() {
	const dispatch = useDispatch();
	const accounts = useSelector((state) => state.accounts);
	const orders = useSelector((state) => state.purchase.orders);
	const [isActive, setIsActive] = useState(false);

	useEffect(() => {
		dispatch(fetchAccounts());
		dispatch(fetchOrders());
	}, [dispatch]);

	const onDisable = (id) => {
		setIsActive(true);
		dispatch(disableAccount(id));
		toast.success("Khóa tài khoản thành công!");
	};

	const onActive = (id) => {
		setIsActive(false);
		dispatch(activeAccount(id));
		toast.success("Kích hoạt tài khoản thành công!");
	};

	const renderAccounts = () => {
		return accounts.map((account) => {
			const orderQuantity = orders.filter(
				(order) => order.user === account._id
			).length;
			return (
				<div className='account__item' key={account._id}>
					<div className='account__name'>
						<p>{account.name}</p>
					</div>
					<div className='account__email'>
						<p>{account.email}</p>
					</div>
					<div className='account__phone'>
						<p>{account.phone}</p>
					</div>
					<div className='account__order'>
						<p>{orderQuantity} đơn hàng</p>
					</div>
					<div className='account__status'>
						<p>{account.isActive ? "Hoạt động" : "Bị khóa"}</p>
					</div>
					<div className='account__action account__action--body'>
						{account.isActive ? (
							<Button
								className='btn-secondary account__action__btn  shadow-none'
								onClick={() => onDisable(account._id)}
								disabled={isActive}>
								Khóa tài khoản
							</Button>
						) : (
							<Button
								className='btn-secondary account__action__btn account__action__btn--enable shadow-none'
								onClick={() => onActive(account._id)}
								disabled={!isActive}>
								Kích hoạt tài khoản
							</Button>
						)}
					</div>
				</div>
			);
		});
	};

	return (
		<div className='profile'>
			<div className='profile__header'>
				<h2 className='profile__heading'>
					Quản lý tài khoản người dùng
				</h2>
				<p className='profile__sub-heading'>
					Xem thông tin và quản lý tài khoản người dùng của bạn
				</p>
			</div>
			<div className='account__heading'>
				<h3>{accounts.length} người dùng</h3>
			</div>

			<div className='account'>
				<div className='account__header'>
					<div className='account__name'>
						<p>Tên người dùng</p>
					</div>
					<div className='account__email'>
						<p>Email</p>
					</div>
					<div className='account__phone'>
						<p>Số điện thoại</p>
					</div>
					<div className='account__order'>
						<p>Đơn hàng đã mua</p>
					</div>
					<div className='account__status'>
						<p>Trạng thái</p>
					</div>
					<div className='account__action'>
						<p>Hành động</p>
					</div>
				</div>
				<div className='account__body'>{renderAccounts()}</div>
			</div>
		</div>
	);
}

export default Accounts;
