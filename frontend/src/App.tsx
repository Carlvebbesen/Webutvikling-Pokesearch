import React from 'react';
import {Redirect, Route, Switch} from "react-router"
import {BrowserRouter} from 'react-router-dom'
import OverviewPage from "./pages/Overview";
import Test from "./components/Test"
import "./index.css"
import './App.css';
import {MyTeam} from "./pages/myTeamPage/myTeam";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Switch>
                    <Route exact path={"/"}>
                        <OverviewPage/>
                    </Route>
                    <Route exact path={"/test"}>
                        <div>
                            <Test/>
                        </div>
                    </Route>
                    <Route exact path={"/my-team"}>
                      <MyTeam/>
                    </Route>
                    <Redirect to={"/"}/>
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;
