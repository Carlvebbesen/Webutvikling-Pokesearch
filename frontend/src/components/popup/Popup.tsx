import React, {FC, useState} from "react"
import style from "./Popup.module.css"
import {useQuery} from "@apollo/client";
import {GET_POKEMON_BY_ID} from "../../queries";
import CircularProgress from '@mui/material/CircularProgress';
import {capitalize, Rating} from "@mui/material";
import Team from "../team/Team";
import Stats from "../stats/Stats";
import {Pokemon} from "../../utils/Pokemon";
import SendIcon from '@mui/icons-material/Send';
import {getPokeTypeIcon} from "../../static/typeIcons/pokeTypeIcons";

interface iPopup {
    pokemonID: number,
    setOpen: Function
}


const Popup: FC<iPopup> = (props) => {
    const [rating, setRating] = useState<number>(0)
    const [disable, setDisable] = useState<boolean>(false)
    const {data, error, loading} = useQuery(GET_POKEMON_BY_ID, {
        variables: {input: {id: props.pokemonID}}
    })


    const handleRating = () => {
        setDisable(true)
        alert("Rating sent")
        //TODO: send inn rating
    }

    return (
        <div id="inner" className={style.popupInner}>
            {loading || error ? <CircularProgress/>
                :
                <div>
                    <button
                        onClick={() => {
                            setRating(0)
                            setDisable(false)
                            props.setOpen(false)

                        }}
                        className={style.close}>close
                    </button>
                    <div>
                        <h1>{capitalize(data?.getPokemonById.name)}</h1>
                    </div>
                    <div className={style.wrapper}>


                        <div className={style.innerWrapper}>
                            <img className={style.spritePic} src={data?.getPokemonById.sprite_url}
                                 alt={"Picture of " + data?.getPokemonById.name}/>
                            {data?.getPokemonById.pokeTypes.map((type: string) =>
                                <img style={{marginRight: "10px"}} height="50" src={getPokeTypeIcon(type)}
                                     alt={type}/>)}
                        </div>
                        <div className={style.innerWrapper}>
                            <p>Average rating of {data?.getPokemonById.rating_count}
                                {data?.getPokemonById.rating_count === 1 ? " person" : " people"}</p>
                            <Rating name="read-only" defaultValue={0} precision={0.1}
                                    value={data?.getPokemonById.rating} readOnly/>
                            <p>Used by: {data?.getPokemonById.usage_percentage * 100}% of teams</p>
                            <p>Weight: {data?.getPokemonById.weight / 10} kg</p>
                            <p>Your rating:</p>
                            <Rating
                                name="simple-controlled"
                                value={rating}
                                precision={0.5}
                                onChange={(event, newValue) => {
                                    setRating(newValue ? newValue : 0)
                                }}
                                disabled={disable}
                            />
                            <button onClick={handleRating} disabled={(rating === 0) || disable}><SendIcon/></button>
                        </div>


                        <div className={style.innerWrapper}>
                            <Team currentPokemon={
                                {
                                    entry_number: props.pokemonID,
                                    name: data?.getPokemonById?.name,
                                    pokeTypes: data?.getPokemonById?.pokeTypes,
                                    stats: data?.getPokemonById?.stats,
                                    weight: data?.getPokemonById?.weight,
                                    rating: data?.getPokemonById?.rating,
                                    number_of_ratings: data?.getPokemonById?.rating_count,
                                    usage_percentage: data?.getPokemonById?.usage_percentage,
                                    sprite_url: data?.getPokemonById?.sprite_url,
                                } as Pokemon}/>
                        </div>


                        <div className={style.innerWrapper}>
                            <h3>Stats: </h3>
                            <Stats
                                Hp={data?.getPokemonById.stats.hp}
                                Atk={data?.getPokemonById.stats.attack}
                                Def={data?.getPokemonById.stats.defense}
                                SpAtk={data?.getPokemonById.stats.special_attack}
                                SpDef={data?.getPokemonById.stats.special_defense}
                                Speed={data?.getPokemonById.stats.speed}/>
                        </div>
                    </div>
                </div>}

        </div>
    )
}

export default Popup