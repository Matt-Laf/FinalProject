import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Footer from "../Footer";

const Monsters = () => {
  // todo: add prev, fix url /1 etc.  implement search function?

  const [monsters, setMonsters] = useState(null);
  const [page, setPage] = useState(1);

  const history = useHistory();

  const handleNext = () => {
    setPage(page + 1);
    history.push(`/monsters/${page}`);
  };

  const handlePrev = () => {
    setPage(page - 1);
    history.push(`/monsters/${page}`);
  };

  const handleClick = (slug) => {
    history.push(`/monster/${slug}`);
    console.log("Hello");
  };

  const fetchMonsters = async () => {
    const apiCall = await fetch(`https://api.open5e.com/monsters/?page=${page}`);
    const data = await apiCall.json();
    setMonsters(data.results);
  };

  useEffect(() => {
    fetchMonsters();
  }, [page]);

  return (
    <div>
      {monsters && (
        <MonsterContainer>
          {monsters.map((monster) => {
            return (
              <MonsterDiv
                onClick={() => {
                  handleClick(monster.slug);
                }}
              >
                {monster.name}
              </MonsterDiv>
            );
          })}
        </MonsterContainer>
      )}
      <ButDiv>
        <But onClick={handleNext}>Next</But>
        <But onClick={handlePrev}>Prev</But>
      </ButDiv>
        
      
      <Footer />
    </div>
  );
};

const MonsterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const MonsterDiv = styled.div`
margin-top: 20px;
  font-size: 34px;
`

const But = styled.button`

`

const ButDiv = styled.div`

`



export default Monsters;
