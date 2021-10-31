import { UserInputError } from 'apollo-server-errors';
import { IResolvers } from 'graphql-tools';
import { Pokemons, Teams } from '../db/dbConnector';
import { FilterInput, SortOptions, TeamInput, RatePokemonInput, AddPokemonInput, Pokemon, GetPokemonByIdInput, Team } from './resolver.types';

/**
* GraphQL Resolvers 
**/

export const resolvers: IResolvers = {
    Query: {
        getFilteredPokemon:(_, args: {input: FilterInput})=> {
            const query = args.input.name
                ? Pokemons.find({
                    name: { $regex: `^${args.input.name}`, $options: 'is' }
                })
                : Pokemons.find();
            if(args.input.pokeTypes && args.input.pokeTypes.length !== 0){
                query.find({
                    pokeTypes: {$all: args.input.pokeTypes},
                })
            }
            if(args.input.rating && args.input.rating > 0){
                query.find({
                rating: {$gte: args.input.rating},
                })
            }

            let sortingOptions: SortOptions = {}
            if (args.input.sortBy !== undefined) {
                sortingOptions[`stats.${args.input.sortBy}`] = args.input.sortDesc ? -1 : 1;
            }
            sortingOptions.entry_number = 1;

            const searchCount = Pokemons.count(query);
            query.sort(sortingOptions).skip(args.input.offset).limit(args.input.limit);
            return new Promise((resolve, reject) => {
                resolve({pokemons:query.exec(),
                        count: searchCount,
                })
            })
        },
        getAllTeams:() => {
            return new Promise((resolve, reject) => {
                Teams.find((err, teams) => {
                    if(err) reject(err);
                    else resolve(teams);
                })
            })
        },
        getPokemonById:(_, args: {input: GetPokemonByIdInput}) => {
            return new Promise((resolve, reject) => {
                const pokemon = Pokemons.findOne( {entry_number: args.input.id}, function (err: Error, result: Pokemon | undefined) {
                    if (err || !result) {
                        reject(new UserInputError("The id does not match any existing pokemon."));
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
        createTeam: async (_, args: {input: TeamInput}) => {

            let teamsWithProvidedName = await Teams.countDocuments({ name: args.input.name });
            if (teamsWithProvidedName > 0) {
                return new Promise((resolve, reject) => {
                    reject(new UserInputError("The team name specified is not unique."));
                })
            }

            const newTeam = new Teams({
                name: args.input.name,
                pokemon: [],
            });

            return new Promise((resolve, reject) => {
                newTeam.save((err) => {
                    if(err) reject(err);
                    else resolve(newTeam);
                })
            })
        },
        addPokemon: async (_, args: {input: AddPokemonInput}) => {
            let team = await Teams.findOne({ name: args.input.teamName });

            if (team === null) return new Promise((resolve, reject) => reject(new UserInputError("The team with the specified name does not exist.")));

            let newPokemon = await Pokemons.findOne({ entry_number: args.input.pokemonId });

            if (newPokemon === null) return new Promise((resolve, reject) => reject(new UserInputError("The pokemon with the specified id does not exist.")));

            if (team.pokemon.some((pokemon: Pokemon) => pokemon.name === newPokemon.name)) {
                return new Promise((resolve, reject) => {
                    reject(new UserInputError("The pokemon is already on the team."));
                })
            }

            let teams_count = await Teams.countDocuments();

            if (team.pokemon.length === 6) {
                let oldPokemon = await Pokemons.findOne({ name: team.pokemon[args.input.index].name });
                oldPokemon.usage_percentage = (oldPokemon.usage_percentage * teams_count - 1.0) / (teams_count)
                team.pokemon[args.input.index] = newPokemon;
            } else {
                team.pokemon.push(newPokemon);
            }
            newPokemon.usage_percentage = (newPokemon.usage_percentage * teams_count + 1.0) / (teams_count);

            return new Promise((resolve, reject) => {
                team.save((err: Error) => {
                    if(err) reject(err);
                    else resolve(team);
                })
            });
        },
        ratePokemon: async (_, args: {input: RatePokemonInput}) => {
            let pokemon = await Pokemons.findOne({ entry_number: args.input.id });
            if (pokemon === null) return new Promise((resolve, reject) => reject(new UserInputError("The pokemon with the specified id does not exists.")));
            let oldRating = parseFloat(pokemon.rating);
            let newRating = (oldRating * pokemon.rating_count + args.input.rating) / (pokemon.rating_count + 1.0);
            pokemon.rating = newRating;
            pokemon.rating_count += 1;

            return new Promise((resolve, reject) => {
                pokemon.save((err: Error) => {
                    if(err) reject(err);
                    else resolve(pokemon);
                })
            });
        }
    }
};