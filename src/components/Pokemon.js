import PokeCard from './PokeCard'

const Pokemon = ({ pokemonGroup }) => {
    return (
        <div className="grid">
            {Array.from(pokemonGroup).map((pokemon) => (<PokeCard key={pokemon.name} pokemon={pokemon}></PokeCard>))}
        </div>
    )
}

export default Pokemon
