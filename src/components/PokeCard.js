import axios from 'axios'
import "bootstrap/dist/css/bootstrap.min.css" 
import PokemonModal from './Modal/PokemonModal'
import { useState, useEffect } from 'react'
import ComponentIsLoading from "./ComponentIsLoading";

const PokeCard = ({ pokemonSearchUrl }) => {    

    //Todo: use a loading state
    //Todo: in here render a loading, wrap axios calls with a timer

    const [isLoading, setLoading] = useState(true);
    const [pokemonData, setPokemonData] = useState({})
    const [pokemonId, setPokemonId] = useState('')
    const [pokemonImg, setPokemonImg] = useState('')
    const [pokemonStatImg, setPokemonStatImg] = useState('')
    const [speciesUrl, setSpeciesUrl] = useState('')
    const [modalVisible, setModalVisible] = useState(false)

    const handleClose = () => setModalVisible(false)
    const handleShow = () => setModalVisible(true)

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
            setPokemonImg(pokemonData.sprites.front_default)
            setPokemonData(pokemonData)
            setSpeciesUrl(pokemonData.species.url)
            setPokemonId(prefixZeroesInId(pokemonData.id))
            setPokemonStatImg(pokemonData.sprites.other["official-artwork"].front_default)
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
                <div onClick={handleShow} style={{cursor: "pointer"}}>
                    <p className="capitalize pokemon-card-name ">{pokemonData.name}</p>
                    <img className="image-container" src={pokemonImg} alt="Pic not available..."/>
                    <p>#{pokemonId}</p>
                </div>
                <PokemonModal
                    showModal={modalVisible}
                    pokemonId={pokemonId}
                    pokemonData={pokemonData}
                    pokemonStatImg={pokemonStatImg}
                    pokemonSpeciesUrl={speciesUrl}
                    handleClose={handleClose}
                />
            </div>
        )
    }
}

export default PokeCard
