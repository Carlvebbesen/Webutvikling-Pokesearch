import React, {FC, useEffect, useState} from "react"
import style from "./Popup.module.css"
import {useMutation, useQuery} from "@apollo/client";
import {ADD_RATING_BY_POKEMONID, GET_POKEMON_BY_ID} from "../../queries";
import CircularProgress from '@mui/material/CircularProgress';
import {capitalize, Rating} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import {getPokeTypeIcon} from "../../static/typeIcons/pokeTypeIcons";
import {StatTable} from "../statTable/statTable";
import {BsXSquare} from 'react-icons/bs';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Team from "../team/Team";
import {Star, StarBorder} from "@material-ui/icons";

interface iPopup {
    pokemonId: number,
    setOpen: (id: number | null) => void,
}


const Popup: FC<iPopup> = ({pokemonId, setOpen}) => {
    const [rating, setRating] = useState<number>(0)
    const [disable, setDisable] = useState<boolean>(false)
    const {data, error, loading, refetch} = useQuery(GET_POKEMON_BY_ID, {
        variables: {input: {id: pokemonId}}
    });
    const [mutateFunction] = useMutation(ADD_RATING_BY_POKEMONID);

    useEffect(() => {
        const previousRating = localStorage.getItem(pokemonId.toString());
        if (previousRating !== null) {
            setRating(parseInt(previousRating));
            setDisable(true);
        }
        //to get the new team count if it is updated
        refetch()
    }, [pokemonId, refetch]);

    useEffect(()=>{
        console.log(data as unknown as string)
    },[data])


    const handleRating = () => {
        setDisable(true);
        localStorage.setItem(pokemonId.toString(), rating.toString());
        mutateFunction({
            variables: {
                input: {
                    id: pokemonId,
                    rating: rating,
                }
            }
        }).then((response) => {
            refetch()
            toast.success("Rating submitted", {autoClose: 2000});
            console.log("SUCCESS")
        });
    }


    return (
        <div id="inner" className={style.popupInner}>
            {loading || error
                ? <CircularProgress/>
                : <>
                    <div className={style.wrapper}>
                        <div className={style.container}>
                            <div
                                data-cy="close-popup"
                                className={style.close}>
                                <BsXSquare data-testid="close_popup" onClick={() => {
                                    setOpen(null)
                                }}/>
                            </div>
                            <div className={style.headerSection}>
                                <h2>{capitalize(data?.getPokemonById.name)}</h2>
                                <img
                                    className={style.spritePic}
                                    src={data?.getPokemonById.sprite_url}
                                    alt={"Picture of " + data?.getPokemonById.name}
                                    title={data?.getPokemonById.name}/>
                            </div>
                            <div className={style.infoSection}>
                                <h3>Info</h3>
                                <div className={style.dataEntry}>
                                    <span>Dex number</span>
                                    <span>{pokemonId}</span>
                                </div>
                                <div className={style.dataEntry}>
                                    <span>Typing</span>
                                    <div>
                                        {data?.getPokemonById.pokeTypes.map((type: string) =>
                                            <img
                                                key={type}
                                                style={{marginRight: "10px"}}
                                                height="20"
                                                src={getPokeTypeIcon(type)}
                                                alt={type}
                                                title={type}
                                            />)
                                        }
                                    </div>
                                </div>
                                <div className={style.dataEntry}>
                                    <span>Weight</span>
                                    <span>{(data?.getPokemonById.weight / 10).toFixed(1)} kg</span>
                                </div>
                                <div className={style.dataEntry}>
                                    <span>{`Average rating of ${data?.getPokemonById.rating_count}`}</span>
                                    <Rating
                                        data-cy="current-rating"
                                        name="read-only"
                                        defaultValue={0}
                                        precision={0.1}
                                        value={data?.getPokemonById.rating}
                                        readOnly
                                        size="small"/>
                                </div>
                                <div className={style.dataEntry}>
                                    <span>Team usage count</span>
                                    <span>{data?.getPokemonById.usage_count}</span>
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
                                ]}/>
                            </div>
                        </div>
                        <div className={style.ratingSection}>
                            <h5>Give rating</h5>
                            <Rating
                                data-testid="rating"
                                data-cy="rating-input"
                                emptyIcon={<StarBorder data-testid="test_empty_star" fontSize="inherit"/>}
                                icon={<Star data-testid="test_full_star" fontSize="inherit"/>
                                }
                                name="simple-controlled"
                                value={rating}
                                precision={0.5}
                                onChange={(event, newValue) => {
                                    setRating(newValue ? newValue : 0)
                                }}
                                disabled={disable}
                            />
                            <button data-testid="rating_submit" data-cy="rating-submit" className={style.rating}
                                    onClick={handleRating} disabled={(rating === 0) || disable}><SendIcon/></button>
                        </div>
                        <Team currentPokemon={data?.getPokemonById}/>
                    </div>
                </>}
        </div>
    );
}

export default Popup