const pokeApi = {}
pokeApi.getPokemons = (offset = 0, limit = 21) => {
    const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`;
    return fetch(url)
        .then(response => response.json())
        .then(jsonBody => jsonBody.results)
        .then(pokemons => {
            return Promise.all(pokemons.map(pokemon => {
                return fetch(pokemon.url)
                    .then(response => response.json())
                    .then(details => new Pokemon(
                        details.id,
                        details.name,
                        details.types.map(typeInfo => typeInfo.type.name),
                        details.sprites.other['dream_world'].front_default
                    ));
            }));
        })
        .catch(error => console.log(error));
}
