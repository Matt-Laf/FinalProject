import React, { useEffect, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";

const Races = () => {
  let [races, setRaces] = useState(undefined);
  const [ID, setID] = useState(0);

  const history = useHistory();

  const fetchRaces = async () => {
    const apiCall = await fetch("https://api.open5e.com/races");
    const data = await apiCall.json();
    setRaces(data.results);
  };

  useEffect(() => {
    fetchRaces();
  }, [ID]);

  const getClass = (slug) => {
    history.push(`/races/${slug}`)
  }

  return (
    <div>
      {races && 
      <div>
        {races.map((race) => {
          return (<div onClick={() => {
            getClass(race.slug)
          }} >{race.name}</div>)
        })}
      </div>
      }
    </div>
    
    )
};

export default Races;
