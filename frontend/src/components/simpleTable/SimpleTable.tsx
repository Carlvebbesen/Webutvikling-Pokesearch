import {Pokemon} from "../../utils/Pokemon";
import React, {FC, useEffect, useState} from "react";
import Rating from "@mui/material/Rating";
import Team from "../team/Team";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TablePagination from "@mui/material/TablePagination";
import {capitalize} from "@mui/material";
import ArrowDownwardOutlinedIcon from '@mui/icons-material/ArrowDownwardOutlined';
import ArrowUpwardOutlinedIcon from '@mui/icons-material/ArrowUpwardOutlined';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import {useWindowDimensions} from "../../utils/methods";
import style from './SimpleTable.module.css';
import { FilteredPokemon, GET_POKEMON_BY_ID } from "../../queries";
import { PokemonTypes } from "../../utils/Values";
import { Polymer } from "@material-ui/icons";
import { getPokeTypeIcon } from "../../static/typeIcons/pokeTypeIcons";
import { useQuery } from "@apollo/client";

const teamMembers = [1, 2, 3, 4]

interface iSortingButton {
    id: number
    name: string,
    hide: boolean,
    decending: boolean,
    onClick: Function
};

const SortingButton: FC<iSortingButton> = (props) => {

    useEffect(() => { //TODO: delete after solve bug
    }, [props.decending])

    const handleClick = () => {
        props.onClick(props.id)
    }

    return (
        <button className={style.sortingButton} onClick={handleClick}>
            <p>{props.name}</p>
            {props.hide
                ? <FilterAltIcon/> :
                props.decending ? <ArrowUpwardOutlinedIcon/> : <ArrowDownwardOutlinedIcon/>}
        </button>
    )
}

interface iDetails {
    pokemonId: number
}


export const Details: FC<iDetails> = ({pokemonId}) => {
    console.log(pokemonId)
    const {data, loading, error} = useQuery(GET_POKEMON_BY_ID, {variables: {input:{id: pokemonId}}})

    console.log(data);
    return loading ? <p>Loading...</p> :
    // (
    //     <div className={style.outerWrapper}>
    //         <h1>{capitalize(data.getPokemonById.name)}</h1>
    //         <div className={style.wrapper}>
    //             <div className={style.detailsDiv}>
    //                 <img src={data.getPokemonById.sprite_url} className={style.bigpic} alt="pokemon"/>
    //             </div>
    //             <div className={style.detailsDiv}>
    //                 <p>type: {data.getPokemonById.type}</p>
    //                 <p>number: {data.getPokemonById.id}</p>
    //                 <p>weight: {data.getPokemonById.weight}</p>
    //             </div>
    //             <div className={style.detailsDiv}>
    //                 <div>
    //                     <p>average rating of {data.getPokemonById.number_of_ratings} people</p>
    //                     <Rating name="read-only" defaultValue={0} precision={0.1} value={data.getPokemonById.rating} readOnly/>
    //                 </div>
    //                 <p>Used by: {data.getPokemonById.usage_percentage * 100}% of teams</p>
    //                 <div>
    //                     <p>your rating</p>
    //                     <Rating
    //                         name="simple-controlled"
    //                         value={data.getPokemonById.getRating(data.getPokemonById.id)}
    //                         precision={0.5}
    //                         // onChange={(event, newValue) => {
    //                         //     data.getPokemonById.setRating(data.getPokemonById.id, newValue)
    //                         // }}
    //                     />
    //                 </div>
    //             </div>
    //             <div className={style.detailsDiv}>
    //                 <Team members={teamMembers} pokemonid={data.getPokemonById.id}/>
    //             </div>
    //         </div>
    //     </div>
    // );
    <p>hei</p>
}

interface iSimpleTable {
    data: FilteredPokemon,
    changePage: Function,
    changeRowsPerPage: Function
    page: number,
    rowsPerPage: number,
}

const SimpleTable: FC<iSimpleTable> = (props) => {
    const { width} = useWindowDimensions();
    const [tableHeader, setTableHeader] = useState<iSortingButton[]>(["Pokemon ID", "HP", "Attack", "Defence", "Sp. Atk", "Sp. Def", "Speed", "Total"]
        .map((name, index) => {
            const button: iSortingButton = {
                decending: true, hide: true, id: index, name: name, onClick: ()=>{},
            }
            return button
        }))

    return (
            <Paper className={style.root}>
                <Table stickyHeader className={style.table} aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell padding="checkbox"/>
                            {(width>600?tableHeader:tableHeader.slice(0,1)).map(header => <TableCell key={header.id} align="right">
                                <SortingButton id={header.id} name={header.name} hide={header.hide}
                                               decending={header.decending} onClick={header.onClick}
                                /></TableCell>)}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.data.pokemons.map(pokemon => (
                            <TableRow hover={true} key={pokemon.entry_number}>
                                <TableCell align="center" key={pokemon.entry_number+10000}>
                                        <img src={pokemon.sprite_url} alt="pokemon"/>
                                </TableCell>
                                <TableCell align="center" key={pokemon.entry_number+20000}>
                                        <p>{capitalize(pokemon.name)}</p>
                                </TableCell>
                                <TableCell>
                                    {pokemon.pokeTypes.map(type => <img style={{marginRight: "10px"}}height="50" src={getPokeTypeIcon(type)} alt="PokeTypes"/>)}
                                </TableCell>
                                    </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <TablePagination //TODO: https://mui.com/api/table-pagination/
                    rowsPerPageOptions={[10, 25, 50]}
                    count={props.data.count}
                    page={props.page}
                    rowsPerPage={props.rowsPerPage}
                    onPageChange={(event, page)=> props.changePage(page)}
                    onRowsPerPageChange={(event)=> props.changeRowsPerPage(event)}
                />
            </Paper>
    )
        ;
}

export default SimpleTable