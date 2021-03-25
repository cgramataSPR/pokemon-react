import axios from 'axios'
import "bootstrap/dist/css/bootstrap.min.css" 
import { useState, useEffect } from 'react'
import ComponentIsLoading from "./ComponentIsLoading";

const PokeCard = ({ onClick, pokemonSearchUrl }) => {

    const [isLoading, setLoading] = useState(true);
    //Todo: in here render a loading, wrap axios calls with a timer
    const [pokemonId, setPokemonId] = useState('')
    const [pokemonImg, setPokemonImg] = useState('')
    const [pokemonData, setPokemonData] = useState({})

    useEffect(() => {
        setData();
      }, []);

    const prefixZeroesInId = (pokeId) => {
        const idLength = pokeId.toString().length

        if(idLength < 1) {
            return ("...id not found...")
        }
        if(idLength === 1) {
            return("00"+pokeId)
        }
        if(idLength === 2) {
            return("0"+pokeId)
        }
        if(idLength >= 3) {
            return(pokeId)
        }
    }

    const setData = async() => {
        await axios.get(pokemonSearchUrl)
        .then((response) => {
            const pokemonData = response.data
            setPokemonId(prefixZeroesInId(pokemonData.id))
            setPokemonImg(pokemonData.sprites.front_default)
            setPokemonData(pokemonData)
            setLoading(false)
        })
        .catch(error => console.log(`Error: ${error}`))
    }

    if (isLoading) {
        return (
            <ComponentIsLoading/>
        )
    }
    else {
        return (
            <div className="item centered-text">
                <div onClick={() => onClick(pokemonSearchUrl)} style={{cursor: "pointer"}}>
                    <p className="capitalize pokemon-card-name ">{pokemonData.name}</p>
                    <img className="image-container" src={pokemonImg} alt="Pic not available..."/>
                    <p>#{pokemonId}</p>
                </div>
            </div>
        )
    }
}

export default PokeCard
