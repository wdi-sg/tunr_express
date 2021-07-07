import { Switch, Route } from "react-router-dom";
import React, { Component } from "react";
import Home from "./Home";
 import Artists from "./Artists";
// import RecipeForm from "./RecipeForm/index";

class Main extends Component {
  render() {
    //console.log()

    return (
      <main>
        <Switch>
          <Route exact path="/" render={() => <Home />} />
          <Route exact path="/artists" render={() => <Artists />} />
        </Switch>
      </main>
    );
  }
}

export default Main;
