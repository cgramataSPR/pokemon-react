import axios from "axios";
import { useState, useEffect } from "react";
import ComponentIsLoading from "../../../ComponentIsLoading";
import PokeCard from "../../../PokeCard";

const EvolutionChain = ({ evolutionUrl }) => {
  const [isLoading, setLoading] = useState(true)
  const [evolutionData, setEvolutionData] = useState({});
  const [speciesName, setSpeciesName] = useState("");
  const [evolutionChain, setEvolutionChain] = useState([]);

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

  const createEvolutionChainDom = (evolutionList) => {
    const listLength = evolutionList.length - 1

    return (evolutionList.map((entry, r) => {
      if (r == listLength) {
        return (
            <div key={entry.species_name}>
              <PokeCard key={entry.species_name} pokemonSearchUrl={`https://pokeapi.co/api/v2/pokemon/${entry.species_name}`} />
            </div>
        )
      }
      else {
        return(
            <div key={entry.species_name} className="side-by-side">
              <PokeCard key={entry.species_name} pokemonSearchUrl={`https://pokeapi.co/api/v2/pokemon/${entry.species_name}`} />
              <div> > </div>
            </div>
        )
      }
    }))
  }

  const setData = async () => {
    await axios
      .get(evolutionUrl)
      .then((response) => {
      let evoData = response.data.chain;
      setEvolutionChain(mineEvolutionChain(evoData))
      setEvolutionData(evoData);
      setSpeciesName(evoData.species.name);
      setLoading(false)
    });
  };

  if (isLoading){
    return (
        <ComponentIsLoading></ComponentIsLoading>
    )
  } else {
    return (
        <div className="side-by-side">
          {createEvolutionChainDom(evolutionChain)}
        </div>
    )
  }
}

export default EvolutionChain;
