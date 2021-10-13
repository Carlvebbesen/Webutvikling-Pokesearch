import React from 'react';
import {Redirect, Route, Switch} from "react-router"
import {BrowserRouter} from 'react-router-dom'
import OverviewPage from "./pages/Overview";
import Test from "./components/Test"

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
                    <Redirect to={"/"}/>
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;
