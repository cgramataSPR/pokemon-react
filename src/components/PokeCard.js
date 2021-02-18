import axios from 'axios';
import { useState, useEffect } from 'react'

const PokeCard = ({ pokemon }) => {
    const [pokemonData, getPokemonData] = useState('')

    useEffect(() => {
        getData();
      }, []);

    const getData = async() => {
        await axios.get(pokemon.url)
        .then((response) => {
            const pokemonData = response.data
            getPokemonData(pokemonData)
            console.log(pokemonData)
        })
        .catch(error => console.log(`Error: ${error}`))
    }

    return (
        <div className="item">
            <h4>{pokemonData.name}</h4>
        </div>
    )
}

export default PokeCard
