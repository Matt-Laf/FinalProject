import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Draggable from "react-draggable";
import { UserContext } from "../UserContext";
import { useParams } from "react-router-dom";
import CharacterSheet from "./CharacterSheet";
import { useCanvas } from "./GameContext";

const ChatBox = () => {
  const { user } = useContext(UserContext);
  const { gameName } = useParams();

  const [showCharacterSheet, setShowCharacterSheet] = useState(false);
  const [showCharacters, setShowCharacters] = useState(false);
  const [showTokens, setShowTokens] = useState(false);
  const [showMaps, setShowMaps] = useState(false);
  const [game, setGame] = useState(null);
  const [message, setMessage] = useState("");
  const [userStatus, setUserStatus] = useState("");
  const [die, setDie] = useState(20);
  const [numberOfDice, setNumberOfDice] = useState(1);
  const [total, setTotal] = useState(undefined);
  const [rolled, setRolled] = useState(false);
  const [chat, setChat] = useState([]);
  const { playerTokens, setPlayerTokens } = useCanvas();


  // Dice rolling useEffect that sends the dice rolled to the chat.
  useEffect(() => {
    if (total) {
      const body = {
        user: user.name,
        message: `${user.name} rolled ${numberOfDice} d${die} for a total of ${total}`,
      };

      if (rolled) {
        fetch(`/${gameName}/new-message`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.status === 201) {
              setUserStatus(true);
              setChat([...chat, body]);
              setTotal(0);
              setRolled(false);
            }
          })
          .catch((err) => {
            console.log(err.message);
            setUserStatus("error");
          });
      }
    }
  }, [total]);


  // message tool.
  const sendChatMessage = (ev) => {
    ev.preventDefault();
    const body = { user: user.name, message: message };
    fetch(`/${gameName}/new-message`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status === 201) {
          setUserStatus(true);
          setChat([...chat, body]);
        }
      })
      .catch((err) => {
        console.log(err.message);
        setUserStatus("error");
      });
  };

  console.log(numberOfDice, die);

  // rolls the dice
  const getTotal = () => {
    let tempTotal = 0;
    for (let i = 1; i <= numberOfDice; i++) {
      let roll = Math.floor(Math.random() * die) + 1;
      console.log(roll);
      tempTotal += roll;
    }
    setRolled(true);
    console.log("total ", tempTotal);
    setTotal(tempTotal);
    return tempTotal;
  };

  const rollDice = () => {
    getTotal();
  };

  console.log(rolled);
  useEffect(() => {
    fetch(`/games/${gameName}`)
      .then((res) => res.json())
      .then((data) => {
        setGame(data.data);
        setChat(data.data.chat);
        console.log(data.data);
      })
      .catch((err) => {
        console.log("error message" + err.message);
      });
  }, []);


  // adds tokens to the board.  On click, token will be added to GameBoard.js.  Need to add delete button to remove tokens, and set it up so that the tokens can be on the board without having to click the tokens button.  This, in part, goes to saving the canvas state in memory.
  const tokenClick = (token) => {
    console.log(token);
    if (playerTokens.includes(token)) {
      return;
    } else {
      setPlayerTokens([...playerTokens, token]);
    }
  };

  console.log(playerTokens);

  return (
    user &&
    game && (
      <div>
        <Box>
          <ButDiv>
            <But onClick={() => setShowCharacters(!showCharacters)}>
              Characters
            </But>
            {showCharacters && (
              <div>
                {game.players.map((player) => {
                  return (
                    <CharacterName
                      onClick={() => setShowCharacterSheet(!showCharacterSheet)}
                    >
                      {player.character.name}
                    </CharacterName>
                  );
                })}
              </div>
            )}
            <But>Journal</But>
            <But onClick={() => setShowTokens(!showTokens)}>Tokens</But>
            {showTokens &&
              game.tokens.map((token) => {
                return (
                  <TokenDiv>
                    <TokenImg onClick={tokenClick(token)} src={token} />
                  </TokenDiv>
                );
              })}
            <But onClick={() => setShowMaps(!showMaps)}>Maps</But>
            {showMaps &&
              game.maps.map((map) => {
                return (
                  <div>
                    <img src={map} />
                  </div>
                );
              })}
          </ButDiv>
          <ChatArea>
            {chat.map((e) => {
              return (
                <ChatMsg>
                  <strong>{e.user}:</strong> {e.message}
                </ChatMsg>
              );
            })}
          </ChatArea>
          <div>
            <TextBox
              type="text"
              onChange={(e) => setMessage(e.target.value)}
            ></TextBox>
          </div>

          <SubBut onClick={sendChatMessage} value={message}>
            submit
          </SubBut>
          <Draggable>
            <Roller>
              <span>Roll </span>
              <SelectStyle onChange={(e) => setNumberOfDice(e.target.value)}>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
              </SelectStyle>
              <span> d</span>
              <SelectStyle onChange={(e) => setDie(e.target.value)}>
                <option>20</option>
                <option>12</option>
                <option>10</option>
                <option>8</option>
                <option>6</option>
                <option>4</option>
                <option>100</option>
              </SelectStyle>
              <ThrowBut onClick={rollDice}>Throw</ThrowBut>
            </Roller>
          </Draggable>
        </Box>
        {showCharacterSheet && <CharacterSheet />}
      </div>
    )
  );
};

const Box = styled.div`
  z-index: 500;
  background-color: white;
  height: 93.9vh;
  width: 25vh;
  border-left: solid 2px rgba(0, 0, 0, 0.5);
  position: absolute;
  right: 0;
  bottom: 0;
`;

const ChatMsg = styled.div`
  border-top: 1px solid rgba(0, 0, 0, 0.2);
  background-color: rgba(0, 0, 0, 0.05);
  padding: 5px;
`;

const Roller = styled.div`
  position: absolute;
  background-color: white;
  padding: 15px;
  border-radius: 12px;
  border: solid 2px rgba(0, 0, 0, 0.5);
  z-index: 5000;
  left: -80%;
  top: 0;
  cursor: grab;
`;

const ThrowBut = styled.button`
  margin-left: 10px;
  padding: 10px;
  border: solid 1px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  cursor: pointer;
`;

const ChatArea = styled.div`
  height: 70%;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 10px;
  }
  ::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
`;

const TokenDiv = styled.div`
  
`;

const TokenImg = styled.img`
  height: 50px;
  width: 50px;
`;

const TextBox = styled.textarea`
  position: absolute;
  margin-bottom: 20px;
  padding: 0;
  height: 10.75%;
  width: 100%;
  bottom: 8.5px;
  font-size: 20px;
`;

const SelectStyle = styled.select`
  appearance: none;
  font-size: 16px;
  width: 25px;
  border-radius: 5px;
`;

const ButDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const But = styled.button`
  padding: 10px;
  border: solid 1px rgba(0, 0, 0, 0.3);
  cursor: pointer;
`;

const SubBut = styled.button`
  position: absolute;
  bottom: 0;
  width: 100%;
  font-size: 18px;
`;

const CharacterName = styled.div`
  font-weight: bold;
  margin: 10px;
  border-bottom: 2px solid rgba(0,0,0,.1)
`
export default ChatBox;
