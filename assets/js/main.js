// Função para converter strings para capitalize
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

// Convertendo a lista para li
function convertPokemonToLi(pokemon) {
    // Usar o primeiro tipo de Pokémon para a classe do `<li>` principal
    const mainType = pokemon.types.length > 0 ? pokemon.types[0] : '';

    return `
    <li class="pokemon ${mainType}">
        <span class="number">#${pokemon.number}</span>
        <span class="name">${capitalize(pokemon.name)}</span> <!-- Nome em capitalize -->
        <div class="detail">
            <ol class="types">
                ${pokemon.types.map((type) => `<li class="type ${type}">${capitalize(type)}</li>`).join('')} <!-- Tipos em capitalize -->
            </ol>
            <img src="${pokemon.photo}" 
            alt="${pokemon.name}">
        </div>
    </li>
    `;
}

const pokemonList = document.getElementById('pokemonList');
let currentPage = 0; // Página inicial
const limit = 21;  // Ajuste o limite para 20

function loadPokemons(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        console.log(pokemons);  // Verifique os dados retornados
        const newHtml = pokemons.map(convertPokemonToLi).join('');
        pokemonList.innerHTML = newHtml;
    });
}

// Função para ir para a página anterior
function prevPage() {
    if (currentPage > 0) {
        currentPage--;
        const offset = currentPage * limit;
        loadPokemons(offset, limit);
    }
}

// Função para ir para a próxima página
function nextPage() {
    currentPage++;
    const offset = currentPage * limit;
    loadPokemons(offset, limit);
}

// Inicializando a primeira página
loadPokemons(currentPage * limit, limit);
