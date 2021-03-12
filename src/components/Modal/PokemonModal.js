import InfoTabs from "./ModalContent/InfoTabs";
import Modal from "react-bootstrap/Modal";

const PokemonModal = ({
  showModal,
  pokemonId,
  pokemonData,
  pokemonStatImg,
  handleClose,
}) => {
  const pokemonStats = pokemonData.stats;
  const pokemonType = pokemonData.types;
  const typeColorData = require("../../Configuration/pokemon_type_color.json");
  const pokemonAbilitiesObject = pokemonData.abilities;
  
  const pokemonAbilityNames =
    pokemonAbilitiesObject &&
    Array.from(pokemonAbilitiesObject).map((entry) => entry.ability.name);

  const mappedTypes =
    pokemonType &&
    pokemonType.map((entry, index) => (
      <li
        className="centered-text"
        style={{ backgroundColor: typeColorData[entry.type.name] }}
        key={index}
      >
        {entry.type.name}
      </li>
    ));

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
          <div className="capitalize no-bullets">{mappedTypes}</div>
        </Modal.Title>
      </Modal.Header>
      {/* <div className="capitalize side-by-side">
        <div>{pokemonData.name} #{pokemonId}</div>
        <div className="capitalize no-bullets">{mappedTypes}</div>
      </div> */}
      <Modal.Body className="side-by-side">
        <div>
          <img src={pokemonStatImg} alt="Pic not available..."></img>
        </div>
        <div>
          <InfoTabs
            baseStats={pokemonStats}
            abilityNames={pokemonAbilityNames}
          ></InfoTabs>
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
  );
};

export default PokemonModal;
