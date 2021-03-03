import BaseStats from "../BaseStats";
import Modal from "react-bootstrap/Modal";
import { useState, useEffect } from "react";

const PokemonModal = ({ show, pokemonId, pokemonData, pokemonStatImg }) => {
  const pokemonStats = pokemonData.stats;
  const pokemonType = pokemonData.types;
  const typeColorData = require("../../Configuration/pokemon_type_color.json");

  console.log(typeColorData["normal"]);

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
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={show}
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
          {/* <div>
            <h5>Type(s):</h5>
            <ul className="capitalize no-bullets">{mappedTypes}</ul>
          </div> */}
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default PokemonModal;
