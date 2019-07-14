import React, { useState } from 'react'
import { CharacterAvatar, ScoreBoard, Title } from 'components'
import { marvel } from 'client'
import './style.css'

const Home = () => {
	const [currentRequestOffset, updateCurrentRequestOffset] = useState(0)
	const [charactersImagesURLs, setCharactersImagesURLs] = useState([])

	return (
		<div className='home__container'>
			{/* TODO: Extract a spacer component */}
			<div className='home__spacer' />
			{/* TODO: Extract inline css to a css class */}
			<div style={{ display: 'flex', flexDirection: 'column' }}>
				<Title />
				<div className='home__spacer' />
				<ScoreBoard />
			</div>
			{/* TODO: Componentize this start game information and the start button */}
			<div className='home__spacer'>
				{/* TODO: Extract inline css to a css class */}
				<p style={{ fontFamily: 'Roboto-Regular', fontWeight: '400' }}>
					Press START GAME to play, then read the character's description and
					make your guess by clicking in the character's image!
				</p>
				<button
					onClick={() => {
						setCharactersImagesURLs([])
						marvel.fetchCharactersImagesURL(
							currentRequestOffset,
							updateCurrentRequestOffset,
							setCharactersImagesURLs
						)
					}}>
					START GAME
				</button>
			</div>
			<div className='home__bottom-items'>
				{/* TODO: Componentize these 5 CharacterAvatar */}
				<CharacterAvatar src={charactersImagesURLs[0]} />
				<CharacterAvatar src={charactersImagesURLs[1]} />
				<CharacterAvatar src={charactersImagesURLs[2]} />
				<CharacterAvatar src={charactersImagesURLs[3]} />
				<CharacterAvatar src={charactersImagesURLs[4]} />
			</div>

			<div className='home__spacer' />
		</div>
	)
}

export default Home
