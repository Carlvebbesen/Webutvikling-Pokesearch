import React, {FC, useEffect, useState} from "react"
import style from "./Overview.module.css"
import {Pokemon} from "../types/Pokemon";
import Filter from "../components/filter/Filter"
import SimpleTable from "../components/simpleTable/SimpleTable"
import { useQuery } from "@apollo/client";
import { GET_ALL_TEAMS, GET_FILTERED_POKEMONS } from "../queries";
import { FilterInput } from "../types/graphql";


const OverviewPage = () => {
    //data
    const [filterInput, setFilterInput] = useState<FilterInput>({
        name: "",
        pokeTypes: [""],
        rating: 0,
        limit: 10,
        offset: 10,
    });
    const {data, error, loading} = useQuery(GET_FILTERED_POKEMONS, {
        variables:{input: filterInput}
    })
    //filter
    const [type, setType] = useState<string[]>([])
    const [name, setName] = useState<string>("")
    const [stars, setStars] = useState<number>(0)

    //simpleTable
    const [map, setMap] = useState(new Map<number,number>())
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(5);

    console.log(data);
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
            {/*<SimpleTable
                map={map}
                page={page}
                rowsPerPage={rowsPerPage}
                setMap={setMap}
                setPage={setPage}
                setRowsPerPage={setRowsPerPage}
                rows={rows}/> */}
        </div>
    )
}


export default OverviewPage