import React from "react";
import PropTypes from "prop-types";
import { Pagination as PaginationRT, PaginationItem } from "reactstrap";
import { Link } from "react-router-dom";
import qs from "query-string";
import { useSelector } from "react-redux";

Pagination.propTypes = {
	location: PropTypes.object.isRequired,
};

Pagination.defaultProps = {
	location: {},
};

function Pagination({ location }) {
	const pagination = useSelector((state) => state.products.pagination);
	const { next, prev, limit, total } = pagination;
	const { pathname, search } = location;
	const { page } = qs.parse(search);

	const numberOfPage = Math.ceil(total / limit);

	const changePage = (number) => {
		window.scrollTo(0, 0);
		if (search) {
			return page
				? search.replace(`page=${page}`, `page=${number}`)
				: search + "&page=" + number;
		}
		return "?page=" + number;
	};

	const renderPagination = () => {
		const pagination = [];
		for (let i = 1; i <= numberOfPage; ++i) {
			pagination.push(i);
		}

		return pagination.map((item, index) => {
			return (
				<PaginationItem
					key={index}
					active={
						prev || next
							? page === item ||
							  prev + 1 === item ||
							  next - 1 === item
							: true
					}>
					<Link
						className='page-link'
						to={`${pathname}${
							search ? changePage(item) : `?page=${item}`
						}`}
						onClick={(e) => {
							if (prev + 1 === item || next - 1 === item) {
								e.preventDefault();
							}
						}}>
						{item}
					</Link>
				</PaginationItem>
			);
		});
	};

	return (
		<PaginationRT size='lg' className='pagination--wrap'>
			<PaginationItem disabled={prev ? false : true}>
				<Link
					className='page-link'
					aria-label='Previous'
					to={`${pathname}${
						search ? changePage(prev) : `?page=${prev}`
					}`}
					onClick={(e) => {
						if (!prev) e.preventDefault();
					}}>
					{" "}
					<span aria-hidden='true' className='pagination-previous'>
						<i className='fas fa-chevron-left'></i>
					</span>
				</Link>
			</PaginationItem>
			{renderPagination()}
			<PaginationItem disabled={next ? false : true}>
				<Link
					className='page-link'
					aria-label='Next'
					to={`${pathname}${
						search ? changePage(next) : `?page=${next}`
					}`}
					onClick={(e) => {
						if (!next) e.preventDefault();
					}}>
					<span aria-hidden='true'>
						<i className='fas fa-chevron-right'></i>
					</span>
				</Link>
			</PaginationItem>
		</PaginationRT>
	);
}

export default Pagination;
