import React from 'react'
import Logo from './Logo'
import './style.css'

const Title = props => {
	return (
		<div className={'title__container'}>
			<Logo />
			<h1 className={'title__text'}>GUESS THE MARVEL'S COMICS CHARACTER!</h1>
		</div>
	)
}

export default Title
