import React from "react";

const BaseStats = ({ baseStats }) => {
  return (
    baseStats &&
    baseStats.map((entry) => (
      <div key={entry.stat.name} className="side-by-side">
        <div className="capitalize flex-child stats-name">
          {entry.stat.name}
        </div>
        <div className="stats-value">{entry.base_stat}</div>
        <div className="progress-bar-container">
          <div className="progress flex-child">
            <div
                className="progress-bar progress-bar-striped progress-bar-animated"
                role="progressbar"
                aria-valuenow={entry.base_stat}
                aria-valuemin="0"
                aria-valuemax="200"
                style={{width: `${entry.base_stat / 2}%`}}
            />
          </div>
        </div>
      </div>
    ))
  );
};

export default BaseStats;
