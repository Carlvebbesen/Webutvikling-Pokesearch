import React from 'react';
import {Redirect, Route, Switch} from "react-router"
import {BrowserRouter} from 'react-router-dom'
import OverviewPage from "./pages/Overview";
import "./index.css"
import {MyTeam} from "./pages/myTeam";
import {RecoilRoot} from "recoil";
import Navbar from "./components/navbar/Navbar";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Switch>
                    <Route exact path={"/prosjekt3/"}>
                        <OverviewPage/>
                    </Route>                   
                    <Route exact path={"/prosjekt3/my-team"}>
                      <MyTeam/>
                    </Route>
                    <Redirect to={"/prosjekt3/"}/>
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;
