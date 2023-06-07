import { dogsTypes, fetchDoggos } from '$lib/utils';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	const cute = await fetchDoggos(dogsTypes.cute);
	const annoying = await fetchDoggos(dogsTypes.annoying);
	const family = await fetchDoggos(dogsTypes.family);
	// sort the 'all' array in random order
	const all = [...cute, ...annoying, ...family].sort(() => Math.random() - 0.5);
	return {
		all,
		cute,
		annoying,
		family
	};
}
