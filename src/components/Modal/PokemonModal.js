import InfoTabs from "./PokemonModalContent/InfoTabs";
import Modal from "react-bootstrap/Modal";
import { useState, useEffect } from "react";
import axios from "axios";
import ComponentIsLoading from "../ComponentIsLoading";

const PokemonModal = ({
  showModal,
  pokemonId,
  pokemonData,
  pokemonStatImg,
  pokemonSpeciesUrl,
  handleClose,
}) => {
  const [isLoading, setLoading] = useState(true);
  const [evolutionUrl, setEvolutionUrl] = useState('');
  const typeColorData = require("../../Configuration/pokemon_type_color.json");
  const pokemonAbilityNames =
      pokemonData.abilities &&
    Array.from(pokemonData.abilities).map((entry) => entry.ability.name);

  useEffect(() => {
    setData();
  }, []);

  const setData = async () => {
    await axios
      .get(pokemonSpeciesUrl)
      .then((response) => {
        const speciesData = response.data;
        setEvolutionUrl(speciesData.evolution_chain.url)
        setLoading(false)
      })
      .catch((error) => console.log(`Error: ${error}`));
  };

  //TODO: extract this to its own component?
  const mappedTypes =
      pokemonData.types &&
      pokemonData.types.map((entry, index) => (
      <div
        className="centered-text type-container"
        style={{ backgroundColor: typeColorData[entry.type.name] }}
        key={index}
      >
        {entry.type.name}
      </div>
    ));

  if (isLoading) {
    return (
        <Modal
            show={showModal}
            onHide={handleClose}
            backdrop="static"
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
        >
          <Modal.Body>
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
                {pokemonData.name} #{pokemonId}
              </div>
              <div className="capitalize no-bullets side-by-side">{mappedTypes}</div>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="side-by-side">
            <div>
              <img src={pokemonStatImg} alt="Pic not available..."/>
            </div>
            <div>
              <InfoTabs
                  baseStats={pokemonData.stats}
                  abilityNames={pokemonAbilityNames}
                  evolutionUrl={evolutionUrl}
              />
            </div>
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
