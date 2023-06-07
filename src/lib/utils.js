const DOG_API_URL = 'https://dog.ceo/api';

export const dogsTypes = {
	cute: ['pomeranian', 'pug', 'shihtzu'],
	annoying: ['chihuahua', 'terrier/russell', 'pitbull'],
	family: ['labrador', 'retriever/golden', 'newfoundland']
};

/**
 * Fetches dog images for the given dog types.
 * @param {string[]} dogTypes - An array of dog types to fetch images for.
 * @returns {Promise<string[]>} A promise that resolves to an array of image URLs.
 */
export const fetchDoggos = async (dogTypes) => {
	const responses = await Promise.all(dogTypes.map(dogType => fetch(`${DOG_API_URL}/breed/${dogType}/images/random/1`)));
	return Promise.all(responses.map(response => response.json().then(data => data.message))).then((data) => data.flat());
};
