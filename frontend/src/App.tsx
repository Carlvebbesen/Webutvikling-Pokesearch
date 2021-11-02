import React from 'react';
import {Redirect, Route, Switch} from "react-router"
import {BrowserRouter} from 'react-router-dom'
import OverviewPage from "./pages/Overview";
import "./index.css"
import {MyTeam} from "./pages/myTeam";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    return (
        <div className="App">
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover/>
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
