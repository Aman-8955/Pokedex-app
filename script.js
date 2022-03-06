const pokedex=document.getElementById("pokedex");
const fetchPokemon = () => {
    const promises = []
    for (let i = 1; i <= 500; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        promises.push(fetch(url).then((res) => res.json()));
    }
    Promise.all(promises).then((results) => {
        const pokemon = results.map((data) => ({
            name: data.name,
            id: data.id,
            image: data.sprites.other.home['front_default'],
            type: data.types.map(type => type.type.name).join(' ,')
        }));
        displayPokemon(pokemon);
    });
};

const displayPokemon=(pokemon)=>{
    console.log(pokemon);
    const pokemonHTMLString=pokemon.map(pokeman=>`
    <li class="card ${pokeman.type}">
        <img class="cardImg" src="${pokeman.image}"/>
        <div class="details">
        <h2 class="cardHead">${pokeman.id}.${pokeman.name}</h2>
        <p class="cardPara">Type: ${pokeman.type}</p>
        </div>
    </li>`
    ).join("");
    pokedex.innerHTML=pokemonHTMLString;
}
fetchPokemon();