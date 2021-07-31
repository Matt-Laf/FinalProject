import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Header from "./Header";
import HomePage from "./Homepage";
import Library from "./Library/Library";
import Classes from "./Library/Classes"
import Job from "./Library/Job";

function App() {
  return (
    <Router>
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
        <Route exact path="/classes/:index">
          <Job />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
