import React from 'react'
import './style.css'

const Score = ({ value }) => {
	return (
		<div className='score__container font-roboto__headline'>SCORE: {value}</div>
	)
}

export default Score
