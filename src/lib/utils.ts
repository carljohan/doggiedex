export const fetchDoggos = async (dogType: String[]) => {
  return await Promise.all(
    dogType.map(async (dog: String) => {
      let response = await fetch(`https://dog.ceo/api/breed/${dog}/images/random/5`);
      let data = await response.json();
      return data.message;
    })
  );
}