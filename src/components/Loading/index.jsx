import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function Loading() {
	const loading = useSelector((state) => state.ui.loading);
	const [isLoading, setIsLoading] = useState(loading);

	useEffect(() => {
		setIsLoading(loading);
	}, [loading]);

	return (
		<>
			{isLoading ? (
				<div className='loader-wrap'>
					<div className='loader'></div>
				</div>
			) : null}
		</>
	);
}

export default Loading;
