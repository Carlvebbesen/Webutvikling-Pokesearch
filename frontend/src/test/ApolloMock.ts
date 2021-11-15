import {createApolloMockedProvider, fetchTypeDefs} from "apollo-mocked-provider";
import {typeDefs} from "../../../backend/build/data/schema"



export const ApolloMockedProvider = createApolloMockedProvider(typeDefs)