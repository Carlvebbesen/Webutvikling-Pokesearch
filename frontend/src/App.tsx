import React from 'react';
import {Redirect, Route, Switch} from "react-router"
import {BrowserRouter} from 'react-router-dom'
import OverviewPage from "./pages/Overview";

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
                            <p>
                                This is a test
                            </p>
                        </div>
                    </Route>
                    <Redirect to={"/"}/>
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;
