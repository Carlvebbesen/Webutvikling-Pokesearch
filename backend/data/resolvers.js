import { Pokemons, Teams } from '../db/dbConnector.js'

/**
* GraphQL Resolvers 
**/

export const resolvers = {
    Query: {
            getFilteredPokemon:(root, {input})=> {
                const query = Pokemons.find({
                    name: { $regex: `^${input.name}`, $options: 'is' }
                })
                if(input.pokeTypes.length !== 0){
                    query.find({
                        pokeTypes: {$in: input.pokeTypes},
                    })
                }
                if(input.rating > 0){
                    query.find({
                    rating: {$gte: input.rating},
                    })
                }
                const searchCount = Pokemons.count(query);
                query.skip(input.offset).limit(input.limit).sort({name: 1})
                return new Promise((resolve, reject) => {
                    resolve({pokemons:query.exec(),
                         count: searchCount,
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
        addPokemon: async (root, { input }) => {
            let team = await Teams.findOne({ name: input.teamName });
            let newPokemon = await Pokemons.findOne({ name: input.newPokemonName});

            if (!team.pokemon.some(pokemon => pokemon.name === newPokemon.name)) {
                if (team.pokemon.length === 6) {
                    team.pokemon[input.index] = newPokemon;
                } else {
                    team.pokemon.push(newPokemon);
                }
            }

            return new Promise((resolve, reject) => {
                team.save((err) => {
                    if(err) reject(err);
                    else resolve(team);
                })
            });
        },
    }
};
