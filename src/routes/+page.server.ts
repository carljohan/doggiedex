/** @type {import('./$types').PageServerLoad} */
export async function load() {
	const cuteDogs = ['pomeranian', 'pug', 'shihtzu'];
	const annoyingDogs = ['chihuahua', 'terrier/russell', 'pitbull'];
	const familyDogs = ['labrador', 'retriever/golden', 'newfoundland'];

	// let response = await fetch('https://dog.ceo/api/breed/retriever/golden/images/random')


  const cute = await fetchDoggos(cuteDogs).then((data) => data.flat());
  const annoying = await fetchDoggos(annoyingDogs).then((data) => data.flat());
  const family = await fetchDoggos(familyDogs).then((data) => data.flat());


	return {
    all: [...cute, ...annoying, ...family],
		cute,
		annoying,
		family
	};
}


const fetchDoggos = async (dogType: String[]) => {
  return await Promise.all(
    dogType.map(async (dog: String) => {
      let response = await fetch(`https://dog.ceo/api/breed/${dog}/images/random/2`);
      let data = await response.json();
      return data.message;
    })
  );
}
