import React from 'react';
import {Redirect, Route, Switch} from "react-router"
import {BrowserRouter} from 'react-router-dom'
import OverviewPage from "./pages/Overview";
import Test from "./components/Test"
import "./index.css"
import {RecoilRoot} from "recoil";

function App() {
    return (
        <div className="App">
            <RecoilRoot>
            <BrowserRouter>
                <Switch>
                    <Route exact path={"/prosjekt3"}>
                        <OverviewPage/>
                    </Route>
                    <Route exact path={"/test"}>
                        <div>
                            <Test/>
                        </div>
                    </Route>
                    <Redirect to={"/prosjekt3"}/>
                </Switch>
            </BrowserRouter>
            </RecoilRoot>
        </div>
    );
}

export default App;
