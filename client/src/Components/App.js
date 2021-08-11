import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Header from "./Header";
import HomePage from "./Homepage";
import Library from "./Library/Library";
import Classes from "./Library/Classes"
import Job from "./Library/Job";
import GameBoard from "./GameBoard/GameBoard";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Spells from "./Library/Spells";
import Spell from "./Library/Spell";
import Monsters from "./Library/Monsters";
import Monster from "./Library/Monster";
import ChatBox from "./GameBoard/ChatBox";
import GlobalStyles from "./GlobalStyles";
import Profile from "./Profile";
import Maps from "./Maps";
import Tokens from "./Tokens";
import Conditions from "./Library/Conditions";
import Races from "./Library/Races";
import Race from "./Library/Race";
import MagicItems from "./Library/MagicItems";
import MagicItem from "./Library/MagicItem";
import Weapons from "./Library/Weapons";
import Footer from "./Footer";

function App() {
  return (
    <Router>
      <GlobalStyles />
      <Header />
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route exact path="/library">
          <Library />
        </Route>
        <Route exact path="/classes">
          <Classes />
        </Route>
        <Route exact path="/classes/:slug">
          <Job />
        </Route>
        <Route exact path="/game/:gameName">
          {/* <ChatBox /> */}
            <GameBoard />
        </Route>
        <Route exact path="/sign-in">
          <SignIn />
        </Route>
        <Route exact path="/sign-up">
          <SignUp />
        </Route>
        <Route exact path="/profile">
          <Profile />
        </Route>
        <Route exact path="/user/maps">
          <Maps />
        </Route>
        <Route exact path="/user/tokens">
          <Tokens />
        </Route>
        <Route exact path="/spells/:page" >
          <Spells />
        </Route>
        <Route exact path="/spell/:slug">
          <Spell />
        </Route>
        <Route exact path="/monsters/:page">
          <Monsters />
        </Route>
        <Route exact path="/monster/:slug">
          <Monster />
        </Route>
        <Route exact path="/conditions">
          <Conditions />
        </Route>
        <Route exact path="/races">
          <Races />
        </Route>
        <Route exact path="/races/:slug">
          <Race />
        </Route>
        <Route exact path="/magicitems">
          <MagicItems />
        </Route>
        <Route exact path="/magicitem/:slug">
          <MagicItem />
        </Route>
        <Route exact path="/weapons">
          <Weapons />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
