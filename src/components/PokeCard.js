import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css" 
import PokemonModal from './Modal/PokemonModal'
import { useState, useEffect } from 'react'

const PokeCard = ({ pokemonSearchUrl }) => {    

    const [pokemonData, setPokemonData] = useState({})
    const [pokemonId, setPokemonId] = useState('')
    const [pokemonImg, setPokemonImg] = useState('')
    const [pokemonStatImg, setPokemonStatImg] = useState('')
    const [modalVisible, setModalVisible] = useState(false)

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
            setPokemonId(prefixZeroesInId(pokemonData.id))
            setPokemonStatImg(pokemonData.sprites.other.["official-artwork"].front_default)
        })
        .catch(error => console.log(`Error: ${error}`))
    }

    // const closeModal = () => {
    //     setModalVisible(!modalVisible)
    // }

    return (
        <div className="item centered-text" onClick={() => setModalVisible(!modalVisible)}>
            <img className="image-container" src={pokemonImg} alt="Pic not available..."/>
            <p className="capitalize">{pokemonData.name} #{pokemonId}</p>
            <PokemonModal 
                show={modalVisible}
                pokemonId={pokemonId}
                pokemonData={pokemonData} 
                pokemonStatImg={pokemonStatImg}
            />
        </div>
    )
}

export default PokeCard
