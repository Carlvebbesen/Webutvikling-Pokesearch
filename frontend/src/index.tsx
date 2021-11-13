import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
} from "@apollo/client";
import {RecoilRoot} from "recoil";

const client = new ApolloClient({
    uri: 'http://it2810-11.idi.ntnu.no:8080/graphql',
    cache: new InMemoryCache()
});


ReactDOM.render(
    <RecoilRoot>
        <React.StrictMode>
            <ApolloProvider client={client}>
                <App/>
            </ApolloProvider>
        </React.StrictMode>
    </RecoilRoot>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
