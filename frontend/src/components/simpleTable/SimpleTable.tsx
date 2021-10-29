import React, {FC, useEffect, useState} from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TablePagination from "@mui/material/TablePagination";
import ArrowDownwardOutlinedIcon from '@mui/icons-material/ArrowDownwardOutlined';
import ArrowUpwardOutlinedIcon from '@mui/icons-material/ArrowUpwardOutlined';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import {useWindowDimensions} from "../../utils/methods";
import style from './SimpleTable.module.css';
import TableListRow from "../tableListRow/tableListRow";
import { FilteredPokemon, Pokemon } from "../../utils/Pokemon";

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

interface iSimpleTable {
    data: FilteredPokemon,
    changePage: Function,
    changeRowsPerPage: Function
    page: number,
    rowsPerPage: number,
}

const SimpleTable: FC<iSimpleTable> = (props) => {
    const { width} = useWindowDimensions();
    const [tableHeader, _] = useState<iSortingButton[]>(["Pokemon ID", "HP", "Attack", "Defence", "Sp. Atk", "Sp. Def", "Speed", "Total"]
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
                        {props.data.pokemons.map((pokemon: Pokemon) => <TableListRow pokemon={pokemon}/>)}
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