import React, {FC, useEffect} from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TablePagination from '@mui/material/TablePagination';
import style from './SimpleTable.module.css';
import SortingButtonsList from '../sort/sortingButtonsList';
import { FilteredPokemon, Pokemon } from '../../utils/Pokemon';
import TableListRow from '../tableListRow/tableListRow';
import useWindowSize from '../../utils/useWindowSize';


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

    const [width, height] = useWindowSize();

    return (
        <Paper key={'TableWrapper'}>
            <Table key={'TableRoot'} stickyHeader className={style.table} aria-label='sticky table'>
            <TableHead key={'TableHeader'}>
                        <SortingButtonsList key={'SortingButtonList'} activeButton={props.activeSortButton} sortByValue={props.sortPokemon}
                    />
                    </TableHead>
                    <TableBody key={'TableBody'}>
                        {props.data.pokemons.map((pokemon: Pokemon) => <TableListRow key={pokemon.entry_number} setPopUpShow={props.setPopUpId} pokemon={pokemon}/>)}
                    </TableBody>

            </Table>
                <TablePagination
                    data-cy='pagination-table'
                    align={'center'}
                    key={'TablePagination'}
                    rowsPerPageOptions={[10, 25, 50]}
                    labelRowsPerPage={width > 450 ? 'Rows per page' : ''}
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