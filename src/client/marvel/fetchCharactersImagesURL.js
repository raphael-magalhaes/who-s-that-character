import { http } from 'middleware'
import {
	MARVEL_API_IMAGE_PATH_BLACKLIST,
	MARVEL_API_REQUEST_OFFSET_WHITELIST,
	PUBLIC_MARVEL_API_KEY
} from 'static/data'

const getNextValidRequestOffset = offset => {
	if (MARVEL_API_REQUEST_OFFSET_WHITELIST.includes(offset)) {
		return offset
	}
	return getNextValidRequestOffset(offset + 1)
}

const composeCharacterThumbnailURL = (newPath, imageExtension) => {
	const MARVEL_IMAGE_VARIANT = 'standard_fantastic'
	return `${newPath}/${MARVEL_IMAGE_VARIANT}.${imageExtension}`
}

const composeRequestURL = offset => {
	return `https://gateway.marvel.com:443/v1/public/characters?limit=1&orderBy=name&offset=${offset}&apikey=${PUBLIC_MARVEL_API_KEY}`
}

const getResponseFirstCharacterInformation = response => {
	if (
		response &&
		response.data &&
		response.data.data &&
		response.data.data.results[0]
	) {
		const { name, description, thumbnail } = response.data.data.results[0]
		return { name, description, thumbnail }
	}

	return {}
}

const replaceHTTPwithHTTPS = (url = '') => url.replace('http://', 'https://')

const fetchCharactersImagesURL = ({
	currentRequestOffset,
	updateCurrentRequestOffset,
	updateCharactersInformation,
	charactersInformation = []
}) => {
	const currentOffsetToUse = getNextValidRequestOffset(currentRequestOffset)
	const url = composeRequestURL(currentOffsetToUse)

	http.get(url).then(response => {
		const {
			name,
			description,
			thumbnail
		} = getResponseFirstCharacterInformation(response)

		const { path, extension } = thumbnail

		if (path && extension) {
			const httpsPath = replaceHTTPwithHTTPS(path)
			if (MARVEL_API_IMAGE_PATH_BLACKLIST.includes(httpsPath)) {
				fetchCharactersImagesURL({
					currentRequestOffset: currentOffsetToUse + 1,
					updateCurrentRequestOffset,
					updateCharactersInformation,
					charactersInformation
				})
			} else {
				charactersInformation.push({
					url: composeCharacterThumbnailURL(httpsPath, extension),
					name,
					description,
					offset: currentOffsetToUse
				})

				updateCurrentRequestOffset(currentOffsetToUse + 1)
				if (charactersInformation.length < 5)
					fetchCharactersImagesURL({
						currentRequestOffset: currentOffsetToUse + 1,
						updateCurrentRequestOffset,
						updateCharactersInformation,
						charactersInformation
					})
			}
		} else {
			alert(
				'TODO: Handle the case where the request has failed to provide the necessary data.'
			)
		}
	})

	return charactersInformation
}

export default fetchCharactersImagesURL
