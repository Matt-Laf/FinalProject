import React, { useContext, useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";
import { useParams } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { UserContext } from "../UserContext";
import ChatBox from "./ChatBox";
import { useCanvas } from "./GameContext";

const GameBoard = (props) => {
  const {
    gridCanvasRef,
    prepareGridCanvas,
    drawCanvasRef,
    prepareDrawCanvas,
    mapCanvasRef,
    prepareMapCanvas,
    handleDrawMouseDown,
    handleDrawMouseMove,
    handleDrawMouseUp,
    drawGrid,
    clearGrid,
    setTool,
    tool,
    action,
    setAction,
    elements,
    setElements,
    selectedElement,
    setSelectedElement,
    undo, 
    redo,
    playerTokens,
  } = useCanvas();

  const { user } = useContext(UserContext);

  const { gameName } = useParams();

  const [grid, setGrid] = useState(false);

  const [game, setGame] = useState(null)

  const [drawLayer, setDrawLayer] = useState(4)
  const [tokenLayer, setTokenLayer] = useState(5)

 console.log(playerTokens)
  useEffect(() => {
    fetch(`/games/${gameName}`)
      .then((res) => res.json())
      .then((data) => {
        setGame(data.data)
        console.log(data.data)
      }).catch(err => {
        console.log("error message" + err.message)
      }) 
  }, [])

  useEffect(() => {
    prepareGridCanvas();
  }, []);

  useEffect(() => {
    prepareDrawCanvas();
  }, [elements]);

  useEffect(() => {
    prepareMapCanvas();
  }, []);

  const handleGrid = () => {
    if (grid === false) {
      setGrid(true);
      drawGrid();
    } else {
      setGrid(false);
      clearGrid();
    }
  };

  
  // style={{ backgroundImage: `url(${game.maps[0]})`
  const checkRole = () => {
    if (user !== null)
    user.games.find((game) => {
    if (game.gameName === gameName) {
      return game.DM;
    }
  });
  return
}
console.log(elements)
  return (
    
      <Wrapper>
      <ChatBox />
      <Container>
        <GridCanvas ref={gridCanvasRef}> </GridCanvas>
        <DrawCanvas
          ref={drawCanvasRef}
          onMouseDown={handleDrawMouseDown}
          onMouseMove={handleDrawMouseMove}
          onMouseUp={handleDrawMouseUp}
          style={{zIndex:`${drawLayer}`}}
        ></DrawCanvas>
        <MapCanvas ref={mapCanvasRef}></MapCanvas>
        <TokenLayer
        style={{zIndex:`${tokenLayer}`}}
        >
          {playerTokens.map((e) => {
            return(
            <Draggable>
              <TokenImg src={e} />
            </Draggable>
              
            )
            
          })}
        </TokenLayer>
      </Container>
      <Draggable>
        <ButDiv>
          <Button onClick={handleGrid}>Grid</Button>
          <Button
            onClick={() => {
              setTool("line");
            }}
          >
            Line
          </Button>
          <Button
            onClick={() => {
              setTool("rectangle");
            }}
          >
            Rectangle
          </Button>
          <Button
            onClick={() => {
              setTool("selection");
            }}
          >
            Selection
          </Button>
          <Button onClick={() => {
            setDrawLayer(5)
            setTokenLayer(4)
          }}>
            Layer Up
          </Button>
          <Button onClick={() => {
            setDrawLayer(4)
            setTokenLayer(5)
          }}>
            Layer Down
          </Button>
          <Button
            onClick={undo}
          >
            Undo
          </Button>
          <Button
            onClick={redo}
          >
            Redo
          </Button>
        </ButDiv>
      </Draggable>
    </Wrapper>
    
  );
};

const Wrapper = styled.div`
margin-top: .5px;
  height: 94vh;
  width: 86.9vw;
`;

const MapCanvas = styled.canvas`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 0;
  
`;

const DrawCanvas = styled.canvas`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;

`;

const TokenLayer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;

`;

const TokenImg = styled.img`
  height: 100px;
  cursor: grab;
`

const GridCanvas = styled.canvas`
  padding: 0;
  height: 100%;
  width: 100%;
  z-index:10;
`;

const GridBut = styled.button`
  z-index: 5000;
`;
const Container = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  background-image: url("https://i.redd.it/ufxpjuc55xv01.png");
`;

const ButDiv = styled.div`
  position: absolute;
  top: 10%;
  left: 1.5%;
  display: flex;
  flex-direction: column;
  z-index: 5000;
`;

const Button = styled.button`
  z-index: 5000;
  border: 1px solid rgba(0,0,0,.5);
  margin-left: 10px;
  padding: 10px;
  border: solid 1px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  cursor: pointer;
  
`;
export default GameBoard;
