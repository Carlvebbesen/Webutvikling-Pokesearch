import React, {FC} from "react"
import style from "./Popup.module.css"
import {Pokemon} from "../../utils/Pokemon";
import {useQuery} from "@apollo/client";
import {GET_POKEMON_BY_ID} from "../../queries";


interface iPopip{
    pokemonID: number,
    trigger:boolean,
    close: Function
}

const Popup: FC<iPopip>=(props)=>{
    const {data, error, loading, refetch} = useQuery(GET_POKEMON_BY_ID, {
        variables: {id: props.pokemonID}
    })

    return (props.trigger)?(
        <div className={style.popupOuter}>
            <div className={style.popupInner}>
                <button onClick={()=>console.log(data.get as unknown as string)}> print</button>
                <button
                    onClick={()=>props.close(false)}
                    className={style.close}>close</button>
                <p>ID = {props.pokemonID}</p>

            </div>
        </div>
    ): <></>
}

export default Popup