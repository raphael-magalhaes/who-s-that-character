import React from 'react'
import './style.css'

const setupHoverSound = () => {
	const THE_AVENGERS_THEME_SONG_URL =
		'https://medea-music.com/wp-content/uploads/2018/05/The-Avengers-Theme-Song.mp3?_=2'
	const audio = new Audio(THE_AVENGERS_THEME_SONG_URL)
	audio.volume = 0.15
	return audio
}

const HoverSound = setupHoverSound()

const onMouseOver = () => {
	HoverSound.play()
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
				src={'https://i.giphy.com/media/Ec8692cTyljWg/giphy.webp'}
			/>
		</div>
	)
}

export default Logo
