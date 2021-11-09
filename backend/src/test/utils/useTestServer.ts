import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import MongoMemoryServer from 'mongodb-memory-server-core';
import mongoose from 'mongoose';
import { pokemonSchema } from '../../db/schema/pokemonSchema';
import { teamSchema } from '../../db/schema/teamSchema';
import { getResolvers } from '../../data/resolvers';
import { typeDefs } from '../../data/schema';


export const useTestServer = async () => {
    let mongoServer = await MongoMemoryServer.create();

    async function startDb() {
        await mongoose.connect(mongoServer.getUri(), { useUnifiedTopology: true, useNewUrlParser: true });
        const Pokemons = mongoose.model('Pokemon', pokemonSchema, 'Pokemons');
        const Teams = mongoose.model('Team', teamSchema, 'Teams');
        return { Pokemons, Teams };
    };

    async function startServer() {
        const { Pokemons, Teams} = await startDb();
        const resolvers = getResolvers(Pokemons, Teams);
        const server = new ApolloServer({ typeDefs, resolvers });
        const app = express();
        server.applyMiddleware({ app });
        app.listen({ port: 8000 });
        return mongoServer.getUri();
    }

    return { startServer };
};
