import React from 'react'
import Score from './Score'
import Lives from './Lives'
import './style.css'

const ScoreBoard = props => {
	return (
		<div className={'score-board__container'}>
			<Score />
			<Lives />
		</div>
	)
}

export default ScoreBoard
