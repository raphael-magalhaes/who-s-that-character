import React from 'react'
import Title from './Title'
import Logo from './Logo'
import './style.css'

const Header = () => {
	return (
		<div className='header__container'>
			<Logo />
			<Title />
		</div>
	)
}

export default Header
