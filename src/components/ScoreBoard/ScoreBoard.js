import React from 'react'
import Score from './Score'
import Lives from './Lives'
import './style.css'

const ScoreBoard = ({ score, lifes }) => {
	return (
		<div className='score-board__container'>
			<Score value={score} />
			<Lives value={lifes} />
		</div>
	)
}

export default ScoreBoard
