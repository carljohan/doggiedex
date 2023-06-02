import { dogsTypes, fetchDoggos } from '$lib/utils';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	const cute = await fetchDoggos(dogsTypes.cute).then((data) => data.flat());
	const annoying = await fetchDoggos(dogsTypes.annoying).then((data) => data.flat());
	const family = await fetchDoggos(dogsTypes.family).then((data) => data.flat());

	return {
		all: [...cute, ...annoying, ...family].sort(() => Math.random() - 0.5),
		cute,
		annoying,
		family
	};
}
