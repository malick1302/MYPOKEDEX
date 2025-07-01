export async function fetchPokemonList(offset = 0, limit = 20) {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
    const data = await res.json();
    return data;
}

export async function fetchPokemonDetails(url) {
    const res = await fetch(url);
    const data = await res.json();
    return {
      id: data.id,
      name: data.name,
      sprite: data.sprites.front_default,
    };
  }

  export async function fetchEvolutionChain(chainUrl) {
    const res = await fetch(chainUrl);
    return await res.json();
  }

  export async function fetchPokemonId(id){
    const res= await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    return await res.json();
  }