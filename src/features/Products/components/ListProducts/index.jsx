import React from "react";
import PropTypes from "prop-types";
import ProductCard from "features/Products/components/ProductCard";
import { Row } from "reactstrap";
import { images } from "constant";

ListProducts.propTypes = {
	products: PropTypes.array.isRequired,
};

function ListProducts({ products }) {
	const renderProductItem = () => {
		if (products.length === 0)
			return (
				<div className='list-empty'>
					<img src={images.LIST_EMPTY} alt='anh' />
					<p>Không có sản phẩm nào thuộc danh mục này</p>
				</div>
			);

		return products.map((item, index) => {
			return <ProductCard key={index} product={item} width={3} />;
		});
	};
	return <Row className='product-list'>{renderProductItem()}</Row>;
}

export default ListProducts;
