import React, {FC, useEffect, useState} from "react"
import style from "./Popup.module.css"
import {useMutation, useQuery} from "@apollo/client";
import {ADD_RATING_BY_POKEMONID, GET_POKEMON_BY_ID} from "../../queries";
import CircularProgress from '@mui/material/CircularProgress';
import {capitalize, Rating} from "@mui/material";
import Team from "../team/Team";
import Stats from "../stats/Stats";
import SendIcon from '@mui/icons-material/Send';
import {getPokeTypeIcon} from "../../static/typeIcons/pokeTypeIcons";

interface iPopup {
    pokemonId: number,
    setOpen: (id: number|null)=> void,
}


const Popup: FC<iPopup> = ({pokemonId, setOpen}) => {
    const [rating, setRating] = useState<number>(0)
    const [disable, setDisable] = useState<boolean>(false)
    const {data, error, loading} = useQuery(GET_POKEMON_BY_ID, {
        variables: {input: {id: pokemonId}}
    });
    const [totalRating, setTotalRating] = useState<number| null>(null);
    const [totalRatingCount, setTotalRatingCount] = useState<number|null>(null);

    const [mutateFunction] = useMutation(ADD_RATING_BY_POKEMONID);
    useEffect(()=>{
        const previousRating = localStorage.getItem(pokemonId.toString());
        if(previousRating!== null) {
            setRating(parseInt(previousRating));
            setDisable(true);
        }
    },[]);


    const handleRating = () => {
        setDisable(true);
        localStorage.setItem(pokemonId.toString(), rating.toString());
        mutateFunction({variables: {input:{
            id: pokemonId,
            rating: rating,
        }}, onCompleted: (data)=> {
            console.log(data)
            setTotalRating(data.addRating.rating)
            setTotalRatingCount(data.addRating.rating_count)
        }});
    }

    return (
        <div id="inner" className={style.popupInner}>
            {loading || error ? <CircularProgress/>
                :
                <div>
                    <button
                        onClick={() => {
                            setOpen(null)
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
                            <p>Average rating of {totalRatingCount ? totalRatingCount: data?.getPokemonById.rating_count}
                                {totalRatingCount ? totalRatingCount:data?.getPokemonById.rating_count === 1 ? " person" : " people"}</p>
                            <Rating name="read-only" defaultValue={0} precision={0.1}
                                    value={totalRating ? totalRatingCount : data?.getPokemonById.rating} readOnly/>
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
                            <button className={style.rating} onClick={handleRating} disabled={(rating === 0) || disable}><SendIcon/></button>
                        </div>


                        <div className={style.innerWrapper}>
                            <Team currentPokemon={data?.getPokemonById}
                            />
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