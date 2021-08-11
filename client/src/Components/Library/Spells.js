import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const Spells = () => {
  // todo: add prev, fix url /1 etc.  implement search function?

  const [spells, setSpells] = useState(null);
  const [page, setPage] = useState(1);

  const history = useHistory();

  const handleNext = () => {
    setPage(page + 1);
    history.push(`/spells/${page}`);
  };

  const handlePrev = () => {
    setPage(page - 1);
    history.push(`/spells/${page}`);
  };

  const handleClick = (slug) => {
    history.push(`/spell/${slug}`);
    console.log("Hello");
  };

  const fetchSpells = async () => {
    const apiCall = await fetch(`https://api.open5e.com/spells/?page=${page}`);
    const data = await apiCall.json();
    setSpells(data.results);
  };

  useEffect(() => {
    fetchSpells();
  }, [page]);

  spells && console.log(spells);

  return (
    <div>
      {spells && (
        <div>
          {spells.map((spell) => {
            return (
              <div
                onClick={() => {
                  handleClick(spell.slug);
                }}
              >
                {spell.name}
              </div>
            );
          })}
        </div>
      )}
      <button onClick={handleNext}>Next</button>
    </div>
  );
};

export default Spells;
