import React, {FC, useEffect, useState} from "react"
import style from "./Overview.module.css"
import {Pokemon} from "../utils/Pokemon";
import Filter from "../components/filter/Filter"
import SimpleTable from "../components/simpleTable/SimpleTable"
import { useQuery } from "@apollo/client";
import { GET_ALL_TEAMS, GET_FILTERED_POKEMONS } from "../queries";
import { FilterInput } from "../utils/graphql";
import { constants } from "http2";
import { SelectChangeEvent } from "@mui/material";


const OverviewPage = () => {
    //data
    const [filterInput, setFilterInput] = useState<FilterInput>({
        limit: 50,
        offset: 0,
    });
    const {data, error, loading, refetch} = useQuery(GET_FILTERED_POKEMONS, {
        variables:{input: filterInput}
    })

    //filter
    const [page, setPage] = useState<number>(1);

    const changePage= (event : React.MouseEvent<HTMLButtonElement, MouseEvent> | null)=>{
        console.log(event?.currentTarget.value);
        // const newState = filterInput;
        // newState.limit = parseInt(event.target.value);
        // newState.name = "b";
        // console.log(`changing count: ${event.target.value}`)
        // console.log(newState);
        // setFilterInput(newState);

    };
    const changeName = (value: string)=>{
        const newState = filterInput;
        newState.name = value;
        setFilterInput(newState);
        refetch();
    }
    const changeRating = (value: number)=>{
        const newState = filterInput;
        newState.rating = value === -1 ? 0 : value;
        setFilterInput(newState);
        refetch();
    }
    const changeType = (value: string[])=>{
        const newState = filterInput;
        newState.pokeTypes = value;
        setFilterInput(newState);
        refetch();
    }
    
    const changeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
        const newState = filterInput;
        newState.limit = parseInt(event.target.value);
        setFilterInput(newState);
        refetch();
    }

    return (
        <div className={style.overview}>
            <h1>
                Overview Page
            </h1>
            <Filter
                name={filterInput.name ?? ""}
                setName={changeName}
                rating={filterInput.rating ?? 0}
                setRating={changeRating}
                setType={changeType}
                type={filterInput.pokeTypes ?? []}/>
            {loading? <p>Loading ...</p>: <SimpleTable
                rowsPerPage={filterInput.limit}
                page={page}
                changePage={changePage}
                changeRowsPerPage={changeRowsPerPage}
                data={data.getFilteredPokemon}/>}
        </div> 
    )
}


export default OverviewPage