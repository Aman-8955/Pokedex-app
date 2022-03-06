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
            type: data.types.map(type => type.type.name).join(' ,'),
            weight:data.weight,
            stats:data.stats
        }));
        displayPokemon(pokemon);
    });
};

const displayPokemon=(pokemon)=>{
    console.log(pokemon);
    const pokemonHTMLString=pokemon.map(pokeman=>`
    <li class="card ${pokeman.type}">
    <div class="img">
        <img class="cardImg" src="${pokeman.image}"/>
    </div>
    <div class="details">
        <h2 class="cardHead">${pokeman.id}.${pokeman.name}</h2>
        <p class="cardPara ${pokeman.type}">Type: ${pokeman.type}</p>
    <hr>
    <div class="about cardPara">
    <span class="hp">HP:${pokeman.stats[0].base_stat}</span>
    <span class="attack">ATTACK:${pokeman.stats[1].base_stat}</span>
    <span class="defense">DEFENSE:${pokeman.stats[2].base_stat}</span>
    <span class="special-attack">SPECIAL-ATTACK:${pokeman.stats[3].base_stat}</span>
    <span class="special-defense">SPECIAL-DEFENSE:${pokeman.stats[4].base_stat}</span>
    <span class="speed">SPEED:${pokeman.stats[5].base_stat}</span>
    <span class="weight">WEIGHT:${pokeman.weight}</span>
    </div>
    </div>
    </li>`
    ).join("");
    pokedex.innerHTML=pokemonHTMLString;
}
fetchPokemon();