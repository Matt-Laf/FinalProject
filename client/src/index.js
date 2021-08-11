import React from "react";
import ReactDOM from "react-dom";
import App from "./Components/App";
import { GameBoardProvider } from "./Components/GameBoard/GameContext";
import { UserProvider } from "./Components/UserContext";

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <GameBoardProvider>
        <App />
      </GameBoardProvider>
    </UserProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
