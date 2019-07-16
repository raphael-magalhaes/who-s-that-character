import React from 'react'
import imageHoverSound from './assets/imageHoverSound.mp3'
import NO_IMAGE_GIF from './assets/backgroundStatic.gif'
import './style.css'

const setupHoverSound = () => {
	const audio = new Audio(imageHoverSound)
	audio.volume = 0.1
	return audio
}

const hoverSound = setupHoverSound()

const playHoverSound = () =>
	hoverSound.play().catch(() => {
		// Intentionally suppresses the error.
		// FIXME: Remove this catch and fix the error:
		// Uncaught (in promise) DOMException: The play() request was interrupted by a call to pause(). https://goo.gl/LdLk22
	})

const onMouseOver = () => {
	playHoverSound()
}

const CharacterImage = ({ src = NO_IMAGE_GIF, onClick }) => {
	return (
		<div className={'character-avatar__container'}>
			<img
				alt=''
				className={'character-avatar__grow character-avatar__image'}
				draggable='false'
				onClick={onClick}
				onMouseOver={onMouseOver}
				onLoad={playHoverSound}
				src={src}
			/>
		</div>
	)
}

export default CharacterImage
