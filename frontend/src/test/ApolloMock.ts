import React from "react"
import {InMemoryCache} from "@apollo/client";
import {createApolloMockedProvider, fetchTypeDefs} from "apollo-mocked-provider";
import {typeDefs} from "../../../backend/build/data/schema"


//const cache = new InMemoryCache()

export const ApolloMockedProvider = createApolloMockedProvider(typeDefs)