import React from 'react'
import CharacterAvatar from './CharacterAvatar'

const getCharactersAvatar = (charactersInformation, onAvatarClick) => {
	const elements = []

	for (let index = 0; index < 5; index++) {
		elements.push(
			<CharacterAvatar
				key={index}
				src={
					charactersInformation &&
					charactersInformation[index] &&
					charactersInformation[index].url
				}
				onClick={() => {
					onAvatarClick(index)
				}}
			/>
		)
	}
	return elements
}

const CharactersGroup = ({ charactersInformation, onAvatarClick }) => {
	const charactersAvatars = getCharactersAvatar(
		charactersInformation,
		onAvatarClick
	)

	return <div>{charactersAvatars}</div>
}

export default CharactersGroup
