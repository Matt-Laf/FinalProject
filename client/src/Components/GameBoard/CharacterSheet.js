import react, { useEffect, useState } from "react";
import Draggable from "react-draggable";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const CharacterSheet = () => {
  const [game, setGame] = useState(null)
  const [characters, setCharacters] = useState(null)
  const { gameName } = useParams();

  useEffect(() => {
    fetch(`/games/${gameName}`)
      .then((res) => res.json())
      .then((data) => {
        setGame(data.data)
        setCharacters(data.data.players)
        console.log(data.data.players)
      }).catch(err => {
        console.log("error message" + err.message)
      }) 
  }, [])

  console.log(characters)

  return (
    <Draggable>
      <CharSheet>
      

    </CharSheet>
    </Draggable>
    
  );
};

const CharSheet = styled.div`
  z-index: 100;
  position: absolute;
  background-color: yellow;
  height: 60vh;
  width: 40vw;
`

export default CharacterSheet;
