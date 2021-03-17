import axios from "axios";
import { useState, useEffect } from "react";

const EvolutionChain = ({ evolutionUrl }) => {
  const [evolutionData, setEvolutionData] = useState({});
  const [speciesName, setSpeciesName] = useState("");
  let evoChain = [];

  useEffect(() => {
    setData();
    // evoChain = mineEvolutionChain(evolutionData)
  }, []);

  const mineEvolutionChain = (evolutionResult) => {
    let evolutionChain = [];
    let evoData = evolutionResult;

    while (!!evoData && evoData.hasOwnProperty("evolves_to")) {
      let evoDetail = {};
      let evoDetails = evoData["evolution_details"];

      if (evoDetails.length !== 0) {
        evoDetail = evoData["evolution_details"][0];
      }

      evolutionChain.push({
        species_name: evoData.species.name,
        min_level: !evoDetail ? 1 : evoDetail.min_level,
        //trigger_name: !evoDetail ? null : evoDetail.trigger.name,
        item: !evoDetail ? null : evoDetail.item,
      });
    }

    return evolutionChain;
  };

  console.log(mineEvolutionChain(evolutionData));

  const setData = async () => {
    await axios.get(evolutionUrl).then((response) => {
      let evoData = response.data.chain;
      setEvolutionData(evoData);
      setSpeciesName(evoData.species.name);
    });
  };

  return <div>{speciesName}</div>;
};

export default EvolutionChain;
