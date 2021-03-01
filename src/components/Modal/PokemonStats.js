import Modal from "react-bootstrap/Modal";
import { useState, useEffect } from "react";

const PokemonStats = ({
  show,
  pokemonId,
  pokemonData,
  pokemonStatImg,
  onClick,
}) => {
  const pokemonStats = pokemonData.stats;
  const pokemonType = pokemonData.types;

  const mappedStats =
    pokemonStats &&
    pokemonStats.map((entry) => (
      <div className="poke-card">
        <div className="capitalize flex-child">{entry.stat.name}</div>
        <div>{entry.base_stat}</div>
        <div key={entry.stat.name} className="progress flex-child">
          <div
            className="progress-bar progress-bar-striped progress-bar-animated"
            role="progressbar"
            aria-valuenow={entry.base_stat}
            aria-valuemin="0"
            aria-valuemax="200"
            style={{ width: `${entry.base_stat/2}%` }}
          ></div>
        </div>
      </div>
      // <li key={entry.stat.name}>
      //   {entry.stat.name}: {entry.base_stat}
      // </li>
    ));

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
      <Modal.Body className="poke-card">
        <div>
          <img src={pokemonStatImg} alt="Pic not available..."></img>
        </div>
        <div className="stats-container">
          <h5>Stats:</h5>
          {mappedStats}
          {/* <ul className="capitalize no-bullets">{mappedStats}</ul> */}
          <p>Type(s):</p>
          <ul className="capitalize no-bullets">{mappedTypes}</ul>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default PokemonStats;
