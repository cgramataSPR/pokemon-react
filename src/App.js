import axios from "axios";
import { useState, useEffect, useReducer } from "react";
import PokeCard from "./components/PokeCard";
import ComponentIsLoading from "./components/ComponentIsLoading";
import PokemonModal from "./components/Modal/PokemonModal";
import StylingService from "./service/stylingService";

const modalInitialState = {
    pokemonId: '',
    pokemonData: null,
    pokemonStatImg: '',
    pokemonSpeciesUrl: '',
    modalIsLoading: true,
}

const modalReducer = (state, action) => {
    switch (action.type) {
        case 'getModalData':
            return {
                pokemonId: action.pokemonId,
                pokemonData: action.pokemonData,
                pokemonStatImg: action.pokemonStatImg,
                pokemonSpeciesUrl: action.pokemonSpeciesUrl,
                modalIsLoading: action.modalIsLoading
            };
        case 'closeModal':
            return {
                pokemonId: '',
                pokemonData: null,
                pokemonStatImg: '',
                pokemonSpeciesUrl: '',
                modalIsLoading: true
            }
        default:
            return {
                pokemonId: '',
                pokemonData: null,
                pokemonStatImg: '',
                pokemonSpeciesUrl: '',
                modalIsLoading: true
            }
    }
}

function App() {
  const [cardChosen, setCardChosen] = useState(false)
  const [isLoading, setLoading] = useState(true);
  const [urlToSearch] = useState("https://pokeapi.co/api/v2/pokemon/");
  const [pokemonGroup, setPokemonGroup] = useState("");
  const [nextUrl, setNextUrl] = useState("");
  const [prevUrl, setPrevUrl] = useState("");
  const [hasNext, setHasNext] = useState(false);
  const [hasPrev, setHasPrev] = useState(false);

  //Pokemon Modal related hooks
  const [modalVisible, setModalVisible] = useState(false)
  const [modalState, modalDispatch] = useReducer(modalReducer, modalInitialState);

  const handleClose = () => {
      setModalVisible(false)
      modalDispatch({
          type: 'closeModal',
          pokemonId: '',
          pokemonData: null,
          pokemonStatImg: '',
          pokemonSpeciesUrl: '',
          modalIsLoading: true
      })
  }
  const handleShow = () => setModalVisible(true)

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
        setLoading(false)
      })
      .catch((error) => console.log(`Error: ${error}`));
  };

  const getPokemonModalData = async (url) => {
    await axios.get(url)
        .then((response) => {
          const pokemonDataResult = response.data
            modalDispatch(
              {
                  type: 'getModalData',
                  pokemonId: StylingService.prefixZeroesInId(pokemonDataResult.id),
                  pokemonData: pokemonDataResult,
                  pokemonStatImg: pokemonDataResult.sprites.other["official-artwork"].front_default,
                  pokemonSpeciesUrl: pokemonDataResult.species.url,
                  modalIsLoading: false
              })
          handleShow()
        })
        .catch(error => console.log(`Error: ${error}`))
  }

  if (isLoading) {
    return (
        <div className="App">
          <ComponentIsLoading/>
        </div>
        );
  }
  else {
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
            {pokemonGroup.map((pokemon) => (
                <PokeCard key={pokemon.name} getPokemonModalData={getPokemonModalData} pokemonSearchUrl={pokemon.url} />
            ))}
          </div>
          {modalState.pokemonData !== null ? (<div>
            <PokemonModal
                modalState={modalState}
                showModal={modalVisible}
                getPokemonModalData={getPokemonModalData}
                handleClose={handleClose}
            />
          </div>) : null}
        </div>
    );
  }
}

export default App;
