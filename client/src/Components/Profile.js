import React, { useContext } from "react";
import { NavLink, useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import Footer from "./Footer";
import { UserContext } from "./UserContext";

const Profile = () => {
  const { user } = useContext(UserContext);

  const history = useHistory();

  const handleGameClick = (gameName) => {
    history.push(`/game/${gameName}`);
  };

  // const games = user.games

  user && console.log(user.tokens[0]);

  return (
    user && (
      <Wrapper>
        <Game><strong>Games: </strong></Game>
        <GameContainer>
          {user.games.map((game, i) => {
          return (
            <GameDiv
              onClick={() => {
                handleGameClick(game.gameName);
              }}
              key={i}
            >
              {game.gameName}
            </GameDiv>
          );
        })}
        </GameContainer>
        <Footer />
      </Wrapper>
    )
  );
};

const GameDiv = styled.div`
  font-size: 32px;
  margin-left: 20px;
  margin-top: 20px;
  height: 73vh;
`;

const Game = styled.div`
  margin-left: 20px;
  margin-top: 20px;
  border-bottom: 2px solid rgba(0,0,0,.2);
  font-size: 36px;
  width: 7%;
`

const GameContainer = styled.div`
  display: flex;
`

const Wrapper = styled.div`
  height: 82vh;
`
export default Profile;
