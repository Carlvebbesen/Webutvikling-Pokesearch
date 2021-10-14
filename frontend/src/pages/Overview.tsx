import React, {FC, useState} from "react"
import {PokemonData} from "../../src/data/pokemonData"
import style from "./Overview.module.css"
import {Pokemon} from "../types/Pokemon";
import Filter from "../components/filter/Filter"
import SimpleTable from "../components/simpleTable/SimpleTable"


const OverviewPage = () => {
    //data
    const rows = PokemonData as Pokemon[]

    //filter
    const [type, setType] = useState<string[]>([])
    const [name, setName] = useState<string>("")
    const [stars, setStars] = useState<number>(0)

    //simpleTable
    const [map, setMap] = useState(new Map<number,number>())
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(5);


    return (
        <div className={style.overview}>
            <h1>
                Overview Page
            </h1>
            <Filter
                name={name}
                setName={setName}
                setStars={setStars}
                stars={stars}
                setType={setType}
                type={type}/>
            <SimpleTable
                map={map}
                page={page}
                rowsPerPage={rowsPerPage}
                setMap={setMap}
                setPage={setPage}
                setRowsPerPage={setRowsPerPage}
                rows={rows}/>
        </div>
    )
}


export default OverviewPage