import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import qs from "query-string";
import { useDispatch } from "react-redux";
import { fetchProductsSearch } from "app/productsSlice";
import { Col, Container, Row } from "reactstrap";
import { useSelector } from "react-redux";
import ProductCard from "features/Products/components/ProductCard";
import Pagination from "components/Pagination";

function ProductSearch() {
	const dispatch = useDispatch();
	const location = useLocation();
	const { keyword, page } = qs.parse(location.search);
	const products = useSelector((state) => state.products.productsSearch);
	const pagination = useSelector((state) => state.products.pagination);

	useEffect(() => {
		dispatch(fetchProductsSearch({ search: keyword, limit: 20, page }));
	}, [dispatch, keyword, page]);

	const renderProductSearch = () => {
		return products.map((product, index) => (
			<ProductCard key={index} product={product} width={"2-4"} />
		));
	};

	return (
		<Container>
			<Row>
				<Col md='12'>
					<h1 className='my-5'>
						Có {pagination.total} kết quả tìm kiếm phù hợp
					</h1>
					<Row style={{ rowGap: "20px", marginBottom: "30px" }}>
						{renderProductSearch()}
					</Row>
					<Pagination location={location} />
				</Col>
			</Row>
		</Container>
	);
}

export default ProductSearch;
