import React, {FC, useEffect, useState} from "react"
import style from "./Popup.module.css"
import {useMutation, useQuery} from "@apollo/client";
import {ADD_RATING_BY_POKEMONID, GET_POKEMON_BY_ID} from "../../queries";
import CircularProgress from '@mui/material/CircularProgress';
import {capitalize, Rating} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import {getPokeTypeIcon} from "../../static/typeIcons/pokeTypeIcons";
import { StatTable } from "../statTable/statTable";
import { BsXSquare } from 'react-icons/bs';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Team from "../team/Team";
import { useResetRecoilState } from "recoil";

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
        }}}).then((response) => {
            setTotalRating(response.data.ratePokemon.rating)
            toast.success("Rating submitted");
        });
    }

    return (
        <div id="inner" className={style.popupInner}>
            {loading || error ? <CircularProgress/>
                :<>
                <div className={style.wrapper}>

                <div className={style.container}>
                    <div
                        className={style.close}>
                        <BsXSquare onClick={() => {
                            setOpen(null)
                        }}/>
                    </div>
                    <div className={style.spriteSection}>
                        <h2>{capitalize(data?.getPokemonById.name)}</h2>
                        <img
                            className={style.spritePic}
                            src={data?.getPokemonById.sprite_url}
                            alt={"Picture of " + data?.getPokemonById.name}/>
                        <div className={style.dataEntry}>
                            <span>Dex number</span>
                            <span>{pokemonId}</span>
                        </div>
                        <div className={style.dataEntry}>
                            <span>Typing</span>
                            <div>
                                {data?.getPokemonById.pokeTypes.map((type: string) =>
                                    <img
                                    style={{marginRight: "10px"}}
                                    height="20"
                                    src={getPokeTypeIcon(type)}
                                    alt={type}/>)}
                            </div>
                        </div>
                        <div className={style.dataEntry}>
                            <span>Weight</span>
                            <span>{data?.getPokemonById.weight} kg</span>
                        </div>
                        <div className={style.dataEntry}>
                            <span>Average rating</span>
                            <Rating
                                name="read-only"
                                defaultValue={0}
                                precision={0.1}
                                value={data?.getPokemonById.rating}
                                readOnly
                                size="small"/>
                        </div>
                        <div className={style.dataEntry}>
                            <span>Usage percentage</span>
                            <span>{data?.getPokemonById.usage_percentage}%</span>
                        </div>
                    </div>
                    <div className={style.dataSection}>
                        <StatTable stats={[
                            {name: 'hp', value: data?.getPokemonById.stats.hp},
                            {name: 'attack', value: data?.getPokemonById.stats.attack},
                            {name: 'defense', value: data?.getPokemonById.stats.defense},
                            {name: 'special-attack', value: data?.getPokemonById.stats.special_attack},
                            {name: 'sepcial-defense', value: data?.getPokemonById.stats.special_defense},
                            {name: 'speed', value: data?.getPokemonById.stats.speed},
                        ]} />
                        <div>
                            <h5>Give rating</h5>
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
                    </div>
                </div>
                <Team currentPokemon={data?.getPokemonById}/>   
                </div>
                </>
                }
        </div>
    );
}

export default Popup