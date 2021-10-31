import React, {useEffect, useState} from "react"
import style from "./Overview.module.css"
import Filter from "../components/filter/Filter"
import SimpleTable from "../components/simpleTable/SimpleTable"
import {useQuery} from "@apollo/client";
import {GET_FILTERED_POKEMONS} from "../queries";
import {FilterInput} from "../utils/graphql";
import Popup from "../components/popup/Popup";
import Backdrop from "../components/backdrop/backdrop";
import Navbar from "../components/navbar/Navbar";

const OverviewPage = () => {
    //popup
    const [pokemonId, setPokemonId] = useState<number | null>(null);

    //data
    const [filterInput, setFilterInput] = useState<FilterInput>({
        limit: 50,
        offset: 0,
    });
    const {data, error, loading, refetch} = useQuery(GET_FILTERED_POKEMONS, {
        variables: {input: filterInput}
    })
    const [name, setName] = useState<string>("");

    //filter
    const [page, setPage] = useState<number>(0);

    useEffect(() => {
        const timer = setTimeout(() => {
            const newState = filterInput;
            newState.name = name;
            newState.offset = 0;
            setFilterInput(newState);
            setPage(0);
            refetch();
        }, 200);
        return () => clearTimeout(timer);
    }, [name]);

    const changePage = (value: number) => {
        setPage(value);
        const newState = filterInput;
        newState.offset = value * newState.limit;
        setFilterInput(newState);
        refetch();
    };
    const changeName = (value: string) => {
        setName(value);
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
    const changeSortBy = (name: string, decending: boolean) => {
        const newState = filterInput;
        newState.sortBy = name;
        newState.sortDesc = decending;
        setFilterInput(newState);
        setPage(0);
        refetch();
    }


    return (
        <div className={style.overview}>
            {pokemonId &&
            <Popup
                setOpen={setPokemonId}
                pokemonID={pokemonId}/>
            }
            {pokemonId && <Backdrop show={pokemonId !== null} clicked={() => setPokemonId(null)}/>}
            <Navbar/>
            <Filter
                name={name}
                setName={changeName}
                rating={filterInput.rating ?? 0}
                setRating={changeRating}
                setType={changeType}
                type={filterInput.pokeTypes ?? []}/>
            {loading || error ?
                <p>Loading ...</p>
                :
                <SimpleTable
                    activeSortButton={filterInput.sortBy}
                    sortPokemon={changeSortBy}
                    rowsPerPage={filterInput.limit}
                    page={page}
                    changePage={changePage}
                    changeRowsPerPage={changeRowsPerPage}
                    setPopUpId={setPokemonId}
                    data={data.getFilteredPokemon}
                />
            }
        </div>
    )
}


export default OverviewPage