import React, {FC, useEffect, useState} from "react"
import style from "./Overview.module.css"
import {Pokemon} from "../utils/Pokemon";
import Filter from "../components/filter/Filter"
import SimpleTable from "../components/simpleTable/SimpleTable"
import {useQuery} from "@apollo/client";
import {GET_ALL_TEAMS, GET_FILTERED_POKEMONS, GET_POKEMON_BY_ID} from "../queries";
import {FilterInput} from "../utils/graphql";
import {constants} from "http2";
import {SelectChangeEvent} from "@mui/material";
import Popup from "../components/popup/Popup";
import Backdrop from "../components/backdrop/Backdrop"

const OverviewPage = () => {
    //popup
    const [popUpID, setPopUpID] = useState<number | null>(null);

    //data
    const [filterInput, setFilterInput] = useState<FilterInput>({
        limit: 50,
        offset: 0,
    });
    const {data, error, loading, refetch} = useQuery(GET_FILTERED_POKEMONS, {
        variables: {input: filterInput}
    })

    //filter
    const [page, setPage] = useState<number>(0);

    const changePage = (value: number) => {
        setPage(value);
        const newState = filterInput;
        newState.offset = value * newState.limit;
        setFilterInput(newState);
        refetch();
    };
    const changeName = (value: string) => {
        const newState = filterInput;
        newState.name = value;
        newState.offset = 0;
        setFilterInput(newState);
        setPage(0);
        refetch();
    }
    const changeRating = (value: number) => {
        const newState = filterInput;
        newState.rating = value === -1 ? 0 : value;
        newState.offset = 0;
        setFilterInput(newState);
        setPage(0);
        refetch();
    }
    const changeType = (value: string[]) => {
        const newState = filterInput;
        newState.pokeTypes = value;
        newState.offset = 0;
        setFilterInput(newState);
        setPage(0);
        refetch();
    }

    const changeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const newState = filterInput;
        newState.limit = parseInt(event.target.value);
        setFilterInput(newState);
        refetch();
    }


    return (
        <div>
            <Backdrop clicked={() => setPopUpID(null)} show={popUpID !== null}/>
            {popUpID && <Popup
                trigger={popUpID !== null}
                setOpen={setPopUpID}
                pokemonID={popUpID}/>}
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

                {loading || error ?
                    <p>Loading ...</p>
                    :
                    <SimpleTable
                        rowsPerPage={filterInput.limit}
                        page={page}
                        changePage={changePage}
                        changeRowsPerPage={changeRowsPerPage}
                        setPopUpID={setPopUpID}
                        data={data.getFilteredPokemon}
                    />}
            </div>
        </div>
    )
}


export default OverviewPage