const fetchPokemon = () => {
const getPokeUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`

const pokemonArray = []

  for (let i = 1; i <= 155; i++) {
    pokemonArray.push(fetch(getPokeUrl(i)).then(response => response.json()))
  }

  Promise.all(pokemonArray)
  .then(pokemons => {
    const pokeballs = pokemons.reduce((accumulator, pokemon) => {
      const types = pokemon.types.map(typeInfo => typeInfo.type.name)

      accumulator += `
      <li class="card ${types[0]}">
      <img class="card-image " alt=${pokemon.name}" src="https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${pokemon.id}.svg" />
      <h2 class="card-title">${pokemon.id}. ${pokemon.name}<h2>
      <p class="card.subtitle">${types.join(' | ')}</p>
      <button id="buttonHeart">🤍</button>
      <button id="demo"></button>
      </li>`
      return accumulator
    }, '')

    const ul = document.querySelector('[data-js="pokedex"]')
    
    ul.innerHTML = pokeballs

    const element = document.getElementById("buttonHeart");
    element.addEventListener("click", function() {
      document.getElementById("demo").innerHTML = "❤️";
    })

  })
}

fetchPokemon()

