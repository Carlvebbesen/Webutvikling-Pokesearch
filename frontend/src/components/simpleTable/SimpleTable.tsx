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
import {useWindowDimensions} from "../../utils/methods";
import style from './SimpleTable.module.css';
import { FilteredPokemon } from "../../queries";
import { getPokeTypeIcon } from "../../static/typeIcons/pokeTypeIcons";
import SortingButtonsList from "../Sort/sortingButtonsList";


interface iSimpleTable {
    data: FilteredPokemon,
    changePage: Function,
    changeRowsPerPage: Function
    setPopUp: Function
    setPopUpID: Function,
    page: number,
    rowsPerPage: number,
    activeSortButton: string | undefined,
    sortPokemon: (name: string, decending:boolean)=> void
}

const SimpleTable: FC<iSimpleTable> = (props) => {
    function sendPopUpData(id:number){
        props.setPopUpID(id)
        props.setPopUp(true)
    }

    return (
        <Paper className={style.root}>
            <Table stickyHeader className={style.table} aria-label="sticky table">
            <TableHead>
                        <SortingButtonsList activeButton={props.activeSortButton} sortByValue={props.sortPokemon}
                    />
                    </TableHead>
                <TableBody>
                    {props.data.pokemons.map(pokemon => (
                        <TableRow hover={true} key={pokemon.entry_number} onClick={()=>sendPopUpData(pokemon.entry_number)}>
                            <TableCell align="center" key={pokemon.entry_number + 10000}>
                                <img src={pokemon.sprite_url} alt="pokemon"/>
                            </TableCell>
                            <TableCell align="center" key={pokemon.entry_number + 20000}>
                                <p>{capitalize(pokemon.name)}</p>
                            </TableCell>
                            <TableCell>
                                {pokemon.pokeTypes.map(type => <img style={{marginRight: "10px"}} height="50"
                                                                    src={getPokeTypeIcon(type)} alt="PokeTypes"/>)}
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
                onPageChange={(event, page) => props.changePage(page)}
                onRowsPerPageChange={(event) => props.changeRowsPerPage(event)}
            />
        </Paper>
    )
        ;
}

export default SimpleTable