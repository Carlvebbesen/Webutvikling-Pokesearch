import React, {FC} from "react";
import {capitalize} from "@mui/material";
import style from "./Team.module.css"
import {Pokemon} from "../../utils/Pokemon";
import { useRecoilState} from "recoil";
import { pokemonTeam } from "../../store";
import { BsFillPlusSquareFill, BsTrash, BsArrowRepeat } from 'react-icons/bs';

interface iTeamMember {
    TeamMember: Pokemon | null
    handleSwap: (index: number)=> void
    handleAdd: ()=> void
    handleRemove: (index: number)=> void
    index: number
}

const TeamMember: FC<iTeamMember> = ({TeamMember, handleAdd, handleRemove, handleSwap, index}) => {


    if (TeamMember !== null) {
        return (
            <div data-cy={`team-${TeamMember.name}`} className={style.teamMember}>
                <div className={style.innerTeamMember}>
                    <img className={style.teamSprite} src={TeamMember.sprite_url} alt={TeamMember.name} title={TeamMember.name}/>
                    <p>{capitalize(TeamMember.name)}</p></div>
                <div className={style.innerTeamMember}>
                    <BsArrowRepeat data-testid="swap_button" data-cy={`swap-${TeamMember.name}`} className={style.removeButton}
                                                      onClick={() => handleSwap(index)}/>
                    <BsTrash data-testid="remove_button" data-cy={`trash-${TeamMember.name}`} className={style.removeButton} onClick={() => handleRemove(index)}/>
                </div>
            </div>
        )
    }
    return (
        <div className={style.emptyTeamMember}>
            <BsFillPlusSquareFill data-testid="add_button" data-cy="add-pokemon-to-team" className={style.addButton} onClick={handleAdd}/>
        </div>
    )
}


interface iTeam {
    currentPokemon: Pokemon
}

const Team: FC<iTeam> = ({currentPokemon}) => {
    const [pokemons, setPokemons] = useRecoilState(pokemonTeam)
    const team = pokemons.map((pokemon, index) =>
        <TeamMember
            key={index}
            TeamMember={pokemon}
            handleAdd={handleAdd}
            handleSwap={handleSwap}
            index={index}
            handleRemove={handleRemove}/>)

    function handleSwap(remove_index: number) {
        let copy = pokemons
        if (remove_index > -1 && !pokemons.find(pokemon => pokemon.entry_number === currentPokemon.entry_number)) {
            setPokemons([...copy.slice(0, remove_index), currentPokemon, ...copy.slice(remove_index + 1)])
        }
    }

    function handleRemove(remove_index: number) {
        let copy = pokemons
        if (remove_index > -1) {
            setPokemons([...copy.slice(0, remove_index), ...copy.slice(remove_index + 1)])
        }
    }

    function handleAdd() {
        if(!pokemons.find(pokemon => pokemon.entry_number === currentPokemon.entry_number)){
            setPokemons(prev => ([...prev,   {entry_number: currentPokemon.entry_number,
                name: currentPokemon.name,
                pokeTypes: currentPokemon.pokeTypes,
                stats: currentPokemon.stats,
                weight: currentPokemon.weight,
                rating: currentPokemon.rating,
                number_of_ratings: currentPokemon.number_of_ratings,
                usage_count: currentPokemon.usage_count,
                sprite_url: currentPokemon.sprite_url,
                id: currentPokemon.entry_number}]))
            }
    }


    if (team.length < 6 && !pokemons.find(pokemon => pokemon.entry_number === currentPokemon.entry_number)) {
        team.push(<TeamMember key={'12313'} TeamMember={null} handleAdd={handleAdd}
                                  handleSwap={handleSwap} index={team.length} handleRemove={handleRemove}/>)
    }
    return (
        <div className={style.team}>
            <h4>Add pokemon to current team</h4>
            <div className={style.wrapperTeams}>
                {team}
            </div>
        </div>
    )
}

export default Team