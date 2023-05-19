import { Link } from "react-router-dom";
import { Button, Input } from "reactstrap";
import PropTypes from "prop-types";

ListItem.propTypes = {
	product: PropTypes.object,
	categories: PropTypes.array,
	pathname: PropTypes.string,
	handleDeleteItem: PropTypes.func.isRequired,
	handleCheck: PropTypes.func.isRequired,
	checkList: PropTypes.array,
};

ListItem.defaultProps = {
	checkList: [],
	product: {},
};

function ListItem({
	product,
	categories,
	pathname,
	checkList,
	handleDeleteItem,
	handleCheck,
}) {
	return (
		<div className='list__item'>
			<div className='list__checkbox list__checkbox--body'>
				<Input
					className='check-input shadow-none'
					type='checkbox'
					name='checkbox'
					value={product._id}
					onChange={handleCheck}
					checked={checkList.includes(product._id)}
				/>
			</div>
			<div className='list__name list__name--body'>
				<p>{product.title}</p>
			</div>
			<div className='list__pictures list__pictures--body'>
				{product.pictures.map((img, i) => (
					<img src={img} key={i} alt='anh' className='img' />
				))}
			</div>
			<div className='list__cate list__cate--body'>
				<p>
					{categories.find((cate) => cate._id === product.category)
						? categories.find(
								(cate) => cate._id === product.category
						  ).name
						: ""}
				</p>
			</div>
			<div className='list__price list__price--body'>
				<p>
					{product.price.toLocaleString()} <sup>đ</sup>
				</p>
			</div>
			<div className='list__origin list__origin--body'>
				<p>{product.country}</p>
			</div>
			<div className='list__action list__action--body'>
				<Link to={pathname + `/edit/${product._id}`}>
					<Button className='list__action__btn shadow-none'>
						Sửa
					</Button>
				</Link>
				<Button
					className='list__action__btn shadow-none'
					onClick={() => handleDeleteItem(product._id)}>
					Xóa
				</Button>
			</div>
		</div>
	);
}

export default ListItem;
