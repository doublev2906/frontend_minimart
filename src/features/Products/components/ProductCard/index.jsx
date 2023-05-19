import { addPreview } from "app/productsSlice";
import AddToCartBtn from "components/AddToCartBtn";
import ReadMore from "components/ReadMore";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Col } from "reactstrap";
import cls from "classnames";

ProductCard.propTypes = {
	product: PropTypes.object.isRequired,
};

function ProductCard({ product, width }) {
	const [isLoved, setIsLoved] = useState(false);
	const { title, price, discount, pictures, _id } = product;
	const dispatch = useDispatch();

	const productCurrentPrice = (
		price -
		price * (discount / 100)
	).toLocaleString();

	return (
		<Col
			xs='6'
			sm='6'
			md='4'
			lg={width !== "2-4" ? width : ""}
			className={cls({
				"product-card--wrap": true,
				"col-2-4": width === "2-4",
			})}>
			<div className='product-card'>
				<Link
					to={`/products/${title.replaceAll(" ", "-")}?id=${_id}`}
					className='product-card__link'>
					<div className='product-card__img'>
						<img src={pictures[0]} alt='anh' />
					</div>
					<div className='product-card__info'>
						<ReadMore
							className='product-card__name'
							row={1}
							readMore={false}
							content={title}
						/>

						<div className='product-card__price--wrap'>
							{discount > 0 ? (
								<>
									<p className='product__price'>
										{productCurrentPrice} <sup>đ</sup>/kg
									</p>
									<p className='product__price--old'>
										{price.toLocaleString()} <sup>đ</sup>/kg
									</p>
								</>
							) : (
								<p className='product__price'>
									{price.toLocaleString()} <sup>đ</sup>/kg
								</p>
							)}
						</div>
					</div>
				</Link>
				<p
					className='product-card__view--btn'
					onClick={() => {
						dispatch(addPreview(product));
					}}>
					<i className='fas fa-eye'></i>
				</p>
				<p className='product-card__favorite--btn'>
					{isLoved ? (
						<i
							className='fas fa-heart'
							onClick={() => setIsLoved(!isLoved)}></i>
					) : (
						<i
							className='far fa-heart'
							onClick={() => setIsLoved(!isLoved)}></i>
					)}
				</p>
				<AddToCartBtn absolute={true} product={product} />
			</div>
		</Col>
	);
}

export default ProductCard;
