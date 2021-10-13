import { Pokemons, Teams } from '../db/dbConnector.js'

/**
* GraphQL Resolvers 
**/

export const resolvers = {
    Query: {
            getAllPokemon:(root)=> {
                return new Promise((resolve, reject) => {
                    Pokemons.find((err, pokemons) => {
                        if(err) reject(err);
                        else resolve(pokemons);
                    })
                })
            },
            getAllTeams:(root)=>{
                return new Promise((resolve, reject) => {
                    Teams.find((err, teams) => {
                        if(err) reject(err);
                        else resolve(teams);
                    })
                })
            }
        },
    Mutation: {
        createPokemon: (root, { input }) => {
            const newPokemon = new Pokemons({
                name: input.name,
                pokeTypes: input.pokeTypes,
                stats: input.stats,
                weight: input.weight,
                rating: input.rating,
                usage_percentage: input.usage_percentage,
                sprite_url: input.sprite_url,
            });

            return new Promise((resolve, reject) => {
                newPokemon.save((err) => {
                    if(err) reject(err);
                    else resolve(newPokemon);
                })
            })
        },
        createTeam: (root, { input }) => {
            const newTeam = new Teams({
                name: input.name,
                pokemon: [],
            });

            return new Promise((resolve, reject) => {
                newTeam.save((err) => {
                    if(err) reject(err);
                    else resolve(newTeam);
                })
            })
        },
    }
};
