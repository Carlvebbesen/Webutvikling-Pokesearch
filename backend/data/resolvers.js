import { Pokemons, Teams } from '../db/dbConnector.js'

/**
* GraphQL Resolvers 
**/

const statOptions = ["hp", "attack", "defense", "special_attack", "special_defense", "speed", "total"];

export const resolvers = {
    Query: {
            getFilteredPokemon:(root, {input})=> {
                const query = input.name
                    ? Pokemons.find({
                        name: { $regex: `^${input.name}`, $options: 'is' }
                    })
                    : Pokemons.find();
                if(input.pokeTypes.length !== 0){
                    query.find({
                        pokeTypes: {$all: input.pokeTypes},
                    })
                }
                if(input.rating > 0){
                    query.find({
                    rating: {$gte: input.rating},
                    })
                }

                let sortingOptions = {}

                if (statOptions.includes(input.sortBy)) {
                    sortingOptions[`stats.${input.sortBy}`] = input.sortDesc ? -1 : 1;
                } else {
                    sortingOptions[input.sortBy] = input.sortDesc ? -1 : 1; 
                }

                sortingOptions.entry_number = 1;

                const searchCount = Pokemons.count(query);
                query.sort(sortingOptions).skip(input.offset).limit(input.limit);
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
            },
        getPokemonById: (root,{input}) => {
            return new Promise((resolve, reject) => {
                const pokemon = Pokemons.findOne( {entry_number: input.id}, function (err, result) {
                    if (err || !result) {
                        reject(new Error(`Could not find the pokemon with the given id: ${input.id}`));
                    }
                    else {
                        resolve(pokemon)
                    }
                    
                })
            }
            )
        },
    },
    Mutation: {
        createTeam: (root, { input }) => {

            if (Teams.count({ name: input.name }) > 0) {
                return new Promise((resolve, reject) => {
                    reject(new Error("The team name specified is not unique."));
                })
            }

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
            let newPokemon = await Pokemons.findOne({ entry_number: input.entry_number });

            if (!team.pokemon.some(pokemon => pokemon.name === newPokemon.name)) {

                let teams_count = await Teams.count();

                if (team.pokemon.length === 6) {
                    let oldPokemon = await Pokemons.findOne({ name: team.pokemon[input.index].name });
                    oldPokemon.usage_percentage = (oldPokemon.usage_percentage * teams_count - 1.0) / (teams_count)
                    team.pokemon[input.index] = newPokemon;
                } else {
                    team.pokemon.push(newPokemon);
                }
                newPokemon.usage_percentage = (newPokemon.usage_percentage * teams_count + 1.0) / (teams_count);
            }

            return new Promise((resolve, reject) => {
                team.save((err) => {
                    if(err) reject(err);
                    else resolve(team);
                })
            });
        },
        ratePokemon: async  (root, { input }) => {
            let pokemon = await Pokemons.findOne({ entry_number: input.entry_number });
            let oldRating = parseFloat(pokemon.rating);
            let newRating = (oldRating * pokemon.rating_count + input.rating) / (pokemon.rating_count + 1.0);
            pokemon.rating = newRating;
            pokemon.rating_count += 1;

            console.log(pokemon);

            return new Promise((resolve, reject) => {
                pokemon.save((err) => {
                    if(err) reject(err);
                    else resolve(pokemon);
                })
            });
        }
    }
};
