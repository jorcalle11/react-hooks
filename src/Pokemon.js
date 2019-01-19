import React, { useState, Suspense } from 'react';

const cache = {};
const myPokemon = createResource(fetchPokemon);

function PokemonInfo({ pokemonName }) {
  const pokemon = myPokemon.read(pokemonName);
  return <pre>{JSON.stringify(pokemon || 'Unknown', null, 2)}</pre>;
}

export default function PokemonApp() {
  const [pokemonName, setPokemonName] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    const value = e.target.elements.pokemonName.value;
    setPokemonName(value);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="pokemon-input" style={{ display: 'block' }}>
          Pokemon Name (ie Pikachu)
        </label>
        <input id="pokemon-input" name="pokemonName" />
        <button type="submit">Submit</button>
      </form>
      {pokemonName ? (
        <Suspense fallback={<div>loading...</div>}>
          <PokemonInfo pokemonName={pokemonName} />
        </Suspense>
      ) : null}
    </div>
  );
}

function createResource(fn) {
  return {
    read(id) {
      const data = cache[id];
      if (!data) {
        const promise = fn(id).then(p => (cache[id] = p));

        // When we throw this promise, React will catch that promise and find the closest Suspense component and use its fallback to render that instead until the Pokémon has been loaded.
        // When this promise resolves, then Suspense is going to re-render its children.
        throw promise;
      }
      return data;
    }
  };
}

function fetchPokemon(name) {
  const pokemonQuery = `
      query ($name: String) {
        pokemon(name: $name) {
          id
          number
          name,
          image,
          attacks {
            special {
              name
              type
              damage
            }
          }
        }
      }
    `;

  // learn more about this API here: https://graphql-pokemon.now.sh/
  return window
    .fetch('https://graphql-pokemon.now.sh', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        query: pokemonQuery,
        variables: { name }
      })
    })
    .then(r => r.json())
    .then(response => response.data.pokemon);
}
