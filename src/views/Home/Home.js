import React from 'react'
import {
	CharactersGroup,
	CommunicationBoard,
	Header,
	ScoreBoard
} from 'components'
import { marvel } from 'client'
import './style.css'

const MAX_NUMBER_OF_MATCHES = 9
const POINTS_PER_CORRECT_ANSWER = 100

class Home extends React.Component {
	state = {
		communicationBoardMessage: undefined,
		communicationBoardButtonText: undefined,
		communicationBoardButtonCallback: undefined,
		onCharacterAvatarClick: () => {},
		numberOfPlayedMatches: 0,
		marvelAPICurrentRequestOffset: 0,
		isLoadingCharacters: false,
		charactersInformation: [],
		characterIndexToBeGuessed: undefined,
		scorePoints: 0,
		numberOfLives: 3
	}

	componentDidMount = () => {
		this.setInitialGameMessage()
	}

	setInitialGameMessage = () => {
		this.setState({
			communicationBoardMessage: `Press PLAY THE GAME, then read the character's description
			and make your guess by clicking or tapping in the character's image!`,
			communicationBoardButtonText: 'PLAY THE GAME',
			communicationBoardButtonCallback: this.onFetchCharactersImagesURL,
			onCharacterAvatarClick: this.onUserGuess
		})
	}

	setGameLoadingMessage = () => {
		this.setState({
			communicationBoardMessage: `Wait untill all characters are ready!`,
			communicationBoardButtonText: undefined,
			communicationBoardButtonCallback: undefined
		})
	}

	setCharacterDescriptionMessage = description => {
		this.setState({
			communicationBoardMessage: `Who is this: ${description}`,
			communicationBoardButtonText: undefined,
			communicationBoardButtonCallback: undefined
		})
	}

	setGameOverMessage = () => {
		const { numberOfLives, scorePoints } = this.state

		const winOrLostMessage = numberOfLives > 0 ? `You won!` : `You lost!`
		const restOfMessage = `Your final score was ${scorePoints}`

		this.setState({
			communicationBoardMessage: `${winOrLostMessage} ${restOfMessage}`,
			communicationBoardButtonText: 'PLAY AGAIN',
			communicationBoardButtonCallback: this.resetGame
		})
	}

	wasAllMatchesPlayed = () => {
		const { numberOfPlayedMatches } = this.state

		return numberOfPlayedMatches === MAX_NUMBER_OF_MATCHES
	}

	checkForGameOver = () => {
		const { numberOfLives } = this.state

		if (this.wasAllMatchesPlayed() || numberOfLives < 1) {
			this.setGameOverMessage()
		}
	}

	resetGame = () => {
		this.setState({
			onCharacterAvatarClick: () => {},
			numberOfPlayedMatches: 0,
			marvelAPICurrentRequestOffset: 0,
			isLoadingCharacters: false,
			charactersInformation: [],
			characterIndexToBeGuessed: undefined,
			scorePoints: 0,
			numberOfLives: 3
		})
		this.setInitialGameMessage()
	}

	chooseCharacterIndexToGuess = () => {
		const { charactersInformation } = this.state
		const characterIndexToBeGuessed = Math.floor(Math.random() * 5)

		const description =
			charactersInformation[characterIndexToBeGuessed].description

		this.setState({ characterIndexToBeGuessed })
		this.setCharacterDescriptionMessage(description)
	}

	updateRequestOffset = marvelAPICurrentRequestOffset => {
		this.setState({ marvelAPICurrentRequestOffset })
	}

	updateCharactersInformation = charactersInformation => {
		this.setState({ charactersInformation })
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

	onFetchCharactersImagesURL = async () => {
		const { marvelAPICurrentRequestOffset, numberOfPlayedMatches } = this.state
		this.setGameLoadingMessage()
		this.setState({
			isLoadingCharacters: true,
			charactersInformation: [],
			characterIndexToBeGuessed: undefined,
			onCharacterAvatarClick: this.onUserGuess
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
				scorePoints: scorePoints + POINTS_PER_CORRECT_ANSWER,
				communicationBoardMessage: 'You got it right!',
				communicationBoardButtonText: 'NEXT',
				communicationBoardButtonCallback: this.onFetchCharactersImagesURL,
				onCharacterAvatarClick: () => {}
			},
			() => this.checkForGameOver()
		)
	}

	onWrongAnswer = () => {
		const { numberOfLives } = this.state

		this.setState(
			{
				numberOfLives: numberOfLives - 1,
				communicationBoardMessage: 'You got it wrong!',
				communicationBoardButtonText: 'NEXT',
				communicationBoardButtonCallback: this.onFetchCharactersImagesURL,
				onCharacterAvatarClick: () => {}
			},
			() => this.checkForGameOver()
		)
	}

	onUserGuess = selectedCharacterIndex => {
		const {
			characterIndexToBeGuessed,
			charactersInformation,
			isLoadingCharacters
		} = this.state

		if (characterIndexToBeGuessed === undefined) {
			if (!isLoadingCharacters && charactersInformation.length === 0)
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

	render() {
		const {
			communicationBoardMessage,
			communicationBoardButtonText,
			communicationBoardButtonCallback,
			onCharacterAvatarClick,
			charactersInformation,
			scorePoints,
			numberOfLives
		} = this.state

		this.isLoadingComplete()
		return (
			<div className='home__container'>
				<Header />
				<ScoreBoard score={scorePoints} lifes={numberOfLives} />
				<CommunicationBoard
					message={communicationBoardMessage}
					buttonText={communicationBoardButtonText}
					buttonCallback={communicationBoardButtonCallback}
				/>
				<CharactersGroup
					charactersInformation={charactersInformation}
					onAvatarClick={onCharacterAvatarClick}
				/>
			</div>
		)
	}
}

export default Home
