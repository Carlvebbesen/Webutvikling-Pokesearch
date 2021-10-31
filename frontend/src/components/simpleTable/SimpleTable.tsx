import React, {FC} from "react";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TablePagination from "@mui/material/TablePagination";
import style from './SimpleTable.module.css';
import SortingButtonsList from "../sort/sortingButtonsList";
import { FilteredPokemon, Pokemon } from "../../utils/Pokemon";
import TableListRow from "../tableListRow/tableListRow";


interface iSimpleTable {
    data: FilteredPokemon,
    changePage: Function,
    changeRowsPerPage: Function
    setPopUpId: Function,
    page: number,
    rowsPerPage: number,
    activeSortButton: string | undefined,
    sortPokemon: (name: string, decending:boolean)=> void
}

const SimpleTable: FC<iSimpleTable> = (props) => {
    return (
        <Paper className={style.root}>
            <Table stickyHeader className={style.table} aria-label="sticky table">
            <TableHead>
                        <SortingButtonsList activeButton={props.activeSortButton} sortByValue={props.sortPokemon}
                    />
                    </TableHead>
                    <TableBody>
                        {props.data.pokemons.map((pokemon: Pokemon) => <TableListRow  setPopUpShow={props.setPopUpId} pokemon={pokemon}/>)}
                    </TableBody>
                </Table>
                <TablePagination
                    data-cy='pagination-table'
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