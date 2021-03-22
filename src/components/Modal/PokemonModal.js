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
  const pokemonStats = pokemonData.stats;
  const pokemonType = pokemonData.types;
  const typeColorData = require("../../Configuration/pokemon_type_color.json");
  const pokemonAbilitiesObject = pokemonData.abilities;

  const pokemonAbilityNames =
    pokemonAbilitiesObject &&
    Array.from(pokemonAbilitiesObject).map((entry) => entry.ability.name);

  useEffect(() => {
    setData();
  }, []);

  const setData = async () => {
    await axios
      //Todo: Figure out why a hardcoded URL works
      .get(pokemonSpeciesUrl)
      // .get("https://pokeapi.co/api/v2/pokemon-species/11/")
      .then((response) => {
        const speciesData = response.data;
        // const speciesUrl = speciesData.evolution_chain.url;
        setEvolutionUrl(speciesData.evolution_chain.url)
        setLoading(false)
      })
      .catch((error) => console.log(`Error: ${error}`));
  };

  //TODO: extract this to its own component?
  const mappedTypes =
    pokemonType &&
    pokemonType.map((entry, index) => (
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
                  baseStats={pokemonStats}
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
