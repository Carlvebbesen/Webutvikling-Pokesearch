"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var apollo_server_express_1 = require("apollo-server-express");
var resolvers_1 = require("./data/resolvers");
var schema_1 = require("./data/schema");
var config_1 = require("./config/config");
var server = new apollo_server_express_1.ApolloServer({ typeDefs: schema_1.typeDefs, resolvers: resolvers_1.resolvers });
var app = (0, express_1.default)();
server.applyMiddleware({ app: app });
app.get('/', function (req, res) {
    console.log("Apollo GraphQL Express server is ready");
});
app.listen({ port: config_1.PORT }, function () {
    console.log("Server is running at http://localhost:8080" + server.graphqlPath);
});
