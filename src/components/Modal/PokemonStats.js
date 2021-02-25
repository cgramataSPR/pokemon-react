import Modal from "react-bootstrap/Modal";

const PokemonStats = ({ show, pokemonData, onClick }) => {
  const pokemonStats = pokemonData.stats;
  const pokemonType = pokemonData.types;

  const mappedStats =
    pokemonStats &&
    pokemonStats.map((entry, index) => (
      <li key={index}>
        {entry.stat.name}: {entry.base_stat}
      </li>
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
        <Modal.Title className="capitalize" id="contained-modal-title-vcenter">{pokemonData.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>ID: {pokemonData.id}</p>
        <p>Stats:</p>
        <ul className="capitalize no-bullets">{mappedStats}</ul>
        <p>Type(s):</p>
        <ul className="capitalize no-bullets">{mappedTypes}</ul>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn" onClick={() => onClick()}>
          Close
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default PokemonStats;
