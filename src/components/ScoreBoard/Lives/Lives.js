import React from 'react'
import './style.css'

const generateHearts = numberOfHearts => {
	let hearts = ''
	for (let index = 0; index < numberOfHearts; index++) {
		hearts += '♥ '
	}
	return <span className='lives__hearts'>{hearts}</span>
}

const Lives = ({ value }) => {
	const heartsToRender = generateHearts(value)

	return (
		<div className='lives__container font-roboto__headline'>
			LIFES: {heartsToRender}
		</div>
	)
}

export default Lives
