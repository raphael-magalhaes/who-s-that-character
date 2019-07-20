import React from 'react'
import './style.css'

const CommunicationBoard = ({ message, buttonCallback, buttonText }) => {
	return (
		<div className='communication-board__container'>
			<p className='communication-board__message'>{message}</p>
			{buttonCallback && (
				<button
					className={
						'communication-board__confirm-button text__soft-shadow box__soft-shadow'
					}
					onClick={buttonCallback}>
					{buttonText}
				</button>
			)}
		</div>
	)
}

export default CommunicationBoard
