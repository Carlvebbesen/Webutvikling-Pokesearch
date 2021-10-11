import {Pokemon} from "../../pages/myTeamPage/myTeam";

interface pokeProps {
    pokemon: Pokemon
}

const PokemonInTeamComponent = (poke : pokeProps) => {

    return (
        <div className={"PokemonView"}>
            <h3>{poke.pokemon.name}</h3>
            <img src={poke.pokemon.sprite_url}/>
            <p>{poke.pokemon.type}</p>

        </div>
    )
}

export default PokemonInTeamComponent;