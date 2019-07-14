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
const playHoverSound = () => hoverSound.play()

const onMouseOver = () => {
	playHoverSound()
}

const onClick = () => {
	alert('Howdy, stranger. This feature is in progress!')
}

const CharacterImage = ({ src = NO_IMAGE_GIF }) => {
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
