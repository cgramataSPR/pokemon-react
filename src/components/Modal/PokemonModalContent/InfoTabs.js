import React from "react";
import BaseStats from "./InfoTabsContent/BaseStats";
import EvolutionChain from "./InfoTabsContent/EvolutionChain";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

import { useState } from "react";

const InfoTabs = ({ baseStats, abilityNames, evolutionUrl }) => {
  const [key, setKey] = useState("stats");

  const mappedAbilities = abilityNames.map((entry) => (
    <div className="ability-name" key={entry}>
      {entry}
    </div>
  ));

  return (
    <Tabs activeKey={key} onSelect={(key) => setKey(key)}>
      <Tab eventKey="stats" title="Stats">
        <div className="stats-type-container">
          <BaseStats baseStats={baseStats} />
        </div>
      </Tab>
      <Tab eventKey="abilities" title="Abilities">
        <div className="stats-type-container capitalize">{mappedAbilities}</div>
      </Tab>
      <Tab eventKey="evolution" title="Evolution">
        <div>
          <EvolutionChain evolutionUrl={evolutionUrl} />
        </div>
      </Tab>
    </Tabs>
  );
};

export default InfoTabs;
