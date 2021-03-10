import axios from "axios";
import { useState, useEffect } from "react";
import PokeCard from "./components/PokeCard";

function App() {
  const [urlToSearch] = useState("https://pokeapi.co/api/v2/pokemon/");
  const [pokemonGroup, setPokemonGroup] = useState("");
  const [nextUrl, setNextUrl] = useState("");
  const [prevUrl, setPrevUrl] = useState("");
  const [hasNext, setHasNext] = useState(false);
  const [hasPrev, setHasPrev] = useState(false);

  useEffect(() => {
    getGeneralPokemon(urlToSearch);
  }, []);

  const checkNext = (url) => {
    if (url === null && prevUrl !== "") {
      setNextUrl("");
      setHasNext(false);
    }
    if (url !== null && nextUrl !== "") {
      setNextUrl(url);
    }
    if (url !== null && nextUrl === "") {
      setNextUrl(url);
      setHasNext(!hasNext);
    }
  };

  const checkPrev = (url) => {
    if (url === null && nextUrl !== "") {
      setPrevUrl("");
      setHasPrev(false);
    }
    if (url !== null && prevUrl !== "") {
      setPrevUrl(url);
    }
    if (url !== null && prevUrl === "") {
      setPrevUrl(url);
      setHasPrev(!hasPrev);
    }
  };

  const getGeneralPokemon = async (url) => {
    await axios
      .get(url)
      .then((response) => {
        const pokemonData = response.data;
        checkNext(pokemonData.next);
        checkPrev(pokemonData.previous);
        setPokemonGroup(pokemonData.results);
      })
      .catch((error) => console.log(`Error: ${error}`));
  };

  return (
    <div className="App">
      <div className="utility-section centered-text">
        <button
          disabled={!hasPrev}
          className="btn"
          style={{ backgroundColor: "gray " }}
          onClick={() => getGeneralPokemon(prevUrl)}
        >
          Prev
        </button>
        <button
          disabled={!hasNext}
          className="btn"
          style={{ backgroundColor: "gray " }}
          onClick={() => getGeneralPokemon(nextUrl)}
        >
          Next
        </button>
      </div>
      <div className="grid">
        {Array.from(pokemonGroup).map((pokemon) => (
          <PokeCard key={pokemon.name} pokemonSearchUrl={pokemon.url} />
        ))}
      </div>
    </div>
  );
}

export default App;
