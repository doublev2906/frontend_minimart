import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
	return (
		<div className='not-found'>
			<div className='mars'></div>
			<img
				src='https://assets.codepen.io/1538474/404.svg'
				className='logo-404'
				alt='img'
			/>
			<img
				src='https://assets.codepen.io/1538474/meteor.svg'
				className='meteor'
				alt='img'
			/>
			<p className='title'>Oh no!!</p>
			<p className='subtitle'>
				You’re either misspelling the URL <br /> or requesting a page
				that's no longer here.
			</p>
			<div align='center'>
				<Link to='/' className='btn-back'>
					Trở lại trang chủ
				</Link>
			</div>
			<img
				src='https://assets.codepen.io/1538474/astronaut.svg'
				className='astronaut'
				alt='img'
			/>
			<img
				src='https://assets.codepen.io/1538474/spaceship.svg'
				className='spaceship'
				alt='img'
			/>
		</div>
	);
}

export default NotFound;
