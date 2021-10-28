import React, {FC, useState} from "react"
import style from "./Popup.module.css"
import {useQuery} from "@apollo/client";
import {GET_POKEMON_BY_ID} from "../../queries";
import CircularProgress from '@mui/material/CircularProgress';
import {capitalize, Rating} from "@mui/material";
import Team from "../team/Team";
import Stats from "../stats/Stats";
import {Pokemon} from "../../utils/Pokemon";


interface iPopip {
    pokemonID: number,
    trigger: boolean,
    setOpen: Function
}

const Popup: FC<iPopip> = (props) => {
    const [rating, setRating] = useState<number>(0)
    const {data, error, loading, refetch} = useQuery(GET_POKEMON_BY_ID, {
        variables: {input: {id: props.pokemonID}}
    })
    console.log(data);

    const handleRating=() => {
        //TODO: send inn rating
    }

    return (props.trigger) ? (
        <div className={style.popupOuter}>
            <div className={style.popupInner}>
                {loading ? <CircularProgress/>
                    :
                    <div>
                        <button
                            onClick={() => props.setOpen(false)}
                            className={style.close}>close
                        </button>
                        <div>
                            <h1>{capitalize(data?.getPokemonById.name)}</h1>
                        </div>
                        <div className={style.wrapper}>


                            <div className={style.innerWrapper}>
                                <img className={style.spritePic} src={data?.getPokemonById.sprite_url}
                                     alt={"Picture of " + data?.getPokemonById.name}/>
                            </div>


                            <div className={style.innerWrapper}>
                                <Team currentPokemon={data?.getPokemonById as Pokemon}/>
                            </div>


                            <div className={style.innerWrapper}>
                                <h3>Stats: </h3>
                                <Stats Hp={10} Atk={5} Def={10} SpAtk={12} SpDef={13} Speed={1}/>
                            </div>


                            <div className={style.innerWrapper}>
                                <div>
                                    <p>average rating of {data?.getPokemonById.rating_count} people</p>
                                    <Rating name="read-only" defaultValue={0} precision={0.1}
                                            value={data?.getPokemonById.rating} readOnly/></div>
                                <p>Used by: {data?.getPokemonById.usage_percentage * 100}% of teams</p>
                                <div>
                                    <p>your rating</p>
                                    <Rating
                                        name="simple-controlled"
                                        value={rating}
                                        precision={0.5}
                                        onChange={(event, newValue) => {
                                            setRating(newValue ? newValue : 0)
                                        }}
                                    />
                                    <button onClick={handleRating} disabled={rating===0}>Send rating!</button>
                                </div>
                                <div>
                                    <b>Types:</b>
                                    {data?.getPokemonById.pokeTypes.map((a: string) => <p>{a}</p>)}
                                </div>
                            </div>
                        </div>
                    </div>}

            </div>
        </div>
    ) : <></>
}

export default Popup