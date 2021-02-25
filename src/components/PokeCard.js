import axios from 'axios';
import { useState, useEffect } from 'react'
import PokemonStats from './Modal/PokemonStats'
import Modal from "react-bootstrap/Modal";

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
        <div className="item centered-text ">
            <img className="image-container" src={pokemonImg} alt="Pic not available..."/>
            <p className="capitalize">{pokemonData.id}. {pokemonData.name}</p>
            <button className="btn" onClick={() => setModalVisible(!modalVisible)}>More Info</button>
            {/* <PokemonStats show={modalVisible} pokemonData={pokemonData} onClick={closeModal}/> */}

            <div className="modal-dialog modal-lg modal-dialog-centered modal-wrapper">
                <Modal
                    className="modal-content"
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    show={modalVisible}
                >
                    <Modal.Header>
                        <Modal.Title className="capitalize" id="contained-modal-title-vcenter">{pokemonData.name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>ID: {pokemonData.id}</p>
                        <p>Stats:</p>
                        {/* <ul className="capitalize no-bullets">{mappedStats}</ul>
                        <p>Type(s):</p>
                        <ul className="capitalize no-bullets">{mappedTypes}</ul> */}
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn" onClick={() => closeModal()}>
                        Close
                        </button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    )
}

export default PokeCard
