import { Pokemons } from '../db/dbConnector.js'

/**
* GraphQL Resolvers 
**/

export const resolvers = {
    Query: {
            getAllPokemon:(root)=> {
                return new Promise((resolve,reject)=>{
                    Pokemons.find((err,pokemons)=>{
                        if(err) reject(err);
                        else resolve(pokemons);
                    })
                })
            },
        },
    Mutation: {
        addPokemon: (root, { input }) => {
            const newPokemon = new Pokemons({
                name: input.name,
                pokeTypes: input.pokeTypes,
                stats: input.stats,
                weight: input.weight,
                rating: input.rating,
                usage_percentage: input.usage_percentage,
                sprite_url: input.sprite_url,
            });

            newPokemon.id = newPokemon._id;

            return new Promise((resolve, reject) => {
                newPokemon.save((err) =>{
                    if(err) reject(err);
                    else resolve(newPokemon);
                })
            })
        }
    }
};
