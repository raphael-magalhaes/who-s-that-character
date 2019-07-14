import { http } from 'middleware'
import {
	MARVEL_API_IMAGE_PATH_BLACKLIST,
	MARVEL_API_REQUEST_OFFSET_BLACKLIST,
	PUBLIC_MARVEL_API_KEY
} from 'static/data'

const getNextValidRequestOffset = offset => {
	if (MARVEL_API_REQUEST_OFFSET_BLACKLIST.includes(offset)) {
		return getNextValidRequestOffset(offset + 1)
	}
	return offset
}

const appendImagePath = (
	charactersImagesURLs = [],
	newPath,
	imageExtension
) => {
	const MARVEL_IMAGE_VARIANT = 'standard_fantastic'
	const characterImageURL = `${newPath}/${MARVEL_IMAGE_VARIANT}.${imageExtension}`
	charactersImagesURLs.push(characterImageURL)
}

const composeURL = offset => {
	return `https://gateway.marvel.com:443/v1/public/characters?limit=1&orderBy=name&offset=${offset}&apikey=${PUBLIC_MARVEL_API_KEY}`
}

const getResponseFirstThumbnailObject = response => {
	if (
		response &&
		response.data &&
		response.data.data &&
		response.data.data.results[0]
	) {
		return response.data.data.results[0].thumbnail
	}

	return {}
}

const replaceHTTPwithHTTPS = (url = '') => url.replace('http://', 'https://')

const fetchCharactersImagesURL = (
	currentRequestOffset,
	updateCurrentRequestOffset,
	setCharactersImagesURLs,
	charactersImagesURLs = []
) => {
	const currentOffsetToUse = getNextValidRequestOffset(currentRequestOffset)
	const url = composeURL(currentOffsetToUse)

	http.get(url).then(response => {
		const { path, extension } = getResponseFirstThumbnailObject(response)

		if (path && extension) {
			const httpsPath = replaceHTTPwithHTTPS(path)
			if (MARVEL_API_IMAGE_PATH_BLACKLIST.includes(httpsPath)) {
				fetchCharactersImagesURL(
					currentOffsetToUse + 1,
					updateCurrentRequestOffset,
					setCharactersImagesURLs,
					charactersImagesURLs
				)
			} else {
				appendImagePath(charactersImagesURLs, httpsPath, extension)

				updateCurrentRequestOffset(currentOffsetToUse + 1)
				if (charactersImagesURLs.length < 5)
					fetchCharactersImagesURL(
						currentOffsetToUse + 1,
						updateCurrentRequestOffset,
						setCharactersImagesURLs,
						charactersImagesURLs
					)
			}
		} else {
			alert(
				'TODO: Handle the case where the request has failed to provide the necessary data.'
			)
		}

		setCharactersImagesURLs(charactersImagesURLs)
		return charactersImagesURLs
	})
}

export default fetchCharactersImagesURL
