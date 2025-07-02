export async function fetchPokemonList(offset = 0, limit = 20) {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
    const data = await res.json();
    return data;
}


export async function fetchPokemonDetails(url) {
  const res = await fetch(url)
  const data = await res.json()
  return {
    id: data.id,
    name: data.name,
    types: data.types.map(t => t.type.name), 
    sprite: data.sprites.other['official-artwork'].front_default
  }
}

  export async function fetchEvolutionChain(chainUrl) {
    const res = await fetch(chainUrl);
    return await res.json();
  }

  export async function fetchPokemonId(id){
    const res= await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    return await res.json();
  }


  export async function fetchEvolutionChainByName(name) {
    try {
      const speciesRes = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${name}`)
      const speciesData = await speciesRes.json()
  
      const evoRes = await fetch(speciesData.evolution_chain.url)
      const evoData = await evoRes.json()
  
      const chain = []
      let current = evoData.chain
  
      while (current) {
        chain.push(current.species.name)
        current = current.evolves_to[0]
      }
  
      return chain
    } catch (error) {
      console.error('il y a un problème lors du chargement des évolutions...', error)
      return []
    }
  }

  export async function fetchPokemonByType(typeName) {
    const response = await fetch(`https://pokeapi.co/api/v2/type/${typeName}`)
    if (!response.ok) throw new Error('Erreur lors du fetch du type ' + typeName)
    return response.json()
  }
  
  
  