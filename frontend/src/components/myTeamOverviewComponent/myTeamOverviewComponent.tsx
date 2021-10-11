import {Pokemon} from "../../pages/myTeamPage/myTeam";
import PokemonInTeamComponent from "../pokemonInTeamComponent/pokemonInTeamComponent";

interface pokeProps {
    pokemon: Pokemon[]
}

const MyTeamOverviewComponent = (pokemon : pokeProps) => {
    const p : Pokemon[]= [...pokemon.pokemon]

    return (
        <div className={"MyTeamOverview"}>
            {p.map((poke, key) =>
                <PokemonInTeamComponent pokemon={poke} key={key}/>
            )}
        </div>
    );

}

export default MyTeamOverviewComponent;