import React, { useState } from 'react'
import { CharacterAvatar, ScoreBoard, Title } from 'components'
import { marvel } from 'client'
import './style.css'

const MAX_NUMBER_OF_MATCHES = 9

const checkForGameOver = numberOfMatches => {
	if (numberOfMatches === MAX_NUMBER_OF_MATCHES) {
	alert(`[WIP] This feature is not ready
	
	The game is over!

		Your Score: [WIP]
		`)
		return true
	}
	return false
}

const getRandomNumberFrom1To5ToChooseCharacterDescription = () => {
	return Math.floor(Math.random() * 5)
}

const chooseCharacterIndexToGuess = (characterIndex, updateCharacterIndex) => {
	characterIndex = getRandomNumberFrom1To5ToChooseCharacterDescription()
	updateCharacterIndex(characterIndex)
}

const alertCharacterInfo = (index, charactersInformation) => {
	alert(`[WIP] This feature is not ready

	You clicked following character:

	Name: ${charactersInformation[index] && charactersInformation[index].name}

	Description: ${charactersInformation[index] &&
		charactersInformation[index].description}

	Request Offset: ${charactersInformation[index] &&
		charactersInformation[index].offset}

	`)
}

const Home = () => {
	const [requestOffset, updateRequestOffset] = useState(0)
	const [charactersInformation, updateCharactersInformation] = useState([])
	const [isLoadingCharacters, updateIsLoadingCharacters] = useState(false)
	const [numberOfMatches, updateNumberOfMatches] = useState(0)

	const [characterIndex, updateCharacterIndex] = useState(undefined)

	if (charactersInformation.length === 5 && characterIndex === undefined) {
		setTimeout(() => {
			chooseCharacterIndexToGuess(characterIndex, updateCharacterIndex)
			updateIsLoadingCharacters(false)
		}, 700)
	}

	return (
		<div className='home__container'>
			{/* TODO: Extract inline css to a css class */}
			<div className='home__spacer' style={
				{
					width: '100%',
					display: 'flex',
					flexDirection: 'column',
					backgroundColor: '#ed1d24',
					alignItems: 'center',
					justifyContent: 'space-evenly',
					verticalAlign: 'middle'
					}
				}>
				<Title />
				<ScoreBoard />
			</div>
			{/* TODO: Componentize the get characters button and start game information */}
			<div className=' home__game-information'>
				<button
					className={'home__start-game-button'}
					onClick={async () => {
						if (checkForGameOver(numberOfMatches)) {
 							updateCharactersInformation([])
							updateCharacterIndex(undefined)
							updateNumberOfMatches(0)
							updateRequestOffset(0)
							return
						}

						updateIsLoadingCharacters(true)
						updateCharactersInformation([])
						updateCharacterIndex(undefined)

						const result = await marvel.fetchCharactersImagesURL({
							currentRequestOffset: requestOffset,
							updateCurrentRequestOffset: updateRequestOffset,
							updateCharactersInformation
						})

						updateCharactersInformation(result)
						updateNumberOfMatches(numberOfMatches + 1)
					}}>
					GET CHARACTERS
				</button>
				{/* TODO: Extract inline css to a css class */}
				<p style={{ fontFamily: 'Roboto-Regular', fontWeight: '400' }}>
					{isLoadingCharacters && 'Wait untill all characters are ready!'}

					{!isLoadingCharacters &&
						charactersInformation.length < 5 &&
						`Press GET CHARACTERS to play, then read the character's description and
					make your guess by clicking in the character's image!`}

					{!isLoadingCharacters &&
						charactersInformation.length === 5 &&
						charactersInformation[characterIndex] &&
						charactersInformation[characterIndex].description}
				</p>
			</div>
			<div className='home__bottom-items home__spacer'>
				{/* TODO: Componentize these 5 CharacterAvatar */}
				<CharacterAvatar
					src={charactersInformation[0] && charactersInformation[0].url}
					onClick={() => alertCharacterInfo(0, charactersInformation)}
				/>
				<CharacterAvatar
					src={charactersInformation[1] && charactersInformation[1].url}
					onClick={() => alertCharacterInfo(1, charactersInformation)}
				/>
				<CharacterAvatar
					src={charactersInformation[2] && charactersInformation[2].url}
					onClick={() => alertCharacterInfo(2, charactersInformation)}
				/>
				<CharacterAvatar
					src={charactersInformation[3] && charactersInformation[3].url}
					onClick={() => alertCharacterInfo(3, charactersInformation)}
				/>
				<CharacterAvatar
					src={charactersInformation[4] && charactersInformation[4].url}
					onClick={() => alertCharacterInfo(4, charactersInformation)}
				/>
			</div>
		</div>
	)
}

export default Home
