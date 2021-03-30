import InfoTabs from "./PokemonModalContent/InfoTabs";
import Modal from "react-bootstrap/Modal";
import { useState, useEffect } from "react";
import axios from "axios";
import ComponentIsLoading from "../ComponentIsLoading";

const PokemonModal = ({
  modalState,
  showModal,
  handleClose,
  getPokemonModalData

}) => {
  const [evolutionUrl, setEvolutionUrl] = useState('');

  const typeColorData = require("../../Configuration/pokemon_type_color.json");
  const pokemonAbilityNames =
      modalState.pokemonData.abilities &&
    modalState.pokemonData.abilities.map((entry) => entry.ability.name);

  useEffect(() => {
    setData();
  }, []);

  const setData = async () => {
    await axios
      .get(modalState.pokemonSpeciesUrl)
      .then((response) => {
        const speciesData = response.data;
        setEvolutionUrl(speciesData.evolution_chain.url)
      })
      .catch((error) => console.log(`Error: ${error}`));
  };

  //TODO: extract this to its own component?
  const mappedTypes =
      modalState.pokemonData.types &&
      modalState.pokemonData.types.map((entry, index) => (
      <div
        className="centered-text type-container"
        style={{ backgroundColor: typeColorData[entry.type.name] }}
        key={index}
      >
        {entry.type.name}
      </div>
    ));

  if (modalState.modalIsLoading) {
    return (
        <Modal
            show={showModal}
            onHide={handleClose}
            backdrop="static"
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
        >
          <Modal.Body>
            From Modal
            <ComponentIsLoading/>
          </Modal.Body>
        </Modal>
    )
  }
  else {
    return (
        <Modal
            show={showModal}
            onHide={handleClose}
            backdrop="static"
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
        >
          <Modal.Header>
            <Modal.Title
                className="capitalize side-by-side"
                id="contained-modal-title-vcenter"
            >
              <div>
                {modalState.pokemonData.name} #{modalState.pokemonId}
              </div>
              <div className="capitalize no-bullets side-by-side">{mappedTypes}</div>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="side-by-side">
            <div>
              <img src={modalState.pokemonStatImg} alt="Pic not available..."/>
            </div>
            {evolutionUrl !== '' ? (<div>
              <InfoTabs
                  baseStats={modalState.pokemonData.stats}
                  abilityNames={pokemonAbilityNames}
                  evolutionUrl={evolutionUrl}
                  getPokemonModalData={getPokemonModalData}
              />
            </div>): <ComponentIsLoading/>}
          </Modal.Body>
          <Modal.Footer>
            <div className="centered-close-button centered-text">
              <button className="btn" onClick={handleClose}>
                Close
              </button>
            </div>
          </Modal.Footer>
        </Modal>
    )
  }
};

export default PokemonModal;
