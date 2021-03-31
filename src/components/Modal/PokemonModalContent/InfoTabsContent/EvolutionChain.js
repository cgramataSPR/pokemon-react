import axios from "axios";
import { useEffect, useReducer } from "react";
import ComponentIsLoading from "../../../ComponentIsLoading";
import PokeCard from "../../../PokeCard";

const evoChainInitialState = {
  pokemonName: '',
  evolutionData: null,
  evolutionChain: null,
  isLoading: true
}

const evoChainReducer = (state, action) => {
  switch (action.type) {
    case 'initialLoad':
      return {
        pokemonName: action.pokemonName,
        evolutionData: action.evolutionData,
        evolutionChain: action.evolutionChain,
        isLoading: false
      }
    default:
      return{
        pokemonName: '',
        evolutionData: null,
        evolutionChain: null,
        isLoading: true
      }
  }
}

const EvolutionChain = ({ evolutionUrl, getPokemonModalData }) => {

  const [evoChainState, evoChainDispatch] = useReducer(evoChainReducer, evoChainInitialState)

  useEffect(() => {
    setData();
  }, []);

  //Todo: Move this to a service
  const mineEvolutionChain = (evolutionResult) => {
    let evoChain = [];
    let evoData = evolutionResult;

    do {
      let evoDetails = evoData['evolution_details'][0];

      evoChain.push({
        "species_name": evoData.species.name,
        "min_level": !evoDetails ? 1 : evoDetails.min_level,
        "trigger_name": !evoDetails ? null : evoDetails.trigger.name,
        "item": !evoDetails ? null : evoDetails.item
      });

      evoData = evoData['evolves_to'][0];
    } while (!!evoData && evoData.hasOwnProperty('evolves_to'));
    return evoChain
  }

  //Todo: Need to modify to account for pokemon that evolve into different pokemon depending on stones (ie: Eevee)
  const createEvolutionChainDom = (evolutionList) => {
    const listLength = evolutionList.length - 1

    return (evolutionList.map((entry, r) => {
      return r === listLength ? (
          <div key={entry.species_name}>
            <PokeCard key={entry.species_name}
                      getPokemonModalData={getPokemonModalData}
                      pokemonSearchUrl={`https://pokeapi.co/api/v2/pokemon/${entry.species_name}`}/>
          </div>
      ) : (
          <div key={entry.species_name} className="side-by-side">
            <PokeCard key={entry.species_name}
                      getPokemonModalData={getPokemonModalData}
                      pokemonSearchUrl={`https://pokeapi.co/api/v2/pokemon/${entry.species_name}`}/>
            <div> ></div>
          </div>
      );
    }))
  }

  const setData = async () => {
    await axios
      .get(evolutionUrl)
      .then((response) => {
      const evoData = response.data.chain;
      evoChainDispatch(
          {
            type: 'initialLoad',
            pokemonName: evoData.species.name,
            evolutionData: evoData,
            evolutionChain: mineEvolutionChain(evoData),
            isLoading: true
          }
      )
    });
  };

  if (evoChainState.isLoading){
    return (
        <ComponentIsLoading/>
    )
  } else {
    return (
        <div className="side-by-side">
          {createEvolutionChainDom(evoChainState.evolutionChain)}
        </div>
    )
  }
}

export default EvolutionChain;
