

<script>
	export let data;

  const cuteDogs = ['pomeranian', 'pug', 'shihtzu'];
	const annoyingDogs = ['chihuahua', 'terrier/russell', 'pitbull'];
	const familyDogs = ['labrador', 'retriever/golden', 'newfoundland'];
  

  $: visibleDogs = data.all;

  
	let activeFilter = 'all';


  // sort the array in random order
  data.all.sort(() => Math.random() - 0.5);

  /**
 * Change the active filter
 * @param {string} url
 * @return {string} breed
 */
 const getDogBreed = (url) => {
    const urlArray = url.split('/');
    const breed = urlArray[4];
    return breed;
 }


/**
 * Change the active filter
 * @param {string} filter
 */
 const changeFilter = (filter) => {
    activeFilter = filter;
    visibleDogs = data[filter];
  };



  


const getNewDogs = async (dogType) => {
    if(dogType === 'cute') {
      return visibleDogs = await fetchDoggos(cuteDogs).then((data) => data.flat());
    }
    if(dogType === 'annoying') {
      return visibleDogs = await fetchDoggos(annoyingDogs).then((data) => data.flat());
    }
    if(dogType === 'family') {
      return visibleDogs =  await fetchDoggos(familyDogs).then((data) => data.flat());
    }
}


// This code is a function that fetches images of dogs based on their breed.
// It returns a promise that resolves to an array of arrays containing the images
// of the dogs. The input is an array of strings of the dog breeds.

const fetchDoggos = async (dogType) => {
  return await Promise.all(
    dogType.map(async (dog) => {
      let response = await fetch(`https://dog.ceo/api/breed/${dog}/images/random/2`);
      let data = await response.json();
      return data.message;
    })
  );
}
</script>

<div class="container">
	<h1 class="header">DoggieDex!</h1>

	<section class="nav">
		<button class="button" class:active={activeFilter === 'all'} on:click={()=> changeFilter('all')}>All</button>
		<button class="button"class:active={activeFilter === 'cute'}  on:click={()=> changeFilter('cute')}>Cute</button>
		<button class="button" class:active={activeFilter === 'annoying'} on:click={()=> changeFilter('annoying')}>Annoying</button>
		<button class="button" class:active={activeFilter === 'family'} on:click={()=> changeFilter('family')}>Family</button>
	</section>
	<section class="list">
		{#each visibleDogs as dogs}
    {@const breed = getDogBreed(dogs)}
			<img class="dog-image" src={dogs} alt="{breed}" />
		{/each}
		
	</section>
    <div class="reload">
        {#if activeFilter !== 'all'}
                  <button class="reload-button" on:click={()=> getNewDogs(activeFilter)}>Not {activeFilter} enough!</button>
              {/if}
    </div>  
    <section class="footer">
        created with ❤️ in Visby 2023
    </section>
</div>

<style>
	.container {
		font-family: 'Comic Sans MS', 'Comic Sans', cursive;
		width: 100vw;
		background-image: url('/images/dogs_and_bones.jpg');
    background-repeat: repeat;
    background-size: 250px;
	}
	.header {
    margin: 0;
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
    font-weight: 900;
    background-color: orange;
    color: white;
  }
	.dog-image {
		width: 250px;
		height: 250px;
		object-fit: cover;
    border-radius: 30px;
    cursor: pointer;
	}
  .dog-image:hover {
    transform: scale(1.05);
    transition: all 0.5 ease-in-out;
  }
    .footer {
        padding: 100px;
        display: flex;
        justify-content: center;
    }
    .reload-button {
        background-color: white;
        font-size: 2rem;
        margin-top: 50px;
    }
    .reload {
        display: flex;
        justify-content: center;
    }
    button {
        cursor: pointer;
        border: none;
        padding: 1rem;
        border-radius: 2rem;
        background-color: transparent;
        transition: all .2s ease-in-out;

    }
    button:hover {
        background-color: orange;
        color: white;
        transition: all .2s ease-in-out;
    }
</style>
