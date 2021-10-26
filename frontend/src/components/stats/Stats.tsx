import React, {FC, useRef} from "react"
import style from "./Stats.module.css"

interface iSingleStat {
    name: string,
    width: number
    color: string
    value: number
}


const SingleStat: FC<iSingleStat> = (props) => {
    return (
        <div className={style.singleStat}>
            <div className={style.nameVal}>
                <p>{props.name}</p>
                <p>{props.value}</p>
            </div>
            <div className={style.nameStat}>
            <div style={{width: props.width + "%", backgroundColor: props.color, height: "2em", alignContent:"center"}}>
            </div>
            </div>
        </div>
    )
}

interface iStats {
    Hp: number,
    Atk: number,
    Def: number,
    SpAtk: number,
    SpDef: number,
    Speed: number
}

const Stats: FC<iStats> = (props) => {
    const max: number = Math.max(props.Hp, props.Atk, props.Def, props.SpAtk, props.SpDef, props.Speed)
    const ref = useRef(null);


    return (
        <div className={style.outer} ref={ref}>
            <SingleStat color={"red"} name={"HP"} width={(props.Hp / max) * 100} value={props.Hp}/>
            <SingleStat color={"orange"} name={"Atk"} width={(props.Atk / max) * 100} value={props.Atk}/>
            <SingleStat color={"yellow"} name={"Def"} width={(props.Def / max) * 100} value={props.Def}/>
            <SingleStat color={"blue"} name={"SpAtk"} width={(props.SpAtk / max) * 100} value={props.SpAtk}/>
            <SingleStat color={"green"} name={"SpDef"} width={(props.SpDef / max) * 100} value={props.SpDef}/>
            <SingleStat color={"purple"} name={"Speed"} width={(props.Speed / max) * 100} value={props.Speed}/>
        </div>
    )
}


export default Stats