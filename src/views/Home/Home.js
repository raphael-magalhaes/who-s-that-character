import React from 'react'
import { CharacterAvatar, ScoreBoard, Header } from 'components'
import { marvel } from 'client'
import './style.css'

const MAX_NUMBER_OF_MATCHES = 9
const POINTS_PER_CORRECT_ANSWER = 100

class Home extends React.Component {
	state = {
		numberOfPlayedMatches: 0,
		marvelAPICurrentRequestOffset: 0,
		isLoadingCharacters: false,
		charactersInformation: [],
		characterIndexToBeGuessed: undefined,
		scorePoints: 0,
		numberOfLives: 3
	}

	wasAllMatchesPlayed = () => {
		const { numberOfPlayedMatches } = this.state

		return numberOfPlayedMatches === MAX_NUMBER_OF_MATCHES
	}

	checkForGameOver = () => {
		const { numberOfLives } = this.state

		if (this.wasAllMatchesPlayed() || numberOfLives < 1) return true

		return false
	}

	chooseCharacterIndexToGuess = () => {
		const characterIndexToBeGuessed = Math.floor(Math.random() * 5)
		this.setState({ characterIndexToBeGuessed })
	}

	updateRequestOffset = marvelAPICurrentRequestOffset => {
		this.setState({ marvelAPICurrentRequestOffset })
	}

	updateCharactersInformation = charactersInformation => {
		this.setState({ charactersInformation })
	}

	displayGameOverMessage = () => {
		const { numberOfLives, scorePoints } = this.state

		const winOrLostMessage = numberOfLives > 0 ? `You won!` : `You lost!`
		const restOfMessage = `Your final score was ${scorePoints}`

		alert(
			`Game Over!
			
			${winOrLostMessage} ${restOfMessage}`
		)
	}

	resetGame = () => {
		this.setState({
			numberOfPlayedMatches: 0,
			marvelAPICurrentRequestOffset: 0,
			isLoadingCharacters: false,
			charactersInformation: [],
			characterIndexToBeGuessed: undefined,
			scorePoints: 0,
			numberOfLives: 3
		})
	}

	onFetchCharactersImagesURL = async () => {
		const { marvelAPICurrentRequestOffset, numberOfPlayedMatches } = this.state
		this.setState({
			isLoadingCharacters: true,
			charactersInformation: [],
			characterIndexToBeGuessed: undefined
		})

		const result = await marvel.fetchCharactersImagesURL({
			currentRequestOffset: marvelAPICurrentRequestOffset,
			updateCurrentRequestOffset: this.updateRequestOffset,
			updateCharactersInformation: this.updateCharactersInformation
		})

		this.setState({
			charactersInformation: result,
			numberOfPlayedMatches: numberOfPlayedMatches + 1
		})
	}

	onRightAnswer = () => {
		const { scorePoints } = this.state

		this.setState(
			{
				scorePoints: scorePoints + POINTS_PER_CORRECT_ANSWER
			},
			() => {
				alert('You got it right!')
				if (this.checkForGameOver()) {
					this.displayGameOverMessage()
					this.resetGame()
					return
				}
				this.onFetchCharactersImagesURL()
			}
		)
	}

	onWrongAnswer = () => {
		const { numberOfLives } = this.state

		this.setState(
			{
				numberOfLives: numberOfLives - 1
			},
			() => {
				alert('You got it wrong!')
				if (this.checkForGameOver()) {
					this.displayGameOverMessage()
					this.resetGame()
					return
				}
				this.onFetchCharactersImagesURL()
			}
		)
	}

	onUserGuess = selectedCharacterIndex => {
		const { characterIndexToBeGuessed, charactersInformation } = this.state

		if (characterIndexToBeGuessed === undefined) {
			if (charactersInformation.length === 0)
				alert('Press PLAY THE GAME to start!')
			else alert('Wait untill all characters are ready!')
			return
		}

		if (selectedCharacterIndex === characterIndexToBeGuessed) {
			this.onRightAnswer()
		} else {
			this.onWrongAnswer()
		}
	}

	isLoadingComplete = () => {
		const { charactersInformation, characterIndexToBeGuessed } = this.state

		if (
			charactersInformation.length === 5 &&
			characterIndexToBeGuessed === undefined
		) {
			setTimeout(() => {
				this.chooseCharacterIndexToGuess()
				this.setState({ isLoadingCharacters: false })
			}, 700)
		}
	}

	render() {
		const {
			isLoadingCharacters,
			charactersInformation,
			characterIndexToBeGuessed,
			numberOfPlayedMatches,
			scorePoints,
			numberOfLives
		} = this.state

		this.isLoadingComplete()
		return (
			<div className='home__container'>
				<Header />
				<ScoreBoard score={scorePoints} lifes={numberOfLives} />
				{/* TODO: Componentize the get characters button and start game information */}
				<div className=' home__game-information'>
					{numberOfPlayedMatches === 0 && (
						<button
							className={
								'home__start-game-button text__soft-shadow box__soft-shadow'
							}
							onClick={this.onFetchCharactersImagesURL}>
							PLAY THE GAME
						</button>
					)}
					{/* TODO: Extract inline css to a css class */}
					<p style={{ fontFamily: 'Roboto-Regular', fontWeight: '400' }}>
						{isLoadingCharacters && 'Wait untill all characters are ready!'}

						{!isLoadingCharacters &&
							charactersInformation.length < 5 &&
							`Press PLAY THE GAME to play, then read the character's description and
						make your guess by clicking in the character's image!`}

						{!isLoadingCharacters &&
							charactersInformation.length === 5 &&
							charactersInformation[characterIndexToBeGuessed] &&
							charactersInformation[characterIndexToBeGuessed].description}
					</p>
				</div>
				<div className='home__bottom-items home__spacer'>
					{/* TODO: Componentize these 5 CharacterAvatar */}
					<CharacterAvatar
						src={charactersInformation[0] && charactersInformation[0].url}
						onClick={() => {
							this.onUserGuess(0)
						}}
					/>
					<CharacterAvatar
						src={charactersInformation[1] && charactersInformation[1].url}
						onClick={() => {
							this.onUserGuess(1)
						}}
					/>
					<CharacterAvatar
						src={charactersInformation[2] && charactersInformation[2].url}
						onClick={() => {
							this.onUserGuess(2)
						}}
					/>
					<CharacterAvatar
						src={charactersInformation[3] && charactersInformation[3].url}
						onClick={() => {
							this.onUserGuess(3)
						}}
					/>
					<CharacterAvatar
						src={charactersInformation[4] && charactersInformation[4].url}
						onClick={() => {
							this.onUserGuess(4)
						}}
					/>
				</div>
			</div>
		)
	}
}

export default Home
