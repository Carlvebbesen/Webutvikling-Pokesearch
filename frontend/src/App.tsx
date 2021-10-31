import React from 'react';
import {Redirect, Route, Switch} from "react-router"
import {BrowserRouter} from 'react-router-dom'
import OverviewPage from "./pages/Overview";
import "./index.css"
import {RecoilRoot} from "recoil";
import Navbar from "./components/navbar/Navbar";

function App() {
    return (
        <div className="App">
            <RecoilRoot>
                <BrowserRouter>
                    <Switch>
                        <Route exact path={"/"}>
                            <OverviewPage/>
                        </Route>
                        <Redirect to={"/"}/>
                    </Switch>
                </BrowserRouter>
            </RecoilRoot>
        </div>
    );
}

export default App;
