import BaseStats from "../BaseStats";
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
  const pokemonAbilities = pokemonData.abilities;
  const typeColorData = require("../../Configuration/pokemon_type_color.json");

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

  const mappedAbilities =
    pokemonAbilities &&
    pokemonAbilities.map((entry) => (
      <li key={entry.ability.name}>{entry.ability.name}</li>
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
        <div className="stats-type-container">
          <div>
            <h5>Stats:</h5>
            <BaseStats baseStats={pokemonStats} />
          </div>
          <div>
            <ul>{mappedAbilities}</ul>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn" onClick={handleClose}>
          Close
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default PokemonModal;
