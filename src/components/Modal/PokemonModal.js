import BaseStats from "../BaseStats"
import Modal from "react-bootstrap/Modal";
import { useState, useEffect } from "react";

const PokemonModal = ({
  show,
  pokemonId,
  pokemonData,
  pokemonStatImg,
  onClick,
}) => {
  const pokemonStats = pokemonData.stats;
  const pokemonType = pokemonData.types;

  const mappedTypes =
    pokemonType &&
    pokemonType.map((entry, index) => <li key={index}>{entry.type.name}</li>);

  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={show}
    >
      <Modal.Header>
        <Modal.Title className="capitalize" id="contained-modal-title-vcenter">
          {pokemonData.name} #{pokemonId}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="side-by-side">
        <div>
          <img src={pokemonStatImg} alt="Pic not available..."></img>
        </div>
        <div className="stats-container">
          <h5>Stats:</h5>
          <BaseStats baseStats={pokemonStats}/>
          <p>Type(s):</p>
          <ul className="capitalize no-bullets">{mappedTypes}</ul>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default PokemonModal;
