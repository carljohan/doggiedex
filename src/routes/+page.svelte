<script>
	import { dogsTypes, fetchDoggos } from '$lib/utils';
	export let data;

	let visibleDogs = data.all;
	/** @type {DogType | 'all'}  */
	let activeFilter = 'all';

	// Start all images as not enlarged
	let enlarged = Array(data.all.length).fill(false);

	// Toggle the enlarged state of an image when it's clicked
	const toggleEnlarge = (/** @type {number} */ index) => {
		enlarged = [...enlarged]; // create a copy to ensure reactivity
		enlarged[index] = !enlarged[index];
	};

	/**
	 * Change the active filter
	 * @param {string} url
	 * @return {string} breed
	 */
	const getDogBreed = (url) => {
		const urlArray = url.split('/');
		let breed = urlArray[4];
		breed = breed.replace(/-/g, ' ');
		return breed;
	};

	/**
	 * Change the active filter
	 * @param {DogType | 'all'} filter
	 */
	const changeFilter = (filter) => {
		activeFilter = filter;
		visibleDogs = data[filter];
	};

	/**
	 * Fetches new dog images for the given dog type.
	 * @param {DogType} dogFilter - The type of dog to fetch images for.
	 * @returns {Promise<void>} A promise that resolves when the images have been fetched.
	 */
	const getNewDogs = async (dogFilter) => {
		if (dogsTypes[dogFilter]) {
			try {
				visibleDogs = await fetchDoggos(dogsTypes[dogFilter]).then((data) => data.flat());
			} catch (err) {
				console.error(err);
			}
		}
	};
</script>

<main class="container">
	<h1 class="header">DoggieDex!</h1>

	<section class="nav">
		<button
			class="button"
			class:active={activeFilter === 'all'}
			on:click={() => changeFilter('all')}>All</button
		>
		<button
			class="button"
			class:active={activeFilter === 'cute'}
			on:click={() => changeFilter('cute')}>Cute</button
		>
		<button
			class="button"
			class:active={activeFilter === 'annoying'}
			on:click={() => changeFilter('annoying')}>Annoying</button
		>
		<button
			class="button"
			class:active={activeFilter === 'family'}
			on:click={() => changeFilter('family')}>Family</button
		>
	</section>
	<section class="list">
		{#each visibleDogs as dogs, i}
			{@const breed = getDogBreed(dogs)}
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<div
				class="dog-image-container {enlarged[i] ? 'enlarged' : ''}"
				role="button"
				aria-pressed={enlarged[i]}
				on:click={() => toggleEnlarge(i)}
				tabindex="0"
			>
				<img class="dog-image" alt={`A picture of a ${breed}`} src={dogs} />
				{#if enlarged[i]}
					<div class="dog-image-overlay">
						<div class="dog-image-overlay-text">
							I am a &#32 {activeFilter !== 'all' ? activeFilter : ' '} <span>{breed}</span>
						</div>
					</div>
				{/if}
			</div>
		{/each}
	</section>

	<div class="reload">
		{#if activeFilter !== 'all'}
			<button
				class="reload-button button"
				on:click={() => (activeFilter !== 'all' ? getNewDogs(activeFilter) : null)}
				>Not {activeFilter} enough!</button
			>
		{/if}
	</div>

	<section class="footer">created with ❤️ in Visby 2023</section>

</main>

<style>
	:global(body) {
		margin: 0;
	}
	.container {
		font-family: 'Comic Sans MS', 'Comic Sans', cursive;
		width: 100vw;
		background-image: url('/images/dogs_and_bones.jpg');
		background-repeat: repeat;
		background-size: 250px;
		min-height: 100vh;
	}
	.header {
		margin: 0;
		padding: 2rem;
		display: flex;
		font-size: 3rem;
		justify-content: center;
	}
	.nav {
		margin-top: 50px;
		gap: 1rem;
		display: flex;
		justify-content: center;
	}
	.button {
		border: 0;
		background-color: white;
		cursor: pointer;
		font-size: 1rem;
	}
	.list {
		margin-top: 50px;
		display: flex;
		gap: 1rem;
		justify-content: center;
		flex-wrap: wrap;
	}

	.active {
		background-color: orange;
		color: white;
	}
	.dog-image-container {
		position: relative;
		width: 250px;
		height: 250px;
	}
	.dog-image {
		height: 100%;
		width: 100%;
		object-fit: cover;
		border-radius: 30px;
		cursor: pointer;
	}
	:not(.enlarged).dog-image:hover {
		transform: scale(1.025);
		transition: transform 0.5s;
	}

	.dog-image-overlay {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: inline-flex;
		justify-content: center;
		align-items: end;
	}

	.dog-image-overlay-text {
		width: fit-content;
		margin-top: auto;
		margin-left: auto;
		margin-right: auto;
		height: 4rem;
		background-color: rgba(0, 0, 0, 0.5);
		color: white;
		font-size: 2rem;
		display: flex;
		justify-content: end;
		align-items: center;
	}
	.dog-image-overlay-text span {
		margin-left: 0.5rem;
		text-transform: capitalize;
	}

	.enlarged {
		position: fixed;
		top: 50%;
		left: 50%;
		z-index: 1;
		transform: translate(-50%, -50%);
		width: fit-content;
		height: 100vh;
		max-width: 100vw;
	}
	.enlarged .dog-image {
		border-radius: 0;
	}

	.footer {
		padding: 100px;
		display: flex;
		justify-content: center;
	}
	.reload-button {
		font-family: 'Comic Sans MS', 'Comic Sans', cursive;
		background-color: white;
		font-size: 2rem;
		margin-top: 50px;
	}
	.reload {
		display: flex;
		justify-content: center;
	}
	.button {
		cursor: pointer;
		border: none;
		padding: 1rem;
		border-radius: 2rem;
		transition: all 0.2s ease-in-out;
	}
	.button:hover {
		background-color: orange;
		color: white;
		transition: all 0.2s ease-in-out;
	}
</style>
