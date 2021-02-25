import axios from 'axios';
import { useState, useEffect } from 'react'
import PokemonStats from './Modal/PokemonStats'
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css" 

const PokeCard = ({ pokemonSearchUrl }) => {    

    const [pokemonData, setPokemonData] = useState({})
    const [pokemonImg, setPokemonImg] = useState('')
    const [modalVisible, setModalVisible] = useState(false)

    useEffect(() => {
        setData();
      }, []);

    const setData = async() => {
        await axios.get(pokemonSearchUrl)
        .then((response) => {
            const pokemonData = response.data
            setPokemonImg(pokemonData.sprites.front_default)
            setPokemonData(pokemonData)
        })
        .catch(error => console.log(`Error: ${error}`))
    }

    const closeModal = () => {
        setModalVisible(!modalVisible)
    }

    return (
        <div className="item centered-text">
            <img className="image-container" src={pokemonImg} alt="Pic not available..."/>
            <p className="capitalize">{pokemonData.id}. {pokemonData.name}</p>
            <button className="btn" onClick={() => setModalVisible(!modalVisible)}>More Info</button>
            <PokemonStats show={modalVisible} pokemonData={pokemonData} onClick={closeModal}/>
        </div>
    )
}

export default PokeCard
