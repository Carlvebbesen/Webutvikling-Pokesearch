import React from 'react';
import './App.css';
import {Redirect, Route, Switch} from 'react-router'
import {MyTeam} from "./pages/myTeamPage/myTeam";

function App() {
  return (
      <div className="App">
        <Switch>
          <Route exact path={"/"}>
              <MyTeam/>
          </Route>
          <Redirect to={"/"}/>
        </Switch>
      </div>
  );
}

export default App;
