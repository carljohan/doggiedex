const DOG_API_URL = 'https://dog.ceo/api';

export const dogsTypes = {
	cute: ['pomeranian', 'pug', 'shihtzu'],
	annoying: ['chihuahua', 'terrier/russell', 'pitbull'],
	family: ['labrador', 'retriever/golden', 'newfoundland']
};

/**
 * Fetches dog images for the given dog types.
 * @param {string[]} dogType - An array of dog types to fetch images for.
 * @returns {Promise<string[]>} A promise that resolves to an array of image URLs.
 */
export const fetchDoggos = async (dogType) => {
	return await Promise.all(
		dogType.map(async (dog) => {
			let response = await fetch(`${DOG_API_URL}/breed/${dog}/images/random/1`);
			let data = await response.json();
			return data.message;
		})
	);
};
