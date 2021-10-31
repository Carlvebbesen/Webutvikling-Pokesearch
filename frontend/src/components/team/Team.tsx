import React, {FC} from "react";
import SwapHorizontalCircleOutlinedIcon from "@mui/icons-material/SwapHorizontalCircleOutlined";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import {capitalize} from "@mui/material";
import style from "./Team.module.css"
import {Pokemon} from "../../utils/Pokemon";
import {atom, useRecoilState} from "recoil";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

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
            <div className={style.teamMember}>
                <div className={style.innerTeamMember}>
                    <img className={style.teamSprite} src={TeamMember.sprite_url} alt="pokemonTeamMembers"/>
                    <p>{capitalize(TeamMember.name)}</p></div>
                <div className={style.innerTeamMember}>
                    <SwapHorizontalCircleOutlinedIcon className={style.removeButton}
                                                      onClick={() => handleSwap(index)}/>
                    <HighlightOffIcon className={style.removeButton} onClick={() => handleRemove(index)}/>
                </div>
            </div>
        )
    }
    return (
        <div className={style.emptyTeamMember}>
            <AddCircleOutlineIcon className={style.addButton} onClick={handleAdd}/>
        </div>
    )
}


interface iTeam {
    currentPokemon: Pokemon
}

const Team: FC<iTeam> = ({currentPokemon}) => {
    const pokemonTeam = atom<Pokemon[]>({
        key: "PokemonTeam",
        default: []
    });

    const [pokemons, setPokemons] = useRecoilState(pokemonTeam)
    const team = pokemons.map((pokemon, index) => <li><TeamMember TeamMember={pokemon}
                                                                  handleAdd={handleAdd} handleSwap={handleSwap}
                                                                  index={index} handleRemove={handleRemove}/></li>)

    function handleSwap(remove_index: number) {
        let copy = pokemons
        if (remove_index > -1) {
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
            setPokemons(prev => ([...prev,   {entry_number: currentPokemon.entry_number,
                name: currentPokemon.name,
                pokeTypes: currentPokemon.pokeTypes,
                stats: currentPokemon.stats,
                weight: currentPokemon.weight,
                rating: currentPokemon.rating,
                number_of_ratings: currentPokemon.number_of_ratings,
                usage_percentage: currentPokemon.usage_percentage,
                sprite_url: currentPokemon.sprite_url,
                id: currentPokemon.entry_number}]))
    }


    if (team.length < 6) {
        team.push(<li><TeamMember TeamMember={null} handleAdd={handleAdd}
                                  handleSwap={handleSwap} index={team.length} handleRemove={handleRemove}/></li>)
    }
    return (
        <div className={style.team}>
            <h4>Current Team</h4>
            <ul className={style.teamList}>
                {team}
            </ul>
        </div>
    )
}

export default Team