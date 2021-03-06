import React from 'react'
import './style.css'

const LOGO_GIF_URL = 'https://i.giphy.com/media/Ec8692cTyljWg/giphy.webp'
const THE_AVENGERS_THEME_SONG_URL =
	'https://medea-music.com/wp-content/uploads/2018/05/The-Avengers-Theme-Song.mp3?_=2'

const setupHoverSound = () => {
	const audio = new Audio(THE_AVENGERS_THEME_SONG_URL)
	audio.volume = 0.15
	return audio
}

const HoverSound = setupHoverSound()

const onMouseOver = () => {
	HoverSound.play().catch(() => {
		// Intentionally suppresses the error.
		// FIXME: Remove this catch and fix the error:
		// Uncaught (in promise) DOMException: The play() request was interrupted by a call to pause(). https://goo.gl/LdLk22
	})
}

const onMouseLeave = () => {
	HoverSound.pause()
}

const Logo = () => {
	return (
		<div className={'logo__container'}>
			<img
				alt=''
				title={'What are Batman and others doing here!?'}
				className={'logo__grow logo__image'}
				draggable='false'
				onMouseOver={onMouseOver}
				onMouseLeave={onMouseLeave}
				src={LOGO_GIF_URL}
			/>
		</div>
	)
}

export default Logo
