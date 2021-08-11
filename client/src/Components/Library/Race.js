import React, { useEffect, useState } from "react";
import { NavLink, useHistory, useParams } from "react-router-dom";

const Race = () => {
  let [race, setRace] = useState(undefined);
  const [ID, setID] = useState(0);

  const { slug } = useParams();

  const fetchRace = async () => {
    const apiCall = await fetch(`https://api.open5e.com/races/${slug}`);
    const data = await apiCall.json();
    setRace(data);
  };

  useEffect(() => {
    fetchRace();
  }, [ID]);

  console.log(race);

  return (
    <div>
      {race && (
        <div>
          <div>{race.name}</div>
          <div>{race.desc}</div>
          <div>{race.asi_desc}</div>
          <div>
            {race.asi.map((e, i) => {
              return (
                <div>
                  {e.attributes}: {e.value}
                </div>
              );
            })}
          </div>
          <div>{race.age}</div>
          <div>{race.alignment}</div>
          <div>{race.size}</div>
          <div>{race.speed_desc}</div>
          <div>{race.languages}</div>
          <div>{race.vision}</div>
          <div>{race.traits}</div>
          <div>
            {race.subraces.map((e, i) => {
              return (
                <div>
                  <div>{e.desc}</div>
                  <div>{e.traits}</div>
                  <div>{e.asi_desc}</div>
                </div>
                
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Race;
