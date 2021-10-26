import React, {FC} from "react"
import style from "./Popup.module.css"
import {useQuery} from "@apollo/client";
import {GET_POKEMON_BY_ID} from "../../queries";


interface iPopip{
    pokemonID: number,
    trigger:boolean,
    close: Function
}

const Popup: FC<iPopip>=(props)=>{
    const {data, error, loading, refetch} = useQuery(GET_POKEMON_BY_ID, {
        variables: {input:{id: props.pokemonID}}
    })
    console.log(data);

    return (props.trigger)?(
        <div className={style.popupOuter}>
            <div className={style.popupInner}>
                <button
                    onClick={()=>props.close(false)}
                    className={style.close}>close</button>
                <p>ID = {props.pokemonID}</p>

            </div>
        </div>
    ): <></>
}

export default Popup