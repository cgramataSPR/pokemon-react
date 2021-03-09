import BaseStats from "../BaseStats";
import Modal from "react-bootstrap/Modal";
import { useState, useEffect } from "react";

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

  console.log("In Modal -showModal- check: " + showModal )
  
  return (
    <Modal
      show={showModal}
      backdrop="static"
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
    >
      <Modal.Header closeButton>
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
        {/*TODO: Figure out how to close modal via button ONLY*/}
        <button className="btn" onClick={handleClose}>
          Close
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default PokemonModal;
